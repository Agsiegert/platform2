import * as React from 'react';
import * as Scrivito from 'scrivito';

class PlatformOSAuth extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.state = { loggedIn: false };
  }

  handleLogInClick() {
    // netlifyIdentity.open();
  }

  handleLogOutClick() {
    // netlifyIdentity.logout();
  }

  afterLogIn() {
    // netlifyIdentity.close();
    this.setState({ loggedIn: true });
  }

  componentDidMount() {
    // netlifyIdentity.on("login", () => this.afterLogIn());
    // netlifyIdentity.on("logout", () => this.setState({ loggedIn: false }));
  }

  render() {
    //const user = platformOSAuth.currentUser();
    if (!user) {
      return (
        <a href='/sign-in' onClick={ this.handleLogInClick }>Sign up | Log in</a>
      );
    }
    return (
      <a href='logout' onClick={ this.handleLogOutClick }>Log out { user.email }</a>
    );
  }
}

export default PlatformOSAuth;
