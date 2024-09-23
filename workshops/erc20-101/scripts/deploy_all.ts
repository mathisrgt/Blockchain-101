import { ethers } from "hardhat";
import { randomInt } from "crypto";

async function main() {
    // Deploying ERC20 contract
    console.log("Deploying ERC20");
    const ERC20TD = await ethers.getContractFactory("ERC20TD");
    const erc20 = await ERC20TD.deploy("TD-Solidity-101", "TD-SOL-101", 0);

    await erc20.waitForDeployment();

    console.log("Deploying Exercises");
    
    const Ex1 = await ethers.getContractFactory("ex01");
    const Ex2 = await ethers.getContractFactory("ex02");
    const Ex3 = await ethers.getContractFactory("ex03");
    const Ex4 = await ethers.getContractFactory("ex04");
    const Ex5 = await ethers.getContractFactory("ex05");
    const Ex6 = await ethers.getContractFactory("ex06");
    const Ex7 = await ethers.getContractFactory("ex07");
    const Ex8 = await ethers.getContractFactory("ex08");
    const Ex9 = await ethers.getContractFactory("ex09");
    const Ex10 = await ethers.getContractFactory("ex10");
    const Ex11 = await ethers.getContractFactory("ex11");
    const Ex11b = await ethers.getContractFactory("ex11b");
    const Ex12 = await ethers.getContractFactory("ex12");
    const Ex14 = await ethers.getContractFactory("ex14");
    const Ex15 = await ethers.getContractFactory("ex15");

    const Ex1Contract = await Ex1.deploy((erc20 as any).target);
    const Ex2Contract = await Ex2.deploy((erc20 as any).target);
    const Ex3Contract = await Ex3.deploy((erc20 as any).target);
    const Ex4Contract = await Ex4.deploy((erc20 as any).target);
    const Ex5Contract = await Ex5.deploy((erc20 as any).target);
    const Ex6Contract = await Ex6.deploy((erc20 as any).target);
    const Ex7Contract = await Ex7.deploy((erc20 as any).target);
    const Ex8Contract = await Ex8.deploy((erc20 as any).target);
    const Ex9Contract = await Ex9.deploy((erc20 as any).target);
    const Ex10Contract = await Ex10.deploy((erc20 as any).target);
    const Ex11bContract = await Ex11b.deploy((erc20 as any).target);
    const Ex11Contract = await Ex11.deploy((erc20 as any).target, Ex11bContract.target);
    const Ex12Contract = await Ex12.deploy((erc20 as any).target);
    const Ex14Contract = await Ex14.deploy((erc20 as any).target);
    const Ex15Contract = await Ex15.deploy((erc20 as any).target);

    // console.log(`ERC20 deployed at: ${(erc20 as any).target}`);
    // console.log(`Ex1Contract deployed at: ${Ex1Contract.target}`);
    // console.log(`Ex2Contract deployed at: ${Ex2Contract.target}`);
    // console.log(`Ex3Contract deployed at: ${Ex3Contract.target}`);
    // console.log(`Ex4Contract deployed at: ${Ex4Contract.target}`);
    // console.log(`Ex5Contract deployed at: ${Ex5Contract.target}`);
    // console.log(`Ex6Contract deployed at: ${Ex6Contract.target}`);
    // console.log(`Ex7Contract deployed at: ${Ex7Contract.target}`);
    // console.log(`Ex8Contract deployed at: ${Ex8Contract.target}`);
    // console.log(`Ex9Contract deployed at: ${Ex9Contract.target}`);
    // console.log(`Ex10Contract deployed at: ${Ex10Contract.target}`);
    // console.log(`Ex11Contract deployed at: ${Ex11Contract.target}`);
    // console.log(`Ex11bContract deployed at: ${Ex11bContract.target}`);
    // console.log(`Ex12Contract deployed at: ${Ex12Contract.target}`);
    // console.log(`Ex14Contract deployed at: ${Ex14Contract.target}`);
    // console.log(`Ex15Contract deployed at: ${Ex15Contract.target}`);

    // Setting random value stores
    console.log("Setting random value stores");

    let randomValueStore1: number[] = [];
    let randomValueStore2: number[] = [];
    let randomValueStore3: number[] = [];

    for (let i = 0; i < 20; i++) {
        randomValueStore1.push(randomInt(10000));
        randomValueStore2.push(randomInt(10000));
        randomValueStore3.push(randomInt(10000));
    }

    await Ex6Contract.setRandomValueStore(randomValueStore1);
    await Ex7Contract.setRandomValueStore(randomValueStore2);
    await Ex10Contract.setRandomValueStore(randomValueStore3);

    console.log("Setting permissions");

    await erc20.setTeachers([
        Ex1Contract.target,
        Ex2Contract.target,
        Ex3Contract.target,
        Ex4Contract.target,
        Ex5Contract.target,
        Ex6Contract.target,
        Ex7Contract.target,
        Ex8Contract.target,
        Ex9Contract.target,
        Ex10Contract.target,
        Ex11Contract.target,
        Ex12Contract.target,
        Ex14Contract.target,
        Ex15Contract.target
    ]);

    await Ex12Contract.askForPoints(0, randomInt(10000));

    console.log("Setup finished. Random value stores have been declared:");
    console.log(randomValueStore1);
    console.log(randomValueStore2);
    console.log(randomValueStore3);
    console.log(`ERC20 deployed at: ${(erc20 as any).target}`);
    console.log(`Ex1Contract deployed at: ${Ex1Contract.target}`);
    console.log(`Ex2Contract deployed at: ${Ex2Contract.target}`);
    console.log(`Ex3Contract deployed at: ${Ex3Contract.target}`);
    console.log(`Ex4Contract deployed at: ${Ex4Contract.target}`);
    console.log(`Ex5Contract deployed at: ${Ex5Contract.target}`);
    console.log(`Ex6Contract deployed at: ${Ex6Contract.target}`);
    console.log(`Ex7Contract deployed at: ${Ex7Contract.target}`);
    console.log(`Ex8Contract deployed at: ${Ex8Contract.target}`);
    console.log(`Ex9Contract deployed at: ${Ex9Contract.target}`);
    console.log(`Ex10Contract deployed at: ${Ex10Contract.target}`);
    console.log(`Ex11Contract deployed at: ${Ex11Contract.target}`);
    console.log(`Ex14Contract deployed at: ${Ex14Contract.target}`);
    console.log(`Ex15Contract deployed at: ${Ex15Contract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
