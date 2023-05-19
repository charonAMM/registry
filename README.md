# Registry Contract

The Registry Contract allows you to map an address to a public key. It is used for verification and authentication.

## Depolyments

    - chiado = 0xEe09480da21FbC33B107428f8Fc198A57e110724
    - mumbai = 0xBE264C2C0D3F01299DBd385ACAFF266FA6ED4845
    - sepolia = 0x4527597a4995f18ab2CA48C180DeEFF70CeE661D
    - gnosis = 0xb019Bf1c1F6F67b4444EC06446B88978B7D66DAC
    - polygon = 0xF9ff236dd863ec2C263E73E531989Ed39527d64D
    - optimism = 0xe2518473f4429202827a8269706301034fD887Ec

Note that the main contract is on gnosis-chain, so if you use one, use that one. 

## Setting up and Testing

requirements/dependencies
- node
- npm
```
git clone https://www.github.com/charonAMM/registry
cd registry
```

```
npm install
npx hardhat hasher
npx hardhat test
```

## Functions
### register
The `register` function allows you to register a public key to your own address. It takes one parameter`publicKey`, the public key to register.

### getPublicKey
The `getPublicKey` function allows you to get the public key of an address. It takes one parameter: `_a`, the address to get the pubic key from. The function returns the public key that corresponds to the given address.

## Events
### Registered
The `Registered` event is emitted when a public key is registered to an address. It has two indexed parameters: `msg.sender`, the address that was registered, and `_publicKey`, the public key that was registered.

