import {promisePool} from '../utils/database.mjs';

const fetchAllMedia = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM mediaItems');
        console.log('rows', rows);
        return rows;
      } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
      }
    };

const fetchMediaById = async (id) => {
  try {
    const sql = 'SELECT * FROM mediaItems WHERE media_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

const addMedia = async (media) => {
  const {user_id, filename, size, mimetype, title, description} = media;
  const sql = `INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const result = await promisePool.query(sql, params);
    if (result.error) {
      return {error: result.error};
    }
    return {media_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const changeMedia = async (media, media_id, levelId) => {
  let sql, params;
  const {filename, title, description, user_id: tokenUserId} = media;
  try {
      if (levelId === 1) {
          sql = `UPDATE mediaItems SET filename = ?, title = ?, description = ? WHERE media_id = ?`;
          params = [filename, title, description, media_id];
      } else {
          sql = `UPDATE mediaItems SET filename = ?, title = ?, description = ? WHERE media_id = ? AND user_id = ?`;
          params = [filename, title, description, media_id, tokenUserId];
      }
      const result = await promisePool.query(sql, params);
      console.log('result', result);
      if (result[0].affectedRows === 0) {
          return ({error: 'Not found or unauthorized', status: 404});
      }
      return {media_id};
  } catch (e) {
      console.error('error', e.message);
      return {error: e.message};
  }
};

const removeMedia = async (media_id, tokenUserId, levelId) => {
  let rows, params, checkOff, checkOn;
  try {
      checkOff = await promisePool.query('SET FOREIGN_KEY_CHECKS=0', []);
      if (levelId === 1) {
          params = [media_id];
          [rows] = await promisePool.query('DELETE FROM mediaItems WHERE media_id=?', params);
      } else {
          params = [media_id, tokenUserId];
          [rows] = await promisePool.query('DELETE FROM mediaItems WHERE media_id=? AND user_id=?', params);
      }
      checkOn = await promisePool.query('SET FOREIGN_KEY_CHECKS=1', []);
      if (rows.affectedRows === 0) {
          return ({error: 'Not found or unauthorized', status: 404});
      }
      return true;
  } catch (e) {
      console.error('error', e.message);
      return { error: e.message };
  }
};

export {fetchAllMedia, fetchMediaById, addMedia, changeMedia, removeMedia};