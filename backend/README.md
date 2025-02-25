# Todo App Backend

A robust RESTful API backend for a Todo application built with Node.js, Express, TypeScript, and SQLite.

## Features

- CRUD operations for todos and categories
- Filtering todos by completion status
- Sorting todos by due date
- Category management
- Input validation
- Error handling
- Logging system
- TypeScript support
- SQLite database

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
For development:
```bash
npm run dev
```

## API Endpoints

### Todos

- `POST /api/todos` - Create a new todo
- `GET /api/todos` - Get all todos
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id` - Toggle a todo
- `DELETE /api/todos/:id` - Delete a todo

Query parameters for filtering and sorting:
- `status`: 'completed' | 'active'
- `sortBy`: 'dueDate'
- `order`: 'asc' | 'desc'

### Categories

- `POST /api/categories` - Create a new category
- `GET /api/categories` - Get all categories
- `DELETE /api/categories/:id` - Delete a category

## Request Examples

### Create a Todo

```json
POST /api/todos
{
  "title": "Complete project",
  "description": "Finish the todo app implementation",
  "dueDate": "2024-01-01",
  "categoryId": 1
}
```

### Create a Category

```json
POST /api/categories
{
  "name": "Work"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests