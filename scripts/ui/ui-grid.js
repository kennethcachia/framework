
/*
 * Grid
 */
var UIGrid = Create('UIGrid', {

  _attrs: {
    template: '<div class="ui-grid">' +
                '{{#data}}<div class="ui-grid-item">{{name}}</div>{{/data}}' +
              '</div>'
  }

}, UI);
