
define(['core/create', 'ui/ui'], function (Create, UI) {

  /**
   * Grid
   */
  var UIGrid = Create('UIGrid', {

    _clickItem: function (e, eventData) {
      var data = this.getData(eventData);

      this.fire('selected', {
        data: data
      });
    },


    _attrs: {
      gridType: 'square',
      mergeData: ['gridType'],

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

  }, UI);


  return UIGrid;

});
