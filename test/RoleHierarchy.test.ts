import { expect } from "chai";
import { ethers } from "hardhat";

describe("AccessControl role hierarchy", function () {
  it("admin can grant and revoke roles, non-admin cannot grant", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const AccessControl = await ethers.getContractFactory("AccessControl");
    const ac = await AccessControl.deploy();
    await ac.deployed();

    // DEFAULT_ADMIN_ROLE is granted to the deployer by OZ's AccessControl
    const DEFAULT_ADMIN_ROLE = await ac.DEFAULT_ADMIN_ROLE();

    // owner should have admin role for DEFAULT_ADMIN_ROLE
    expect(await ac.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.equal(true);

    // addr1 does not have admin rights, should not be able to grant a role to addr2
    await expect(
      ac.connect(addr1).grantRole(DEFAULT_ADMIN_ROLE, addr2.address)
    ).to.be.reverted;

    // owner grants addr1 the admin role for addr2 (demonstrating proper grant path)
    await ac.grantRole(DEFAULT_ADMIN_ROLE, addr1.address);
    expect(await ac.hasRole(DEFAULT_ADMIN_ROLE, addr1.address)).to.equal(true);

    // addr1 (now admin) can grant DEFAULT_ADMIN_ROLE to addr2
    await ac.connect(addr1).grantRole(DEFAULT_ADMIN_ROLE, addr2.address);
    expect(await ac.hasRole(DEFAULT_ADMIN_ROLE, addr2.address)).to.equal(true);
  });
});
