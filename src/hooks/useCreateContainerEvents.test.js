import { renderHook } from '@testing-library/react';
import useCreateContainerEvents from './useCreateContainerEvents';
import { CUSTOM_EVENTS } from '../constants/common';

describe('useCreateContainerEvents', () => {
  const mockSetIsBlocking = jest.fn();
  const mockSetConfirmedNavigation = jest.fn();
  const mockHistoryPush = jest.fn();

  const renderHookWithArgs = (history = { push: mockHistoryPush }) => renderHook(() => useCreateContainerEvents({ history, setIsBlocking: mockSetIsBlocking, setConfirmedNavigation: mockSetConfirmedNavigation }));

  test('blockNavigation', () => {
    const { result } = renderHookWithArgs();

    result.current.eventsMap[CUSTOM_EVENTS.BLOCK_NAVIGATION]();

    expect(mockSetIsBlocking).toHaveBeenCalled();
    expect(mockSetConfirmedNavigation).toHaveBeenCalled();
  });

  test('unblockNavigation', () => {
    const { result } = renderHookWithArgs();

    result.current.eventsMap[CUSTOM_EVENTS.UNBLOCK_NAVIGATION]();

    expect(mockSetIsBlocking).toHaveBeenCalled();
  });

  test('proceedNavigation', () => {
    const { result } = renderHookWithArgs();

    result.current.eventsMap[CUSTOM_EVENTS.PROCEED_NAVIGATION]();

    expect(mockSetIsBlocking).toHaveBeenCalled();
    expect(mockSetConfirmedNavigation).toHaveBeenCalled();
  });

  test('navigateToOrigin', () => {
    const { result } = renderHookWithArgs({ location: { state: { from: { pathname: 'somewhere' } } }, push: mockHistoryPush });

    result.current.eventsMap[CUSTOM_EVENTS.NAVIGATE_TO_ORIGIN]();

    expect(mockHistoryPush).toHaveBeenCalled();
  });

  test('dropNavigateToOrigin', () => {
    const mockRemoveItem = jest.fn();
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(mockRemoveItem);

    const { result } = renderHookWithArgs();

    result.current.eventsMap[CUSTOM_EVENTS.DROP_NAVIGATE_TO_ORIGIN]();

    expect(mockRemoveItem).toHaveBeenCalled();
  });
});
