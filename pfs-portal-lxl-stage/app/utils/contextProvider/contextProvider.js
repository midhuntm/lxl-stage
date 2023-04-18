import React, { Component } from 'react';
const { Provider, Consumer } = React.createContext();

// Note: You could also use hooks to provide state and convert this into a functional component.
class ThemeContextProvider extends Component {
  state = {
    spinner: false,
  };

  toggleTheme = (val) => {
    if (val !== undefined) {
      //console.log("val",val)
      this.setState({
        spinner: val,
      });
    } else {
      //console.log('without val');
      this.setState((prevState) => {
        return {
          spinner: prevState.spinner === false ? true : false,
        };
      });
    }
  };

  render() {
    return (
      <Provider
        value={{ Loader: this.state.spinner, toggleLoader: this.toggleTheme }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };
