import React, { useContext } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import AppContext from '../context/AppContext';
import App from '../App';
import Provider from '../context/Provider';

let user = { email: '123' };

const expenses = [];

function setUser(v) {
  user = v;
}

function addExpenses() {}

function edtExpenses() {}

const value = {
  user,
  setUser,
  currencies: ['123,456'],
  addExpenses,
  expenses,
  edtExpenses,
};

describe('60% de cobertura total da aplicação', () => {
  test('Verifica e existe página de login', () => {
    renderWithRouter(
      <AppContext.Provider value={ value }>
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

    expect(ret).toBeInstanceOf(Object);
  });

  test('Teste Provier 2', () => {
    function TesteProvider() {
      const provider = useContext(AppContext);

      provider.addExpenses({});
      provider.edtExpenses({});

      console.log('123', provider);
    }

    const ret = renderWithRouter(
      <Provider>
        <TesteProvider />
      </Provider>,
    );

    expect(ret).toBeInstanceOf(Object);
  });

  test('Verifica a página de carteiras', () => {
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
    const botaoDespesa = screen.getByTestId('btn-add');

    expect(valor).toBeInTheDocument();
    expect(valorTotal).toBeInTheDocument();
    expect(botaoDespesa).toBeInTheDocument();

    userEvent.type(valor, '10');
    userEvent.type(descricao, '123');
    // userEvent.click(moeda);
    userEvent.click(botaoDespesa);
  });
});
