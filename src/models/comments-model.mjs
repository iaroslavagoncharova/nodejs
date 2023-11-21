import { promisePool } from "../utils/database.mjs";

const getCommentByMediaId = async (id) => {
    try {
        const sql = 'SELECT * FROM Comments WHERE media_id=?';
        const params = [id];
        const [rows] = await promisePool.query(sql, params);
        console.log('rows', rows);
        if (rows.length === 0) {
          return false;
      }
        return rows;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};

const getCommentByUserId = async (id) => {
    try {
        const sql = 'SELECT * FROM Comments WHERE user_id=?';
        const params = [id];
        const [rows] = await promisePool.query(sql, params);
        console.log('rows', rows);
        if (rows.length === 0) {
            return false;
        }
        return rows;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
};

const createComment = async (comment) => {
  const {comment_id, media_id, user_id, comment_text, created_at} = comment;
  const sql = `INSERT INTO Comments (comment_id, media_id, user_id, comment_text, created_at)
           VALUES (?, ?, ?, ?, ?)`;
  const params = [comment_id, media_id, user_id, comment_text, created_at];
  try {
  const result = await promisePool.query(sql, params);
  console.log('result', result);
  return {comment_id: result[0].insertId};
  } catch (e) {
  console.error('error', e.message);
  return {error: e.message};
  }
};

const updateComment = async (comment, comment_id) => {
    const {comment_text} = comment;
    const sql = `UPDATE Comments SET comment_text = ? WHERE comment_id = ?`;
    const params = [comment_text, comment_id];
    try {
    const result = await promisePool.query(sql, params);
    console.log('result', result);
    return {comment_id};
    } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
    }
};

const removeComment = async (id) => {
  try {
    const params = [id];
    const deleteData = 'DELETE FROM Comments WHERE comment_id=?';
    const [rows] = await promisePool.query(deleteData, params);
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false
    };
    return true;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}


export {getCommentByMediaId, getCommentByUserId, createComment, updateComment, removeComment};