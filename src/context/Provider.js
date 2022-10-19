import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

async function getCurrencies() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  return data;
}

function Provider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const [ask, setAsk] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getCurrencies().then((d) => {
      setCurrencies(Object.keys(d));
    });
  }, []);

  const addExpenses = useCallback(async (
    { value, description, currency, method, tag },
  ) => {
    const newExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await getCurrencies(),
    };
    const newExpenses = expenses;
    newExpenses.push(newExpense);
    setExpenses(newExpenses);
    let total = 0;
    newExpenses.forEach((e) => {
      const taxa = newExpense.exchangeRates[e.currency].ask;
      console.log(taxa);
      console.log(Number(e.value) * Number(taxa));
      total += Number(e.value) * Number(taxa);
    });
    setAsk(total.toFixed(2));
  }, [expenses]);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    currencies,
    setCurrencies,
    expenses,
    addExpenses,
    ask,
  }), [user, currencies, expenses, addExpenses, ask]);

  function getState() {
    return {
      user,
      wallet: { currencies, expenses },
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

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
