
define([

  'lib/base/create',
  'lib/base/base'

], function (Create, Base) {

  /**
   * BaseModel
   */
  var BaseModel = Create('BaseModel', {

    load: function () {},
    save: function () {},
    remove: function () {},
    parse: function () {}

  }, Base);


  return BaseModel;

});
