import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musicList: [],
      favoriteMusics: [],
    };

    this.printMusicList = this.printMusicList.bind(this);
  }

  componentDidMount() {
    this.getMusicfromApi();
    this.getFavoritesMusics();
  }

  getFavoritesMusics = async () => {
    this.setState({
      loading: true,
    });
    const favoriteMusics = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteMusics,
    });
    console.log('chegou em get favorites');
  }

  handleFavorites = (music) => {
    const { favoriteMusics } = this.state;
    const isFavorite = favoriteMusics.some((song) => song.trackId === music.trackId);

    if (isFavorite) {
      removeSong(music);
    } else {
      addSong(music);
    }
    this.getFavoritesMusics();
  }

  getMusicfromApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);

    this.setState({
      loading: false,
      musicList: musics,
    });
  }

  printMusicList() {
    const { musicList, favoriteMusics } = this.state;
    return (
      <section>
        <h3 data-testid="album-name">{musicList[0].collectionName}</h3>
        <h4 data-testid="artist-name">{musicList[0].artistName}</h4>
        {/* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice */}
        {musicList.slice(1).map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            checked={ favoriteMusics.some((song) => song.trackId === music.trackId) }
            handleFavorite={ () => this.handleFavorites(music) }
          />
        ))}
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.printMusicList() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
