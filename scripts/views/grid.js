
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Grid
   */
  var ViewGrid = Create('ViewGrid', {

    _clickItem: function (domElement) {
      /*var data = this.getData(domElement);

      this.fire('selected', {
        data: data
      });*/
    },


    _attrs: {
      data: {
        gridType: 'square'
      },

      domEvents: [{
        matchClass: '.ui-grid-item',
        eventName: 'click',
        callback: '_clickItem'
      }],

      template: '<div class="ui-grid">' +
                  '{{#data}}' +
                    '<div data-id="{{id}}" class="ui-grid-item{{#gridType}} ui-grid-item--{{gridType}}{{/gridType}}">' +
                      '<div class="ui-grid-item-ratio">' +
                        '<div class="ui-grid-item-content"></div>' +
                      '</div>' +
                    '</div>' +
                  '{{/data}}' +
                '</div>'
    }

  }, View);


  return ViewGrid;

});
