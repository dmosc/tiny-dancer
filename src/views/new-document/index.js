import React, {useState} from 'react';
import {
  Typography,
  Card,
  Steps,
  Upload,
  Input,
  Button,
  Select,
  Spin,
} from 'antd';
import api from 'api';
import {InboxOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {Content} from './elements';

const {Dragger} = Upload;
const {Title} = Typography;
const {Step} = Steps;
const {Option} = Select;

const NewDocument = () => {
  const [current, setCurrent] = useState(0);
  const [formDocument, setFormData] = useState({
    name: '',
    file: '',
  });
  const {push} = useHistory();
  const [invited, setInvited] = useState([]);
  const [fetching, setFetching] = useState([]);
  const [options, setOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    const {name, file} = formDocument;
    const {data} = await api.post('/documents/new-document', {
      name,
      signatures: invited.map(({value}) => value),
      file,
    });
    setSubmitting(false);
    push(`/documents/${data._id}`);
  };

  const fetchUser = async (value) => {
    setFetching(true);

    const {data} = await api.get(`/users?search=${value}`);

    setOptions(
      data.map(({firstName, lastName, _id}) => ({
        value: _id,
        text: `${firstName} ${lastName}`,
      })),
    );
    setFetching(false);
  };

  const handleChange = (value) => {
    setInvited(value);
    setFetching(false);
    setOptions([]);
  };

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
        setCurrent(1);
      };

      reader.readAsDataURL(file);
    },
  };

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
          <Step status={current === 0 ? 'process' : 'finish'} title="Step 1" />
          <Step
            status={current === 1 ? 'process' : current > 1 ? 'finish' : 'wait'}
            title="Step 2"
          />
          <Step
            status={current === 2 ? 'process' : current > 2 ? 'finish' : 'wait'}
            title="Step 3"
          />
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
          {current === 1 && (
            <>
              <Title level={3}>Título del Contrato</Title>
              <Input
                type="name"
                placeholder="Título del Contrato"
                name="name"
                value={formDocument.name}
                onChange={({target: {value}}) =>
                  setFormData({...formDocument, name: value})
                }
                required
              />
              <Button
                style={{marginLeft: 'auto', display: 'block', marginTop: 20}}
                onClick={() => setCurrent(2)}
                disabled={!formDocument.name}
                type="primary"
              >
                Siguiente
              </Button>
            </>
          )}
          {current === 2 && (
            <>
              <Title level={3}>Invita a quienes van a firmar</Title>
              <Select
                mode="multiple"
                labelInValue
                value={invited}
                placeholder="Select users"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={fetchUser}
                onChange={handleChange}
                style={{width: '100%'}}
              >
                {options.map((d) => (
                  <Option key={d.value}>{d.text}</Option>
                ))}
              </Select>
              <Button
                style={{marginLeft: 'auto', display: 'block', marginTop: 20}}
                onClick={submit}
                disabled={invited.length === 0}
                loading={submitting}
                type="primary"
              >
                Finalizar
              </Button>
            </>
          )}
        </Content>
      </Card>
    </>
  );
};

export default NewDocument;
