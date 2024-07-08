# TO DO LIST -FRONTEND

## Description:
To Do List is a project designed to manage daily tasks. Each user has access to their dashboard where they can view and manage their tasks.

## Technologies used:
- React
- Typescript
- Tailwind
- React Router DOM
- Redux (for state management)
- Axios (for API requests)

  
## Architecture:

### General Overview
The frontend is built using React, Tailwind CSS used for styling, providing a utility-first approach for designing components. Redux is utilized for managing application state, allowing centralized data management across components. React Router DOM handles navigation within the application, enabling routing between different pages.

### Security:
Security is managed using JSON Web Tokens (JWT) for user authentication. JWT tokens are stored locally and included in API requests to authenticate users and securely grant access to their data and actions.

## Features:
- Create a user
- Login to the account
- View tasks and their status(pending/completed)
- Create a new task
- Update a task
- Deleting a task

## Installation:

- Clone the repository

```bash
git clone https://github.com/Ceciliaugarte/ToDoList-Frontend
```
- Navigate to the project directory

```bash
cd ToDoList-Frontend
```
- Install dependencies

```bash
npm install
```

- Create a .env file to write your enviroment variables

- Create a variable called VITE_API_URL to connect it to your backend project, as shown in the .env.example file.


- Run the development server

```bash
npm run dev
```

## Endpoints:

- `GET /` | Home page
- `GET /login` | Login page
- `GET /signup` | Register page
- `GET /tasks/:id` | Task details page 
- `GET /tasks/create` | Create a task form
- `GET /tasks/update/:id` | Update a task form


## Enviroment variables:

Make sure you have these variables in your .env file:

`VITE_API_URL`







