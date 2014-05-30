
define([

  'lib/base/create',
  'lib/base/base'

], function (Create, Base) {

  /**
   * Model
   */
  var Model = Create('Model', {

    load: function () {},
    save: function () {},
    remove: function () {},


    parse: function (response) {
      if (typeof response === 'string') {
        response = this._parseRaw(response);
      }

      this.setFromObject(response, false);
    },


    _parseRaw: function (raw) {
      return JSON.parse(raw);
    }

  }, Base);


  return Model;

});
