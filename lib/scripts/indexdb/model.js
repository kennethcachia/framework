
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

      this._executeIfReady(dataStore.insert, [store, data, callback]);
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


    _attrs: {
      id: {
        value: null,

        default: function () {
          throw new Error('Missing id');
        }
      }
    }

  }, IndexDBBaseModel);


  return IndexDBModel;

});
