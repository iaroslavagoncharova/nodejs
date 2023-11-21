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
    console.log('result', result);
    return {media_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const changeMedia = async (media, media_id) => { 
  const {filename, title, description} = media;
  const sql = `UPDATE mediaItems SET filename = ?, title = ?, description = ? WHERE media_id = ?`;
  const params = [filename, title, description, media_id];
  try {
  const result = await promisePool.query(sql, params);
  console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {media_id};
  } catch (e) {
  console.error('error', e.message);
  return {error: e.message};
  }
};

const removeMedia = async (id) => {
  try {
    const params = [id];
    const checkOff = await promisePool.query('SET FOREIGN_KEY_CHECKS=0', []);
    const [rows] = await promisePool.query('DELETE FROM mediaItems WHERE media_id=?', params);
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
}

export {fetchAllMedia, fetchMediaById, addMedia, changeMedia, removeMedia};