
define([

  'core/create',
  'ui/input'

], function (Create, ViewInput) {

  /**
   * Checkbox
   */
  var ViewCheck = Create('ViewCheck', {

    _attrs: {
      data: {
        value: {
          value: null,
          checked: false
        }
      },

      template: {
        value: '<input data-source="true" type="checkbox" {{#value}}value="{{value}}"{{/value}} {{#checked}}checked{{/checked}}/>'
      }
    }

  }, ViewInput);


  return ViewCheck;

});
