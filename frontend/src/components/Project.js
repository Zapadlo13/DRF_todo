import React from 'react'
import {Link, useParams} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
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

        </tr>
    )
}

const ProjectList = ({projects}) => {
    console.log(projects)
    return (
        <table class="table  table-bordered table-striped">
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

            </tr>
            </thead>

            {projects.map((project) => <ProjectItem project={project}/>)}

        </table>
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
