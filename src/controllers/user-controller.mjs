import {fetchAllUsers, fetchUserById, addUser, changeUser, removeUser} from '../models/user-model.mjs';

const getUsers = async (req, res) => {
    const Users = await fetchAllUsers();
    res.json(Users);
};

const getUsersById = async (req, res) => {
    const result = await fetchUserById(req.params.id); 
    if (result) {
      if (result.error) {
      res.status(500);
      }
      res.json(result);
    } else {
        res.status(404);
        res.json({error: 'Not found', user_id: req.params.id});
    }
};

const postUser = async (req, res) => {
    console.log('created user', req.body);
    const {username, password, email, user_level_id} = req.body;
    if (username && password && email && user_level_id) {
      const newUser = {username, password, email, user_level_id};
      const result = await addUser(newUser);
      res.status(201);
      res.json({message: 'New user added', ...result});
    } else {
      res.sendStatus(400);
    }
};

const putUser = async (req, res) => {
    const id = req.params.id;
    const {username, password, email} = req.body;
    if (username && password && email) {
      const updatedUser = req.body;
      const result = await changeUser(updatedUser, id);
      res.status(201);
      res.json({message: 'User updated', ...result});
    } else {
      res.sendStatus(400);
    }
};

const deleteUser = async (req, res) => {
    const result = await removeUser(req.params.id); 
      if (result) {
      res.sendStatus(204);
    } else {
        res.status(404);
        res.json({error: 'Not found', user_id: req.params.id});
    }
};

export {getUsers, getUsersById, postUser, putUser, deleteUser};