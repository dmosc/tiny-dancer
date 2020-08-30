import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from 'api';
import {Card, Steps, Typography, Button, List, Avatar} from 'antd';
import PreviewPDF from './components/preview-pdf';
import {Row} from './elements';

const {Step} = Steps;
const {Text} = Typography;

const Document = () => {
  const params = useParams();
  const [documentData, setDocument] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const {data} = await api.get(`/documents/${params.documentId}`);
      const isTotallySigned = data.signatures.every(
        ({signature}) => !!signature,
      );
      if (isTotallySigned) {
        if (data.transactionHash) setCurrent(2);
        else setCurrent(1);
      } else setCurrent(0);

      setDocument(data);
    };

    getData();
  }, []);

  return (
    <Row>
      {documentData && (
        <>
          <Card>
            <PreviewPDF src={documentData.url} />
          </Card>
          <Card>
            <Steps current={current} direction="vertical">
              <Step
                title="PFS"
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
                    {documentData.transactionHash && (
                      <Button
                        as="a"
                        href={`https://ropsten.etherscan.io/tx/${documentData.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Descargar
                      </Button>
                    )}
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
