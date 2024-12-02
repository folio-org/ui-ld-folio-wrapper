import '@folio/linked-data';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Prompt } from 'react-router';
import { NAVIGATION_FROM_STORAGE_KEY, CUSTOM_EVENTS, ROUTE_PREFIX } from './constants/common';
import useBlockingNavigation from './hooks/useBlockingNavigation';
import css from './index.css';

// const SEARCH_VIEW_ELEM_ID = "ld-search-container";

const Wrapper = ({
  stripes: {
    locale,
    timezone,
    okapi: { url, tenant, token },
  },
  history,
}) => {
  const marvaComponent = useRef(null);
  const { isBlocking, handleBlockedNavigation } = useBlockingNavigation(history);

  const config = {
    locale,
    timezone,
    basePath: url,
    tenant,
    token,
    customEvents: CUSTOM_EVENTS,
    navigationOrigin: history.location.state?.from ?? localStorage.getItem(NAVIGATION_FROM_STORAGE_KEY),
  };

  return (
    <div id="editor-root" className={css.wrapper}>
      <Prompt when={isBlocking} message={handleBlockedNavigation} />
      <linked-data
        ref={marvaComponent}
        route-prefix={ROUTE_PREFIX}
        config={JSON.stringify(config)}
      />
    </div>
  );
};

Wrapper.propTypes = {
  stripes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Wrapper;
