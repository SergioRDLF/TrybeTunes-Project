import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  };

  handleLogin = () => {
    const { name } = this.state;

    this.setState({
      loading: true,
    });
    createUser({ name })
      .then(() => this.setState({ loading: false, redirect: true }));
  }

  render() {
    const { name, loading, redirect } = this.state;
    const minLetters = 3;
    if (loading === true) return <Loading />;
    if (redirect === true) return <Redirect to="/search" />; // Lógica tirada com ajuda de Ariane Ueti

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            id="name"
            type="text"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Digite seu login"
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ name.length < minLetters }
            value="Entrar"
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
