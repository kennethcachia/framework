
define([

  'lib/base/create',
  'lib/mv/view'

], function (Create, View) {

  /**
   * ButtonView
   */
  var ButtonView = Create('ButtonView', {

    _click: function () {
      this.fire('buttonClicked');
    },


    _attrs: {
      data: {
        value: {
          label: null
        }
      },

      domEvents: {
        value: [{
          eventName: 'click',
          callback: '_click'
        }],
      },

      container: {
        value: '<div class="ui-button">{{label}}</div>'
      }
    }

  }, View);


  return ButtonView;

});
