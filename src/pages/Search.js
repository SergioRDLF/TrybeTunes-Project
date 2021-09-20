import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
    const minLetters = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            value="procurar"
            data-testid="search-artist-button"
            disabled={ search.length < minLetters }
            placeholder="Nome do Artista ou Banda"
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
