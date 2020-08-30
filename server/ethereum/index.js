import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import {MNEMONIC, INFURA_PROJECT_ID} from '../config';

const ethProvider = new HDWalletProvider(
  MNEMONIC,
  `'https://ropsten.infura.io/v3/'${INFURA_PROJECT_ID}`,
);

const ethWeb3 = new Web3(ethProvider);

export {ethWeb3};
