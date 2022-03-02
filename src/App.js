import React, { useState, useEffect } from "react";
import todos from "./apis";

import Form from "./views/Form/Form.jsx";
import Section from "./views/Section/Section.jsx";
import List from "./views/List/List.jsx";
import flower from './img/flower.png';
import './App.css'

const appTitle = "Flores del Tampo";

const App = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await todos.get("/todos");
            setTodoList(data);
        }

        fetchData();
    }, []);

    const addTodo = async (item) => {
        const { data } = await todos.post("/todos", item);
        setTodoList((oldList) => [...oldList, data]);
    };

    const removeTodo = async (id) => {
        await todos.delete(`/todos/${id}`);
        setTodoList((oldList) => oldList.filter((item) => item._id !== id));
    };

    const editTodo = async (id, item) => {
        await todos.put(`/todos/${id}`, item);
    };

    return (
        <>
        <div className="header">
        <img className="flowers" src={flower} alt="garden"/>
       </div>
        <div className="ui container center aligned">
            <Section>
                <h1 className="title">{appTitle}</h1>
                <h2 className="subtitle">TO-DO LIST</h2>
            </Section>

            <Section>
                <Form addTodo={addTodo} />
            </Section>

            <Section>
                <List
                    editTodoListProp={editTodo}
                    removeTodoListProp={removeTodo}
                    list={todoList}
                />
            </Section>
        </div>
        </>
    );
};

export default App;