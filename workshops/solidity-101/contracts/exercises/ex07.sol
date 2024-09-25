// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 7: Events
In this exercise, you need to:
- Use function assignRank() to receive a rank in the random value store
- Use a function to trigger an event
- Use Etherscan to analyse this event
- Use a function to show you know the correct value of a private variable
- Your points are credited by the contract
*/

/*
What you need to know to complete this exercise
A) What was included in the previous exercises
B) Events are used to log data that is accessible from a full node, but not stored in the contracts variables.
https://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html#index-2
C) Etherscan.io https://etherscan.io/ lets you visualize events that were fired during a given transaction

*/
contract Ex07 is ExerciseTemplate {
    mapping(address => uint) private privateValues;
    mapping(address => bool) public exerciseWasStarted;
    uint[20] private randomValuesStore;
    uint public nextValueStoreRank;

    event showPrivateVariableInEvent(uint myVariable);

    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    function setRandomValueStore(
        uint[20] memory _randomValuesStore
    ) public onlyTeachers {
        randomValuesStore = _randomValuesStore;
        nextValueStoreRank = 0;
    }

    function assignRank() public {
        privateValues[msg.sender] = randomValuesStore[nextValueStoreRank];
        nextValueStoreRank += 1;
        if (nextValueStoreRank >= randomValuesStore.length) {
            nextValueStoreRank = 0;
        }
        exerciseWasStarted[msg.sender] = true;
    }

    function fireEvent() public {
        emit showPrivateVariableInEvent(privateValues[msg.sender] + 32);
    }

    function showYouKnowPrivateValue(uint _privateValue) public {
        require(privateValues[msg.sender] == _privateValue);
        require(exerciseWasStarted[msg.sender] == true);

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
