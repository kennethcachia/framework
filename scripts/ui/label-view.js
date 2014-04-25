
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Label
   */
  var ViewLabel = Create('ViewLabel', {

    _attrs: {
      data: {
        value: {
          label: null
        }
      },

      container: {
        value: '<div class="ui-label"></div>'
      },

      template: {
        value: '<span>{{label}}</span>'
      }
    }

  }, View);


  return ViewLabel;

});
