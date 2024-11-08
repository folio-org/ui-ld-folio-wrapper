import { renderHook } from '@testing-library/react';
import useContainerEvents from './useContainerEvents';

describe('useContainerEvents', () => {
  test('attaches event listeners', () => {
    const mockAddEventListener = jest.fn();
    const mockEventHandler = jest.fn();
    const mockRef = { current: { addEventListener: mockAddEventListener } };
    const mockEventsMap = {
      'mockEvent': mockEventHandler,
    };

    renderHook(() => useContainerEvents(mockRef, mockEventsMap));

    expect(mockAddEventListener).toHaveBeenCalled();
  });

  test('does not attach event listeners if no ref is present', () => {
    const mockAddEventListener = jest.fn();

    renderHook(() => useContainerEvents({}, {}));

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });
});
