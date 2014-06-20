
define([

  'lib/base/create',
  'lib/mv/view'

], function (Create, View) {

  /**
   * InputView
   */
  var InputView = Create('InputView', {

    bindEvents: function () {
      InputView.super.bindEvents.call(this);

      this.on('data.textChange', this._onTextChange, this);
    },


    _onTextChange: function () {
      this.fire('updated');
    },


    _attrs: {
      data: {
        value: {
          text: null
        },
        getter: function (val) {
          var isNumber = this.get('isNumber');

          if (isNumber) {
            val.text = parseInt(val.text, 10);
          }

          return val;
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

      isNumber: {
        value: false
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
