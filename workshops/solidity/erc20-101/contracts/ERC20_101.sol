// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20_101 is ERC20 {
    mapping(address => bool) public teachers;
    event DenyTransfer(address recipient, uint256 amount);
    event DenyTransferFrom(address sender, address recipient, uint256 amount);
    event Withdrawn(address owner, uint256 amount);
    event GetToken(address requestAccount, uint256 amountMinted);
    event AmountBuy(address buyer, uint256 amount);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        teachers[msg.sender] = true;
    }

    function distributeTokens(
        address tokenReceiver,
        uint256 amount
    ) public onlyTeachers {
        uint256 decimals = decimals();
        uint256 multiplicator = 10 ** decimals;
        _mint(tokenReceiver, amount * multiplicator);
    }

    function setTeacher(
        address teacherAddress,
        bool isTeacher
    ) public onlyTeachers {
        teachers[teacherAddress] = isTeacher;
    }

    modifier onlyTeachers() {
        require(teachers[msg.sender]);
        _;
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
        uint256 amount
    ) public override returns (bool) {
        emit DenyTransferFrom(sender, recipient, amount);
        return false;
    }

    function withdrawEther() public {
        uint256 contractBalance = address(this).balance;

        require(contractBalance > 0, "No Ether available to withdraw");

        payable(msg.sender).transfer(contractBalance);

        emit Withdrawn(msg.sender, contractBalance);
    }

    function getToken() external {
        uint256 amount = 100 * (10 ** decimals());

        emit GetToken(msg.sender, amount);

        _mint(msg.sender, amount);
    }

    // function buyToken() public payable {
    //     uint256 amountBuy = (msg.value * 10 ** decimals());
    //     _mint(msg.sender, amountBuy);
    //     emit AmountBuy(msg.sender, amountBuy);
    // }
}
