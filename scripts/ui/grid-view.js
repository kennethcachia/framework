
define([

  'core/create',
  'mv/parent-view'

], function (Create, ParentView) {

  /**
   * Grid
   */
  var ViewGrid = Create('ViewGrid', {

    _attrs: {
      container: {
        value: '<div class="ui-grid"></div>'
      }
    }

  }, ParentView);


  return ViewGrid;

});
