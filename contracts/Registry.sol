//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

/**
 @title Registry
 @dev charon registry mapping address to publicKey
 */
contract Registry{

    mapping(address => bytes) public addressToPublicKey;

    function register(address _a, bytes _publicKey){
        require(address(keccak256(publicKey)) == _a, "address should be last 20 of hash of public key");
        addressToPublicKey[_a] = _publicKey;
    }

    function registerLots(address[] _a, bytes[] _publicKey){
        for(uint _i;i< _a.length;i++){
            require(address(keccak256(_publicKey[_i])) == _a[_i], "address should be last 20 of hash of public key");
            addressToPublicKey[_a[_i]] = _publicKey[_i];
        }
    }

    function verifyKey(bytes _publicKey) return(address){
        return address(keccak256(_publicKey));
    }

    function getPublicKey(address _a) return(bytes){
        return addressToPublicKey(_a);
    }
}