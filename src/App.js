import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input-form"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button className="btn btn--main" type="submit">
        Add
      </button>
    </form>
  );
};

const EditTodo = ({ todo, updateTodo, cancelEdit }) => {
  const [value, setValue] = useState(todo.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(todo.id, value);
    cancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn--main" type="submit">Update</button>
      <button className="btn btn--outline" onClick={cancelEdit}>Cancel</button>
    </form>
  );
};

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    // <li
    //   style={{ listStyleType: "none", display: "flex", alignItems: "center", opacity: todo.completed ? 0.5 : 1,}}
    // >

    <li
      style={{
        listStyleType: "none",
        display: "flex",
        alignItems: "center",
        position: "relative", // Required for overlay positioning
      }}
    >
      {/* Dark overlay */}
      {todo.completed && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark semi-transparent color
            zIndex: 1, // Ensure the overlay appears above other content
            pointerEvents: "none", // Allow clicks to pass through the overlay
            borderRadius: "8px"
          }}
        />
      )}

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {isEditing ? (
        <EditTodo todo={todo} updateTodo={editTodo} cancelEdit={cancelEdit} />
      ) : (
        <>
          <span
            className="text-input"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div className="btn-container">
            <button className="btn btn--main" onClick={handleEditClick}>
              Edit
            </button>
            <button className="btn btn--outline" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo, filterTodos }) => {
  const filteredTodos = filterTodos(todos);

  return (
    <ul style={{ padding: 0 }}>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const filterTodos = (todos) => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "uncompleted":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div >
      <div className="header">
        <h1>Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <div className="filter">
          <button className="btn btn--main" onClick={() => setFilter("all")}>
            All
          </button>
          <button className="btn btn--outline" onClick={() => setFilter("completed")}>
            Completed
          </button>
          <button className="btn btn--outline" onClick={() => setFilter("uncompleted")}>
            Uncompleted
          </button>
        </div>
      </div>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        filterTodos={filterTodos}
      />
    </div>
  );
};

export default App;
