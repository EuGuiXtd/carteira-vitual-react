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
  const [estado, setEstado] = useState(null);

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
      total += Number(e.value) * Number(taxa);
    });
    setAsk(total.toFixed(2));
  }, [expenses]);

  const edtExpenses = useCallback(async (
    { value, description, currency, method, tag },
  ) => {
    console.log(estado);
    console.log(description);
    console.log(expenses);
    const eExpenses = expenses;
    let idx;
    eExpenses.forEach((e, i) => { if (e.id === estado) idx = i; });
    console.log('idx', idx);
    let eExpense = eExpenses[idx];
    console.log(eExpense);
    eExpense = {
      ...eExpense,
      value,
      description,
      currency,
      method,
      tag,
    };
    console.log(eExpense);
    eExpenses[idx] = eExpense;
    console.log(eExpenses);
    setExpenses(eExpenses);
    let total = 0;
    eExpenses.forEach((e) => {
      const taxa = eExpense.exchangeRates[e.currency].ask;
      total += Number(e.value) * Number(taxa);
    });
    setAsk(total.toFixed(2));
  }, [expenses, estado]);

  const deletaExpense = useCallback((id) => {
    const newExpenses = expenses.filter((e) => e.id !== id);
    let total = 0;
    newExpenses.forEach((e) => {
      const taxa = e.exchangeRates[e.currency].ask;
      total += Number(e.value) * Number(taxa);
    });
    setAsk(total.toFixed(2));
    setExpenses(newExpenses);
  }, [expenses]);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    currencies,
    setCurrencies,
    expenses,
    addExpenses,
    deletaExpense,
    ask,
    estado,
    setEstado,
    edtExpenses,
  }), [
    user,
    currencies,
    expenses,
    addExpenses,
    ask,
    deletaExpense,
    estado,
    setEstado,
    edtExpenses,
  ]);

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
