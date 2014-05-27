
define([

  'lib/base/create',
  'lib/mv/view'

], function (Create, View) {

  /**
   * LabelView
   */
  var LabelView = Create('LabelView', {

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


  return LabelView;

});
