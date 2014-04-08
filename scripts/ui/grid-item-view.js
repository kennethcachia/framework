
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Grid
   */
  var ViewGridItem = Create('ViewGridItem', {

    _clickItem: function (domElement) {
      var data = this.get('data');

      this.fire('gridItemSelected', {
        data: data
      }, true);
    },


    _attrs: {
      domEvents: [{
        matchClass: '.ui-grid-item',
        eventName: 'click',
        callback: '_clickItem'
      }],

      container: '<div class="ui-grid-item"></div>',
      template: '<div class="ui-grid-item-ratio">' +
                  '<div class="ui-grid-item-content"></div>' +
                '</div>'
    }

  }, View);


  return ViewGridItem;

});
