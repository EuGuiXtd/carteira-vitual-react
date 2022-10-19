import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Header() {
  const { user, ask } = useContext(AppContext);

  return (
    <>
      <div data-testid="email-field">{user.email}</div>
      <div data-testid="total-field">{ask}</div>
      <div data-testid="header-currency-field">BRL</div>
    </>
  );
}

export default Header;
