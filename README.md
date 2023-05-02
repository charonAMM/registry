# Registry Contract

The Registry Contract allows you to map an address to a public key. It is used for verification and authentication.

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
The `register` function allows you to register a public key to an Ethereum address. It takes two parameters: `_a`, the address to register, and `publicKey`, the public key to register. The function ensures that the address is equal to the last 20 bytes of the hash of the public key before registering it.

### registerLots
The `registerLots`function allows you to register multiple public keys to multiple Ethereum addresses. It takes two parameters: `_a`, an array of addresses to register, and `publicKey`, an array of public keys to register.

### verifyKey
The `verifyKey` function allows you to verify a public key. It takes one parameter: `publicKey`, the public key to verify. The function returns the address that corresponds to the last 20 bytes of the hash of the public key.

### getPublicKey
The `getPublicKey` function allows you to get the public key of an Ethereum address. It takes one parameter: `_a`, the address to get the pubic key from. The function return sthe public key that corresponds to the given address.

## Events
### Registered
The `Registered` event is emitted when a public key is registered to an Ethereum address. It has two indexed parameters: `_a`, the address that was registered, and `_publicKey`, the public key that was registered.

### RegisteredLots
The `RegisteredLots` event is emitted when multiple public keys are registered to multiple Ethereum address. It has two indexed parameters: `_a`, the addresses that were registered, and `_publicKey`, the public keys that was registered.
