
define([

  'core/create'

], function (Create) {

  /**
   * ObjectArray
   */
  var ObjectArray = Create('ObjectArray', {

    initializer: function () {
      this._items = [];
    },


    destructor: function () {
      for (var i = 0; i < this._items.length; i++) {
        this._items[i].destroy();
      }
    },


    add: function (attrs) {
      var type = this.get('type');
      var obj = new type(attrs);

      this._items.push(obj);

      return obj;
    },


    _attrs: {
      type: {
        value: null
      }
    }

  });


  return ObjectArray;

});
