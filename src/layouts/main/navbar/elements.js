import styled from 'styled-components';
import {Layout, Menu as CommonMenu} from 'antd';

const {Header} = Layout;

const NavbarContainer = styled(Header)`
  background: none !important;
  padding: 0px !important;
`;

const Menu = styled(CommonMenu)`
  align-items: center;
  height: fit-content;
  display: flex;
`;

export {NavbarContainer, Menu};
