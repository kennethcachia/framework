
define(['core/create', 'core/ui'], function (Create, UI) {

  /**
   * Input
   */
  var UIInput = Create('UIInput', {

    // TODO: move to UIBase?
    _onChange: function(e) {
      this.fire('changed', {
        val: e.target.value
      });
    },


    _attrs: {
      template: '<input class="ui-input" value="{{data}}"/>',

      domEvents: [{
        selector: 'input',
        eventName: 'change',
        callback: '_onChange'
      }]
    }

  }, UI);


  return UIInput;

});
