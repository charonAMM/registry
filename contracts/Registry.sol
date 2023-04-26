//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;
import "hardhat/console.sol";

/**
 @title Registry
 @dev charon registry mapping address to publicKey
 */
contract Registry {
    // Events
    event Registered(address indexed _a, bytes _publicKey);
    event RegisteredLots(address[] _a, bytes[] _publicKey);

    // Storage
    mapping(address => bytes) public addressToPublicKey;

    // Functions
    /**
     * @dev register a public key to an address
     * @param _a address to register
     * @param _publicKey public key to register
     */
    function register(address _a, bytes memory _publicKey) external {
        console.log("address function", address(uint160(uint256(keccak256(_publicKey)))));
        require(
            address(uint160(uint256(keccak256(_publicKey)))) == _a,
            "address should be last 20 of hash of public key"
        );
        addressToPublicKey[_a] = _publicKey;
        emit Registered(_a, _publicKey);
    }

    /**
     * @dev register multiple public keys to multiple addresses
     * @param _a addresses to register
     * @param _publicKey public keys to register
     */
    function registerLots(
        address[] memory _a,
        bytes[] memory _publicKey
    ) external {
        for (uint _i = 0; _i < _a.length; _i++) {
            require(
                address(uint160(uint256(keccak256(_publicKey[_i])))) == _a[_i],
                "address should be last 20 of hash of public key"
            );
            addressToPublicKey[_a[_i]] = _publicKey[_i];
        }
        emit RegisteredLots(_a, _publicKey);
    }

    /**
     * @dev verify a public key to an address
     * @param _publicKey public key to verify
     */
    function verifyKey(
        bytes memory _publicKey
    ) external pure returns (address) {
        bytes32 hashedAddress = keccak256(_publicKey);
        return address(uint160(uint256(hashedAddress)));
    }

    /**
     * @dev get public key of an address
     * @param _a address to get public key of
     */
    function getPublicKey(address _a) external view returns (bytes memory) {
        bytes memory _publicKey = addressToPublicKey[_a];
        return _publicKey;
    }
}
