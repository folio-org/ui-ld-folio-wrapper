import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import './index.css';

class Marva extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.shape({
      connect: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.connectedApp = props.stripes.connect(Wrapper);
  }

  render() {
    return (
      <this.connectedApp {...this.props} />
    );
  }
}

export default Marva;
