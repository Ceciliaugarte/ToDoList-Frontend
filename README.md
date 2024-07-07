# TO DO LIST -FRONTEND

## Description:
To do list is a project to save daily tasks, in which each user has his dashboard with their tasks.

## Technologies used:
- React
- Typescript
- Tailwind
- React Router DOM
- Redux (for state management)
- Axios (for API requests)

## Features:
- Create a user
- Login in the account
- See the tasks and its status(pending/completed)
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


- Run the command

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







