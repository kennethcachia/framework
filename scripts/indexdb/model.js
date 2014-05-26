
define([

  'base/create',
  'mv/model'

], function (Create, Model) {

  /**
   * IndexDBModel
   */
  var IndexDBModel = Create('IndexDBModel', {

    load: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var id = this.get('id');
      var loadFn = this._onLoad.bind(this, callback);

      dataStore.findOne(store, id, loadFn);
    },


    save: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var data = this._cleanToJSON();

      dataStore.insert(store, data, callback);
    },


    delete: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var id = this.get('id');

      dataStore.delete(store, id, callback);
    },


    _cleanToJSON: function () {
      var data = this.toJSON();

      delete data.dataStore;
      delete data.store;

      return data;
    },


    _onLoad: function (callback, data) {
      this.parse(data);
      this._executeCallback(callback);
    },


    _executeCallback: function (callback) {
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
