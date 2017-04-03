import SQLite from 'react-native-sqlite-storage';
import { Platform } from 'react-native';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

let loadedDb;
let index = 0;
let db_config;

export let db = {
  checkDbConfig() {
    if (Platform.OS === 'ios') {
      db_config = {name : "notes_db.sqlite", createFromLocation : 1}
    } else {
      db_config = (index == 0) ? {name: 'test.db', createFromLocation : "~notes_db.sqlite", location: 'Library'} : {name: 'test.db'}
      index+=1;
    }
  },
  loadDatabase() {
    console.log("Database opening....");
    SQLite.echoTest().then(() => {
      SQLite.openDatabase(db_config).then((DB) => {
        loadedDb = DB;
        console.log(loadedDb)
        console.log("Database open");
      }).catch((error) => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },

  closeDatabase() {
    var that = this;
    if (loadedDb) {
      return loadedDb.close().then((status) => {
        console.log("Closed");
      }).catch((error) => {
          that.errorCB(error);
      });
    } else {
      console.log("Failed closing");
    }
  },

  getNotes() {
    let results = [];
    this.checkDbConfig();
    return SQLite.openDatabase(db_config).then((DB) => {
      loadedDb = DB;
      return loadedDb.executeSql('SELECT * from notes').then(([queryRes]) => {
        console.log('Was executed getNotes');
        this.closeDatabase();

        for (let i = 0; i < queryRes.rows.length; i++) {
          results.push(queryRes.rows.item(i))
        }
        return results;
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  },

  getOneNote(noteId) {
    let results = [];
    this.checkDbConfig();
    return SQLite.openDatabase(db_config).then((DB) => {
      loadedDb = DB;
      return loadedDb.executeSql(`SELECT * from notes WHERE id=${noteId}`).then(([queryRes]) => {
        return this.closeDatabase().then((_) => {
          console.log('Was executed getOneNote');
          for (let i = 0; i < queryRes.rows.length; i++) {
            results.push(queryRes.rows.item(i))
          }
          return results;
        });
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  },

  createNote(noteParams) {
    this.checkDbConfig();
    return SQLite.openDatabase(db_config).then((DB) => {
      loadedDb = DB;
      return loadedDb.executeSql(`INSERT INTO notes (title, description) VALUES ('${noteParams.title}', '${noteParams.description}')`)
        .then(([queryRes]) => {
          return this.closeDatabase().then((_) => {
            console.log('Was executed createNote');
            return queryRes;
          });
        }).catch((error) => {
          console.log(error);
        });
    }).catch((error) => {
      console.log(error);
    });
  },

  changeNote(noteParams) {
    this.checkDbConfig();
    return SQLite.openDatabase(db_config).then((DB) => {
      loadedDb = DB;
      return loadedDb.executeSql(`UPDATE notes
        SET title='${noteParams.title}', description='${noteParams.description}'
        WHERE id=${noteParams.id}`).then(([results]) => {
        console.log('Was executed changeNote');
        return this.closeDatabase().then((_) => {
          return results;
        });
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  },

  deleteNote(noteId) {
    this.checkDbConfig();
    return SQLite.openDatabase(db_config).then((DB) => {
      loadedDb = DB;
      return loadedDb.executeSql(`DELETE FROM notes WHERE id=${noteId}`).then(([results]) => {
        console.log('Was executed deleteNote');
        return this.closeDatabase().then((_) => {
          return results;
        });
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  },

  errorCB(err) {
    console.log("error: ", err);
  }
}
