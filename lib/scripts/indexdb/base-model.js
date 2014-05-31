
define([

  'lib/base/create',
  'lib/mv/model'

], function (Create, Model) {

  /**
   * IndexDBBaseModel
   */
  var IndexDBBaseModel = Create('IndexDBBaseModel', {

    initializer: function () {
      var dataStore = this.get('dataStore');
      var isReady = dataStore.isReady();

      if (isReady === false) {
        dataStore.open();
      }
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


    toJSON: function () {
      var data = IndexDBBaseModel.super.toJSON.call(this);

      delete data.dataStore;
      delete data.store;

      return data;
    },


    _attrs: {
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


  return IndexDBBaseModel;

});
