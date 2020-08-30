import React, {useState} from 'react';
import {Typography, Form, Card, Input, Mentions, Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import api from 'api';
const {Title} = Typography;
const {Item} = Form;
const {Option} = Mentions;

const NewDocument = () => {
  const [formDocument, setFormData] = useState({
    name: '',
    file: '',
  });
  const [theArray, setTheArray] = useState([]);
  const {name, file} = formDocument;

  const onChange = (e) =>
    setFormData({...formDocument, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post('/documents/new-document', {
      name,
      signatures: theArray,
      file,
    });
  };

  const onSelect = (option) => {
    setTheArray((oldArray) => [...oldArray, option.id]);
  };

  const onChangeMentions = (value) => {};

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    transformFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const canvas = document.createElement('canvas');
          const img = document.createElement('img');
          img.src = reader.result;
          setFormData({...formDocument, file: reader.result});
          img.onload = () => {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    },
  };

  // ONSUBMIT

  return (
    <>
      <div className="site-layout-content">
        <Title>Crear un documento</Title>
      </div>
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div
            className="form-group"
            style={{display: 'flex', justifyContent: 'space-around'}}
          >
            <Card style={{width: 300}}>
              <Title level={3}>Título del Contrato</Title>
              <Item style={{marginTop: 20}}>
                <Input
                  type="name"
                  placeholder="Título del Contrato"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Item>
            </Card>
            <Card style={{width: 300}}>
              <Title level={3}>Enviar a</Title>
              <Item style={{marginTop: 20}}>
                <Mentions
                  style={{width: '100%'}}
                  onChangeMentions={onChangeMentions}
                  onSelect={onSelect}
                  defaultValue=""
                >
                  <Option value="pamelalozano" id="32322">
                    pamelalozano
                  </Option>
                  <Option value="oscarrdz" id="2132">
                    oscarrdz
                  </Option>
                  <Option value="tioriac" id="27210">
                    tioriac
                  </Option>
                  <Option value="marianamtzc" id="2noxuw">
                    marianamtzc
                  </Option>
                </Mentions>
              </Item>
            </Card>
            <Card style={{width: 300}}>
              <Title level={3}>Subir archivo</Title>
              <Item style={{marginTop: 20}}>
                <Upload {...props}>
                  <Button>
                    <UploadOutlined /> Upload
                  </Button>
                </Upload>
              </Item>
            </Card>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <Button type="primary" htmlType="submit">
              Subir Documento
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDocument;
