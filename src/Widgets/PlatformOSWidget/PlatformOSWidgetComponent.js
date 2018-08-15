import * as React from 'react';
import * as Scrivito from 'scrivito';

class PlatformOSWidgetComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { content: [], };
  }

  componentDidMount() {
    const url = 'https://scrivito-commerce.staging-california.near-me.com/';
    const endpoint = this.props.widget.get('endpoint');

    fetch(url + endpoint)
      .then(response => {
        return response.json(); })
      .then(data => {
        this.setState({
          content: data.customizations.results,
        });
      })
  }

  deleteItem() {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;
    const gatewayUrl =
      `https://scrivito-commerce.staging-california.near-me.com/api/user/customizations/${}`;

    fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Token token=0c35128df5eb2fe099607727f2807346',
        Accept: 'application/vnd.nearme.v4+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        form_configuration_name: 'contact_form',
        parent_resource_id: 'contact_request',
        customization: {
          properties_attributes: {
            name,
            email,
            description
          }
        }
      })
    }).then(
      () => {
        this.setState({ sent: true });
      },
      () => {
        this.setState({ error: true });
      }
    );
  }
  }

  render() {
    return (
      <div>
        <h1> Contact requests </h1>
        <ul>
          {this.state.content.map(item => (
            <li key={item.name}>
              <strong>Name:</strong> {item.name}
              <ul>
                <li><strong>Email:</strong> {item.email}</li>
                <li><strong>Description:</strong> {item.description}</li>
              </ul>
              <button onclick="deleteItem()"> Delete </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Scrivito.provideComponent('PlatformOSWidget', PlatformOSWidgetComponent);
