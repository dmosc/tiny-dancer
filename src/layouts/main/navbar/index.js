/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import {PageHeader, Button} from 'antd';
import {useHistory, Link} from 'react-router-dom';
import {useUser} from 'providers/user';
import {PlusOutlined} from '@ant-design/icons';
import {NavbarContainer, Menu} from './elements';
const {Item} = Menu;

const NavBar = () => {
  const {setToken} = useUser();
  const history = useHistory();

  const handleLogout = () => setToken();

  return (
    <NavbarContainer>
      <Menu
        mode="horizontal"
        style={{display: 'flex', justifyContent: 'flex-end'}}
      >
        <PageHeader
          style={{marginRight: 'auto', padding: '0px 20px'}}
          onBack={() => history.goBack()}
          title="Smart Sign"
        />
        <Link to="/new-document">
          <Button type="primary" shape="round" icon={<PlusOutlined />}>
            Nuevo
          </Button>
        </Link>
        <Item key="3" onClick={handleLogout}>
          <span>Salir</span>
        </Item>
      </Menu>
    </NavbarContainer>
  );
};

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default NavBar;
