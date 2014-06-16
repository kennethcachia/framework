
define([

  'lib/base/create',
  'lib/indexdb/base-model'

], function (Create, IndexDBBaseModel) {

  /**
   * IndexDBModel
   */
  var IndexDBModel = Create('IndexDBModel', {

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
      var data = this.toJSON();
      var saveFn = this._onSave.bind(this, callback);

      this._executeIfReady(dataStore.insert, [store, data, saveFn]);
    },


    remove: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var id = this.get('id');

      this._executeIfReady(dataStore.remove, [store, id, callback]);
    },


    _onLoad: function (callback, data) {
      this.parse(data);

      if (callback) {
        callback();
      }
    },


    _onSave: function (callback, data) {
      this.fire('saved');

      if (callback) {
        callback();
      }
    },


    _attrs: {
      id: {
        value: null,

        default: function () {
          // TODO: Improve this
          // Generate a timestamp
          return new Date().valueOf();
        }
      }
    }

  }, IndexDBBaseModel);


  return IndexDBModel;

});
