import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('AdminTools', function () {
  it('admin can set secret and non-admin is blocked', async function () {
    const [admin, nonAdmin] = await ethers.getSigners();

    const AdminTools = await ethers.getContractFactory('AdminTools');
    const adminTools = await AdminTools.deploy();
    await adminTools.deployed();

    // Admin should be able to set secret
    await adminTools.connect(admin).setSecret('top-secret');
    expect(await adminTools.getSecret()).to.equal('top-secret');

    // Non-admin should be blocked from setting secret
    await expect(adminTools.connect(nonAdmin).setSecret('hacker')).to.be.reverted;
  });
});
