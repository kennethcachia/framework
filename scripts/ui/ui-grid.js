
/*
 * Grid
 */
var UIGrid = Create('UIGrid', {

  _attrs: {
    gridType: 'square',
    mergeData: ['gridType'],

    template: '<div class="ui-grid">' +
                '{{#data}}' +
                  '<div id="{{id}}" class="ui-grid-item{{#gridType}} ui-grid-item--{{gridType}}{{/gridType}}">' +
                    '<div class="ui-grid-item-ratio">' +
                      '<div class="ui-grid-item-content"></div>' +
                    '</div>' +
                  '</div>' +
                '{{/data}}' +
              '</div>'
  }

}, UI);
