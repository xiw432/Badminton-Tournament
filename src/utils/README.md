# Utility Modules

This directory contains business logic utilities for the badminton tournament application.

## Modules

### category.js
Determines player age categories based on date of birth.

**Function:** `getCategory(dob)`
- **Input:** Date of birth string in YYYY-MM-DD format
- **Output:** Category string: "U-9" | "U-11" | "U-13" | "U-15" | "INELIGIBLE"

**Category Rules:**
- U-9: Born on or after January 1, 2018
- U-11: Born on or after January 1, 2016 and before January 1, 2018
- U-13: Born on or after January 1, 2014 and before January 1, 2016
- U-15: Born on or after January 1, 2012 and before January 1, 2014
- INELIGIBLE: Born before January 1, 2012

## Testing

### Running Tests

To run the category utility tests:

```bash
node src/utils/category.test.js
```

### Test Coverage

The category utility has comprehensive test coverage including:
- **Boundary date tests** for each category (34 test cases)
- **Invalid input handling** (null, undefined, empty string, malformed dates)
- **Edge cases** (leap years, year boundaries)

All tests validate requirements 3.1-3.6 from the specification.

### Test Results

```
Total: 34 tests
✓ U-9 category: 5 tests
✓ U-11 category: 5 tests
✓ U-13 category: 5 tests
✓ U-15 category: 5 tests
✓ INELIGIBLE category: 4 tests
✓ Invalid inputs: 7 tests
✓ Edge cases: 3 tests
```
