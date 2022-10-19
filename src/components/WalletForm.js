/* eslint react/jsx-key: 0 */
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function WalletForm() {
  const { currencies } = useContext(AppContext);

  return (
    <>
      <input data-testid="value-input" />
      <input data-testid="description-input" />
      <select name="Moeda" data-testid="currency-input">
        {currencies.map((money) => (
          <option key={ money }>
            {money}
          </option>
        ))}
      </select>
      <select name="Metodo Pagamento" data-testid="method-input">
        <option value="Din">Dinheiro</option>
        <option value="CC">Cartão de crédito</option>
        <option value="CD">Cartão de débito</option>
      </select>
      <select name="Categoria" data-testid="tag-input">
        <option value="AL">Alimentação</option>
        <option value="LA">Lazer</option>
        <option value="TB">Trabalho</option>
        <option value="TP">Transporte</option>
        <option value="SA">Saúde</option>
      </select>
    </>
  );
}

export default WalletForm;
