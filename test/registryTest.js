const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Registry", function () {
  let registry;
  let address, address2, address3;
  let publicKey, publicKey2, publicKey3;

  beforeEach(async function () {
    const Registry = await ethers.getContractFactory("Registry");
    registry = await Registry.deploy();
    await registry.deployed();

    let wallet = ethers.Wallet.createRandom();
    address = wallet.address;
    publicKey = wallet.publicKey;

    wallet = ethers.Wallet.createRandom();
    address2 = wallet.address;
    publicKey2 = wallet.publicKey;

    wallet = ethers.Wallet.createRandom();
    address3 = wallet.address;
    publicKey3 = wallet.publicKey;
  });

  describe("Register", function () {
    it.only("Registers a public key for a single Ethereum address", async function () {
      await registry.register(address, publicKey);
      expect(await registry.getPublicKey(address)).to.equal(publicKey);
    });

    it("Fails to register a public key for a single Ethereum address", async function () {
      await expect(registry.register(address, publicKey2)).to.be.revertedWith(
        "address should be last 20 of hash of public key"
      );
    });

    it("Registers multiple public keys for multiple Ethereum addresses", async function () {
      await registry.registerLots([address, address2], [publicKey, publicKey2]);
      expect(await registry.getPublicKey(address)).to.equal(publicKey);
      expect(await registry.getPublicKey(address2)).to.equal(publicKey2);
    });

    it("Fails to register multiple public keys for multiple Ethereum addresses", async function () {
      await expect(
        registry.registerLots([address, address2], [publicKey, publicKey3])
      ).to.be.revertedWith("address should be last 20 of hash of public key");
    });
  });

  describe("Verify", function () {
    it("Verifies an Ethereum address", async function () {
      await registry.register(address, publicKey);
      expect(await registry.verifyKey(publicKey)).to.equal(
        ethers.utils.getAddress(address)
      );
    });
  });
});