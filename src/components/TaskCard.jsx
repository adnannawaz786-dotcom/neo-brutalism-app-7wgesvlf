import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Edit } from 'lucide-react'
import { motion } from 'framer-motion'

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const handleToggle = () => {
    if (typeof onToggle === 'function') {
      onToggle(task.id)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (typeof onDelete === 'function') {
      onDelete(task.id)
    }
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    if (typeof onEdit === 'function') {
      onEdit(task)
    }
  }

  if (!task) {
    return null
  }

  const priorityColors = {
    low: 'border-l-green-500 bg-green-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    high: 'border-l-red-500 bg-red-50'
  }

  const priorityColor = priorityColors[task.priority] || priorityColors.medium

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card 
        className={`
          ${priorityColor}
          border-l-8 border-4 border-black shadow-[8px_8px_0px_0px_#000]
          hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200
          cursor-pointer transform hover:-translate-x-1 hover:-translate-y-1
          ${task.completed ? 'opacity-60' : ''}
        `}
        onClick={handleToggle}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-1">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`
                    w-6 h-6 border-3 border-black rounded-none
                    flex items-center justify-center cursor-pointer
                    ${task.completed 
                      ? 'bg-black' 
                      : 'bg-white hover:bg-gray-100'
                    }
                  `}
                  onClick={handleToggle}
                >
                  {task.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white"
                    />
                  )}
                </motion.div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`
                  text-lg font-black text-black mb-2 break-words
                  ${task.completed ? 'line-through' : ''}
                `}>
                  {task.title || 'Untitled Task'}
                </h3>
                
                {task.description && (
                  <p className={`
                    text-gray-700 text-sm mb-3 break-words
                    ${task.completed ? 'line-through' : ''}
                  `}>
                    {task.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`
                    px-2 py-1 border-2 border-black font-bold uppercase
                    ${task.priority === 'high' ? 'bg-red-200' : 
                      task.priority === 'medium' ? 'bg-yellow-200' : 
                      'bg-green-200'
                    }
                  `}>
                    {task.priority || 'medium'} priority
                  </span>
                  
                  {task.category && (
                    <span className="px-2 py-1 bg-gray-200 border-2 border-black font-bold uppercase">
                      {task.category}
                    </span>
                  )}
                  
                  {task.dueDate && (
                    <span className="px-2 py-1 bg-blue-200 border-2 border-black font-bold uppercase">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEdit}
                className="p-2 bg-blue-200 border-2 border-black hover:bg-blue-300 transition-colors"
                aria-label="Edit task"
              >
                <Edit size={16} className="text-black" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="p-2 bg-red-200 border-2 border-black hover:bg-red-300 transition-colors"
                aria-label="Delete task"
              >
                <Trash2 size={16} className="text-black" />
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TaskCard