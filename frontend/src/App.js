import React, { useState } from 'react';
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);

    // Function to add a user to the state
    const addUser = (user) => {
        setUsers([...users, user]);
    };

    // Function to delete a user from the state
    const deleteUser = (index) => {
        const newUsers = users.filter((_, i) => i !== index);
        setUsers(newUsers);
    };

    return (
        <div className="App">
            <h1 className='userform'>User Details Management</h1>
            {/* Pass addUser function as a prop */}
            <UserForm addUser={addUser} />
            <h2 className='userlist'>User List</h2>
            <UserList users={users} deleteUser={deleteUser} />
        </div>
    );
};

export default App;
