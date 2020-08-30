import React, {useState} from 'react';
import {Typography, Card, Steps, Upload} from 'antd';
// import api from 'api';
import {InboxOutlined} from '@ant-design/icons';
import {Content} from './elements';

const {Dragger} = Upload;
const {Title} = Typography;
const {Step} = Steps;

const NewDocument = () => {
  const [current, setCurrent] = useState(0);
  const [formDocument, setFormData] = useState({
    name: '',
    file: '',
  });
  // const [theArray, setTheArray] = useState([]);
  // const {name, file} = formDocument;

  // const onChange = (e) =>
  //   setFormData({...formDocument, [e.target.name]: e.target.value});

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   await api.post('/documents/new-document', {
  //     name,
  //     signatures: theArray,
  //     file,
  //   });
  // };

  const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    transformFile: (file) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
        const b64 = reader.result.replace(/^data:.+;base64,/, '');
        setFormData({...formDocument, file: b64});
      };

      reader.readAsDataURL(file);
    },
  };

  // ONSUBMIT

  return (
    <>
      <Title>Crear un documento</Title>
      <Card>
        <Steps
          type="navigation"
          current={current}
          onChange={setCurrent}
          className="site-navigation-steps"
        >
          <Step status="process" title="Step 1" />
          <Step status="wait" title="Step 2" />
          <Step status="wait" title="Step 3" />
        </Steps>
        <Content>
          {current === 0 && (
            <>
              <Dragger accept=".pdf" style={{padding: '40px 0'}} {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click aquí o arrastra para subir tu documento
                </p>
                <p className="ant-upload-hint">Sólo PDF soportado</p>
              </Dragger>
            </>
          )}
        </Content>
      </Card>
    </>
  );
};

export default NewDocument;
