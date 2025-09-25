// jest-dom
import '@testing-library/jest-dom';

// Polyfill simples para MutationObserver em ambientes antigos
class MockMutationObserver {
  constructor(callback) {}
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
}

if (typeof window !== 'undefined' && !window.MutationObserver) {
  window.MutationObserver = MockMutationObserver;
}
if (typeof global !== 'undefined' && !global.MutationObserver) {
  global.MutationObserver = MockMutationObserver;
}