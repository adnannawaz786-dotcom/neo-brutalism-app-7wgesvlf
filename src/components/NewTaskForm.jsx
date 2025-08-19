import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'

export default function NewTaskForm({ onAddTask, onCancel }) {
  const [taskText, setTaskText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('general')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (typeof taskText !== 'string' || taskText.trim().length === 0) {
      return
    }

    const newTask = {
      id: Date.now().toString(),
      text: taskText.trim(),
      completed: false,
      priority: priority,
      category: category,
      createdAt: new Date().toISOString(),
      dueDate: null
    }

    if (typeof onAddTask === 'function') {
      onAddTask(newTask)
    }

    // Reset form
    setTaskText('')
    setPriority('medium')
    setCategory('general')
    setIsExpanded(false)
  }

  const handleCancel = () => {
    setTaskText('')
    setPriority('medium')
    setCategory('general')
    setIsExpanded(false)
    
    if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' }
  ]

  const categoryOptions = [
    { value: 'general', label: 'General' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <Input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border-2 border-black focus:border-black focus:ring-0 text-lg font-bold placeholder:font-normal"
            autoFocus
          />
          <Button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="border-2 border-black hover:bg-gray-100 px-3"
          >
            {isExpanded ? '−' : '+'}
          </Button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Priority</label>
                <div className="flex gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPriority(option.value)}
                      className={`px-3 py-2 border-2 border-black font-bold text-sm transition-all ${
                        priority === option.value
                          ? `${option.color} text-white shadow-[4px_4px_0px_0px_#000]`
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black font-bold bg-white focus:outline-none focus:ring-0"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={!taskText.trim()}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="px-6 py-3 border-2 border-black hover:bg-gray-100 font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}