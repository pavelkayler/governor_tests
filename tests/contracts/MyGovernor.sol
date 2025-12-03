// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, IVotes, IGovernor} from "./GovernanceBundle.sol";
import {SystemToken, WrapToken} from "./Token.sol";

contract MyGovernor is
    Governor,
    GovernorCountingSimple,
    GovernorVotesQuorumFraction
{
    SystemToken system;
    WrapToken wrap;
    uint systemDen = 3;
    uint wrapDen = 6;
    uint32 period;
    address[] users;
    uint[] allProposals;

    enum roles {
        non,
        user,
        dao
    }

    enum proposalType {
        a,
        b,
        c,
        d,
        e,
        f
    }

    struct User {
        roles role;
        uint system;
        uint wrap;
    }

    struct ProposalInfo {
        uint proposalId;
        uint proposalState;
        address proposer;
        address target;
        uint value;
        bytes[] calldatas;
        string description;
        address changeHim;
        bool changeSystem;
        uint newDenominator;
        proposalType typ;
        bool simpleMost;
        uint period;
        address[] voters;
        uint votesFor;
        uint votesAgainst;
    }

    struct ProposalVotes {
        uint votesFor;
        uint votesAgainst;
    }

    mapping(address => User) user;
    mapping(uint => ProposalInfo) proposals;
    mapping(uint => mapping(address => ProposalVotes)) daoVotes;

    constructor(
        IVotes _token,
        address jack,
        address startup
    )
        payable
        Governor("MyGovernor")
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(0)
    {
        system = SystemToken(address(_token));
        wrap = new WrapToken();

        users = system.getDaos();
        users.push(jack);
        users.push(startup);

        user[msg.sender].role = roles.dao;
        user[users[0]].role = roles.dao;
        user[users[1]].role = roles.dao;
        user[users[2]].role = roles.dao;
        user[jack].role = roles.user;
    }

    function votingDelay() public pure override returns (uint256) {
        return 0;
    }

    function votingPeriod() public view override returns (uint256) {
        return period;
    }

    modifier onlyRegistered() {
        require(user[msg.sender].role != roles.non, "you can't vote");
        _;
    }

    modifier onlyDao() {
        require(user[msg.sender].role == roles.dao, "only dao");
        _;
    }

    modifier onlyGovernor() {
        require(msg.sender == address(this), "only governor can do");
        _;
    }

    // ------------- start service functions ------------- //

    function servicePropose(
        address target,
        uint value,
        bytes memory _calldatas,
        string memory description,
        uint32 _period
    ) internal returns (uint) {
        address[] memory targets = new address[](1);
        targets[0] = target;
        uint[] memory values = new uint[](1);
        values[0] = value;
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = _calldatas;
        period = _period;

        uint id = super.propose(targets, values, calldatas, description);
        proposals[id].proposalId = id;
        proposals[id].proposer = tx.origin;
        proposals[id].target = target;
        proposals[id].value = value;
        proposals[id].calldatas = calldatas;
        proposals[id].description = description;
        proposals[id].period = _period;
        allProposals.push(id);
        proposalNumber[allProposals.length - 1] = id;
        return id;
    }

    // ------------- end service functions ------------- //

    // ------------- start overriding functions ------------- //

    function myCastVote(
        uint proposalId,
        uint8 support,
        uint toVote
    ) public onlyDao returns (uint256) {
        address voter = msg.sender;
        proposals[proposalId].voters.push(voter);

        // трансфер токенов на баланс контракта
        uint systemTokens = toVote * systemDen;
        system.transferFrom(voter, address(this), systemTokens);
        user[voter].system = systemTokens;

        // заносим голоса в структуру предложения
        if (support == 1) {
            proposals[proposalId].votesFor += toVote; // добавялем голос в общую кучу
            daoVotes[proposalId][msg.sender].votesFor += toVote; // записываем голос у конкретного пользователя.
        } else if (support == 0) {
            proposals[proposalId].votesAgainst += toVote;
            daoVotes[proposalId][msg.sender].votesAgainst += toVote;
        } else revert("wrong support");

        return super.castVote(proposalId, support);
    }

    function _getVotes(
        address account,
        uint256 timestamp,
        bytes memory /*params*/
    ) internal view override(Governor, GovernorVotes) returns (uint256) {
        return user[account].system / systemDen + user[account].wrap / wrapDen;
    }

    function myExecute(uint proposalId) public payable onlyDao returns (uint) {
        address[] memory targets = new address[](1);
        targets[0] = proposals[proposalId].target;
        uint[] memory values = new uint[](1);
        values[0] = proposals[proposalId].value;
        // bytes[] memory calldatas = new bytes[](1);
        bytes[] memory calldatas = proposals[proposalId].calldatas;
        bytes32 descriptionHash = keccak256(
            abi.encodePacked(proposals[proposalId].description)
        );
        return super.execute(targets, values, calldatas, descriptionHash);
    }

    function _quorumReached(
        uint256 proposalId
    ) internal view override(Governor, GovernorCountingSimple) returns (bool) {
        uint allVotes = proposals[proposalId].votesFor +
            proposals[proposalId].votesAgainst;

        if (allVotes == 0) {
            return false;
        }
        if (
            proposals[proposalId].typ == proposalType.a ||
            proposals[proposalId].typ == proposalType.b
        ) {
            return
                proposals[proposalId].votesFor >
                proposals[proposalId].votesAgainst;
        } else if (proposals[proposalId].simpleMost == true) {
            return (proposals[proposalId].votesFor * 2) > allVotes;
        } else if (
            proposals[proposalId].simpleMost != true &&
            proposals[proposalId].typ != proposalType.a &&
            proposals[proposalId].typ != proposalType.b
        ) {
            return (proposals[proposalId].votesFor * 3) > (allVotes * 2);
        } else {
            return false;
        }
    }

    function cancel(uint proposalId) public returns (uint256) {
        address[] memory targets = new address[](1);
        targets[0] = proposals[proposalId].target;
        uint[] memory values = new uint[](1);
        values[0] = proposals[proposalId].value;
        // bytes[] memory calldatas = new bytes[](1);
        bytes[] memory calldatas = proposals[proposalId].calldatas;
        bytes32 descriptionHash = keccak256(
            abi.encodePacked(proposals[proposalId].description)
        );

        if (_msgSender() != proposalProposer(proposalId)) {
            revert GovernorOnlyProposer(_msgSender());
        }

        address[] storage voters = proposals[proposalId].voters;

        for (uint i; i < voters.length; i++) {
            system.transferFrom(
                address(this),
                voters[i],
                user[voters[i]].system
            );
            user[voters[i]].system = 0;
            wrap.transferFrom(address(this), voters[i], user[voters[i]].wrap);
            user[voters[i]].wrap = 0;
        }

        return _cancel(targets, values, calldatas, descriptionHash);
    }

    // ------------- end overriding functions ------------- //

    // ------------- start new functions ------------- //

    function create_A_of_B_propose(
        address target,
        uint value,
        uint32 _period
    ) public onlyDao returns (uint) {
        uint id = servicePropose(
            target,
            value,
            "",
            "investing",
            _period
        );
        target.balance == 0
            ? proposals[id].typ = proposalType.a
            : proposals[id].typ = proposalType.b;
        return id;
    }

    function create_C_or_D_propose(
        address _user,
        bool simpleMost,
        bool adding,
        uint32 _period
    ) public onlyDao returns (uint) {
        bytes memory calldat = abi.encodeWithSignature(
            "changeRole(address,bool)",
            _user,
            adding
        );
        uint id = servicePropose(address(this), 0, calldat, "setDao", _period);

        if (adding == true) {
            require(user[_user].role == roles.user, "he's already dao");
            proposals[id].typ = proposalType.c;
            
            } else {
            require(user[_user].role == roles.dao, "he's not dao");
            proposals[id].typ = proposalType.d;
            }

        proposals[id].simpleMost = simpleMost;
        proposals[id].changeHim = _user;
        return id;
    }

    function create_E_or_F_propose(
        bool simpleMost,
        bool _system,
        uint _newDenominator,
        uint32 _period
    ) public onlyDao returns (uint) {
        bytes memory calldat = abi.encodeWithSignature(
            "changeDenominator(uint256,bool)",
            _newDenominator,
            _system
        );
        uint id = servicePropose(address(this), 0, calldat, "setDen", _period);
        _system == true
            ? proposals[id].typ = proposalType.e
            : proposals[id].typ = proposalType.f;
        proposals[id].simpleMost = simpleMost;
        proposals[id].changeSystem = _system;
        proposals[id].newDenominator = _newDenominator;
        return id;
    }

    function buyWrapToken() public payable {
        uint value = (msg.value / wrap.price()) * 10 ** wrap.decimals();
        wrap.transferFrom(address(this), msg.sender, value);
        user[msg.sender].wrap = value;
        
    }

    function delegateWrapToken(
        uint proposalId,
        address delegateTo
    ) public onlyRegistered {
        require(user[msg.sender].wrap > 0, "no tokens to delegate");
        require(user[msg.sender].role == roles.user, "not user");
        proposals[proposalId].voters.push(msg.sender);

        uint wrapTokens = wrap.balanceOf(msg.sender);
        uint wrapVotes = wrapTokens / wrapDen;
        wrap.transferFrom(msg.sender, address(this), wrapTokens);
        user[msg.sender].wrap = wrapTokens;

        if (daoVotes[proposalId][delegateTo].votesFor > 0) {
            proposals[proposalId].votesFor += wrapVotes;
            daoVotes[proposalId][delegateTo].votesFor += wrapVotes;
        } else if (daoVotes[proposalId][delegateTo].votesAgainst > 0) {
            proposals[proposalId].votesAgainst += wrapVotes;
            daoVotes[proposalId][delegateTo].votesAgainst += wrapVotes;
        } else revert("no votes available");
    }

    function changeRole(address _user, bool adding) public onlyGovernor {
        if (adding == true) {
            user[_user].role = roles.dao;
        } else {
            user[_user].role = roles.user;
        }
    }

    function changeDenominator(uint newDen, bool _system) public onlyGovernor {
        _system == true ? systemDen = newDen : wrapDen = newDen;
    }

    // ------------- end new functions ------------- //

    // ------------- start view functions ------------- //

    function viewProposal(
        uint proposalId
    ) public view returns (ProposalInfo memory) {
        return proposals[proposalId];
    }

    function viewProposals() public view returns (ProposalInfo[] memory) {
        ProposalInfo[] memory allInfo = new ProposalInfo[](allProposals.length);
        for (uint i; i < allProposals.length; i++) {
            allInfo[i] = viewProposal(allProposals[i]);
        }
        return allInfo;
    }

    function viewMyBalances() public view returns (uint[3] memory allBalances) {
        allBalances = [
            msg.sender.balance,
            system.balanceOf(msg.sender),
            wrap.balanceOf(msg.sender)
        ];
    }

    function viewUserInfo() public view returns (User memory) {
        return user[msg.sender];
    }

    mapping(uint => uint) proposalNumber;

    function getProposalId(uint index) public view returns (uint) {
        return proposalNumber[index];
    }

    function getAllProposalIds() public view returns (uint[] memory) {
        return allProposals;
    }

    // ------------- end view functions ------------- //
}
