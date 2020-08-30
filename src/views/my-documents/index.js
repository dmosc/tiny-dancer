import React, {useEffect, useState} from 'react';
import api from 'api';
import shortid from 'shortid';
import {Link} from 'react-router-dom';
import {Row, Col, Card, Tag} from 'antd';
import Text from 'antd/es/typography/Text';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      const {data, error} = await api.get('/documents');

      if (error) {
        return;
      }

      setDocuments(data);
    })();
  }, []);

  return (
    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
      {documents.map((document) => {
        return (
          <Col className="gutter-row" span={6} key={document._id}>
            <Card
              style={{marginBottom: 10}}
              title={document.name}
              bordered={false}
              actions={[
                <Link
                  to={`/documents/${document._id}`}
                  key={shortid.generate()}
                >
                  Dar seguimiento
                </Link>,
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

export default MyDocuments;
