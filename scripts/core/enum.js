
define([

  'core/create'

], function (Create) {

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

  });


  return Enum;

});
