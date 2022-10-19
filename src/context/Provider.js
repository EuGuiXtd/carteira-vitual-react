/* eslint react/prop-types: 0 */
/* eslint react/jsx-no-constructed-context-values: 0 */

import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';

async function getCurrencies() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  return Object.keys(data);
}

function Provider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    getCurrencies().then((d) => {
      console.log('Leu', d);
      setCurrencies(d);
    });
  }, []);

  const contextValue = {
    user,
    setUser,
    currencies,
    setCurrencies,
  };

  function getState() {
    return {
      user,
      wallet: { currencies },
    };
  }

  const store = { getState };

  if (window.Cypress) {
    window.store = store;
  }

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;
