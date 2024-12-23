import { ethers, run } from "hardhat";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploying ExerciseSolution
  console.log("Deploying ExerciseSolution");
  const ExerciseSolution = await ethers.getContractFactory("ExerciseSolution");
  const exerciseSolution = await ExerciseSolution.deploy("0x5ADeBf74a71360Be295534274041ceeD6A39977a");

  await exerciseSolution.waitForDeployment();

  console.log(`ExerciseSolution deployed at: ${(exerciseSolution as any).target}`);

  await delay(5000);

  // Verify ExerciseSolution contract
  try {
    console.log("Verifying ExerciseSolution contract...");
    await run("verify:verify", {
      address: await exerciseSolution.getAddress(),
      constructorArguments: ["0x5ADeBf74a71360Be295534274041ceeD6A39977a"],
    });
    console.log("ExerciseSolution contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
