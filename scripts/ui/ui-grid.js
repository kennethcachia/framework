
define([

  'core/create',
  'ui/ui',
  'views/input'

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
