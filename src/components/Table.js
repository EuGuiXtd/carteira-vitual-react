import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { expenses, deletaExpense } = useContext(AppContext);

  return (
    <table border="1">
      {' '}
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={ e.id }>
            <td>{e.description}</td>
            <td>{e.tag}</td>
            <td>{e.method}</td>
            <td>{Number(e.value).toFixed(2)}</td>
            <td>{e.exchangeRates[e.currency].name}</td>
            <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
            <td>
              {(Number(e.value) * Number(e.exchangeRates[e.currency].ask)).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                id={ e.id }
                onClick={ () => { deletaExpense(e.id); } }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
