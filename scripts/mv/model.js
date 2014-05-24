
define([

  'base/create'

], function (Create) {

  /**
   * Model
   */
  var Model = Create('Model', {

    parse: function (response) {
      var json = JSON.parse(response);

      // Validate response against _attrs
      this.setFromObject(json, false);
    }

  });


  return Model;

});
