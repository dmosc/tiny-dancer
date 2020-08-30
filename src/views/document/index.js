import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from 'api';
import Web3 from 'web3';
import bs58 from 'bs58';
import {documents} from 'ethereum';
import {Card, Steps, Typography, Button, List, Avatar, message} from 'antd';
import PreviewPDF from './components/preview-pdf';
import {Row} from './elements';

const {Step} = Steps;
const {Text} = Typography;

const Document = () => {
  const params = useParams();
  const [documentData, setDocument] = useState();
  const [current, setCurrent] = useState(0);

  const getBytes32FromIpfsHash = (ipfsListing) => {
    return '0x' + bs58.decode(ipfsListing).slice(2).toString('hex');
  };

  const getData = async () => {
    const {data} = await api.get(`/documents/${params.documentId}`);
    const isTotallySigned = data.signatures.every(({signature}) => !!signature);
    if (isTotallySigned) {
      if (data.transactionHash) setCurrent(3);
      else setCurrent(2);
    } else setCurrent(1);

    setDocument(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitDocument = async (document) => {
    const web3 = new Web3(Web3.givenProvider, null, {});

    const {abi, address} = documents;

    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(abi, address);

    const isTotallySigned = document.signatures.every(
      ({signature}) => !!signature,
    );

    if (isTotallySigned) {
      const signers = document.signatures.map(({user, signature}) => [
        web3.utils.fromAscii(user.firstName).padEnd(66, '0'),
        user.ethAddress,
        signature,
      ]);

      const transactionHash = await contract.methods
        .addDocument(signers, getBytes32FromIpfsHash(document.hash))
        .send({from: accounts[0]});

      await api.post('/documents/submit', {
        transactionHash,
        document: document._id,
      });

      await getData();
    } else {
      message.warning('Todavia hay firmas pendientes');
    }
  };

  return (
    <Row>
      {documentData && (
        <>
          <Card>
            <PreviewPDF src={documentData.url} />
            <Text
              strong
            >{`Documendo presentado por: ${documentData.owner.firstName} ${documentData.owner.lastName}`}</Text>
          </Card>
          <Card>
            <Steps current={current} direction="vertical">
              <Step
                title="IPFS"
                description={
                  <>
                    <Text>
                      El archivo ya se encuentra sobre el protocolo de
                      almacenamiento descentralizado de IPFS
                    </Text>
                    <Button
                      as="a"
                      href={documentData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Descargar
                    </Button>
                  </>
                }
              />
              <Step
                title="Multifirma"
                description={
                  <>
                    <Text>
                      {current < 1
                        ? 'Algunos de los usuarios todavian necesarios todavía no han firmado'
                        : 'Todos los usuarios requeridos han firmado este documento'}
                    </Text>
                    <List
                      size="small"
                      bordered
                      dataSource={documentData.signatures}
                      renderItem={({signature, user}) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={
                                  user.profileImg ||
                                  'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png'
                                }
                              />
                            }
                            title={`${user.firstName} ${user.lastName}`}
                            description={signature || 'No ha firmado'}
                          />
                        </List.Item>
                      )}
                    />
                  </>
                }
              />
              <Step
                title="Registro en Blockchain"
                description={
                  <>
                    <Text>
                      {current < 2
                        ? 'Este documento está esperando ser enviado y registrado en Blockchain por su dueño'
                        : 'Este documento ya se encuentra validado y completo en la red de ethereum'}
                    </Text>
                    <div style={{marginTop: 10}}>
                      <Button
                        as="a"
                        href={`https://ropsten.etherscan.io/tx/${documentData.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{marginRight: 5}}
                        disabled={!documentData.transactionHash}
                      >
                        Ver en Blockchain
                      </Button>
                      <Button
                        onClick={() => submitDocument(documentData)}
                        disabled={current < 2}
                      >
                        Registrar
                      </Button>
                    </div>
                  </>
                }
              />
            </Steps>
          </Card>
        </>
      )}
    </Row>
  );
};

export default Document;
