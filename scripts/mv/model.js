
define(['core/create'], function (Create) {

  /**
   * Model
   */
  var Model = Create('Model', {

    getData: function () {
      var data = {};
      var attrs = this._attrs;

      for (var a in attrs) {
        data[a] = attrs[a];
      }

      return data;
    },


    _attrs: { }

  });


  return Model;

});
