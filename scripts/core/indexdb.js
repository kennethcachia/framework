
define([

  'base/create'

], function (Create) {

  // TODO: Feature detection

  /**
   * IndexDB
   */
  var IndexDB = Create('IndexDB', {

    initializer: function () {
      this._db = null;
      this._cursorOutput = [];
    },


    open: function (callback) {
      var openFn = this._onOpenSuccess.bind(this, callback);

      this._makeRequest(this._openDB, {
        success: openFn,
        upgradeneeded: this._onUpgradeNeeded
      });
    },


    createObjectStore: function (name, key) {
      var options = {};

      if (!key) {
        options.autoIncrement = true;
      } else {
        options.keyPath = key;
      }

      var db = this._getDB();
      db.createObjectStore(name, options);
    },


    deleteObjectStore: function (name) {
      var db = this._getDB();
      db.deleteObjectStore(name);
    },


    insert: function (name, data, callback) {
      var store = this._getStore(name);
      var insertFn = this._insert.bind(this, store, data);

      this._makeRequest(insertFn, {
        success: callback
      });
    },


    findOne: function (name, id, callback) {
      var keyRange = IDBKeyRange.only(id);

      this._find(name, keyRange, callback, false);
    },


    findAll: function (name, callback) {
      var keyRange = IDBKeyRange.lowerBound(0);

      this._find(name, keyRange, callback, true);
    },


    delete: function (name, id, callback) {
      var store = this._getStore(name);
      var deleteFn = this._delete.bind(this, store, id);

      this._makeRequest(deleteFn, {
        success: callback
      })
    },


    _find: function (name, keyRange, callback, multiple) {
      var store = this._getStore(name);
      var readFn = this._read.bind(this, store, keyRange);

      this._makeRequest(readFn, {
        success: this._returnData.bind(this, callback, multiple)
      })
    },


    _getStore: function (name) {
      var transaction = this._createTransaction(name);
      var store = transaction.objectStore(name);

      return store;
    },


    _createTransaction: function (name) {
      var db = this._getDB();
      var transaction = db.transaction(name, 'readwrite');

      return transaction;
    },


    _makeRequest: function (actionFn, callbacks) {
      var action = actionFn.call(this);

      for (var c in callbacks) {
        action['on' + c] = callbacks[c].bind(this);
      }

      if (!callbacks['error']) {
        action.onerror = this._onError.bind(this);
      }
    },


    _openDB: function () {
      var name = this.get('name');
      var version = this.get('version');

      return indexedDB.open(name, version);
    },


    _insert: function (store, data) {
      return store.put(data);
    },


    _delete: function (store, id) {
      return store.delete(id);
    },


    _read: function (store, keyRange) {
      return store.openCursor(keyRange);
    },


    _returnData: function (callback, multiple, e) {
      var result = e.target.result;
      var data = result ? result.value : null;

      if (multiple === true) {

        if (data) {
          this._cursorOutput.push(data);
          result.continue();
        } else {
          callback.call(this, this._cursorOutput);
          this._cursorOutput = [];
        }

      } else {
        callback.call(this, data);
      }
    },


    _onUpgradeNeeded: function (e) {
      this._setDB(e);
      this.fire('dbUpgradeNeeded');
    },


    _onOpenSuccess: function (callback, e) {
      this._setDB(e);

      if (callback) {
        callback();
      }
    },


    _getDB: function () {
      if (!this._db) {
        throw new Error('DB not initialized');
      }

      return this._db;
    },


    _setDB: function (e) {
      this._db = e.target.result;
    },


    _onError: function (e) {
      new Error('Error while accessing indexDB');
    },


    _attrs: {
      name: {
        value: null,

        default: function () {
          throw new Error('Missing name');
        }
      },

      version: {
        value: null,

        default: function () {
          throw new Error('Missing version');
        }
      }
    }

  });


  return IndexDB;

});
