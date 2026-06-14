import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './support/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  if (typeof window.localStorage?.clear === 'function') {
    window.localStorage.clear();
  }
});

afterAll(() => {
  server.close();
});
