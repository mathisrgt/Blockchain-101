import { ethers } from 'hardhat';
import { expect } from "chai";
import { Contract, Signer } from "ethers";

import {
    ERC20_102,
    ERC20_102__factory,
    ERC20Claimable,
    ERC20Claimable__factory,
    Evaluator,
    Evaluator__factory,
    ExerciseSolution,
    ExerciseSolution__factory,
} from "../typechain-types";

describe("ExerciceSolution - Evaluator", function () {
    let ERC20_102: ERC20_102;
    let ERC20Claimable: ERC20Claimable;
    let Evaluator: Evaluator;
    let ExerciseSolution: ExerciseSolution;

    let owner: Signer;
    let student: Signer;

    before(async () => {
        [owner, student] = await ethers.getSigners(); // attribute wallet signers

        const ERC20_102Factory = await ethers.getContractFactory("ERC20_102", owner); // Add of the deployer address as the last parameter
        ERC20_102 = await ERC20_102Factory.deploy("ERC20-102", "ERC20-102", BigInt("0x108b2a2c28029094000000"));
        await ERC20_102.waitForDeployment();

        const ERC20ClaimableFactory = await ethers.getContractFactory("ERC20Claimable", owner);
        ERC20Claimable = await ERC20ClaimableFactory.deploy("ClaimableToken", "CLTK", BigInt("0x108b2a2c28029094000000"));
        await ERC20Claimable.waitForDeployment();

        const EvaluatorFactory = await ethers.getContractFactory("Evaluator", owner);
        Evaluator = await EvaluatorFactory.deploy(ERC20_102.target, ERC20Claimable.target);
        await Evaluator.waitForDeployment();

        await ERC20_102.connect(owner).setTeacher(Evaluator.target, true);

        const ExerciseSolutionFactory = await ethers.getContractFactory("ExerciseSolution", student);
        ExerciseSolution = await ExerciseSolutionFactory.deploy(ERC20Claimable.target);
        await ExerciseSolution.waitForDeployment();

        await Evaluator.connect(student).submitExercise(ExerciseSolution.target);
    });

    // it("Should allow claiming tokens to ExerciseSolution", async function () {
    //     await ExerciseSolution.connect(student).claimTokensOnBehalf();

    //     const tokenClaimed = await ExerciseSolution.tokensInCustody(await student.getAddress());
    //     expect(tokenClaimed).to.equal(await ERC20Claimable.distributedAmount());
    // })

    it("Shoud perfom ex1 from the evaluator", async function () {
        await ERC20Claimable.connect(student).claimTokens();

        const studentBalance = await ERC20Claimable.balanceOf(await student.getAddress());
        expect(studentBalance).to.be.gt(0);

        await Evaluator.connect(student).ex1_claimedPoints();
    })

    it("Should perform submit exercise from the evaluator", async function () {
        // Debug current state
        console.log("Has been paired:", await Evaluator.hasBeenPaired(await ExerciseSolution.getAddress()));
        console.log("Exercise progression (1):", await Evaluator.exerciseProgression(await student.getAddress(), 1));

        // Ensure Evaluator is authorized as a teacher
        await ERC20_102.connect(owner).setTeacher(await Evaluator.getAddress(), true);

        // Ensure Evaluator has sufficient tokens
        const evaluatorBalance = await ERC20_102.balanceOf(await Evaluator.getAddress());
        console.log("Evaluator token balance:", evaluatorBalance.toString());

        // Submit the exercise solution
        const solutionAddress = await ExerciseSolution.getAddress();
        if (solutionAddress !== await Evaluator.studentExerciseSolution(await student.getAddress()))
            await Evaluator.connect(student).submitExercise(solutionAddress);

        // Verify state changes
        const paired = await Evaluator.hasBeenPaired(await ExerciseSolution.getAddress());
        expect(paired).to.be.true;

        const progression = await Evaluator.exerciseProgression(await student.getAddress(), 0);
        expect(progression).to.be.true;
    });

    it("Shoud perfom ex2 from the evaluator", async function () {
        await Evaluator.connect(student).ex2_claimedFromContract();
    })

    it("Shoud perfom withdraw tokens (ex3) from the evaluator", async function () {
        const solutionInitBalance = await ERC20Claimable.balanceOf(ExerciseSolution.getAddress());
        const evaluatorInitBalance = await ERC20Claimable.balanceOf(Evaluator.getAddress());
        console.log("Initial ExerciseSolution balance:", solutionInitBalance.toString());
        console.log("Initial Evaluator balance:", evaluatorInitBalance.toString());

        // Step 3: Verify tokens in custody for Evaluator
        const tokensInCustody = await ExerciseSolution.tokensInCustody(Evaluator.getAddress());
        console.log("Tokens in custody for Evaluator:", tokensInCustody.toString());
        expect(tokensInCustody).to.be.gt(0);

        // Step 4: Perform ex3_withdrawFromContract
        console.log("Performing withdrawal...");
        await Evaluator.connect(student).ex3_withdrawFromContract();

        // Step 5: Check post-withdrawal balances
        const solutionEndBalance = await ERC20Claimable.balanceOf(ExerciseSolution.getAddress());
        const evaluatorEndBalance = await ERC20Claimable.balanceOf(Evaluator.getAddress());
        console.log("Final ExerciseSolution balance:", solutionEndBalance.toString());
        console.log("Final Evaluator balance:", evaluatorEndBalance.toString());

        // Step 6: Assert changes in balances
        const solutionBalanceDiff = solutionInitBalance - solutionEndBalance;
        const evaluatorBalanceDiff = evaluatorEndBalance - evaluatorInitBalance;

        expect(solutionBalanceDiff).to.equal(tokensInCustody);
        expect(evaluatorBalanceDiff).to.equal(tokensInCustody);

        // Step 7: Verify tokens are no longer in custody
        const tokensLeft = await ExerciseSolution.tokensInCustody(Evaluator.getAddress());
        console.log("Tokens left in custody for Evaluator:", tokensLeft.toString());
        expect(tokensLeft).to.equal(0);
    })

    it("Shoud perfom approve tokens (ex4) from the evaluator", async function () {
        const studentAddress = await student.getAddress();
        const exSolutionAddress = await ExerciseSolution.getAddress();

        console.log("Exercise progression (3):", await Evaluator.exerciseProgression(studentAddress, 3));

        await Evaluator.connect(student).ex2_claimedFromContract();
        const balance = await ERC20Claimable.balanceOf(studentAddress);
        console.log("ERC20Claimable balance:", balance);

        console.log("Performing approval...");
        await ERC20Claimable.connect(student).approve(exSolutionAddress, balance);

        const approvalAmount = await ERC20Claimable.connect(student).allowance(studentAddress, exSolutionAddress);
        expect(approvalAmount).to.be.gt(0);

        console.log("Performing ex4_approvedExerciseSolution...");
        await Evaluator.connect(student).ex4_approvedExerciseSolution();
    })

    it("Shoud perfom revoke approval (ex5) from the evaluator", async function () {
        const studentAddress = await student.getAddress();
        const exSolutionAddress = await ExerciseSolution.getAddress();

        console.log("Exercise progression (4):", await Evaluator.exerciseProgression(studentAddress, 4));

        console.log("Performing the approval revoke...");
        await ERC20Claimable.connect(student).approve(exSolutionAddress, 0);

        const approvalAmount = await ERC20Claimable.connect(student).allowance(studentAddress, exSolutionAddress);
        expect(approvalAmount).to.be.equal(0);

        console.log("Performing ex5_revokedExerciseSolution...");
        await Evaluator.connect(student).ex5_revokedExerciseSolution();
    })

    it("Shoud perfom revoke approval (ex5) from the evaluator", async function () {
        const studentAddress = await student.getAddress();
        const exSolutionAddress = await ExerciseSolution.getAddress();

        console.log("Exercise progression (4):", await Evaluator.exerciseProgression(studentAddress, 4));

        console.log("Performing the approval revoke...");
        await ERC20Claimable.connect(student).approve(exSolutionAddress, 0);

        const approvalAmount = await ERC20Claimable.connect(student).allowance(studentAddress, exSolutionAddress);
        expect(approvalAmount).to.be.equal(0);

        console.log("Performing ex5_revokedExerciseSolution...");
        await Evaluator.connect(student).ex5_revokedExerciseSolution();
    })


    it("Shoud perfom depositTokens - transferFrom (ex6) from the evaluator", async function () {
        const studentAddress = await student.getAddress();
        const exSolutionAddress = await ExerciseSolution.getAddress();
        const claimableAddress = await ERC20Claimable.getAddress();

        const amountToDeposit = 100;

        await ERC20Claimable.connect(student).claimTokens();
        console.log(
            "Student balance: ",
            await ERC20Claimable.balanceOf(studentAddress)
        );

        await ERC20Claimable.connect(student).increaseAllowance(exSolutionAddress, 100);
        console.log("Allowance: ", await ERC20Claimable.allowance(studentAddress, exSolutionAddress));

        const balanceBeforeDeposit = await ExerciseSolution.tokensInCustody(exSolutionAddress);
        console.log("Balance before deposit: ", balanceBeforeDeposit);

        await ExerciseSolution.connect(student).depositTokens(amountToDeposit);

        const balanceAfterDeposit = await ExerciseSolution.tokensInCustody(exSolutionAddress);
        console.log("Balance after deposit: ", balanceAfterDeposit);

        // expect(balanceAfterDeposit - balanceBeforeDeposit).to.be.equal(amountToDeposit);

        console.log("Performing ex6_depositTokens...");
        await Evaluator.connect(student).ex6_depositTokens();
    })
})