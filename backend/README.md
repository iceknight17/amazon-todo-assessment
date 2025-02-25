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
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the server:
   ```bash
   npm start
   ```

For development:
```bash
npm run dev
```

## API Endpoints

### Todos

- `POST /api/todos` - Create a new todo
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `GET /api/todos/category/:categoryId` - Get todos by category

Query parameters for filtering and sorting:
- `status`: 'completed' | 'active'
- `sortBy`: 'dueDate'
- `order`: 'asc' | 'desc'

### Categories

- `POST /api/categories` - Create a new category
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
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

## Project Structure

```
src/
├── controllers/     # Request handlers
├── database/       # Database configuration and schema
├── middleware/     # Express middleware
├── repositories/   # Data access layer
├── routes/        # API routes
├── services/      # Business logic
├── types/         # TypeScript interfaces
├── utils/         # Utility functions
└── validators/    # Input validation
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests