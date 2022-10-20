/* eslint react/jsx-key: 0 */
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function WalletForm() {
  const { currencies, addExpenses, estado, edtExpenses } = useContext(AppContext);

  const [value, setValue] = useState();
  const [description, setDescription] = useState();
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState();
  const [tag, setTag] = useState();

  return (
    <>
      <input
        value={ value }
        data-testid="value-input"
        onChange={ (e) => setValue(e.target.value) }
      />
      <input
        value={ description }
        data-testid="description-input"
        onChange={ (e) => setDescription(e.target.value) }
      />
      <select
        name="Moeda"
        data-testid="currency-input"
        onChange={ (e) => { setCurrency(e.target.value); } }
      >
        {currencies.map((money) => (
          <option key={ money } value={ money }>
            {money}
          </option>
        ))}
      </select>
      <select
        name="Metodo Pagamento"
        data-testid="method-input"
        onChange={ (e) => { setMethod(e.target.value); } }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select
        name="Categoria"
        data-testid="tag-input"
        onChange={ (e) => { setTag(e.target.value); } }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button
        type="button"
        onClick={ () => {
          if (estado === null) {
            addExpenses({
              value,
              description,
              currency,
              method,
              tag,
            });
          } else {
            edtExpenses({
              value,
              description,
              currency,
              method,
              tag,
            });
          }
          setValue('');
          setDescription('');
        } }
      >
        {estado === null ? 'Adicionar despesa' : 'Editar despesa'}
      </button>

    </>
  );
}

export default WalletForm;
