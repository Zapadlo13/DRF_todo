import React from 'react'
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
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
            <td>
                <button className="btn btn-danger btn-block" type='button'
                        onClick={() => deleteToDo(todo.id)}>Delete
                </button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
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
                    <th scope="col">

                    </th>
                </tr>
                </thead>

                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}

            </table>
            <Link className="btn btn-success btn-block" to='/todos/create'>Create</Link>
        </div>
    )
}


export default ToDoList
