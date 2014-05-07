
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * ButtonView
   */
  var ButtonView = Create('ButtonView', {

    _clickItem: function () {
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
          callback: '_clickItem'
        }],
      },

      container: {
        value: '<div class="ui-button">{{label}}</div>'
      }
    }

  }, View);


  return ButtonView;

});
