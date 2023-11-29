import {fetchAllUsers, fetchUserById, addUser, changeUser, removeUser, login} from '../models/user-model.mjs';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

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

const postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('validation errors', errors.array());
    const error = new Error('invalid input fields');
    error.status = 400;
    return next(error);
  }
  const newUser = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;
    const newUserId = await addUser(newUser);
    if (newUserId.error) {
      const error = new Error(newUserId.error);
      error.status = newUserId.status || 500;
      return next(error)
    }
    res.status(201).json({message: 'User added', user_id: newUserId});
};

const putUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('validation errors', errors.array());
    const error = new Error('invalid input fields');
    error.status = 400;
    return next(error);
  }
    const user_id = +req.params.id;
    const tokenUserId = req.user.user_id;
    const levelId = req.user.user_level_id;
    const {username, password, email} = req.body;
    if (username && password && email) {
      const updatedUser = {username, password, email, tokenUserId, levelId};
      const result = await changeUser(updatedUser, user_id);
      if (result.error) {
        const error = new Error(result.error);
        error.status = result.status || 500;
        return next(error);
    }
      res.status(201).json({message: 'User updated', ...result});
  } 
};

const deleteUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('validation errors', errors.array());
    const error = new Error('Not found');
    error.status = 404;
    return next(error);
  }
    const user_id = +req.params.id;
    const tokenUserId = req.user.user_id;
    const levelId = req.user.user_level_id;
    const result = await removeUser(user_id, tokenUserId, levelId); 
    if (result.error) {
      const error = new Error(result.error);
      error.status = result.status || 500;
      return next(error);
  }
      res.status(204).json({message: 'User deleted', ...result});
};

export {getUsers, getUsersById, postUser, putUser, deleteUser};