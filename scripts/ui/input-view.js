
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

      template: {
        value: '<input data-source="true" type="text" {{#text}}value="{{text}}"{{/text}} />'
      }
    }

  }, View);


  return ViewInput;

});
