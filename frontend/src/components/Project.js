import React from 'react'
import {Link, useParams} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tbody>
        <tr scope="row">
            <td>
                <Link to={`/projects/${project.id}`}>    {project.name} </Link>
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button className="btn btn-danger btn-block" type='button'
                        onClick={() => deleteProject(project.id)}>Delete
                </button>
            </td>
        </tr>
        </tbody>
    )
}

const ProjectList = ({projects, deleteProject}) => {

    return (
        <div>
            <table className="table  table-bordered table-striped">
                <thead>
                <tr>
                    <th scope="col">
                        Name
                    </th>
                    <th scope="col">
                        Repository
                    </th>
                    <th scope="col">
                        Users
                    </th>
                    <th scope="col">

                    </th>
                </tr>
                </thead>

                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}

            </table>

            <Link className="btn btn-success btn-block" to='/projects/create'>Create</Link>
        </div>
    )
}


const ProjectUserItem = ({item}) => {
    return (
        <li>
            {item.username} ({item.email})
        </li>
    )
}

const ProjectDetail = ({getProject, item}) => {
    let {id} = useParams();
    getProject(id)
    console.log(item)
    let users = item.users ? item.users : []
    console.log(id)


    return (
        <div>
            <h1>{item.name}</h1>
            Repository: <a href={item.repository}>{item.repository}</a>
            <p></p>
            Users:
            <ol>
                {users.map((user) => <ProjectUserItem item={user}/>)}
            </ol>
        </div>
    )
}

export {ProjectDetail, ProjectList}
