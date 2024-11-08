import "@folio/linked-data";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Prompt } from "react-router";
import useContainerEvents from "./hooks/useContainerEvents";
import { NAVIGATION_FROM_STORAGE_KEY, CUSTOM_EVENTS, EXTERNAL_RESOURCE_PATH_BIT } from './constants/common';
import css from "./index.css";
import useCreateContainerEvents from "./hooks/useCreateContainerEvents";

const ROUTE_PREFIX = "/linked-data-editor";
const HOMEPAGE_URI = "/search";
// const SEARCH_VIEW_ELEM_ID = "ld-search-container";

const Wrapper = ({
  stripes: {
    locale,
    timezone,
    okapi: { url, tenant, token },
  },
  history,
}) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const marvaComponent = useRef(null);
  const { eventsMap } = useCreateContainerEvents({ history, setIsBlocking, setConfirmedNavigation });

  useContainerEvents(marvaComponent, eventsMap);

  const config = {
    locale,
    timezone,
    basePath: url,
    tenant,
    token,
    customEvents: CUSTOM_EVENTS,
    navigationOrigin: history.location.state?.from ?? localStorage.getItem(NAVIGATION_FROM_STORAGE_KEY),
  };

  useEffect(() => {
    if (history.location.state?.from) {
      localStorage.setItem(NAVIGATION_FROM_STORAGE_KEY, JSON.stringify(history.location.state?.from));
    } else if (history.location.pathname.includes(EXTERNAL_RESOURCE_PATH_BIT)) {
      history.replace({ pathname: `${ROUTE_PREFIX}${HOMEPAGE_URI}` });
    }
  }, [history.location.state?.from]);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, history, lastLocation]);

  useEffect(() => {
    if (
      history.location?.pathname?.includes(HOMEPAGE_URI) &&
      marvaComponent?.current
      // uncomment to refresh only if the component is not
      // present in the document
      // && !document.getElementById(SEARCH_VIEW_ELEM_ID)
    ) {
      marvaComponent.current?.remount();
    }
  }, [history.location]);

  const handleBlockedNavigation = (nextLocation) => {
    const { pathname } = nextLocation ?? {};
    // let the module handle navigation blocking within itself on its own
    // except going to the module's main page with unsaved changes
    if (pathname.includes(ROUTE_PREFIX) && !pathname.includes(HOMEPAGE_URI))
      return;

    if (marvaComponent.current) {
      marvaComponent.current.dispatchEvent(
        new CustomEvent(CUSTOM_EVENTS.TRIGGER_MODAL)
      );
    }

    if (!confirmedNavigation && isBlocking) {
      setLastLocation(nextLocation);

      return false;
    }

    return true;
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
