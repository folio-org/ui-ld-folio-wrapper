import { useEffect } from 'react';

const useContainerEvents = (wcRef = null, eventsMap = {}) => {
  useEffect(() => {
    if (wcRef?.current) {
      for (const [eventName, eventHandler] of Object.entries(eventsMap)) {
        wcRef.current.addEventListener(eventName, eventHandler);
      }
    }
  }, [wcRef]);
};

export default useContainerEvents;
