import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Layout as Layer} from 'antd';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Footer from './footer';

const MainLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layer style={{minHeight: '100vh', maxHeight: '100vh'}}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layer>
        <Navbar />
        {children}
        <Footer />
      </Layer>
    </Layer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MainLayout;
