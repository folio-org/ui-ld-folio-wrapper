import '@folio-eis/marva-next';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Prompt, useHistory } from 'react-router';

const CUSTOM_EVENTS = {
  BLOCK_NAVIGATION: 'blocknavigation',
  PROCEED_NAVIGATION: 'proceednavigation',
  TRIGGER_MODAL: 'triggermodal',
};

const Wrapper = ({
  stripes: {
    locale,
    timezone,
    okapi: { url, tenant, token },
  },
}) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
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
    if (marvaComponent && marvaComponent.current) {
      marvaComponent.current.addEventListener(CUSTOM_EVENTS.BLOCK_NAVIGATION, () => {
        setIsBlocking(true);
        setConfirmedNavigation(false);
      });
      marvaComponent.current.addEventListener(CUSTOM_EVENTS.PROCEED_NAVIGATION, () => setConfirmedNavigation(true));
    }
  }, [marvaComponent]);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, history, lastLocation]);

  const handleBlockedNavigation = (nextLocation) => {
    if (marvaComponent.current) {
      marvaComponent.current.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.TRIGGER_MODAL));
    }

    if (!confirmedNavigation && isBlocking) {
      setLastLocation(nextLocation);

      return false;
    }

    return true;
  };

  return (
    <div id="editor-root">
      <Prompt
        when={isBlocking}
        message={handleBlockedNavigation}
      />
      <marva-next ref={marvaComponent} route-prefix="/marva" config={JSON.stringify(config)} />
    </div>
  );
};

Wrapper.propTypes = {
  stripes: PropTypes.object.isRequired,
};

export default Wrapper;
