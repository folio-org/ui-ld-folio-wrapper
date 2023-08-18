import '@folio-eis/marva-next';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const OKAPI_CONFIG = 'okapi_config';

const Wrapper = ({ stripes }) => {
  useEffect(() => {
    // url, tenant, token, locale, tz
    const {
      locale,
      timezone,
      okapi: {
        url,
        tenant,
        token
      },
    } = stripes || {};

    const config = {
      locale,
      timezone,
      url,
      tenant,
      token,
    };

    localStorage.setItem(OKAPI_CONFIG, JSON.stringify(config));
  }, [stripes]);

  return (
    <div id="editor-root" style={{ margin: '1em' }}>
      <marva-next route-prefix="/marva" />
    </div>
  );
};

Wrapper.propTypes = {
  stripes: PropTypes.object.isRequired,
};

export default Wrapper;
