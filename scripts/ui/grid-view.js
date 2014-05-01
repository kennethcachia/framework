
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

  /**
   * Grid
   */
  var ViewGrid = Create('ViewGrid', {

    initializer: function () {
      this.on('data.itemsChange', this._onItemsChange, this);
    },


    _onItemsChange: function () {
      var items = this.get('data').items;

      this.set('children', items);
    },


    _attrs: {
      data: {
        value: {
          items: []
        }
      },

      container: {
        value: '<div class="ui-grid"></div>'
      }
    }

  }, ParentView);


  return ViewGrid;

});
