// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 8: structures
In this exercise, you need to:
- Create an object using a structure
- Modify it
- ??? Mystery task ???
- Claim your points
- Your points are credited by the contract
*/

/*
What you need to know to complete this exercise
A) What was included in the previous exercises
B) What a structure is https://solidity.readthedocs.io/en/develop/types.html#index-14

*/
contract Ex08 is ExerciseTemplate {
    struct studentObject {
        address owner;
        address creator;
        string name;
        bool hasBeenModified;
    }

    studentObject[] public studentObjects;

    event createdAnObject(uint objectNumber);

    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    function createObject(string memory _name) public {
        studentObject memory _studentObject;
        _studentObject.owner = msg.sender;
        _studentObject.creator = msg.sender;
        _studentObject.name = _name;
        _studentObject.hasBeenModified = false;

        studentObjects.push(_studentObject);
        uint objectNumber = studentObjects.length - 1;

        emit createdAnObject(objectNumber);
    }

    function changeObjectName(uint _objectNumber, string memory _name) public {
        require(studentObjects[_objectNumber].owner == msg.sender);
        studentObjects[_objectNumber].name = _name;
        studentObjects[_objectNumber].hasBeenModified = true;
    }

    function transfer(uint _objectNumber, address _recipient) public {
        require(studentObjects[_objectNumber].owner == msg.sender);
        studentObjects[_objectNumber].owner = _recipient;
    }

    function claimPoints(uint _objectNumber) public {
        // Check that you are validating with an object you created
        require(studentObjects[_objectNumber].creator == msg.sender);
        // Check that the object has been modified at some pooint
        require(studentObjects[_objectNumber].hasBeenModified == true);
        // Check that the current owner of the object is a teacher/exercise
        require(TDERC20.teachers(studentObjects[_objectNumber].owner));

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
