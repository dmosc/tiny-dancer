const documents = {
  abi: [
    {
      name: 'documents',
      type: 'function',
      inputs: [{name: '', type: 'bytes32', internalType: 'bytes32'}],
      outputs: [
        {name: 'fingerprint', type: 'bytes32', internalType: 'bytes32'},
        {name: 'exists', type: 'bool', internalType: 'bool'},
      ],
      constant: true,
      stateMutability: 'view',
    },
    {
      name: 'addDocument',
      type: 'function',
      inputs: [
        {
          name: '_signers',
          type: 'tuple[]',
          components: [
            {name: 'name', type: 'bytes32', internalType: 'bytes32'},
            {name: 'id', type: 'address', internalType: 'address'},
            {name: 'signature', type: 'bytes', internalType: 'bytes'},
          ],
          internalType: 'struct Documents.Signer[]',
        },
        {name: '_fingerprint', type: 'bytes32', internalType: 'bytes32'},
      ],
      outputs: [{name: 'success', type: 'bool', internalType: 'bool'}],
      stateMutability: 'nonpayable',
    },
    {
      name: 'getDocumentSigners',
      type: 'function',
      inputs: [
        {name: '_fingerprint', type: 'bytes32', internalType: 'bytes32'},
        {name: 'index', type: 'uint256', internalType: 'uint256'},
      ],
      outputs: [
        {
          name: '',
          type: 'tuple',
          components: [
            {name: 'name', type: 'bytes32', internalType: 'bytes32'},
            {name: 'id', type: 'address', internalType: 'address'},
            {name: 'signature', type: 'bytes', internalType: 'bytes'},
          ],
          internalType: 'struct Documents.Signer',
        },
      ],
      constant: true,
      stateMutability: 'view',
    },
  ],
  address: '0xdA9443e36Fb63C6e9eC6F537eBf2a3315391BDfD',
};

export {documents};
