import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync, updateTodoAsync } from '../store/todosSlice';
import { RootState } from '../store';
import { Todo } from '../types';

interface TodoFormProps {
  todo?: Todo;
  onClose: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.items);

  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    dueDate: todo?.dueDate || '',
    categoryId: todo?.categoryId || categories[0]?.id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const todoData = {
      id: todo?.id || crypto.randomUUID(),
      ...formData,
      completed: Boolean(todo?.completed) || false,
      createdAt: todo?.createdAt || new Date().toISOString(),
    };

    try {
      if (todo) {
        await dispatch(updateTodoAsync(todoData)).unwrap();
      } else {
        await dispatch(addTodoAsync(todoData)).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {todo ? 'Update' : 'Create'} Todo
        </button>
      </div>
    </form>
  );
};