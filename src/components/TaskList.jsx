import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [filter, setFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    let filtered = tasks || [];
    
    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }
    
    setFilteredTasks(filtered);
  }, [tasks, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <h3 className="text-2xl font-black text-gray-800 mb-4">NO TASKS YET!</h3>
          <p className="text-lg font-bold text-gray-600">ADD YOUR FIRST TASK TO GET STARTED</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        {['all', 'active', 'completed'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => handleFilterChange(filterType)}
            className={`px-6 py-3 font-black text-sm uppercase tracking-wider border-4 border-black transition-all duration-200 transform hover:scale-105 ${
              filter === filterType
                ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Task Count */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4">
        <div className="flex justify-between items-center">
          <span className="font-black text-lg">
            SHOWING: {filteredTasks.length} TASK{filteredTasks.length !== 1 ? 'S' : ''}
          </span>
          <span className="font-bold text-gray-600">
            TOTAL: {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-gray-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
            <h3 className="text-xl font-black text-gray-800 mb-2">NO {filter.toUpperCase()} TASKS</h3>
            <p className="font-bold text-gray-600">
              {filter === 'active' && 'ALL YOUR TASKS ARE COMPLETED!'}
              {filter === 'completed' && 'NO COMPLETED TASKS YET'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;