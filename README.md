# Todo App

This is a simple todo application built with React. It allows users to add, edit, delete, and mark todos as completed or uncompleted.

## Features

- Add a new todo by entering text in the input field and clicking "Add".
- Mark a todo as completed or uncompleted by clicking the checkbox.
- Edit an existing todo by clicking the "Edit" button, making changes in the input field, and clicking "Update".
- Delete a todo by clicking the "Delete" button.
- Filter todos by All, Completed, or Uncompleted using the filter buttons.

## Technologies Used

- React
- HTML
- CSS

## How to Run the App

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and go to `http://localhost:3000` to view the app.

## Project Structure

```plaintext
todo-app/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── TodoForm.js
│   │   ├── TodoList.js
│   │   ├── TodoItem.js
│   │   └── EditTodo.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── .gitignore