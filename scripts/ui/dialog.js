
define(['core/create', 'mv/parent-view'], function (Create, ParentView) {

  /**
   * Dialog
   */
  var Dialog = Create('Dialog', {

    initializer: function () {
      var ui = this.get('ui');

      ui.each(ui, function (elem) {
        elem.anchor = '.dialog-ui';
      });

      this.set('children', ui);
    },


    _attrs: {
      label: null,
      container: '<div class="dialog"></div>',
      template: '<div class="dialog-ui"></div><div class="dialog-buttons"></div>',
      ui: []
    }

  }, ParentView);


  return Dialog;

});
