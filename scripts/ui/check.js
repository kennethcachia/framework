
define([

  'base/create',
  'mv/view'

], function (Create, View) {

  /**
   * Checkbox
   */
  var CheckView = Create('CheckView', {

    initializer: function () {
      this.on('data.checkedChange', this._onChange, this);
    },


    _onChange: function () {
      var data = {
        checked: this.get('data').checked
      };

      this.fire('checkChanged', data, true);
    },


    _attrs: {
      data: {
        value: {
          value: null,
          checked: false
        }
      },

      dataBindings: {
        value: [
          {
            key: 'checked',
            attribute: 'checked',
            element: 'input',
            event: 'change'
          }
        ]
      },

      container: {
        value: '<div class="ui-check"></div>'
      },

      template: {
        value: '<input type="checkbox" {{#value}}value="{{value}}"{{/value}} {{#checked}}checked{{/checked}}/>'
      }
    }

  }, View);


  return CheckView;

});
