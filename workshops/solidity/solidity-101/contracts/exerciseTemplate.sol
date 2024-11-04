// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;
import "./ERC20TD.sol";

/*
Common behavior in exercises

This contract describes functions that are common to most exercises. They help
- Authentify students and teacher
- Credit students
*/

contract ExerciseTemplate {
    ERC20TD TDERC20;

    mapping(address => bool) public hasCompletedExercise;

    event constructedCorrectly(address erc20Address);

    constructor(ERC20TD _TDERC20) {
        TDERC20 = _TDERC20;
        emit constructedCorrectly(address(TDERC20));
    }

    function creditStudent(uint _points, address _studentAddress) internal {
        if (!hasCompletedExercise[_studentAddress]) {
            TDERC20.distributeTokens(_studentAddress, _points);
        }
    }

    function validateExercise(address _studentAddress) internal {
        hasCompletedExercise[_studentAddress] = true;
    }

    modifier onlyTeachers() {
        require(TDERC20.teachers(msg.sender));
        _;
    }
}
