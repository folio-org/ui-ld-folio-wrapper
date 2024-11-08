import { render } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router';
import Wrapper from './Wrapper';

describe('Wrapper', () => {
  test('sets navigation origin into localstorage', () => {
    const mockSetItem = jest.fn();
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(mockSetItem);

    render(
      <MemoryRouter>
        <Wrapper history={{ location: { state: { from: {} } } }} stripes={{ okapi: {} }} />
      </MemoryRouter>
    );

    expect(mockSetItem).toHaveBeenCalled();
  });
});
