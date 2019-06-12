import React from 'react';


function WelcomeContent(props) {

  if (props.loggingOut) {
    return (
      <div>
        <h4>Logging out...</h4>
      </div>
    )
  }
  // Not authenticated, present a sign in button
  return <button onClick={props.authButtonMethod} style={{ "border": "1px solid cornflowerblue", "padding": "8px" }}> Click here to sign in</ button>;
}

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Better Together</h1>
        <WelcomeContent
          isAuthenticated={this.props.isAuthenticated}
          authButtonMethod={this.props.authButtonMethod}
          loggingOut={this.props.loggingOut} />
      </div>
    );
  }
}