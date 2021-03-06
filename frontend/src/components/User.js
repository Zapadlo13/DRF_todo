import React from 'react'


const UserItem = ({user}) => {
    return (
        <tbody>
        <tr scope="row">
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
        </tbody>
    )
}

const UserList = ({users}) => {
    return (
        <table className="table  table-bordered table-striped">
            <thead>
            <tr>
                <th scope="col">
                    Username
                </th>
                <th scope="col">
                    First name
                </th>
                <th scope="col">
                    Last Name
                </th>
                <th scope="col">
                    Email
                </th>
            </tr>
            </thead>

            {users.map((user) => <UserItem user={user}/>)}

        </table>
    )
}


export default UserList
