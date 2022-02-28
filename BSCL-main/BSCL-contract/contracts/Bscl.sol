//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract assets {
  mapping (string => string) bscl_hash;

  function add(string memory _cid) public {
    bscl_hash[_cid] = _cid;
  }

  function get(string memory _cid) view public returns (string memory) {
    return bscl_hash[_cid];
  }
}
