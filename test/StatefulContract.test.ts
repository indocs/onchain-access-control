// SPDX-License-Identifier: MIT
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';

describe('StatefulContract with AccessControl', function () {
  let access: Contract;
  let stateful: Contract;
  let deployerAddr: string;
  let userAddr: string;

  beforeEach(async function () {
    const [deployer, user] = await ethers.getSigners();
    deployerAddr = await deployer.getAddress();
    userAddr = await user.getAddress();

    const AccessFactory = await ethers.getContractFactory('AccessControl');
    access = await AccessFactory.deploy();
    await access.deployed();

    // Deploy StatefulContract with AccessControl address
    const StatefulFactory = await ethers.getContractFactory('StatefulContract');
    stateful = await StatefulFactory.deploy(access.address);
    await stateful.deployed();
  });

  it('rejects setValue when caller lacks role', async function () {
    await expect(stateful.connect((await ethers.getSigners())[1]).setValue(42)).to.be.reverted;
  });

  it('allows setValue after granting role', async function () {
    const role = ethers.utils.id('STATE_UPDATE_ROLE');
    // grant via AccessControl by admin (deployer is admin by default)
    await access.grantRole(role, deployerAddr);
    // Now attempt to set value with deployer
    await expect(stateful.setValue(123)).to.not.be.reverted;
  });
});
