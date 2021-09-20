import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicList extends Component {
  render() {
    const { music: { trackName, previewUrl } } = this.props;
    /* Logica tirada com ajuda de várias pessoas */
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicList.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    artistName: PropTypes.string,
  }).isRequired,
};

export default MusicList;
