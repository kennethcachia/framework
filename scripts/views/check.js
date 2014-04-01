
define([

  'core/create',
  'views/input'

], function (Create, ViewInput) {

  /**
   * Checkbox
   */
  var ViewCheck = Create('ViewCheck', {

    _attrs: {
      data: {
        value: null,
        checked: false
      },

      template: '<input data-source="true" type="checkbox" {{#value}}value="{{value}}"{{/value}} {{#checked}}checked{{/checked}}/>'
    }

  }, ViewInput);


  return ViewCheck;

});
