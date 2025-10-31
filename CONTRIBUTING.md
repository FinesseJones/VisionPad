# Contributing to VisionPad

Thank you for your interest in contributing! 🎉

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
\`\`\`bash
git clone https://github.com/yourusername/visionpad.git
cd visionpad
\`\`\`

3. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

4. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

## 🌿 Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

Example: `feature/ai-summarization`

## 📝 Commit Messages

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

Example: `feat: add AI-powered note summarization`

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing code patterns
- Use functional components with hooks
- Keep components under 250 lines
- Extract reusable logic to hooks

### Component Structure
\`\`\`typescript
// 1. Imports
import React from 'react';

// 2. Types
interface Props {
  title: string;
}

// 3. Component
export const Component: React.FC<Props> = ({ title }) => {
  // 4. State and hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div>{title}</div>;
};
\`\`\`

### Context Providers
- Keep contexts focused on single domain
- Provide custom hooks for access
- Memoize expensive computations
- Use localStorage for persistence

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage
npm test -- --coverage
\`\`\`

## 📚 Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Update FEATURES.md for new features
- Add JSDoc comments for complex functions

## 🐛 Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

## 💡 Feature Requests

Include:
- Problem statement
- Proposed solution
- Use cases
- Mockups (if applicable)

## 🔍 Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## 📋 PR Checklist

- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors
- [ ] Builds successfully
- [ ] Responsive design tested
- [ ] Dark mode tested

## 🎨 Design Guidelines

- Follow existing color scheme
- Use Tailwind utility classes
- Maintain consistent spacing
- Ensure accessibility (WCAG 2.1)
- Test on multiple screen sizes

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the code, not the person

## 📞 Questions?

- Open a GitHub Discussion
- Join our Discord (coming soon)
- Email: support@visionpad.dev

Thank you for contributing! 🙏
