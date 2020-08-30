import {ethWeb3} from '../';
import artifact from '../../../truffle/build/Certifications.json';

const documentsContract = new ethWeb3.eth.Contract(
  artifact.abi,
  artifact.networks[3].address,
);

export {documentsContract};
