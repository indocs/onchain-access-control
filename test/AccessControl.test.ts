// SPDX-License-Identifier: MIT
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';

describe('AccessControl basic operations', function () {
  let Access: any;
  let access: any;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const AccessFactory = await ethers.getContractFactory('AccessControl');
    Access = await AccessFactory.deploy();
    await Access.deployed();
    access = Access;
  });

  it('should grant and check default admin role on deployment', async function () {
    const [deployer] = await ethers.getSigners();
    const has = await access.hasRole(await access.DEFAULT_ADMIN_ROLE(), await deployer.getAddress());
    expect(has).to.equal(true);
  });

  it('non-admin cannot grant a role', async function () {
    const role = ethers.utils.id('SAMPLE_ROLE');
    await expect(access.connect(addr1).grantRole(role, await addr1.getAddress())).to.be.reverted;
  });
});
