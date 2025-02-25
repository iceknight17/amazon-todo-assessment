import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const categories = useSelector((state: RootState) => state.categories.items);
  const filters = useSelector((state: RootState) => state.filters);

  const filteredAndSortedTodos = todos
    .filter(todo => {
      if (filters.searchQuery) {
        return todo.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          todo.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      } else {
        return true;
      }
    })
    .filter(todo => {
      if (filters.status === 'active') return !todo.completed;
      if (filters.status === 'completed') return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const todosByCategory = filteredAndSortedTodos.reduce((acc, todo) => {
    const categoryId = todo.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(todo);
    return acc;
  }, {} as Record<string, typeof todos>);

  return (
    <div className="space-y-8">
      {categories.map(category => {
        const categoryTodos = todosByCategory[category.id] || [];
        if (categoryTodos.length === 0) return null;

        return (
          <div key={category.id} className="bg-white rounded-lg shadow">
            <div 
              className="px-4 py-3 border-b"
              style={{ borderLeftColor: "blue", borderLeftWidth: '4px' }}
            >
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {categoryTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};