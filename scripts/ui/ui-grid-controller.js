
define([

  'core/create',
  'ui/ui',
  'ui/grid-view'

], function (Create, UI, ViewGrid) {

  /**
   * Grid
   */
  var UIGrid = Create('UIGrid', {

    createDefaultView: function () {
      return new ViewGrid();
    }

  }, UI);


  return UIGrid;

});
