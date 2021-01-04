import { Button } from 'antd';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/auth.context';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
  align-items: center;
  height: 100%;
`;

const NavButton = styled(Button)`
  color: white;
  &:hover {
    color: #8acee3;
  }
`;

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const onLogout = useCallback(() => {
    authContext.logout();
  }, [authContext]);

  return (
    <NavbarContainer>
      <NavButton type="text" onClick={onLogout}>
        Logout
      </NavButton>
    </NavbarContainer>
  );
};

export default Navbar;
