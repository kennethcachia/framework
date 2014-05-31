
define([

  'lib/base/create',
  'lib/mv/base-model'

], function (Create, BaseModel) {

  /**
   * Model
   */
  var Model = Create('Model', {

    parse: function (response) {
      if (typeof response === 'string') {
        response = this._parseRaw(response);
      }

      this.setFromObject(response, false);
    },


    _parseRaw: function (raw) {
      return JSON.parse(raw);
    }

  }, BaseModel);


  return Model;

});
