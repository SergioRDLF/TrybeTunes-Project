import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        name: user.name,
        loading: false,
      });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          { loading ? <Loading /> : `Olá, ${name}!`}
        </h2>
      </header>
    );
  }
}

export default Header;
