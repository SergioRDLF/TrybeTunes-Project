import React, { Component } from 'react';
import AlbumCards from '../components/AlbumCards';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      loading: false,
      artistName: '',
      albumsFound: [],
      validation: false,
    };
    this.printResults = this.printResults.bind(this);
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
      artistName: value,
    });
  };

  handleSearch = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const albums = await searchAlbumsAPI(search);
    console.log(albums);

    this.setState({
      search: '',
      loading: false,
      albumsFound: albums,
      validation: true,
      artistName: search,
    });
  };

  printResults() {
    console.log('PrintResults');
    const { albumsFound, artistName } = this.state;
    if (albumsFound.length === 0) {
      return (
        <>
          <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
          <h4>Nenhum álbum foi encontrado</h4>
        </>
      );
    }
    return (
      <>
        <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
        <main>
          { albumsFound.map((album) => (
            <AlbumCards key={ album.collectionId } album={ album } />))}
        </main>
      </>
    );
  }

  render() {
    const { search, loading, validation } = this.state;
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
            placeholder="Nome do Artista ou Banda"
          />
          <button
            type="button"
            value="procurar"
            data-testid="search-artist-button"
            disabled={ search.length < minLetters }
            onClick={ this.handleSearch }
          >
            Procurar
          </button>
          { loading && <Loading /> }
          { validation && this.printResults() }
        </form>
      </div>
    );
  }
}

export default Search;
