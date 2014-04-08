
define([

  'core/Create', 'mv/model'

], function (Create, Model) {

  /**
   * ModelList
   */
  var ModelList = Create('ModelList', {

    getData: function () {
      var items = this.get('items');

      return {
        data: items
      };
    },


    _attrs: {
      items: []
    }

  }, Model);


  return ModelList;

});
