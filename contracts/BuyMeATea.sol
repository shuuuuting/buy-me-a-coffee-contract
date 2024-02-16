// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuyMeATea {

    // Memo structure
    struct Memo {
        address from;
        uint timestamp;
        string name;
        string message;
    }

    // Event to emit when a Memo is created
    event NewMemo(
        address indexed from,
        uint timestamp,
        string name,
        string message
    );

    // Address of contract deployer. Marked payable 
    // so that we can withdraw to this address later
    address payable owner;

    // List of all memos received
    Memo[] memos;

    event Withdrawal(uint amount, uint when);

    // Only trigger one time when the contract is deployed
    constructor() {
        // Store the address of the deployer as a payable address
        // When we withdraw funds, we'll withdraw here
        owner = payable(msg.sender);
    }

    /**
     * @dev fetches owner address
     */
    function getOwner() public view returns (address) {
        return owner;
    }

    /**
     * @dev fetches all stored memos
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    /**
     * @dev buy a tea for owner (sends an ETH tip and leaves a memo)
     * @param _name name of the purchaser
     * @param _message message from the purchaser
     */
    function buyTea(string memory _name, string memory _message) public payable {
        // Must accept more than 0 ETH
        // require(condition, "Error message");
        require(msg.value > 0, "Can't buy tea for free!");

        // Add the memo to storage
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // Emit a NewMemo event
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */
    function withdraw() public {
        require(msg.sender == owner, "You aren't the owner!");

        owner.transfer(address(this).balance);
        emit Withdrawal(address(this).balance, block.timestamp);
    }
}
