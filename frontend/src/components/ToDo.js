import React from 'react'


const ToDoItem = ({todo}) => {
    return (
        <tr scope="row">
            <td>
                {todo.text}
            </td>
            <td>
                {todo.create}
            </td>
            <td>
                {todo.update}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.creator}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table class="table  table-bordered table-striped">
            <thead>
            <tr>
                <th scope="col">
                    Text
                </th>
                <th scope="col">
                    Create
                </th>
                <th scope="col">
                    Update
                </th>
                <th scope="col">
                    Project
                </th>
                <th scope="col">
                    Creator
                </th>

            </tr>
            </thead>

            {todos.map((todo) => <ToDoItem todo={todo}/>)}

        </table>
    )
}


export default ToDoList
