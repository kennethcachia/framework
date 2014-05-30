
define([

  'lib/base/create',
  'lib/mv/parent-view',
  'lib/ui/grid-item'

], function (Create, ParentView, GridItemView) {

  /**
   * GridView
   */
  var GridView = Create('GridView', {

    _attrs: {
      data: {
        value: {
          items: []
        }
      },

      container: {
        value: '<div class="ui-grid"></div>'
      },

      defaultChildType: {
        value: GridItemView
      }
    }

  }, ParentView);


  return GridView;

});
