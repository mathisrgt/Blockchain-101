// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 6: public/private variables
In this exercise, you need to:
- Use a function to get assigned a private variable
- Use a function to duplicate this variable in a public variables
- Use a function to show you know the correct value of the private variable
- Your points are credited by the contract
*/

/*
What you need to know to complete this exercise
A) What was included in the previous exercises
B) The differences between public and private variables https://solidity.readthedocs.io/en/develop/contracts.html#index-3
C) What a contract constructor is https://solidity.readthedocs.io/en/develop/contracts.html#index-17
D) When the contract is created, the teacher creates an array called randomValuesStore. 
When students start the exercise, they get assigned one of these values.
*/
contract Ex06 is ExerciseTemplate {
    mapping(address => uint) private privateValues;
    mapping(address => uint) public publicValues;
    mapping(address => bool) public exerciseWasStarted;

    uint[20] private randomValuesStore;
    uint public nextValueStoreRank;

    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    function setRandomValueStore(
        uint[20] memory _randomValuesStore
    ) public onlyTeachers {
        randomValuesStore = _randomValuesStore;
        nextValueStoreRank = 0;
    }

    function startExercise() public {
        privateValues[msg.sender] = randomValuesStore[nextValueStoreRank];
        nextValueStoreRank += 1;
        if (nextValueStoreRank >= randomValuesStore.length) {
            nextValueStoreRank = 0;
        }
        exerciseWasStarted[msg.sender] = true;
    }

    function duplicatePrivateValueInPublic() public {
        publicValues[msg.sender] = privateValues[msg.sender] + 85;
    }

    function showYouKnowPrivateValue(uint _privateValue) public {
        require(privateValues[msg.sender] == _privateValue);
        require(exerciseWasStarted[msg.sender] == true);

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
