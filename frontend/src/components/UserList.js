
import React from 'react';

const UserList = ({ users, deleteUser }) => {
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                        {user.firstName} {user.lastName} - {user.phoneNumber} - {user.email} - {user.address}
                    </span>
                    <button className="button" onClick={() => deleteUser(index)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
