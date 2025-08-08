import { useState, useMemo } from 'react'
import cocktailsData from '../data/cocktails.json'
import './CocktailsPage.css'

const CocktailsPageBasic = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const cocktails = useMemo(() => cocktailsData.cocktails || [], [])
  const categories = useMemo(() => cocktailsData.categories || [], [])

  // Filter cocktails based on search term and category
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

  const formatIngredient = (ingredient) => {
    const amount = ingredient.amount && ingredient.amount !== 'as needed' && ingredient.amount !== 'optional' 
      ? `${ingredient.amount}${ingredient.unit ? ` ${ingredient.unit}` : ''}` 
      : ingredient.amount || ''
    
    return amount ? `${amount} ${ingredient.name}` : ingredient.name
  }

  return (
    <div className="cocktails-page">
      <div className="cocktails-container">
        <div className="cocktails-header">
          <h1 className="cocktails-title">Cocktail Collection</h1>
          <p className="cocktails-description">
            Explore our curated collection of {cocktails.length} cocktail recipes, 
            from classic favorites to modern creations.
          </p>
        </div>

        {/* Filters */}
        <div className="cocktails-filters">
          <input
            type="text"
            className="cocktails-search"
            placeholder="Search cocktails or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="cocktails-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="cocktails-count">
          Showing {filteredCocktails.length} of {cocktails.length} cocktails
        </p>

        {/* Cocktail Grid */}
        <div className="cocktails-grid">
          {filteredCocktails.map((cocktail) => (
            <div key={cocktail.id} className="cocktail-card">
              <div className="cocktail-header">
                <h3 className="cocktail-name">{cocktail.name}</h3>
                <span className="cocktail-category">{cocktail.category}</span>
              </div>

              {/* Ingredients */}
              <div className="cocktail-section">
                <h4 className="section-title">Ingredients:</h4>
                <ul className="ingredients-list">
                  {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      {formatIngredient(ingredient)}
                      {ingredient.notes && (
                        <span className="ingredient-notes"> ({ingredient.notes})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions (if available) */}
              {cocktail.instructions && cocktail.instructions.length > 0 && (
                <div className="cocktail-section">
                  <h4 className="section-title">Instructions:</h4>
                  <ol className="instructions-list">
                    {cocktail.instructions.map((instruction, index) => (
                      <li key={index} className="instruction-item">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Notes (if available) */}
              {cocktail.notes && (
                <div className="cocktail-section">
                  <h4 className="section-title">Notes:</h4>
                  <p className="cocktail-notes">{cocktail.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredCocktails.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">
              No cocktails found matching your search criteria.
            </p>
            <p className="no-results-help">
              Try adjusting your search or filter options.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CocktailsPageBasic