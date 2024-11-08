import { NAVIGATION_FROM_STORAGE_KEY, CUSTOM_EVENTS } from '../constants/common';

const useCreateContainerEvents = ({
  history,
  setIsBlocking,
  setConfirmedNavigation,
}) => {
  const blockNavigation = () => {
    setIsBlocking(true);
    setConfirmedNavigation(false);
  };
  const unblockNavigation = () => setIsBlocking(false);
  const proceedNavigation = () => {
    setIsBlocking(false);
    setConfirmedNavigation(true);
  };
  const navigateToOrigin = () => {
    const storedLocation = localStorage.getItem(NAVIGATION_FROM_STORAGE_KEY);
    const { pathname, search } = history.location.state?.from ?? ((storedLocation && JSON.parse(storedLocation)) ?? {});

    if (pathname && history.location.pathname !== pathname) {
      history.push({ pathname, search });
    }
  };
  const dropNavigateToOrigin = () => {
    localStorage.removeItem(NAVIGATION_FROM_STORAGE_KEY);
  };

  const eventsMap = {
    [CUSTOM_EVENTS.BLOCK_NAVIGATION]: blockNavigation,
    [CUSTOM_EVENTS.UNBLOCK_NAVIGATION]: unblockNavigation,
    [CUSTOM_EVENTS.PROCEED_NAVIGATION]: proceedNavigation,
    [CUSTOM_EVENTS.NAVIGATE_TO_ORIGIN]: navigateToOrigin,
    [CUSTOM_EVENTS.DROP_NAVIGATE_TO_ORIGIN]: dropNavigateToOrigin,
  };

  return {
    eventsMap,
  };
};

export default useCreateContainerEvents;
