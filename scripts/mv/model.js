
define([

  'core/create'

], function (Create) {

  /**
   * Model
   */
  var Model = Create('Model', {

    initializer: function () {
      var attrs = this._attrs;

      for (var a in attrs) {
        this.on(a + 'Change', this._updated, this);
      }
    },


    _updated: function () {
      this.fire('updated');
    },


    pushToKey: function (key, data) {
      var items = this.get(key);

      // TODO: throw error if not array
      items.push(data);

      this.set(key, items);
    },


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
