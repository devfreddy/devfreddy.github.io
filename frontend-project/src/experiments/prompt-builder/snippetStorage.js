// Local storage utilities for custom snippets

const STORAGE_KEY = 'prompt-builder-custom-snippets'

export const loadCustomSnippets = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading custom snippets:', error)
    return []
  }
}

export const saveCustomSnippets = (snippets) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets))
    return true
  } catch (error) {
    console.error('Error saving custom snippets:', error)
    return false
  }
}

export const addCustomSnippet = (snippet) => {
  const snippets = loadCustomSnippets()
  const newSnippet = {
    ...snippet,
    id: `custom-${Date.now()}`,
    author: 'custom',
    created: new Date().toISOString().split('T')[0]
  }
  snippets.push(newSnippet)
  saveCustomSnippets(snippets)
  return newSnippet
}

export const updateCustomSnippet = (snippetId, updates) => {
  const snippets = loadCustomSnippets()
  const index = snippets.findIndex(s => s.id === snippetId)
  if (index !== -1) {
    snippets[index] = { ...snippets[index], ...updates }
    saveCustomSnippets(snippets)
    return snippets[index]
  }
  return null
}

export const deleteCustomSnippet = (snippetId) => {
  const snippets = loadCustomSnippets()
  const filtered = snippets.filter(s => s.id !== snippetId)
  saveCustomSnippets(filtered)
  return filtered
}

export const exportCustomSnippets = () => {
  const snippets = loadCustomSnippets()
  const dataStr = JSON.stringify(snippets, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `custom-snippets-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const importCustomSnippets = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        if (!Array.isArray(imported)) {
          reject(new Error('Invalid format: expected an array of snippets'))
          return
        }

        // Validate snippet structure
        const valid = imported.every(s =>
          s.title && s.category && s.content && Array.isArray(s.tags)
        )

        if (!valid) {
          reject(new Error('Invalid snippet format'))
          return
        }

        const existing = loadCustomSnippets()
        const merged = [...existing, ...imported.map(s => ({
          ...s,
          id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          author: 'custom',
          created: s.created || new Date().toISOString().split('T')[0]
        }))]

        saveCustomSnippets(merged)
        resolve(merged)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}

export const clearAllCustomSnippets = () => {
  localStorage.removeItem(STORAGE_KEY)
}
