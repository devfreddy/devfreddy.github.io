import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Select
} from '@chakra-ui/react'
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogTitle
} from './ui/dialog'

const categories = [
  'coding-style',
  'project-setup',
  'code-review',
  'testing',
  'documentation',
  'development-workflow'
]

const SnippetModal = ({ isOpen, onClose, snippet, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'coding-style',
    description: '',
    content: '',
    tags: '',
    reference: ''
  })

  useEffect(() => {
    if (snippet) {
      setFormData({
        title: snippet.title || '',
        category: snippet.category || 'coding-style',
        description: snippet.description || '',
        content: snippet.content || '',
        tags: snippet.tags ? snippet.tags.join(', ') : '',
        reference: snippet.reference || ''
      })
    } else {
      setFormData({
        title: '',
        category: 'coding-style',
        description: '',
        content: '',
        tags: '',
        reference: ''
      })
    }
  }, [snippet, isOpen])

  const handleSubmit = () => {
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const snippetData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      content: formData.content,
      tags: tagsArray,
      reference: formData.reference
    }

    onSave(snippetData)
    onClose()
  }

  const isValid = formData.title && formData.description && formData.content

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="xl">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {snippet ? 'Edit Custom Snippet' : 'Create Custom Snippet'}
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>

        <DialogBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="medium" mb={2}>Title *</Text>
              <Input
                placeholder="e.g., Python Type Hints Best Practices"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Box>

            <Box>
              <Text fontWeight="medium" mb={2}>Category *</Text>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text fontWeight="medium" mb={2}>Description *</Text>
              <Textarea
                placeholder="Brief description of what this snippet provides..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </Box>

            <Box>
              <Text fontWeight="medium" mb={2}>Tags</Text>
              <Input
                placeholder="e.g., python, types, best-practices (comma separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Separate tags with commas
              </Text>
            </Box>

            <Box>
              <Text fontWeight="medium" mb={2}>Reference Link</Text>
              <Input
                placeholder="e.g., https://example.com/docs (optional)"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                type="url"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Optional URL to source documentation or reference
              </Text>
            </Box>

            <Box>
              <Text fontWeight="medium" mb={2}>Content * (Markdown supported)</Text>
              <Textarea
                placeholder="## Your Snippet Content&#10;&#10;- Best practice 1&#10;- Best practice 2&#10;..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                fontFamily="mono"
                fontSize="sm"
              />
            </Box>
          </VStack>
        </DialogBody>

        <DialogFooter>
          <HStack spacing={2}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              disabled={!isValid}
            >
              {snippet ? 'Update Snippet' : 'Create Snippet'}
            </Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default SnippetModal
