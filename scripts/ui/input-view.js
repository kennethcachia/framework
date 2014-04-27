
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Input Box
   */
  var ViewInput = Create('ViewInput', {

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


  return ViewInput;

});
