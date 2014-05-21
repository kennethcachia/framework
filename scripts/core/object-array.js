
define([

  'core/create'

], function (Create) {

  /**
   * ObjectArray
   */
  var ObjectArray = Create('ObjectArray', {

    initializer: function () {
      this._init();
    },


    destructor: function () {
      this.purge();
      this._items = null;
      this._index = null;
    },


    add: function (attrs, customType) {
      var defaultType = this.get('defaultType');
      var type = customType || defaultType;
      var obj = new type(attrs);

      this.addObject(obj);

      return obj;
    },


    addFromList: function (list) {
      var objects = [];
      var object;

      for (var i = 0; i < list.length; i++) {
        object = this.add(list[i].attrs, list[i].type);
        objects.push(object);
      }

      return objects;
    },


    addObject: function (obj) {
      this._items.push(obj);
      this._addToIndex(obj);
    },


    each: function (fn, context) {
      for (var i = 0; i < this._items.length; i++) {
        fn.call(context, this._items[i]);
      }
    },


    purge: function () {
      for (var i = 0; i < this._items.length; i++) {
        this._items[i].destroy();
      }

      this._init();
    },


    getItems: function () {
      return this._items;
    },


    getByPosition: function (position) {
      return this._items[position];
    },


    getById: function (id) {
      return this._index[id];
    },


    _addToIndex: function (obj) {
      var id = obj.get('id');

      if (id) {
        if (this._index[id]) {
          throw new Error('Id must be unique');
        } else {
          this._index[id] = obj;
        }
      }
    },


    _init: function () {
      this._items = [];
      this._index = {};
    },


    _attrs: {
      defaultType: {
        value: null
      }
    }

  });


  return ObjectArray;

});
