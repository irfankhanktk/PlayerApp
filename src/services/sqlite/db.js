// db.js (or another suitable filename)
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'mydatabase.db', location: 'default'},
  () => console.log('Database opened successfully'),
  error => console.log('Error opening database', error),
);

export default db;
