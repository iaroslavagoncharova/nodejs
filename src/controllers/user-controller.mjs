import users from '../mock-data/users.json' assert {type: 'json'};

const getUsers = (req, res) => {
    res.json(users);
};

const getUsersById = (req, res) => {
    res.json({message: 'getUsersById'});
};

const postUser = (req, res) => {
    res.json({message: 'postUser'});
};

const putUser = (req, res) => {
    res.json({message: 'putUser'});
};

const deleteUser = (req, res) => {
    res.json({message: 'deleteUser'});
};

export {getUsers, getUsersById, postUser, putUser, deleteUser};