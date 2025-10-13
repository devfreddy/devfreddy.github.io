---
description: Add documentation for a new feature
---

# New Feature Documentation

Add documentation for a new feature to the consolidated FEATURES.md file.

## Instructions

Ask the user for the feature name and details if not already provided, then:

## 1. Read Current Features

Read `docs/FEATURES.md` to understand the current structure and avoid duplicates.

## 2. Add Feature to Catalog Table

Add a new row to the Feature Catalog table at the top of `docs/FEATURES.md`:

```markdown
| [Feature Name](#feature-name-anchor) | 🟡 In Progress | `src/path/to/file.jsx` | Dependencies |
```

Status options:
- 🟢 Complete
- 🟡 In Progress
- 🔴 Planned
- ⚪ Not Started

## 3. Add Feature Section

Add a new section to `docs/FEATURES.md` with the following structure:

```markdown
## Feature Name

### Overview
[Brief description of what this feature does]

### What It Does
- Key capability 1
- Key capability 2
- Key capability 3
- User interaction details

### Key Props (if applicable)
\`\`\`jsx
<ComponentName
  prop1={type}  // Description
  prop2={type}  // Description
/>
\`\`\`

### Technical Details
- **File**: `src/path/to/file.jsx`
- **Dependencies**: List of dependencies
- **State Management**: How state is handled
- **Performance**: Key performance considerations

### Implementation Notes
- Important implementation details
- Known limitations
- Edge cases

### Future Enhancements (if applicable)
- Planned improvement 1
- Planned improvement 2

---
```

## 4. Update Feature Dependencies Graph (if needed)

If the new feature has dependencies on other features, update the dependencies graph section.

## 5. Update docs/README.md

Add the feature to the appropriate status section in `docs/README.md`:

- **Completed Features ✅** - If status is 🟢
- **In Progress 🚧** - If status is 🟡
- **Planned 📋** - If status is 🔴 or ⚪

## 6. Inform User

Tell the user:

```markdown
✅ Added feature documentation for: [Feature Name]

**Updated files:**
- [docs/FEATURES.md](docs/FEATURES.md) - Added feature section
- [docs/README.md](docs/README.md) - Updated feature status

**Next steps:**
1. Implement the feature
2. Update documentation as you build
3. Mark as complete when done

The feature is currently marked as [status]. Update the status in both files as you make progress.

Would you like me to help you start implementing this feature?
```

## Notes

- Use Title Case for feature names in headings
- Use kebab-case for anchor links
- Keep descriptions concise and actionable
- Include code examples where helpful
- Link to actual file paths in the codebase
- Update the feature status as work progresses
- If the feature is complex, you can expand the documentation, but try to keep it in a single section

## Example Feature Entry

```markdown
## Contact Form

### Overview
User-facing contact form with validation and email integration.

### What It Does
- Collects user inquiries (name, email, message)
- Client-side validation for all fields
- Spam protection with reCAPTCHA
- Email notification via backend API
- Success/error feedback to user

### Key Props
\`\`\`jsx
<ContactForm
  onSubmit={(data) => void}     // Form submission handler
  apiEndpoint={string}           // Backend API URL
  recaptchaSiteKey={string}      // reCAPTCHA public key
/>
\`\`\`

### Technical Details
- **File**: `src/components/ContactForm.jsx`
- **Dependencies**: Chakra UI, React Hook Form, reCAPTCHA
- **Validation**: Zod schema validation
- **API**: POST to `/api/contact` with JSON payload

### Implementation Notes
- Uses React Hook Form for performance
- Debounces validation to reduce re-renders
- Displays inline error messages
- Clears form on successful submission
- Rate limiting: 1 submission per minute per IP

### Future Enhancements
- Add file attachment support
- Implement email templates
- Add notification preferences
- Track submission analytics

---
```
