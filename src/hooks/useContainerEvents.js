import { useEffect } from 'react';

const useContainerEvents = (wcRef, eventsMap) => {
  useEffect(() => {
    if (wcRef?.current && eventsMap) {
      for (const [eventName, eventHandler] of Object.entries(eventsMap)) {
        wcRef.current.addEventListener(eventName, eventHandler);
      }
    }
  }, [wcRef, eventsMap]);
};

export default useContainerEvents;
