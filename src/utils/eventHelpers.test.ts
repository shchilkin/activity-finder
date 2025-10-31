import { describe, it, expect } from 'vitest';
import {
  formatActivityDateTime,
  getAvailabilityStatus,
  calculatePercentage,
} from './eventHelpers';

describe('formatActivityDateTime', () => {
  it('should format date and time correctly', () => {
    const result = formatActivityDateTime('2024-03-15', '14:30');
    expect(result.date).toBe('Mar 15, 2024');
    expect(result.time).toBe('14:30');
  });

  it('should handle single digit days', () => {
    const result = formatActivityDateTime('2024-03-05', '09:00');
    expect(result.date).toBe('Mar 05, 2024');
    expect(result.time).toBe('09:00');
  });

  it('should use 24-hour format', () => {
    const result = formatActivityDateTime('2024-12-25', '23:59');
    expect(result.time).toBe('23:59');
  });

  it('should handle midnight correctly', () => {
    const result = formatActivityDateTime('2024-01-01', '00:00');
    expect(result.time).toBe('00:00');
  });

  it('should handle different months', () => {
    const jan = formatActivityDateTime('2024-01-15', '12:00');
    const dec = formatActivityDateTime('2024-12-15', '12:00');
    expect(jan.date).toBe('Jan 15, 2024');
    expect(dec.date).toBe('Dec 15, 2024');
  });
});

describe('getAvailabilityStatus', () => {
  it('should return "full" when no spots remaining', () => {
    expect(getAvailabilityStatus(0, 100)).toBe('full');
  });

  it('should return "full" when remaining is negative', () => {
    expect(getAvailabilityStatus(-5, 100)).toBe('full');
  });

  it('should return "low" when 20% or less remaining', () => {
    expect(getAvailabilityStatus(20, 100)).toBe('low');
    expect(getAvailabilityStatus(10, 100)).toBe('low');
    expect(getAvailabilityStatus(2, 10)).toBe('low');
    expect(getAvailabilityStatus(1, 10)).toBe('low');
  });

  it('should return "limited" when between 20% and 50% remaining', () => {
    expect(getAvailabilityStatus(21, 100)).toBe('limited');
    expect(getAvailabilityStatus(50, 100)).toBe('limited');
    expect(getAvailabilityStatus(3, 10)).toBe('limited');
    expect(getAvailabilityStatus(5, 10)).toBe('limited');
  });

  it('should return "plenty" when more than 50% remaining', () => {
    expect(getAvailabilityStatus(51, 100)).toBe('plenty');
    expect(getAvailabilityStatus(100, 100)).toBe('plenty');
    expect(getAvailabilityStatus(6, 10)).toBe('plenty');
    expect(getAvailabilityStatus(10, 10)).toBe('plenty');
  });

  it('should handle edge case of 1 capacity', () => {
    expect(getAvailabilityStatus(0, 1)).toBe('full');
    expect(getAvailabilityStatus(1, 1)).toBe('plenty');
  });

  it('should handle boundary at exactly 20%', () => {
    expect(getAvailabilityStatus(20, 100)).toBe('low');
  });

  it('should handle boundary at exactly 50%', () => {
    expect(getAvailabilityStatus(50, 100)).toBe('limited');
  });
});

describe('calculatePercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(25, 100)).toBe(25);
    expect(calculatePercentage(75, 100)).toBe(75);
  });

  it('should round to nearest integer', () => {
    expect(calculatePercentage(33, 100)).toBe(33);
    expect(calculatePercentage(66, 100)).toBe(66);
    expect(calculatePercentage(1, 3)).toBe(33); // 33.333...
    expect(calculatePercentage(2, 3)).toBe(67); // 66.666...
  });

  it('should return 0 when denominator is 0', () => {
    expect(calculatePercentage(10, 0)).toBe(0);
    expect(calculatePercentage(0, 0)).toBe(0);
  });

  it('should cap at 100 for values over 100%', () => {
    expect(calculatePercentage(150, 100)).toBe(100);
    expect(calculatePercentage(200, 100)).toBe(100);
  });

  it('should floor at 0 for negative values', () => {
    expect(calculatePercentage(-10, 100)).toBe(0);
    expect(calculatePercentage(-50, 100)).toBe(0);
  });

  it('should handle 0 numerator', () => {
    expect(calculatePercentage(0, 100)).toBe(0);
  });

  it('should handle 100% exactly', () => {
    expect(calculatePercentage(100, 100)).toBe(100);
    expect(calculatePercentage(10, 10)).toBe(100);
  });

  it('should handle small numbers', () => {
    expect(calculatePercentage(1, 10)).toBe(10);
    expect(calculatePercentage(1, 4)).toBe(25);
  });

  it('should handle large numbers', () => {
    expect(calculatePercentage(500, 1000)).toBe(50);
    expect(calculatePercentage(999, 1000)).toBe(100); // 99.9 rounds to 100
  });
});
