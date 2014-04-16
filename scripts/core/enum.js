
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


    getValue: function (index) {
      var values = this.get('values');

      return values[index - 1];
    },


    _attrs: {
      keys: [],
      values: []
    }

  });


  return Enum;

});
