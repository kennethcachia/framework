
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
      data: {
        value: {
          content: null
        }
      },

      domEvents: {
        value: [{
          matchClass: '.ui-grid-item',
          eventName: 'click',
          callback: '_clickItem'
        }],
      },

      container: {
        value: '<div class="ui-grid-item"></div>'
      },

      template: {
        value: '<div class="ui-grid-item-ratio">' +
                  '<div class="ui-grid-item-content">{{{content}}}</div>' +
                '</div>'
      }
    }

  }, View);


  return ViewGridItem;

});
