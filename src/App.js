import React, { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";
import "./App.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState(""); // Edit for date
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo || !date) {
      showAlert(true, "red-warning", "Please enter an input!");
    } else if (todo && date && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, act: todo, date: date };
          }
          return item;
        })
      );
      setTodo("");
      setDate("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "green-warning", "Item changed!");
    } else {
      showAlert(true, "green-warning", "Added activity");
      const newItem = {
        id: new Date().getTime().toString(),
        act: todo,
        date: date,
      };
      setList([...list, newItem]);
      setTodo("");
      setDate("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "red-warning", "Activities has been cleared!");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "red-warning", "Activity removed!");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const currentItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTodo(currentItem.todo);
    setDate(currentItem.date);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-main">
      <form className="submit-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>My Todo List</h3>
        <div className="form-style">
          <input
            type="text"
            className="input-style"
            value={todo}
            placeholder="Enter your next activity!"
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="date"
            className="input-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="item-list">
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button className="clear-btn" onClick={clearList}>
            Clear activities
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
