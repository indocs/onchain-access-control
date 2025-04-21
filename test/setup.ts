// Optional test setup helpers
import { ethers } from 'hardhat';
export async function getDeployer(): Promise<string> {
  const [deployer] = await ethers.getSigners();
  return await deployer.getAddress();
}
