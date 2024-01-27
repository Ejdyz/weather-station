import db from "@/database/database";
import {env} from "process"
export const getLastRecord = async () => {
  const table = env.DB_TABLE_RECORDS.toString();
  const sql = "SELECT * FROM " + "`"+ table + "`"+ " ORDER BY id DESC LIMIT 1";

  const lastRecord = await new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
  return lastRecord;
}
export const getLastTenRecords = async () => {
  const table = env.DB_TABLE_RECORDS.toString();
  const sql = "SELECT * FROM " + "`"+ table + "`"+ " ORDER BY id DESC LIMIT 10";

  const lastRecords = await new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return lastRecords;
}

export const getLastTenDays = async () => {
  const table = env.DB_TABLE_DAYS.toString();
  const sql = "SELECT * FROM " + "`"+ table + "`"+ " ORDER BY id DESC LIMIT 10";

  const lastDays = await new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  return lastDays;
}

