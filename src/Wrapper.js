import '@folio-eis/marva-next';
import PropTypes from 'prop-types';

const Wrapper = ({
  stripes: {
    locale,
    timezone,
    okapi: {
      url,
      tenant,
      token
    },
  },
}) => {
  const config = {
    locale,
    timezone,
    basePath: url,
    tenant,
    token,
  };

  return (
    <div id="editor-root" style={{ margin: '1em' }}>
      <marva-next route-prefix="/marva" config={JSON.stringify(config)} />
    </div>
  );
};

Wrapper.propTypes = {
  stripes: PropTypes.object.isRequired,
};

export default Wrapper;
