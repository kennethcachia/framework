
define([

  'base/create'

], function (Create) {

  /**
   * Model
   */
  var Model = Create('Model', {

    load: function () {},
    save: function () {},
    remove: function () {},

    parse: function (response) {
      try {

        var json = JSON.parse(response);
        this.setFromObject(json, false);

      } catch (e) {
        throw new Error(e.message);
      }
    }

  });


  return Model;

});
