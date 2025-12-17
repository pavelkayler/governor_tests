// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, IVotes} from "./GovernanceBundle.sol";
import {System, Wrap} from "./Tokens.sol";

contract Fond is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    uint period;

    System system;
    uint systemDen = 3; // одна треть от голоса ; 60 токенов равны 20 голосам
    Wrap wrap;
    uint wrapDen = 6; // одна вторая от system ; 60 токенов равны 10 голосам

    enum Roles {
        Non,
        User,
        Dao
    }

    enum Types {
        A,
        B,
        C,
        D,
        E,
        F
    }

    enum Mechanism {
        simpleMost,
        superMost,
        weight
    }

    // структуры

    struct proposalData {
        address[] targets;
        uint[] values;
        bytes[] calldatas;
        bytes32 descriptionHash;
        uint systemDen;
        uint wrapDen;
    }

    struct proposalInfo {
        ProposalState state;
        uint startTime;
        uint endTime;
        address proposer;
        bool prior;
        Mechanism quorumMechanism;
        Types eventType;
    }

    struct proposalSubInfo {
        address target;
        uint value;
        address user;
        address token;
    }

    struct propVotes {
        address[] voters;
        uint totalFor;
        uint totalAgainst;
    }

    struct userVotes {
        uint forVotes;
        uint againstVotes;
    }

    uint[] proposals;

    mapping(address => Roles) role;

    mapping(uint => proposalData) private pData; // данные для работы governor
    mapping(uint => proposalInfo) public pInfo; // сущность голосования
    mapping(uint => proposalSubInfo) public psInfo; // дополнительные данные для фронта
    mapping(uint => propVotes) public pVotes; // информация о голосовавших
    mapping(uint => mapping(address => userVotes)) private uVotes; // голоса конкретного пользователя

    constructor(IVotes _system, address tom, address ben, address rick, address jack) payable Governor("Fond") GovernorVotes(_system) GovernorVotesQuorumFraction(0) {
        system = System(address(_system));
        system.transfer(address(_system), tom, system.balanceOf(address(_system)) / 3);
        system.transfer(address(_system), ben, system.balanceOf(address(_system)) / 3);
        system.transfer(address(_system), rick, system.balanceOf(address(_system)) / 3);

        wrap = new Wrap();

        role[tom] = Roles.Dao;
        role[ben] = Roles.Dao;
        role[rick] = Roles.Dao;
        role[jack] = Roles.User;
    }

    function votingDelay() public pure override returns (uint256) {
        return 0;
    }

    function votingPeriod() public view override returns (uint256) {
        return period;
    }

    modifier checkRole(Roles customRole) {
        require(role[msg.sender] == customRole, "can't");
        _;
    }
    modifier nonDao() {
        require(role[msg.sender] != Roles.Dao, "dao");
        _;
    }

    modifier onlyGov() {
        require(msg.sender == address(this), "not gov");
        _;
    }

    modifier notNull(uint num) {
        require(num != 0, "null");
        _;
    }

    // создание предложений всех типов

    function create_A_propose(address target, uint value, bool _prior, uint voteTime) public checkRole(Roles.Dao) notNull(value) returns (uint proposalId) {
        proposalId = servicePropose(target, value, abi.encode(""), "investing to new Startup", voteTime);
        writeInfo(proposalId, _prior, Mechanism.weight, Types.A);
    }

    function create_B_propose(address target, uint value, bool _prior, uint voteTime) public checkRole(Roles.Dao) notNull(value) returns (uint proposalId) {
        proposalId = servicePropose(target, value, abi.encode(""), "investing to existing Startup", voteTime);
        writeInfo(proposalId, _prior, Mechanism.weight, Types.B);
    }

    function create_C_propose(address user, bool add, bool _prior, Mechanism quorumMech, uint voteTime) public checkRole(Roles.Dao) returns (uint proposalId) {
        proposalId = servicePropose(address(this), 0, abi.encodeWithSignature("changeRole(address,bool)", user, add), "adding user to DAO", voteTime);
        writeInfo(proposalId, _prior, quorumMech, Types.C);
    }

    function create_D_propose(address user, bool add, bool _prior, Mechanism quorumMech, uint voteTime) public checkRole(Roles.Dao) returns (uint proposalId) {
        proposalId = servicePropose(address(this), 0, abi.encodeWithSignature("changeRole(address,bool)", user, add), "remove user from DAO", voteTime);
        writeInfo(proposalId, _prior, quorumMech, Types.D);
    }

    function create_E_propose(uint newDen, bool _prior, Mechanism quorumMech, uint voteTime) public checkRole(Roles.Dao) notNull(newDen) returns (uint proposalId) {
        proposalId = servicePropose(address(this), 0, abi.encodeWithSignature("changeDenominator(bool,uint256)", true, newDen), "change system's denominator", voteTime);
        writeInfo(proposalId, _prior, quorumMech, Types.E);
    }

    function create_F_propose(uint newDen, bool _prior, Mechanism quorumMech, uint voteTime) public checkRole(Roles.Dao) notNull(newDen) returns (uint proposalId) {
        proposalId = servicePropose(address(this), 0, abi.encodeWithSignature("changeDenominator(bool,uint256)", false, newDen), "change wrap's denominator", voteTime);
        writeInfo(proposalId, _prior, quorumMech, Types.F);
    }

    // сервисные функции

    function writeInfo(uint proposalId, bool _prior, Mechanism quorumMech, Types typ) private {
        pInfo[proposalId].startTime = block.timestamp;
        pInfo[proposalId].endTime = block.timestamp + period + votingDelay();
        pInfo[proposalId].proposer = proposalProposer(proposalId);
        pInfo[proposalId].prior = _prior;

        if (typ != Types.A && typ != Types.B) {
            require(quorumMech != Mechanism.weight, "choose another quorum mechanism");
        }

        pInfo[proposalId].quorumMechanism = quorumMech;
        pInfo[proposalId].eventType = typ;
    }

    function servicePropose(address target, uint value, bytes memory calldat, string memory description, uint voteTime) private returns (uint proposalId) {
        period = voteTime;

        address[] memory targets = new address[](1);
        targets[0] = target;
        uint[] memory values = new uint[](1);
        values[0] = value;
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = calldat;

        proposalId = propose(targets, values, calldatas, description);
        proposals.push(proposalId);
        proposalData storage pd = pData[proposalId];

        pd.targets = targets;
        pd.values = values;
        pd.calldatas = calldatas;
        pd.descriptionHash = keccak256(abi.encodePacked(description));
        pd.systemDen = systemDen;
        pd.wrapDen = wrapDen;
    }

    // голосование

    function myCastVote(uint256 proposalId, bool support, uint amount) public returns (uint256) {
        system.transfer(msg.sender, address(this), amount);
        uint vote = amount / systemDen;

        if (support) {
            pVotes[proposalId].totalFor += vote;
            uVotes[proposalId][msg.sender].forVotes += vote;
        } else {
            pVotes[proposalId].totalAgainst += vote;
            uVotes[proposalId][msg.sender].againstVotes += vote;
        }

        pVotes[proposalId].voters.push(msg.sender);

        return _castVote(proposalId, msg.sender, support ? 1 : 0, "");
    }

    function _castVote(uint256 proposalId, address account, uint8 support, string memory reason, bytes memory params) internal override returns (uint256) {
        _validateStateBitmap(proposalId, _encodeStateBitmap(ProposalState.Active));

        uint256 totalWeight = _getVotes(account, proposalId, params); // переписано
        uint256 votedWeight = _countVote(proposalId, account, support, totalWeight, params);

        if (params.length == 0) {
            emit VoteCast(account, proposalId, support, votedWeight, reason);
        } else {
            emit VoteCastWithParams(account, proposalId, support, votedWeight, reason, params);
        }

        _tallyUpdated(proposalId);

        return votedWeight;
    }

    // получение силы голоса пользователя

    function _getVotes(address account, uint256 proposalId, bytes memory /*params*/) internal view override(Governor, GovernorVotes) returns (uint256) {
        uint forVotes = uVotes[proposalId][account].forVotes;
        uint againstVotes = uVotes[proposalId][account].againstVotes;

        return forVotes + againstVotes;
    }

    // механизмы достижения кворума

    function _quorumReached(uint256 proposalId) internal view override(Governor, GovernorCountingSimple) returns (bool) {
        proposalInfo storage pi = pInfo[proposalId];
        propVotes storage pv = pVotes[proposalId];
        uint votesCount = pv.totalFor + pv.totalAgainst;

        if (pi.quorumMechanism == Mechanism.simpleMost) {
            return pv.totalFor > votesCount / 2 + 1;
        }
        if (pi.quorumMechanism == Mechanism.superMost) {
            return pv.totalFor > (votesCount * 2) / 3;
        }
        return pv.totalFor > pv.totalAgainst;
    }

    // функции возможных изменений в системе

    function changeRole(address user, bool add) public onlyGov {
        if (add) {
            require(role[user] != Roles.Dao, "already dao");
            role[user] = Roles.Dao;
            return;
        }

        require(role[user] == Roles.Dao, "not dao");
        role[user] = Roles.User;
    }

    function changeDenominator(bool _system, uint _den) public onlyGov {
        if (_system) {
            systemDen = _den;
        } else {
            wrapDen = _den;
        }
    }

    // покупка wrap токена

    function buyWrap() public payable nonDao {
        wrap.transfer(address(this), msg.sender, msg.value / (10 ** (18 - 12)));
    }

    // делегирование wrap-токена

    function delegateWrap(uint proposalId, address voter, uint amount) public nonDao {
        wrap.transfer(msg.sender, address(this), amount); // трансфер токенов на контракт

        propVotes storage pv = pVotes[proposalId];

        pv.voters.push(msg.sender); // запись как голосующего

        userVotes storage uv = uVotes[proposalId][voter];
        uint vote = amount / wrapDen;

        if (uv.forVotes > 0) {
            pv.totalFor += vote;
            uv.forVotes += vote;
        } else if (uv.againstVotes > 0) {
            pv.totalAgainst += vote;
            uv.againstVotes += vote;
        }
    }

    // отмена

    function cancelProposal(uint proposalId) public {
        proposalData storage pd = pData[proposalId];
        address[] memory voters = pVotes[proposalId].voters;

        for (uint i; i < voters.length; i++) {
            address voter = voters[i];
            uint votes = uVotes[proposalId][voter].forVotes + uVotes[proposalId][voter].againstVotes;

            if (role[voter] == Roles.Dao) {
                system.transfer(address(this), voter, votes * pd.systemDen);
            } else if (role[voter] != Roles.Dao) {
                wrap.transfer(address(this), voter, votes * pd.wrapDen);
            } else revert("error");
        }

        super.cancel(pd.targets, pd.values, pd.calldatas, pd.descriptionHash);
    }
}
