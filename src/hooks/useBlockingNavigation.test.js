import React from 'react';
import { renderHook } from '@testing-library/react';
import {
  NAVIGATION_FROM_STORAGE_KEY,
  EXTERNAL_RESOURCE_PATH_BIT,
  ROUTE_PREFIX,
  HOMEPAGE_URI,
} from '../constants/common';
import useBlockingNavigation from './useBlockingNavigation';

jest.mock('./useCreateContainerEvents', () => () => ({
  eventsMap: {},
}));
jest.mock('./useContainerEvents', jest.fn);

describe('useBlockingNavigation', () => {
  let historyMock;
  let marvaComponentRef;

  beforeEach(() => {
    historyMock = {
      location: {
        pathname: '/test-path',
        state: {},
      },
      push: jest.fn(),
      replace: jest.fn(),
    };

    marvaComponentRef = {
      current: {
        remount: jest.fn(),
        dispatchEvent: jest.fn(),
      },
    };

    jest.spyOn(React, 'useRef').mockReturnValue(marvaComponentRef);

    jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes isBlocking to false', () => {
    const { result } = renderHook(() => useBlockingNavigation(historyMock));

    expect(result.current.isBlocking).toBe(false);
  });

  it('sets NAVIGATION_FROM_STORAGE_KEY when history.location.state.from exists', () => {
    historyMock.location.state = { from: '/previous-path' };

    renderHook(() => useBlockingNavigation(historyMock));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      NAVIGATION_FROM_STORAGE_KEY,
      JSON.stringify('/previous-path')
    );
  });

  it('replaces pathname when it includes EXTERNAL_RESOURCE_PATH_BIT', () => {
    historyMock.location.pathname = `/some-path/${EXTERNAL_RESOURCE_PATH_BIT}`;

    renderHook(() => useBlockingNavigation(historyMock));

    expect(historyMock.replace).toHaveBeenCalledWith({
      pathname: `${ROUTE_PREFIX}${HOMEPAGE_URI}`,
    });
  });

  it('remounts marvaComponent when pathname includes HOMEPAGE_URI', () => {
    historyMock.location.pathname = `${ROUTE_PREFIX}${HOMEPAGE_URI}`;

    renderHook(() => useBlockingNavigation(historyMock));

    expect(marvaComponentRef.current.remount).toHaveBeenCalled();
  });

  it('returns true from handleBlockedNavigation when isBlocking is false', () => {
    const { result } = renderHook(() => useBlockingNavigation(historyMock));

    const nextLocation = { pathname: '/next-path' };
    const canNavigate = result.current.handleBlockedNavigation(nextLocation);

    expect(canNavigate).toBe(true);
  });
});
