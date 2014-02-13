
/*
 * Grid
 */
var UIGrid = Create('UIGrid', {

  _attrs: {
    useIdFor: 'items',
    template: '<div class="ui-grid">' +
                '{{#items}}<div class="ui-grid-item">{{name}}</div>{{/items}}' +
              '</div>'
  }

}, UI);
