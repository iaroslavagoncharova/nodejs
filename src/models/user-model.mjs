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
    const {user_id, username, password, email, user_level_id, created_at} = user;
    const sql = `INSERT INTO Users (user_id, username, password, email, user_level_id, created_at)
             VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [user_id, username, password, email, user_level_id, created_at];
    try {
    const result = await promisePool.query(sql, params);
    console.log('result', result);
    return {user_id: result[0].insertId};
    } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
    }
};

const changeUser = async (user, user_id) => {
    const {username, password, email} = user;
    const sql = `UPDATE Users SET username = ?, password = ?, email = ? WHERE user_id = ?`;
    const params = [username, password, email, user_id];
    try {
    const result = await promisePool.query(sql, params);
    console.log('result', result);
    return {user_id};
    } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
    }
}

const removeUser = async (id) => {
    try {
        const params = [id];
        const checkOff = await promisePool.query('SET FOREIGN_KEY_CHECKS=0', []);
        const [rows] = await promisePool.query('DELETE FROM Users WHERE user_id=?', params);
        const checkOn = await promisePool.query('SET FOREIGN_KEY_CHECKS=1', []);
        console.log('rows', rows);
        if (rows.affectedRows === 0) {
          return false;
        }
        return true;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};
export {fetchAllUsers, fetchUserById, addUser, changeUser, removeUser};
