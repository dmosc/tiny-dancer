import React, {useEffect, useState} from 'react';
import api from 'api';
import shortid from 'shortid';
import Web3 from 'web3';
import {Link} from 'react-router-dom';
import {Row, Col, Card, Button, Tag, message} from 'antd';
import Text from 'antd/es/typography/Text';

const Pending = () => {
  const [documents, setDocuments] = useState([]);

  const getData = async () => {
    const {data, error} = await api.get('/documents?signed=false');

    if (error) {
      return;
    }

    setDocuments(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const sign = async (document, hash) => {
    const web3 = new Web3(Web3.givenProvider, null, {});

    const accounts = await web3.eth.requestAccounts();
    const signature = await web3.eth.personal.sign(hash, accounts[0], '');

    try {
      await api.post('/documents/sign', {
        document,
        signature,
      });

      getData();
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
      {documents.map((document) => {
        return (
          <Col className="gutter-row" span={6} key={document.id}>
            <Card
              style={{marginBottom: 10}}
              title={document.name}
              bordered={false}
              actions={[
                <Link
                  to={`/documents/${document._id}`}
                  key={shortid.generate()}
                >
                  <Button key={Math.random()}>Dar seguimiento</Button>
                </Link>,
                <Button
                  onClick={() => sign(document._id, document.hash)}
                  key={Math.random()}
                >
                  Firmar
                </Button>,
              ]}
            >
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Text style={{marginBottom: 5}}>Pendientes por firmar:</Text>
                <div>
                  {document.signatures.map(
                    ({id, user, signature}) =>
                      !signature && (
                        <Tag color="red" style={{marginRight: 5}} key={id}>
                          {user.username}
                        </Tag>
                      ),
                  )}
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Pending;
