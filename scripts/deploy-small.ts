import { ethers } from "hardhat";

async function main() {
  // Deploy AccessControl contract with a default constructor (if any).
  const AccessControlFactory = await ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControlFactory.deploy();
  await accessControl.deployed();

  console.log("AccessControl deployed to:", accessControl.address);

  // If StatefulContract exists and has a constructor, you can deploy similarly here
  // Example (uncomment and adjust if StatefulContract has a no-arg constructor):
  // const StatefulFactory = await ethers.getContractFactory("StatefulContract");
  // const stateful = await StatefulFactory.deploy();
  // await stateful.deployed();
  // console.log("StatefulContract deployed to:", stateful.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
