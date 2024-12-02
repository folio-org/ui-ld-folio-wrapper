import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import './index.css';

class LinkedDataEditor extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
    this.connectedApp = props.stripes.connect(Wrapper);
  }

  render() {
    const App = this.connectedApp;

    return <App {...this.props} />;
  }
}

export default LinkedDataEditor;
