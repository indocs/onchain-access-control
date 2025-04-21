// Deploy script using Hardhat Runtime Environment
import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying from:', deployer.address);

  // Deploy AccessControl
  const AccessControlFactory = await ethers.getContractFactory('AccessControl');
  const access = await AccessControlFactory.deploy();
  await access.deployed();
  console.log('AccessControl deployed at', access.address);

  // Deploy StatefulContract with address of AccessControl
  const StatefulFactory = await ethers.getContractFactory('StatefulContract');
  const stateful = await StatefulFactory.deploy(access.address);
  await stateful.deployed();
  console.log('StatefulContract deployed at', stateful.address);

  // Example: grant STATE_UPDATE_ROLE to deployer for quick start
  // Note: we call via access contract's function; the deployer must be admin for that role
  // Here we simply log and rely on tests or subsequent orchestration to configure roles
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
