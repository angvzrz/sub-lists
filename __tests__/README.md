# Test Suite

This directory contains comprehensive tests for the project configuration files.

## Structure

- `workflows/` - Tests for GitHub Actions workflows
- `config/` - Tests for configuration files (package.json, etc.)

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

### CI Workflow Tests (`workflows/ci.test.ts`)
- File structure and YAML validity
- Workflow metadata (name, triggers)
- Jobs configuration
- Individual step validation
- Security best practices
- Workflow step ordering
- Vercel integration
- Package manager consistency
- Edge cases and error scenarios

### Package.json Tests (`config/package-json.test.ts`)
- File structure and JSON validity
- Required fields validation
- Scripts configuration (including new typecheck script)
- Dependencies and devDependencies
- Schema validation
- Version compatibility
- Script execution safety
- Integration with CI workflow
- Edge cases and error scenarios

## Adding New Tests

When adding new configuration files or making changes:

1. Create a new test file in the appropriate directory
2. Follow the existing test structure
3. Cover happy paths, edge cases, and failure scenarios
4. Ensure tests are deterministic and isolated
5. Use descriptive test names

## Test Philosophy

These tests validate configuration files that are critical to the development workflow:

- **CI Workflow**: Ensures deployment pipeline is correctly configured
- **Package.json**: Validates project metadata, dependencies, and scripts
- **Schema Validation**: Uses industry-standard tools (js-yaml, ajv) for validation
- **Security**: Checks for common security issues in configurations
- **Integration**: Verifies configurations work together correctly