import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Layout as Layer} from 'antd';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Footer from './footer';
import {Content} from './elements';

const MainLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layer style={{minHeight: '100vh', maxHeight: '100vh'}}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layer>
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </Layer>
    </Layer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
