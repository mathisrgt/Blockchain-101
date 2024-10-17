import { ethers, run } from "hardhat";
import { randomInt } from "crypto";

async function main() {
    // Deploying ERC20 contract
    console.log("Deploying ERC20");
    const ERC20TD = await ethers.getContractFactory("ERC20TD");
    const erc20 = await ERC20TD.deploy("TD-Solidity-101", "TD-SOL-101", 0);

    await erc20.waitForDeployment();

    const erc20Address = (erc20 as any).target;

    console.log("Deploying Exercises");

    const Ex1 = await ethers.getContractFactory("Ex01");
    const Ex2 = await ethers.getContractFactory("Ex02");
    const Ex3 = await ethers.getContractFactory("Ex03");
    const Ex4 = await ethers.getContractFactory("Ex04");
    const Ex5 = await ethers.getContractFactory("Ex05");
    const Ex6 = await ethers.getContractFactory("Ex06");
    const Ex7 = await ethers.getContractFactory("Ex07");
    const Ex8 = await ethers.getContractFactory("Ex08");
    const Ex9 = await ethers.getContractFactory("Ex09");
    const Ex10 = await ethers.getContractFactory("Ex10");
    const Ex11 = await ethers.getContractFactory("Ex11");
    const Ex11b = await ethers.getContractFactory("Ex11b");
    const Ex12 = await ethers.getContractFactory("Ex12");
    const Ex13 = await ethers.getContractFactory("Ex13");
    const Ex14 = await ethers.getContractFactory("Ex14");
    const Ex15 = await ethers.getContractFactory("Ex15");


    const Ex1Contract = await Ex1.deploy(erc20Address);
    const Ex2Contract = await Ex2.deploy(erc20Address);
    const Ex3Contract = await Ex3.deploy(erc20Address);
    const Ex4Contract = await Ex4.deploy(erc20Address);
    const Ex5Contract = await Ex5.deploy(erc20Address);
    const Ex6Contract = await Ex6.deploy(erc20Address);
    const Ex7Contract = await Ex7.deploy(erc20Address);
    const Ex8Contract = await Ex8.deploy(erc20Address);
    const Ex9Contract = await Ex9.deploy(erc20Address);
    const Ex10Contract = await Ex10.deploy(erc20Address);
    const Ex11bContract = await Ex11b.deploy(erc20Address);
    const Ex11Contract = await Ex11.deploy(erc20Address, (Ex11bContract as any).target);
    const Ex12Contract = await Ex12.deploy(erc20Address);
    const Ex13Contract = await Ex13.deploy(erc20Address);
    const Ex14Contract = await Ex14.deploy(erc20Address);
    const Ex15Contract = await Ex15.deploy(erc20Address);

    await Promise.all([
        Ex1Contract.waitForDeployment(),
        Ex2Contract.waitForDeployment(),
        Ex3Contract.waitForDeployment(),
        Ex4Contract.waitForDeployment(),
        Ex5Contract.waitForDeployment(),
        Ex6Contract.waitForDeployment(),
        Ex7Contract.waitForDeployment(),
        Ex8Contract.waitForDeployment(),
        Ex9Contract.waitForDeployment(),
        Ex10Contract.waitForDeployment(),
        Ex11Contract.waitForDeployment(),
        Ex12Contract.waitForDeployment(),
        Ex13Contract.waitForDeployment(),
        Ex14Contract.waitForDeployment(),
        Ex15Contract.waitForDeployment(),
    ]);

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
   
    const setTeachersTx = await erc20.setTeachers([
        (Ex1Contract as any).target,
        (Ex2Contract as any).target,
        (Ex3Contract as any).target,
        (Ex4Contract as any).target,
        (Ex5Contract as any).target,
        (Ex6Contract as any).target,
        (Ex7Contract as any).target,
        (Ex8Contract as any).target,
        (Ex9Contract as any).target,
        (Ex10Contract as any).target,
        (Ex11Contract as any).target,
        (Ex12Contract as any).target,
        (Ex13Contract as any).target,
        (Ex14Contract as any).target,
        (Ex15Contract as any).target
    ]);
    console.log("asking for points");
    
    await setTeachersTx.wait();

    await Ex12Contract.askForPoints(0, randomInt(10000));

    console.log("Setup finished. Random value stores have been declared:");
    console.log(randomValueStore1);
    console.log(randomValueStore2);
    console.log(randomValueStore3);
    console.log(`ERC20 deployed at: ${(erc20 as any).target}`);
    console.log(`Ex1Contract deployed at: ${(Ex1Contract as any).target}`);
    console.log(`Ex2Contract deployed at: ${(Ex2Contract as any).target}`);
    console.log(`Ex3Contract deployed at: ${(Ex3Contract as any).target}`);
    console.log(`Ex4Contract deployed at: ${(Ex4Contract as any).target}`);
    console.log(`Ex5Contract deployed at: ${(Ex5Contract as any).target}`);
    console.log(`Ex6Contract deployed at: ${(Ex6Contract as any).target}`);
    console.log(`Ex7Contract deployed at: ${(Ex7Contract as any).target}`);
    console.log(`Ex8Contract deployed at: ${(Ex8Contract as any).target}`);
    console.log(`Ex9Contract deployed at: ${(Ex9Contract as any).target}`);
    console.log(`Ex10Contract deployed at: ${(Ex10Contract as any).target}`);
    console.log(`Ex11Contract deployed at: ${(Ex11Contract as any).target}`);
    // console.log(`Ex12Contract deployed at: ${Ex12Contract.target}`); -> students needs to find it
    console.log(`Ex13Contract deployed at: ${(Ex13Contract as any).target}`);
    console.log(`Ex14Contract deployed at: ${(Ex14Contract as any).target}`);
    console.log(`Ex15Contract deployed at: ${(Ex15Contract as any).target}`);

    console.log("Setup finished.");
    console.log(`ERC20 deployed at: ${(erc20 as any).target}`);

    // Add verification step
    await verifyContracts([
        { address: erc20Address, constructorArgs: ["TD-Solidity-101", "TD-SOL-101", 0] },
        { address: (Ex1Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex2Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex3Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex4Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex5Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex6Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex7Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex8Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex9Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex10Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex11bContract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex11Contract as any).target, constructorArgs: [erc20Address, (Ex11bContract as any).target] },
        { address: (Ex12Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex13Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex14Contract as any).target, constructorArgs: [erc20Address] },
        { address: (Ex15Contract as any).target, constructorArgs: [erc20Address] },
    ]);
}

// Function to verify all deployed contracts
async function verifyContracts(contracts: { address: string; constructorArgs: any[] }[]) {
    for (const contract of contracts) {
        try {
            console.log(`Verifying contract at ${contract.address}...`);
            await run("verify:verify", {
                address: contract.address,
                constructorArguments: contract.constructorArgs,
                force: true,
            });
            console.log(`Verified contract at ${contract.address}`);
        } catch (error) {
            console.error(`Failed to verify contract at ${contract.address}:`, error);
        }
    }
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
