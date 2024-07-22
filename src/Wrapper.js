import "@folio-eis/marva-next";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router";
import css from "./index.css";

const ROUTE_PREFIX = "/linked-data-editor";
const HOMEPAGE_URI = "/search";
// const SEARCH_VIEW_ELEM_ID = "ld-search-container";
const CUSTOM_EVENTS = {
  BLOCK_NAVIGATION: "blocknavigation",
  UNBLOCK_NAVIGATION: "unblocknavigation",
  PROCEED_NAVIGATION: "proceednavigation",
  TRIGGER_MODAL: "triggermodal",
};

const Wrapper = ({
  stripes: {
    locale,
    timezone,
    okapi: { url, tenant, token },
  },
}) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const marvaComponent = useRef(null);
  const history = useHistory();
  const config = {
    locale,
    timezone,
    basePath: url,
    tenant,
    token,
    customEvents: CUSTOM_EVENTS,
  };

  useEffect(() => {
    if (marvaComponent?.current) {
      marvaComponent.current.addEventListener(
        CUSTOM_EVENTS.BLOCK_NAVIGATION,
        () => {
          setIsBlocking(true);
          setConfirmedNavigation(false);
        }
      );
      marvaComponent.current.addEventListener(
        CUSTOM_EVENTS.UNBLOCK_NAVIGATION,
        () => setIsBlocking(false)
      );
      marvaComponent.current.addEventListener(
        CUSTOM_EVENTS.PROCEED_NAVIGATION,
        () => setConfirmedNavigation(true)
      );
    }
  }, [marvaComponent]);

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
    if (pathname.includes(ROUTE_PREFIX) && !pathname.includes(HOMEPAGE_URI)) return;

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
      <marva-next
        ref={marvaComponent}
        route-prefix={ROUTE_PREFIX}
        config={JSON.stringify(config)}
      />
    </div>
  );
};

Wrapper.propTypes = {
  stripes: PropTypes.object.isRequired,
};

export default Wrapper;
