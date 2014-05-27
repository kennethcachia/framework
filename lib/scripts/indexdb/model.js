
define([

  'lib/base/create',
  'lib/mv/model'

], function (Create, Model) {

  /**
   * IndexDBModel
   */
  var IndexDBModel = Create('IndexDBModel', {

    initializer: function () {
      var dataStore = this.get('dataStore');
      var isReady = dataStore.isReady();

      if (isReady === false) {
        dataStore.open();
      }
    },


    load: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var id = this.get('id');
      var loadFn = this._onLoad.bind(this, callback);

      this._executeIfReady(dataStore.findOne, [store, id, loadFn]);
    },


    save: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var data = this._cleanToJSON();

      this._executeIfReady(dataStore.insert, [store, data, callback]);
    },


    remove: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var id = this.get('id');

      this._executeIfReady(dataStore.remove, [store, id, callback]);
    },


    _executeIfReady: function (fn, args) {
      var dataStore = this.get('dataStore');
      var isReady = dataStore.isReady();

      if (isReady === true) {
        fn.apply(dataStore, args);
      } else {
        args = [dataStore].concat(args);
        fn = Function.prototype.bind.apply(fn, args);
        dataStore.on('opened', fn);
      }
    },


    _cleanToJSON: function () {
      var data = this.toJSON();

      delete data.dataStore;
      delete data.store;

      return data;
    },


    _onLoad: function (callback, data) {
      this.parse(data);

      if (callback) {
        callback();
      }
    },


    _attrs: {
      id: {
        value: null,

        default: function () {
          throw new Error('Missing id');
        }
      },

      dataStore: {
        value: null,

        default: function () {
          throw new Error('Missing dataStore');
        }
      },

      store: {
        value: null,

        default: function () {
          throw new Error('Missing store')
        }
      }
    }

  }, Model);


  return IndexDBModel;

});
