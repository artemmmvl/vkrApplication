// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Минималистичный контракт сбора средств
contract Campaign {
    address public owner;
    uint256 public companyId;
    uint256 public donationCounter;

    struct Donation {
        uint256 id;
        address donor;
        uint256 amount;
    }

    Donation[] public donationHistory;
    mapping(address => uint256) public donations;

    event DonationReceived(address indexed donor, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(uint256 _companyId) {
        owner = msg.sender;
        companyId = _companyId;
    }

    function donate() external payable {
        require(msg.value > 0, "Amount must be > 0");

        donations[msg.sender] += msg.value;
        donationHistory.push(Donation(donationCounter++, msg.sender, msg.value));

        emit DonationReceived(msg.sender, msg.value);
    }


    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAllDonations() external view returns (Donation[] memory) {
        return donationHistory;
    }

    function withdraw() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "Nothing to withdraw");

        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "Withdraw failed");

        emit Withdraw(owner, amount);
    }
}
