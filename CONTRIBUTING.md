# Contributing Guide

## How to Contribute to FirstSaaS

### Getting Started

1. Fork the repository
2. Clone your fork
3. Run `./setup.sh` (Linux/Mac) or `setup.bat` (Windows)
4. Create a feature branch: `git checkout -b feature/your-feature`

### Code Style

- Use ESLint for code consistency
- Format code with Prettier
- Write meaningful commit messages
- Add tests for new features

### Commit Messages

Follow conventional commits:
```
feat: add new feature
fix: fix bug
docs: update documentation
test: add tests
refactor: refactor code
style: format code
chore: update dependencies
```

### Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit PR to `develop` branch
6. Ensure all tests pass
7. Request code review

### Testing Requirements

- [ ] All tests pass: `npm test`
- [ ] Coverage maintained or improved
- [ ] BDD scenarios pass: `npm run test:bdd`
- [ ] Linting passes: `npm run lint`

### Code Review Checklist

- [ ] Code follows style guide
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No console logs in production code
- [ ] No hardcoded values
- [ ] Error handling is complete

### Reporting Bugs

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version, etc.)
- Screenshots if applicable

---

Last Updated: 2026-05-17
