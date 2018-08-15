import * as React from 'react';
import * as Scrivito from 'scrivito';

class ContactFormWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      description: '',
      sent: false,
      error: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;
    const gatewayUrl =
      'https://scrivito-commerce.staging-california.near-me.com/api/customizations.json';

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

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const widget = this.props.widget;
    const confirmationText =
      (widget.get('confirmationText') ||
      'Thank you for your message') +
      `, ${this.state.name}!`;
    if (this.state.sent) {
      return (
        <div className="alert alertsuccess">
          <strong>{ confirmationText }</strong>
        </div>
      );
    }
    const classNames = ['row'];

    if (widget.get('backgroundColor') === 'transparent') {
      classNames.push('card-white-transparent');
    } else {
      classNames.push('floating-label', 'card-theme', 'card', 'card-padding');
    }
    
    return (
       <div className={ classNames.join(' ') }>
        <h3>Contact us</h3>
        <form className="row" onSubmit={this.onFormSubmit}>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Name:</label>
              <input
                onChange={this.onInputChange}
                type="text"
                name="name"
                placeholder="Name"
                className="form-control form-control-lg"
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Email:</label>
              <input
                onChange={this.onInputChange}
                type="email"
                name="email"
                placeholder="Email"
                className="form-control form-control-lg"
                required
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <label>Description:</label>
              <textarea
                onChange={this.onInputChange}
                name="description"
                placeholder="Your Message..."
                className="form-control form-control-lg"
                required
              />
            </div>
            {
              widget.get('agreementText') && <div className="form-group form-check">
                <input
                  className="form-check-input"
                  id="agreementTextCheck"
                  type="checkbox"
                  name="contactAgreement"
                  value={ widget.get('agreementText') }
                  required
                />
                <label className="form-check-label" htmlFor="agreementTextCheck">
                  { widget.get('agreementText') }
                </label>
              </div>
            }
            { this.state.error &&
              <p>An error occurred. Please try again.</p>
            }
            <button
              className="btn btn-primary btn-block"
              type="submit">
              { widget.get('buttonText') || 'send message' }
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Scrivito.provideComponent('ContactFormWidget', ContactFormWidget);
