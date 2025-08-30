import "@testing-library/jest-dom/vitest";

// Mock global ResizeObserver para jsdom
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};