import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {
  AppstoreOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {breakpoints} from 'theme/media';
import {Menu, Sider} from './elements';

const {Item} = Menu;

const Sidebar = ({history, collapsed, onCollapse}) => {
  const [isLg, toggleLg] = useState(window.innerWidth > breakpoints.lg);

  const updateWidth = () => {
    toggleLg(window.innerWidth > breakpoints.lg);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={isLg ? '80' : '0'}
      theme="dark"
      collapsed={collapsed}
      collapsible
      onCollapse={onCollapse}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={history.location.pathname.toLowerCase()}
        selectedKeys={history.location.pathname.toLowerCase()}
        mode="inline"
      >
        <Item icon={<AppstoreOutlined />} key="my-documents">
          <Link to="/my-documents">Mis documentos</Link>
        </Item>
        <Item icon={<InfoCircleOutlined />} key="pending">
          <Link to="/pending">Pendientes</Link>
        </Item>
        <Item icon={<EditOutlined />} key="signed">
          <Link to="/signed">Firmados</Link>
        </Item>
      </Menu>
    </Sider>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

export default withRouter(Sidebar);
