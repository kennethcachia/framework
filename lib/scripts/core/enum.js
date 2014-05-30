
define([

  'lib/base/create',
  'lib/base/base'

], function (Create, Base) {

  /**
   * Enum
   */
  var Enum = Create('Enum', {

    initializer: function () {
      var keys = this.get('keys');

      for (var k = 0; k < keys.length; k++) {
        this[keys[k]] = k + 1;
      }
    },


    _attrs: {
      keys: {
        value: []
      }
    }

  }, Base);


  return Enum;

});
