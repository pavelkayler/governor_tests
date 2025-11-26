// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./ERC20Bundle.sol";

contract SystemToken is ERC20, ERC20Votes, ERC20Permit {
    address[] daos;
    constructor(address tom, address ben, address rick) payable ERC20("Professional", "PROFI") ERC20Permit("system") {
        mint(tom, (100_000 * 10 ** decimals()) / 3);
        mint(ben, (100_000 * 10 ** decimals()) / 3);
        mint(rick, (100_000 * 10 ** decimals()) / 3);
        _delegate(tom, tom);
        _delegate(ben, ben);
        _delegate(rick, rick);

        daos.push(tom);
        daos.push(ben);
        daos.push(rick);
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }

    function delegate(address delegatee) public override {
        _delegate(tx.origin, delegatee);
    }

    function decimals() public pure override returns (uint8) {
        return 12;
    }

    function mint(address addr, uint value) internal {
        _mint(addr, value);
    }

    function transferFrom(address from, address to, uint value) public override returns (bool) {
        _transfer(from, to, value);
        return true;
    }

    function getDaos() public view returns (address[] memory) {
        return daos;
    }
}

contract WrapToken is ERC20, ERC20Votes, ERC20Permit {
    address governor;
    constructor() ERC20("RTKCoin", "RTK") ERC20Permit("wrap") {
        _mint(msg.sender, 20_000_000 * 10 ** decimals());
        governor = msg.sender;
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }

    function decimals() public pure override returns (uint8) {
        return 12;
    }

    function price() public pure returns (uint) {
        return 1 ether;
    }

    function mint(address addr, uint value) external {
        require(msg.sender == governor, "not governor");
        _mint(addr, value);
    }

    function transferFrom(address from, address to, uint value) public override returns (bool) {
        _transfer(from, to, value);
        return true;
    }
}
