import React from "react";

const Todo = (props) => {
    const doneInfo = (
        <>
            <span>This todo is done</span>
            <span>
              <button onClick={props.onClickDelete(props.todo)}> Delete </button>
            </span>
        </>
    )

    const notDoneInfo = (
        <>
            <span>
              This todo is not done
            </span>
            <span>
              <button onClick={props.onClickDelete(props.todo)}> Delete </button>
              <button onClick={props.onClickComplete(props.todo)}> Set as done </button>
            </span>
        </>
    )

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
            <span>
              {props.todo.text}
            </span>
            {props.todo.done ? doneInfo : notDoneInfo}
        </div>
    )
}

export default Todo