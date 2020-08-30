import React, {useEffect, useState} from 'react';
import api from '../../api';
import {Row, Col, Card, Tag} from 'antd';
import Text from 'antd/es/typography/Text';

const Signed = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      const {data, error} = await api.get('/documents?signed=true');

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
          <Col className="gutter-row" span={6} key={document.id}>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              <Card title={document.name} bordered={false}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Text style={{marginBottom: 5}}>Pendientes por firmar:</Text>
                  <div>
                    {document.signatures.map(({id, user}) => (
                      <Tag color="red" style={{marginRight: 5}} key={id}>
                        {user.username}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Card>
            </a>
          </Col>
        );
      })}
    </Row>
  );
};

export default Signed;
