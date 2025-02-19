import { useEffect, useState } from 'react';
import useContainerEvents from './useContainerEvents';
import {
  NAVIGATION_FROM_STORAGE_KEY,
  CUSTOM_EVENTS,
  EXTERNAL_RESOURCE_PATH_BIT,
  ROUTE_PREFIX,
  HOMEPAGE_URI
} from '../constants/common';
import useCreateContainerEvents from './useCreateContainerEvents';

const useBlockingNavigation = (history, marvaComponent) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const { eventsMap } = useCreateContainerEvents({
    history,
    setIsBlocking,
    setConfirmedNavigation,
  });

  useContainerEvents(marvaComponent, eventsMap);

  useEffect(() => {
    if (history.location.state?.from) {
      localStorage.setItem(
        NAVIGATION_FROM_STORAGE_KEY,
        JSON.stringify(history.location.state?.from)
      );
    } else if (
      history.location.pathname?.includes(EXTERNAL_RESOURCE_PATH_BIT)
    ) {
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

  return {
    isBlocking,
    handleBlockedNavigation,
  };
};

export default useBlockingNavigation;
