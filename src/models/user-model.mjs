import { promisePool } from "../utils/database.mjs";

const fetchAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Users');
        console.log('rows', rows);
        return rows;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
    };

const fetchUserById = async (id) => {
    try {
        const sql = 'SELECT * FROM Users WHERE user_id=?';
        const params = [id];
        const [rows] = await promisePool.query(sql, params);
        console.log('rows', rows);
        if (rows.length === 0) {
          return false;
        }
        return true;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};

const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;              
    const params = [user.username, user.email, user.password, 1];
    const result = await promisePool.query(sql, params);
    if (result.error) {
      return {error: result.error};
    }
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const changeUser = async (username) => {
    let sql;
    let params;
    try {
      if (levelId === 1) {
        sql = `UPDATE Users SET username = ?, password = ?, email = ? WHERE username = ?`;
        params = [username];
      } else {
        sql = `UPDATE Users SET username = ?, password = ?, email = ? WHERE username = ?`;
        params = [username];
      }
      const result = await promisePool.query(sql, params);
      if (result[0].affectedRows === 0) {
        return ({error: 'Not found', status: 404});
      }
      console.log('result', result);
      return {id};
    } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
    }
}

const removeUser = async (id, tokenUserId, levelId) => {
    let checkOff, checkOn, rows;
    let params;
    try {
      if (levelId === 1) {
        params = [id];
        checkOff = await promisePool.query('SET FOREIGN_KEY_CHECKS=0', []);
        [rows] = await promisePool.query('DELETE FROM Users WHERE user_id=?', params);
        checkOn = await promisePool.query('SET FOREIGN_KEY_CHECKS=1', []);
      } else {
        params = [id, tokenUserId];
        checkOff = await promisePool.query('SET FOREIGN_KEY_CHECKS=0', []);
        [rows] = await promisePool.query('DELETE FROM Users WHERE user_id=? AND user_id=?', params);
        checkOn = await promisePool.query('SET FOREIGN_KEY_CHECKS=1', []);
        if (tokenUserId !== id) {
          return ({error: 'Not authorized', status: 403});
        }
      }
        if (rows.affectedRows === 0) {
          return ({error: 'Not found', status: 404});
        }
        return true;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};

const login = async (userCreds) => {
  try {
    const sql = 'SELECT user_id, username, email, user_level_id FROM Users WHERE username=? AND password=?';
    const params = [userCreds.username, userCreds.password];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
    return rows[0];
    } catch (e) {
      console.error('error', e.message);
      return {error: e.message};
    }
};

export {fetchAllUsers, fetchUserById, addUser, changeUser, removeUser, login};