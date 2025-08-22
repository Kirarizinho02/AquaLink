import { describe, expect, test } from '@jest/globals';
import { Sum } from './sum';

describe('Sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(Sum(1, 2)).toBe(3);
  });
});

