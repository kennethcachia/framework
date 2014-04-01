
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * Input Box
   */
  var ViewInput = Create('ViewInput', {

    _attrs: {
      domEvents: [{
        eventName: 'change',
        callback: 'updateData'
      }],

      data: {
        value: null
      },

      template: '<input data-source="true" type="text" {{#value}}value="{{value}}"{{/value}} />'
    }

  }, View);


  return ViewInput;

});
