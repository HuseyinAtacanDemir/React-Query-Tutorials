import React, { useReducer, useState } from 'react'

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "add-todo":
            return {
                ...state,
                todos: [...state.todos, payload],
                todoCount: state.todoCount + 1
            }
        case "toggle-todo":

            return {
                ...state,
                todos: state.todos.map((todo, idx) => {
                    if (idx === payload.idx) {
                        if (!todo.isCompleted) state.doneCount = state.doneCount + 1
                        else state.doneCount = state.doneCount - 1
                        return { ...todo, isCompleted: !todo.isCompleted }
                    } else {
                        return todo
                    }
                }

                )
            }

        case "remove-todo":
            return {
                ...state,
                todos: state.todos.filter((todo, idx) => {

                    if(todo.isCompleted && idx === payload.idx) state.doneCount = state.doneCount - 1
                    return idx !== payload.idx
                }
                    
                ),
                todoCount: state.todoCount - 1,
                
            }

        default:
            return state;
    }
}

export const UseReducerDemo = () => {
    const [{ todos, todoCount, doneCount }, dispatch] = useReducer(reducer, { todos: [], todoCount: 0, doneCount: 0 });
    const [text, setText] = useState("");
    return (
        <div className="todo-container">
            <form onSubmit={e => {
                e.preventDefault();
                dispatch({ type: "add-todo", payload: { text, isCompleted: false } })
                setText("")
            }}>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
            </form>
            <hr />
            <span>Number of Todos todo: {todoCount}</span>
            <span>Number of Completed Todos: {doneCount}</span>
            <hr />
            {todos.map((todo, idx) =>
                <div className="todo-single">
                    <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.text}</div>
                    <button onClick={() => dispatch({ type: "toggle-todo", payload: { idx } })}>{!todo.isCompleted ? "Complete" : "Uncomplete"}</button>
                    <button onClick={() => dispatch({ type: "remove-todo", payload: { idx } })}>Remove</button>
                </div>
            )}

        </div >
    )
}
