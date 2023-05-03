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
The `register` function allows you to register a public key to your own address. It takes one parameter`publicKey`, the public key to register.

### getPublicKey
The `getPublicKey` function allows you to get the public key of an address. It takes one parameter: `_a`, the address to get the pubic key from. The function returns the public key that corresponds to the given address.

## Events
### Registered
The `Registered` event is emitted when a public key is registered to an address. It has two indexed parameters: `msg.sender`, the address that was registered, and `_publicKey`, the public key that was registered.

