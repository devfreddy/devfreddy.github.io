# Prompt Builder Experiment - Planning Document

## Concept Overview

An interactive tool that allows users to build custom Claude prompts from a curated library of snippets. Users can select, combine, and download prompt configurations for their projects.

## Core Value Proposition

1. **Reusability**: Save time with proven prompt patterns and structures
2. **Knowledge Sharing**: Democratize prompt engineering expertise
3. **Learning Tool**: See examples of effective prompts and configurations
4. **Context Management**: Compose modular snippets for efficient token usage

## Feature Categories

### 1. Project Setup Snippets
- React + TypeScript starter prompts
- Python FastAPI backend setups
- Node.js/Express configurations
- Full-stack combinations

### 2. Code Review Instructions
- Different strictness levels (strict, balanced, lenient)
- Focus areas (security, performance, style, architecture)
- Language-specific review criteria

### 3. Custom Slash Commands
- Git workflow templates
- Testing workflow templates
- Documentation generation templates
- Deployment workflows

### 4. MCP Server Configs
- File system integration examples
- Database connection templates
- API integration patterns

### 5. Coding Style Guides
- Language-specific conventions (TypeScript, Python, Go, etc.)
- Team formatting preferences
- Architecture patterns

### 6. Testing Strategies
- Unit test patterns (Jest, Pytest, etc.)
- TDD workflow instructions
- Integration test approaches
- E2E test patterns

### 7. Documentation Standards
- API documentation templates
- README structures
- Code comment guidelines
- Changelog formats

## User Flow

```
1. User lands on Prompt Builder page
2. Browse/filter snippets by category and tags
3. Select desired snippets (checkbox or click to add)
4. View live preview of composed prompt
5. Reorder/remove snippets as needed
6. Download as .md or copy to clipboard
7. (Optional) Save custom combinations for later
```

## Data Structure

```javascript
{
  id: "unique-id",
  title: "Snippet Title",
  category: "project-setup",
  tags: ["react", "typescript", "vite"],
  description: "Brief description of what this snippet does",
  content: "The actual markdown/text content",
  author: "community" | "official",
  created: "2025-01-15",
  popularity: 0 // number of times used
}
```

## UI Components Needed

### Main Components
1. **SnippetLibrary** - Browseable list of all snippets
2. **SnippetCard** - Individual snippet display with select action
3. **SelectedSnippets** - Sidebar showing chosen snippets
4. **PreviewPane** - Live preview of composed prompt
5. **ExportControls** - Download/copy buttons and options
6. **FilterBar** - Category and tag filters

### Smaller Components
- **CategoryPill** - Filterable category badges
- **TagPill** - Filterable tag badges
- **SnippetSearch** - Search functionality
- **DragHandle** - For reordering selected snippets

## Technical Considerations

### State Management
- Selected snippets array (with order)
- Active filters (categories, tags, search)
- Composed output (derived from selected snippets)

### Storage Options
- **Phase 1**: Static JSON file with snippets
- **Phase 2**: LocalStorage for user's saved combinations
- **Phase 3** (Optional): Backend API for community contributions

### Export Formats
1. **Markdown File** - Single .md with all snippets combined
2. **Claude Code Config** - Structured for `.claude/` directory
3. **JSON** - For programmatic use
4. **Plain Text** - Copy to clipboard

## Implementation Phases

### Phase 1: MVP (Current Goal)
- [ ] Create basic data structure with 10-15 example snippets
- [ ] Build snippet library UI
- [ ] Implement selection mechanism
- [ ] Create preview pane
- [ ] Add download as markdown functionality

### Phase 2: Enhanced Features
- [ ] Add search and filtering
- [ ] Implement drag-to-reorder
- [ ] Add tag-based filtering
- [ ] Create multiple export formats
- [ ] Add snippet descriptions and metadata display

### Phase 3: Advanced Features
- [ ] LocalStorage for saved combinations
- [ ] User customization of snippets
- [ ] Import/export custom snippet libraries
- [ ] Community sharing mechanism
- [ ] Usage analytics/popularity tracking

## Initial Snippet Ideas

### Quick Starters
1. **TypeScript Best Practices** - Strict typing guidelines
2. **React Performance** - Optimization instructions
3. **Git Workflow** - Commit message standards
4. **API Design** - RESTful conventions
5. **Error Handling** - Comprehensive error patterns

### Project-Specific
6. **Next.js Setup** - Full Next.js configuration prompt
7. **FastAPI Backend** - Python backend setup
8. **Testing with Jest** - Jest configuration and patterns

### Code Review
9. **Security Review** - Security-focused review criteria
10. **Performance Review** - Performance optimization focus

### Documentation
11. **API Docs Template** - OpenAPI/REST documentation
12. **README Template** - Comprehensive README structure

## Success Metrics

- Number of snippet combinations created
- Most popular snippets/categories
- User engagement time
- Download/copy actions
- Return visits to the tool

## Future Enhancements

- **AI-Powered Suggestions**: Recommend snippets based on selected ones
- **Template Library**: Pre-built combinations for common scenarios
- **Version Control**: Track changes to snippets over time
- **Collaborative Editing**: Allow teams to build shared libraries
- **Browser Extension**: Quick access to prompt builder from any page
