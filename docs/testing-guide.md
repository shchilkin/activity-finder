# Testing Guide

This document provides comprehensive guidelines for writing effective tests in this project.

## Testing Philosophy

### Core Principle: Test Behavior, Not Implementation

Tests should verify **what** the code does, not **how** it does it. Focus on the contract, outputs, and observable behavior.

### Test Behavior, Not Implementation

**Bad:** Testing that internal functions are called with specific arguments

```typescript
// ❌ This test is brittle and provides false confidence
it('should call formatCurrency with correct parameters', () => {
  mockFormatCurrency.mockReturnValue('mocked result');
  getFormattedPrice(1234.56, 'nb');
  expect(mockFormatCurrency).toHaveBeenCalledWith(1234.56, 'nb', 'NOK');
});
```

**Good:** Testing the actual output/behavior

```typescript
// ✅ This test verifies the real contract
it('should format Norwegian prices correctly', () => {
  expect(getFormattedPrice(1234.56, 'nb')).toBe('NOK 1,234.56');
});
```

### Critical Questions Before Writing Tests

Before writing any test, ask yourself:

1. **Does this test verify the actual output/result?**
   - If not, it's probably testing implementation details.

2. **Would this test fail if I broke the function's contract?**
   - If a function returns garbage but the test passes, the test is worthless.

3. **Am I mocking too much?**
   - Over-mocking often means you're not testing the real behavior.

4. **Does this test bring value?**
   - Don't write tests just to write tests. Each test should verify meaningful behavior.

5. **Am I testing TypeScript's type system?**
   - Don't test that fields exist or have correct types - TypeScript already guarantees this.

### Warning Signs of Poor Tests

- ❌ Tests that only check `typeof result === 'string'` or `result.length > 0`
- ❌ Tests that verify a mocked function was called but ignore the return value
- ❌ High line count with no assertions on actual expected values
- ❌ Tests that pass even when the function returns incorrect results
- ❌ Tests checking for property existence when TypeScript already enforces it
- ❌ Tests verifying that a Promise is returned from an async function

**Remember:** A test that looks comprehensive but doesn't validate the actual business requirement is worse than no test - it creates false confidence.

## What to Test

### ✅ DO Test

1. **Business Logic**

   ```typescript
   // Test the actual calculation/transformation
   it('should calculate available spots correctly', () => {
     const result = getAvailableSpots(20, 15);
     expect(result).toBe(5);
   });
   ```

2. **Edge Cases & Boundaries**

   ```typescript
   it('should handle zero capacity', () => {
     const result = getAvailableSpots(0, 0);
     expect(result).toBe(0);
   });

   it('should handle overbooked activities', () => {
     const result = getAvailableSpots(10, 15);
     expect(result).toBe(-5);
   });
   ```

3. **Error Handling**

   ```typescript
   it('should throw ActivityNotFoundError when activity does not exist', async () => {
     await expect(service.getActivityById(99999)).rejects.toThrow(
       ActivityNotFoundError,
     );
     await expect(service.getActivityById(99999)).rejects.toThrow(
       'Activity with ID 99999 not found',
     );
   });
   ```

4. **Data Validation**

   ```typescript
   it('should reject invalid activity data', () => {
     const invalid = { id: 'not-a-number', title: 'Test' };
     const result = ActivitySchema.safeParse(invalid);
     expect(result.success).toBe(false);
   });
   ```

5. **Integration Points**

   ```typescript
   it('should return all activities from the data source', async () => {
     const activities = await service.getAllActivities();
     expect(activities.length).toBe(expectedCount);
   });
   ```

### ❌ DON'T Test

1. **TypeScript Type Guarantees**

   ```typescript
   // ❌ Don't do this - TypeScript already ensures types
   it('should return activities with correct data types', async () => {
     const activity = await service.getActivityById(1);
     expect(typeof activity.id).toBe('number');
     expect(typeof activity.title).toBe('string');
   });
   ```

2. **Property Existence (When Using TypeScript)**

   ```typescript
   // ❌ Don't do this - TypeScript enforces structure
   it('should have all required properties', () => {
     expect(activity).toHaveProperty('id');
     expect(activity).toHaveProperty('title');
   });
   ```

3. **Language Features**

   ```typescript
   // ❌ Don't test that async functions return Promises
   it('should return a promise', () => {
     const result = service.getActivity(1);
     expect(result).toBeInstanceOf(Promise);
   });
   ```

4. **Implementation Details**

   ```typescript
   // ❌ Don't test private methods or internal state
   it('should call loadActivities internally', () => {
     const spy = jest.spyOn(service, 'loadActivities');
     service.getAllActivities();
     expect(spy).toHaveBeenCalled();
   });
   ```

5. **Obvious Behavior**

   ```typescript
   // ❌ Don't test that different IDs return different data
   it('should return different activities for different IDs', () => {
     const a1 = await service.getActivity(1);
     const a2 = await service.getActivity(2);
     expect(a1.id).not.toBe(a2.id);
   });
   ```

## Test Organization

### Structure Tests by Behavior

Organize tests around user-facing behavior and features, not internal implementation:

```typescript
describe('ActivityService', () => {
  describe('getAllActivities', () => {
    it('should return all activities from the data source', async () => {
      // Test behavior
    });
  });

  describe('getActivityById', () => {
    it('should return the correct activity for a valid ID', async () => {
      // Test behavior
    });

    it('should throw ActivityNotFoundError when activity does not exist', async () => {
      // Test error case
    });
  });
});
```

### Keep Tests Focused and Independent

Each test should:

- Test one specific behavior
- Be independent of other tests
- Have a clear, descriptive name
- Be easy to understand without reading the implementation

## Schema Testing

For Zod schemas (or similar validation libraries), test:

1. **Valid data acceptance**
2. **Invalid data rejection** (wrong types, missing fields)
3. **Edge cases** (empty arrays, zero values, etc.)
4. **Error messages and structure**

```typescript
describe('ActivitySchema', () => {
  it('should accept valid activity data', () => {
    const result = ActivitySchema.safeParse(validActivity);
    expect(result.success).toBe(true);
  });

  it('should reject when id is a string', () => {
    const invalid = { ...validActivity, id: '1' };
    const result = ActivitySchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
```

## Mocking Guidelines

### Minimize Mocking

Mock only external dependencies you can't control:

- API calls
- Database queries
- File system operations
- Date/time functions
- Third-party services

### Don't Mock What You Own

If you control the code, test it directly rather than mocking it:

```typescript
// ❌ Bad - mocking your own code
const mockHelper = jest.fn().mockReturnValue(5);
const result = calculateTotal(mockHelper);

// ✅ Good - test the real integration
const result = calculateTotal(actualHelper);
expect(result).toBe(expectedValue);
```

## Test Maintenance

### Write Tests That Survive Refactoring

Good tests should:

- Pass when behavior is correct
- Fail when behavior is broken
- Not break during refactoring (if behavior doesn't change)

If your tests break every time you refactor without changing behavior, you're testing implementation details.

### Remove Tests That Don't Add Value

It's better to have fewer high-quality tests than many low-value tests. Regularly review and remove:

- Tests that duplicate TypeScript's guarantees
- Tests that don't verify actual output
- Tests that provide false confidence

## Summary

**Quality over quantity.** Write fewer, better tests that:

1. Verify actual behavior and outputs
2. Would fail if the contract is broken
3. Survive refactoring
4. Provide real confidence in the code

Remember: **If removing a test wouldn't reduce your confidence in the code, delete it.**
