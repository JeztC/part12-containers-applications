import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from "./Todo";

const todo = {
    _id: "6300ac23efffb31778d4924a",
    text: 'testTodo',
    done: false
}

test('checks if the component is rendered', async () => {
    const mockFunction = jest.fn()
    const otherFunction = jest.fn()
    render(<Todo todo={todo} onClickDelete = {mockFunction} onClickComplete = {otherFunction} />)
    const done = screen.getByText("This todo is not done")
    const todoTitle = screen.getByText(todo.text)
    expect(todoTitle).toBeDefined()
    expect(done).toBeDefined()
})