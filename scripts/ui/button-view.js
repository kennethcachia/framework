
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * ButtonView
   */
  var ButtonView = Create('ButtonView', {

    _attrs: {
      data: {
        value: {
          label: null
        }
      },

      container: {
        value: '<div class="ui-button">{{label}}</div>'
      }
    }

  }, View);


  return ButtonView;

});
