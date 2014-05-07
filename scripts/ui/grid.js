
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

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
      }
    }

  }, ParentView);


  return GridView;

});
