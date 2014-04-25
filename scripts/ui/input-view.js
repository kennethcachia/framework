
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Input Box
   */
  var ViewInput = Create('ViewInput', {

    _attrs: {
      domEvents: {
        value: [{
          eventName: 'change'
        }]
      },

      data: {
        value: {
          text: null
        }
      },

      container: {
        value: '<div class="ui-input"></div>'
      },

      template: {
        value: '<input type="text" {{#text}}value="{{text}}"{{/text}} />'
      }
    }

  }, View);


  return ViewInput;

});
