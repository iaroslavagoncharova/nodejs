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

export {fetchAllMedia, fetchMediaById};