/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import AppContext from '../context/AppContext';
import App from '../App';
import Provider from '../context/Provider';

let user = { email: '123' };

describe('60% de cobertura total da aplicação', () => {
  test('Verifica e existe página de login', () => {
    function setUser(v) {
      user = v;
    }

    renderWithRouter(
      <AppContext.Provider value={ { user, setUser, currencies: ['123,456'] } }>
        <App />
      </AppContext.Provider>,
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const botao = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  test('Teste Provier', () => {
    const ret = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    expect(ret).toBeVisible();
  });

  test('Verifica a página de carteiras', () => {
    function setUser(v) {
      user = v;
    }

    function addExpenses() {}

    const value = { user, setUser, currencies: ['123', '456'], addExpenses };

    const { history } = renderWithRouter(
      <AppContext.Provider value={ value }>
        <App />
      </AppContext.Provider>,
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const botao = screen.getByTestId('botao_entrar');

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456');
    userEvent.click(botao);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const valor = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    // const moeda = screen.getAllByTestId('currency-input');
    const valorTotal = screen.getByTestId('total-field');
    const botaoDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valor).toBeInTheDocument();
    expect(valorTotal).toBeInTheDocument();
    expect(botaoDespesa).toBeInTheDocument();

    userEvent.type(valor, '10');
    userEvent.type(descricao, '123');
    // userEvent.click(moeda);
    userEvent.click(botaoDespesa);
  });
});
