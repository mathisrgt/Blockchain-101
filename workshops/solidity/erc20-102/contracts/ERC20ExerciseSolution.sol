// SPDX-License-Identifier: MIT

pragma solidity >=0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExerciseSolutionERC20 is ERC20 {
    address public minter;

    event DenyTransfer(address recipient, uint256 amount);
    event DenyTransferFrom(address sender, address recipient, uint256 amount);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address _minter
    ) ERC20(name, symbol) {
        minter = _minter;
    }

    function mint(address receiver, uint256 amount) public {
        require(msg.sender == minter, "Not allowed to mint.");
        _mint(receiver, amount);
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        emit DenyTransfer(recipient, amount);
        return false;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount,
        address _minter
    ) public returns (bool) {
        emit DenyTransferFrom(sender, recipient, amount);
        return false;
    }

    function isMinter(address _addressRequested) public view returns (bool) {
        return _addressRequested == minter;
    }
}
