// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string hash;
        uint timestamp;
    }

    mapping(address => File[]) private files;

    function storeFile(string memory _hash) public {
        files[msg.sender].push(File(_hash, block.timestamp));
    }

    function getFile(address user, uint index) public view returns (string memory, uint) {
        File memory f = files[user][index];
        return (f.hash, f.timestamp);
    }
}
