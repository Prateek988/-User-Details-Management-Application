import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ addUser }) => { // Receive addUser as a prop
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
    });

    // Function to handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateUser(user)) {
            const userExists = await checkIfUserExists(user.email);
            if (userExists) {
                alert('Email already exists. Please use a different email.');
                return;
            }
            try {
                await addUser(user);  // Call the addUser function passed from App.js
                setUser({ firstName: '', lastName: '', phoneNumber: '', email: '', address: '' });
            } catch (error) {
                console.error('Error adding user:', error);
            }
        } else {
            alert('Please fill in all fields correctly.');
        }
    };

    // Function to check if the user already exists
    const checkIfUserExists = async (email) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users?email=${email}`);
            return response.data.length > 0;
        } catch (error) {
            console.error('Error checking user existence:', error);
            return false;
        }
    };

    // Function to validate form inputs
    const validateUser = (user) => {
        return Object.values(user).every((field) => field.trim() !== '');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" required />
            <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email ID" required />
            <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" required />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;
