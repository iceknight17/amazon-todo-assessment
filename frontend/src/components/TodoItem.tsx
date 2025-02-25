import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoAsync, deleteTodoAsync } from '../store/todosSlice';
import { Todo } from '../types';
import { format } from 'date-fns';
import { TodoForm } from './TodoForm';
import { CheckCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = async () => {
    try {
      await dispatch(toggleTodoAsync(todo)).unwrap();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTodoAsync(todo.id)).unwrap();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="p-4">
        <TodoForm todo={todo} onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={handleToggle}
            className={classNames(
              'flex-shrink-0 h-6 w-6 rounded-full border-2',
              todo.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'
            )}
          >
            {Boolean(todo.completed) && (
              <CheckCircleIcon className="h-5 w-5 text-white" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900">
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.title}
              </span>
            </div>
            {todo.description && (
              <p className="mt-1 text-sm text-gray-500">{todo.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Created At: {format(new Date(todo.createdAt), 'MMM d, yyyy hh:mm')}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-500"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};