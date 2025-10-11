# Cocktails Page Feature

## Overview
A dedicated page showcasing a searchable and filterable collection of cocktail recipes with ingredients, instructions, and notes.

## What Problem Does This Solve?
- Demonstrates ability to build data-driven, interactive UIs
- Showcases filtering, searching, and state management skills
- Provides practical, useful content beyond typical portfolio material
- Shows attention to detail in UX design

## User Interaction
- Navigate to `/cocktails` route via navbar
- Search cocktails by name or ingredients using search input
- Filter by category using dropdown
- View real-time count of filtered results
- Browse recipe cards with ingredients and instructions
- See helpful message when no results match criteria

## Quick Start Examples

### Navigation to Cocktails Page
```jsx
<Link as={RouterLink} to="/cocktails">Cocktails</Link>
```

### Search Functionality
```javascript
const filteredCocktails = useMemo(() => {
  return cocktails.filter(cocktail => {
    const matchesSearch = cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cocktail.ingredients.some(ingredient =>
                           ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    const matchesCategory = selectedCategory === '' || cocktail.category === selectedCategory
    return matchesSearch && matchesCategory
  })
}, [cocktails, searchTerm, selectedCategory])
```

## Configuration Options

### Data Structure
Cocktails data loaded from `src/data/cocktails.json`:
- `id`: Unique identifier
- `name`: Cocktail name
- `category`: Drink category (Classic, Modern, etc.)
- `ingredients`: Array of {name, amount, unit, notes}
- `instructions`: Step-by-step preparation
- `notes`: Additional tips or variations

### Search Behavior
- Case-insensitive search
- Matches cocktail names and ingredient names
- Real-time filtering as user types

## Common Use Cases

1. **Recipe Discovery**: Browse cocktail collection
2. **Ingredient Search**: Find cocktails using specific ingredients
3. **Category Browsing**: Filter by drink style/type
4. **Recipe Reference**: View detailed preparation instructions
