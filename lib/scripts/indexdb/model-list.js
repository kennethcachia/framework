
define([

  'lib/base/create',
  'lib/indexdb/base-model',
  'lib/core/object-array'

], function (Create, IndexDBBaseModel, ObjectArray) {

  /**
   * IndexDBModelList
   */
  var IndexDBModelList = Create('IndexDBModelList', {

    initializer: function () {
      var modelType = this.get('modelType');

      this._models = new ObjectArray({
        defaultType: modelType
      });
    },


    load: function (callback) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');
      var loadFn = this._onLoad.bind(this, callback);

      this._executeIfReady(dataStore.findAll, [store, loadFn]);
    },


    getModels: function () {
      return this._models.getItems();
    },


    _onLoad: function (callback, data) {
      var dataStore = this.get('dataStore');
      var store = this.get('store');

      var modelData;
      var model;

      for (var m = 0; m < data.length; m++) {
        modelData = data[m];

        model = this._models.add({
          // Assign attrs for when the model
          // performs its own operations
          dataStore: dataStore,
          store: store,
          id: modelData.id
        });

        model.parse(modelData);
      }

      if (callback) {
        callback();
      }
    },


    _attrs: {
      modelType: {
        value: null,

        default: function () {
          throw new Error('Missing modelType');
        }
      }
    }

  }, IndexDBBaseModel);


  return IndexDBModelList;

});
