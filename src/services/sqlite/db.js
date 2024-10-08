// db.js (or another suitable filename)
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
const db = SQLite.openDatabase(
  {name: 'mydatabase.db', location: 'default'},
  () => console.log('Database opened successfully'),
  error => console.log('Error opening database', error),
);

export default db;

export const createTableIfNotExists = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Playlist (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          video_time INTEGER,
          video_title TEXT UNIQUE,
          video_url TEXT,
          widget_data TEXT,
          localPath TEXT
        )`,
        [],
        () => {
          console.log('Table created or already exists');
          resolve();
        },
        error => {
          console.log('Error creating table', error);
          reject(error);
        },
      );
    });
  });
};

// export const saveDataToDatabase = async videos => {
//   if (!db) return;

//   const executeSqlAsync = (sql, params = []) => {
//     return new Promise((resolve, reject) => {
//       db.transaction(tx => {
//         tx.executeSql(
//           sql,
//           params,
//           (tx, results) => resolve(results),
//           (tx, error) => reject(error),
//         );
//       });
//     });
//   };

//   for (const video of videos) {
//     try {
//       // Check if video already exists
//       const results = await executeSqlAsync(
//         'SELECT COUNT(*) AS count FROM Playlist WHERE video_title = ?',
//         [video.video_title],
//       );
//       const count = results.rows.item(0).count;

//       if (count > 0) {
//         // If video exists, check if the URL is different
//         const urlResults = await executeSqlAsync(
//           'SELECT video_url FROM Playlist WHERE video_title = ?',
//           [video.video_title],
//         );
//         const existingVideoUrl = urlResults.rows.item(0).video_url;

//         if (existingVideoUrl !== video.video_url) {
//           // Update existing video if the URL is different
//           await executeSqlAsync(
//             'UPDATE Playlist SET video_time = ?, video_url = ?, widget_data = ?, localPath = ? WHERE video_title = ?',
//             [
//               video.video_time,
//               video.video_url,
//               video.widget_data ? JSON.stringify(video.widget_data) : null,
//               video.localPath,
//               video.video_title,
//             ],
//           );
//           console.log('Video data updated successfully');
//         }
//       } else {
//         // Insert new video if it doesn't exist
//         await executeSqlAsync(
//           'INSERT INTO Playlist (video_time, video_title, video_url, widget_data, localPath) VALUES (?, ?, ?, ?, ?)',
//           [
//             video.video_time,
//             video.video_title,
//             video.video_url,
//             video.widget_data ? JSON.stringify(video.widget_data) : null,
//             video.localPath,
//           ],
//         );
//         console.log('Video data inserted successfully');
//       }
//     } catch (error) {
//       console.log('Error saving video data', error);
//     }
//   }
// };

export const saveDataToDatabase = async videos => {
  if (!db) return;

  const executeSqlAsync = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        try {
          tx.executeSql(
            sql,
            params,
            (tx, results) => resolve(results),
            (tx, error) => reject(error),
          );
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  for (const video of videos) {
    try {
      // Check if video already exists
      const results = await executeSqlAsync(
        'SELECT COUNT(*) AS count FROM Playlist WHERE video_title = ?',
        [video.video_title],
      );
      const count = results.rows.item(0).count;

      if (count > 0) {
        // If video exists, check if the URL is different
        const urlResults = await executeSqlAsync(
          'SELECT video_url FROM Playlist WHERE video_title = ?',
          [video.video_title],
        );
        const existingVideoUrl = urlResults.rows.item(0).video_url;

        if (existingVideoUrl !== video.video_url) {
          // Update existing video if the URL is different
          await executeSqlAsync(
            'UPDATE Playlist SET video_time = ?, video_url = ?, widget_data = ?, localPath = ? WHERE video_title = ?',
            [
              video.video_time,
              video.video_url,
              video.widget_data ? JSON.stringify(video.widget_data) : null,
              video.localPath,
              video.video_title,
            ],
          );
          console.log(`Video "${video.video_title}" data updated successfully`);
        } else {
          console.log(
            `Video "${video.video_title}" already exists with the same URL`,
          );
        }
      } else {
        // Insert new video if it doesn't exist
        await executeSqlAsync(
          'INSERT INTO Playlist (video_time, video_title, video_url, widget_data, localPath) VALUES (?, ?, ?, ?, ?)',
          [
            video.video_time,
            video.video_title,
            video.video_url,
            video.widget_data ? JSON.stringify(video.widget_data) : null,
            video.localPath,
          ],
        );
        console.log(`Video "${video.video_title}" data inserted successfully`);
      }
    } catch (error) {
      console.log(`Error saving video "${video.video_title}" data:`, error);
    }
  }
};

export const downloadVideo = async (url, fileName) => {
  const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  const download = RNFS.downloadFile({
    fromUrl: url,
    toFile: path,
  });
  const result = await download.promise;
  if (result.statusCode === 200) {
    return path;
  } else {
    throw new Error('Failed to download video');
  }
};
