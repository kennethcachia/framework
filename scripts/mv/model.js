
define([

  'base/create'

], function (Create) {

  /**
   * Model
   */
  var Model = Create('Model', {

    load: function () {},
    save: function () {},
    delete: function () {},


    parse: function (response) {
      if (typeof response === 'string') {
        response = this._parseRaw(response);
      }

      this.setFromObject(response, false);
    },


    _parseRaw: function (raw) {
      return JSON.parse(raw);
    }

  });


  return Model;

});
