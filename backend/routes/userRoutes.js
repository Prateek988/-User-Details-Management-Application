const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/add', async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, address } = req.body;
     
        if (!firstName || !lastName || !phoneNumber || !email || !address) {
            return res.status(400).json({ message: 'Please fill all fields.' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const newUser = new User({ firstName, lastName, phoneNumber, email, address });
        await newUser.save();

        res.status(201).json({ message: 'User added successfully!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const { email } = req.query;
        const query = email ? { email } : {};
        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phoneNumber, email, address } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { firstName, lastName, phoneNumber, email, address }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully!', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
