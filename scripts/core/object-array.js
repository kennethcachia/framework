
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
      this.purge();
      this._items = null;
    },


    add: function (attrs, customType) {
      var defaultType = this.get('defaultType');
      var type = customType || defaultType;

      var obj = new type(attrs);

      this._items.push(obj);

      return obj;
    },


    addObject: function (obj) {
      this._items.push(obj);
    },


    purge: function () {
      for (var i = 0; i < this._items.length; i++) {
        this._items[i].destroy();
      }
    },


    getItems: function () {
      return this._items;
    },


    _attrs: {
      defaultType: {
        value: null
      }
    }

  });


  return ObjectArray;

});
