// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./ERC20Bundle.sol";

contract System is ERC20Votes, ERC20Permit {
  uint TOTAL_SUPPLY = 100_000;

  constructor() ERC20("Professional", "PROFI") ERC20Permit("System") {
    _mint(address(this), TOTAL_SUPPLY);
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

  function transfer(address from, address to, uint value) external {
    _transfer(from, to, value);
  }
}

contract Wrap is ERC20 {
  uint TOTAL_SUPPLY = 20_000_000;

  constructor() ERC20("Professional", "PROFI") {
    _mint(msg.sender, TOTAL_SUPPLY);
  }

  function decimals() public pure override returns (uint8) {
    return 12;
  }

  function price() public pure returns (uint) {
    return 1 ether;
  }

  function transfer(address from, address to, uint value) external {
    _transfer(from, to, value);
  }

  function mint(address to, uint value) external {
    _mint(to, value);
  }
}
