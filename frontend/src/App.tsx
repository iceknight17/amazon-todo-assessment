import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { CategoryForm } from './components/CategoryForm';
import { Filters } from './components/Filters';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './store/todosSlice';
import { fetchCategories } from './store/categoriesSlice';

function AppContent() {
  const dispatch = useDispatch();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          <div className="space-x-4">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              New Category
            </button>
            <button
              onClick={() => setIsAddingTodo(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              New Todo
            </button>
          </div>
        </div>

        <Filters />

        {isAddingTodo && (
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Todo</h2>
            <TodoForm onClose={() => setIsAddingTodo(false)} />
          </div>
        )}

        {isAddingCategory && (
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h2>
            <CategoryForm onClose={() => setIsAddingCategory(false)} />
          </div>
        )}

        <TodoList />
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;