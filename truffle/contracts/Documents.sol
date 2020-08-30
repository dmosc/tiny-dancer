// SPDX-License-Identifier: MIT
pragma solidity 0.6.0;
pragma experimental ABIEncoderV2;
import '@openzeppelin/contracts/cryptography/ECDSA.sol';

contract Documents {
  using ECDSA for bytes32;

  mapping(bytes32 => Document) public documents;

  struct Document {
    Signer[] signers;
    bytes32 fingerprint;
    bool exists;
  }

  struct Signer {
    bytes32 name;
    address id;
    bytes signature;
  }

  function addDocument(Signer[] memory _signers, bytes32 _fingerprint)
    public
    returns (bool success)
  {
    require(!documents[_fingerprint].exists, 'Document already exists');

    for (uint256 i = 0; i < _signers.length; i++) {
      // address signer = _fingerprint.toEthSignedMessageHash().recover(
      //   _signers[i].signature
      // );

      // require(
      //   _signers[i].id == signer,
      //   'Signature does not corresponds to signer'
      // );

      documents[_fingerprint].signers.push(_signers[i]);
    }

    documents[_fingerprint].fingerprint = _fingerprint;
    documents[_fingerprint].exists = true;

    return true;
  }

  function getDocumentSigners(bytes32 _fingerprint, uint256 index)
    public
    view
    returns (Signer memory)
  {
    require(documents[_fingerprint].exists, 'Document does not exists');
    return documents[_fingerprint].signers[index];
  }
}
