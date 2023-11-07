const users = [
    {
      "user_id": 260,
      "username": "VCHar",
      "password": "********",
      "email": "vchar@example.com",
      "user_level_id": 1,
      "created_at": "2020-09-12T06:56:41.000Z"
    },
    {
      "user_id": 305,
      "username": "Donatello",
      "password": "********",
      "email": "dona@example.com",
      "user_level_id": 1,
      "created_at": "2021-12-11T06:00:41.000Z"
    },
    {
      "user_id": 3609,
      "username": "Anon5468",
      "password": "********",
      "email": "x58df@example.com",
      "user_level_id": 3,
      "created_at": "2023-04-02T05:56:41.000Z"
    }
  ]

  /**
 * Gets all users or a limited set of users if specified
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */

  const getUsers = (req, res) => {
    console.log('getUsers');
    const limit = req.query.limit;
    if (users) {
    if (!isNaN(parseInt(limit))) {
      res.status(200);
      res.json(users.slice(0, limit));
    } else {
      res.status(200);
      res.json(users);
    }
  } else {
    res.status(404);
    res.json({message: "Users not found"});
}
};

/**
 * Gets one user based on their id
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */


const getUsersById = (req, res) => {
    // if user with id exists send it, otherwise send 404
    console.log('getUsersById', req.params);
    const user = users.find((element) => element.user_id == req.params.id);
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.json({message: "User not found."});
    }
  };

/**
 * Posts a user
 *
 * @param {object} req - http request with user information
 * @param {object} res - http response
 */

  const postUser = (req, res) => {
    console.log('postUser', req.body.username);
    if (req.body.username) {
      users.push({user_id: Math.floor(100 + Math.random() * 10), username: req.body.username, password: req.body.password, email: req.body.email, user_level_id: req.body.user_level_id});
      res.status(201);
      res.json({message: `User ${req.body.username} posted`});
    } else {
      res.status(400);
      res.json({message: "Missing username"})
    }
  };

/**
 * Modifies user's information based on their id
 *
 * @param {object} req - http request with updated user information
 * @param {object} res - http response
 */

  const putUser = (req, res) => {
    console.log('putUser with id', req.params.id);
    if (req.body.password && req.body.email) {
      // if user exists in the array, update it based on id, otherwise send 404
      const user = users.find((element) => element.user_id == req.params.id);
      if (user) {
          user.password = req.body.password;
          user.email = req.body.email;
          res.status(200);
          res.json({message: `User with id ${req.params.id} changed`});
      } else {
        res.status(404);
        res.json({message: "User not found"})
      }
} else {
  res.status(400);
  res.json({message: "Missing data"})
}
};

/**
 * Deletes a user based on their id
 *
 * @param {object} req - http request with user id
 * @param {object} res - http response
 */

const deleteUser = (req, res) => {
    console.log('deleteUser', req.params);
    // if user exists in the array, delete it based on id, otherwise send 404
    const index = users.findIndex((element) => element.user_id == req.params.id);
    // when user is not found, index -1 is returned; if-statement is used here to prevent it
    if (index != -1) {
    users.splice(index, 1);
    res.status(204);
    }
    else {
        res.status(404);
        res.json({message: "User not found."});
    }
  }
export {getUsers, getUsersById, postUser, putUser, deleteUser}