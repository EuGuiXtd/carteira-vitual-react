import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function validacaoEmail(field) {
  const usuario = field.substring(0, field.indexOf('@'));
  const dominio = field.substring(field.indexOf('@') + 1, field.length);
  const notFound = -1;
  const dominioMinimo = 3;

  return ((usuario.length >= 1)
  && (dominio.length >= dominioMinimo)
  && (usuario.search('@') === notFound)
  && (dominio.search('@') === notFound)
  && (usuario.search(' ') === notFound)
  && (dominio.search(' ') === notFound)
  && (dominio.search('.') !== notFound)
  && (dominio.indexOf('.') >= 1)
  && (dominio.lastIndexOf('.') < dominio.length - 1));
}

function Login() {
  const { user, setUser } = useContext(AppContext);

  const [emailOK, setEmailOK] = useState(false);
  const [passswordOK, setPasswordOK] = useState(false);
  const passwordMin = 6;
  const history = useHistory();

  function verificaEmail(e) {
    setEmailOK(validacaoEmail(e.target.value));
    setUser({ email: e.target.value });
  }

  function verificaPassword(e) {
    setPasswordOK(e.target.value.length >= passwordMin);
  }

  return (
    <>
      <input data-testid="email-input" onChange={ (e) => verificaEmail(e) } />
      <input data-testid="password-input" onChange={ (e) => verificaPassword(e) } />
      <button
        type="button"
        data-testid="botao_entrar"
        disabled={ !emailOK || !passswordOK }
        onClick={ () => {
          history.push('/carteira');
        } }
      >
        Entrar
      </button>
      <p>{user.email}</p>
    </>
  );
}

export default Login;
