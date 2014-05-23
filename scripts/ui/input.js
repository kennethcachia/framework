
define([

  'base/create',
  'mv/view'

], function (Create, View) {

  /**
   * InputView
   */
  var InputView = Create('InputView', {

    _attrs: {
      data: {
        value: {
          text: null
        }
      },

      dataBindings: {
        value: [
          {
            key: 'text',
            attribute: 'value',
            element: 'input',
            event: 'change'
          }
        ]
      },

      container: {
        value: '<div class="ui-input"></div>'
      },

      template: {
        value: '<input type="text" {{#text}}value="{{text}}"{{/text}} />'
      }
    }

  }, View);


  return InputView;

});
