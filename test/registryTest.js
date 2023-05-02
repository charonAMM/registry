const { expect, assert } = require("chai");
const { ethers, config } = require("hardhat");
const HASH = require("../build/Hasher.json");
const { Keypair } = require("../scripts/keypair");
const { toFixedHex, poseidonHash } = require("../src/utils");
const { buildPoseidon } = require("circomlibjs");

let builtPoseidon, owner, addr1, addr2, registry, hasher;
let privKeys = [];
let publicKeys = [];

function poseidon(inputs) {
  let val = builtPoseidon(inputs);
  return builtPoseidon.F.toString(val);
}

describe("Registry", function () {
  before(async function () {
    builtPoseidon = await buildPoseidon();
    const Hasher = await ethers.getContractFactory(HASH.abi, HASH.bytecode);
    hasher = await Hasher.deploy();
    await hasher.deployed();
    [owner, addr1, addr2] = await ethers.getSigners();
    // save signers private and public keys
    for (let i = 0; i < 3; i++) {
      const accounts = config.networks.hardhat.accounts;
      const wallet = ethers.Wallet.fromMnemonic(
        accounts.mnemonic,
        accounts.path + `/${i}`
      );
      privKeys[i] = wallet.privateKey;
      const myKeypair = new Keypair({
        privkey: wallet.privateKey,
        myHashFunc: poseidon,
      });
      publicKeys[i] = await myKeypair.address();
    }
  });
  
  beforeEach(async function () {
    const Registry = await ethers.getContractFactory("Registry");
    registry = await Registry.deploy();
    await registry.deployed();
  });

  describe("Register", function () {
    it("generates same poseidon hash", async function () {
      const res = await hasher["poseidon(bytes32[2])"]([
        toFixedHex(1, 32),
        toFixedHex(1, 32),
      ]);
      const res2 = await poseidonHash([toFixedHex(1, 32), toFixedHex(1, 32)]);
      assert(res - res2 == 0, "should be the same hash");
    });
    it("Registers a public key for a single Ethereum address", async function () {
      await registry.register(publicKeys[0]);
      expect(await registry.getPublicKey(owner.address)).to.equal(
        publicKeys[0]
      );
    });
    it("Gets the public key for a registered Ethereum address", async function () {
      await registry.register(publicKeys[0]);
      expect(await registry.getPublicKey(owner.address)).to.equal(
        publicKeys[0]
      );
    });
    it("Emits an event when a public key is registered", async function () {
      await expect(registry.register(publicKeys[0]))
        .to.emit(registry, "Registered")
        .withArgs(owner.address, publicKeys[0]);
    });
    it("Tests the event data is correct", async function () {
      const tx = await registry.register(publicKeys[0]);
      const receipt = await tx.wait();
      const event = receipt.events[0];
      expect(event.args[0]).to.equal(owner.address);
      expect(event.args[1]).to.equal(publicKeys[0]);
    });
  });
});
