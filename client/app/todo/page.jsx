"use client";

import React, { useEffect, useState } from "react";
import isAuth from "../../components/Auth";
import axios from "axios";
import { eraseCookie, getCookie } from "@/helpers/login.helper";
import { useRouter } from "next/navigation";

const Page = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const router = useRouter();

  const uesrToken = getCookie("magic-mind-auth-token"); // token to verify the user is authenticated or not

  const handleAddTodo = () => {
    // add a todo
    if (!modalData.title) return;
    console.log(modalData);
    axios
      .post("http://localhost:8080/todo/create", modalData, {
        headers: { Authorization: uesrToken },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setOpenModal(false);
  };

  const handleEdit = () => {
    // edit todo
    if (!todoId) return;
    axios
      .patch(`http://localhost:8080/todo/update/${todoId}`, modalData, {
        headers: { Authorization: uesrToken },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setTodoId("");
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    // delete todo
    if (!id) return;
    axios
      .delete(`http://localhost:8080/todo/delete/${id}`, {
        headers: { Authorization: uesrToken },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    eraseCookie("magic-mind-auth-token");
    router.push("/");
  };

  useEffect(() => {
    // initial api call to get all the todos accessible by the user
    axios
      .get("http://localhost:8080/todo/todos", {
        headers: { Authorization: uesrToken },
      })
      .then((res) => setTodos(res.data.todos))
      .catch((err) => console.log(err));
  }, [handleAddTodo]);

  return (
    <div className="container">
      <h1>Todo App</h1>
      <button className="addTodo" onClick={handleLogout}>
        Logout
      </button>
      <button className="addTodo" onClick={() => setOpenModal(true)}>
        Add Todo
      </button>

      <div className="todos">
        <table className="todoTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos &&
              todos.length > 0 &&
              todos.map((todo) => {
                return (
                  <tr key={todo._id}>
                    <td>{todo.title}</td>
                    <td>
                      {todo.status === true ? <p>Completed</p> : <p>Pending</p>}
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEdit(true);
                        setOpenModal(true);
                        setTodoId(todo._id);
                      }}
                    >
                      Edit
                    </td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div className="modal">
          <input
            type="text"
            placeholder="Todo title"
            onChange={(e) =>
              setModalData({ ...modalData, title: e.target.value })
            }
          />
          <select
            name=""
            id=""
            placeholder="Status"
            onChange={(e) =>
              setModalData({ ...modalData, status: e.target.value })
            }
          >
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
          </select>
          <button onClick={!edit ? handleAddTodo : handleEdit}>
            {edit ? "Edit" : "Add Todo"}
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
              setEdit(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default isAuth(Page);
