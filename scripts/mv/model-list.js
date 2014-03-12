
define(['core/Create', 'mv/model'], function (Create, Model) {

  /**
   * ModelList
   */
  var ModelList = Create('ModelList', {

    initializer: function () {
      var Type = this.get('type');
      var json = this.get('json');
      var models = [];

      this._data = [];

      // TODO: custom type defined in json -- makes sense?
      json.each(json, function (attr) {
        models.push(new Type(attr));
      });

      this._data = models;
    },


    getData: function () {
      var data = [];

      // TODO: use List
      for (var d = 0; d < this._data.length; d++) {
        data.push(this._data[d].getData());
      }

      return data;
    },


    add: function (json) {
      // Add from raw data
    },


    remove: function (id) {
      // Remove by id
    },


    _attrs: {
      type: Model,
      json: []
    }

  });


  return ModelList;

});
