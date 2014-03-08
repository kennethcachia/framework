
define(['core/create', 'mv/parent-view'], function (Create, ParentView) {

  /**
   * Dialog
   */
  var Dialog = Create('Dialog', {

    initializer: function () {
      this._initChildren();
      this.on('anchorChange', this._setCloseAction, this);
    },


    destructor: function () {
      this._closeEvent.destroy();
      console.log('bye');
    },


    close: function (e) {
      console.log('closing dialog...');
      this.destroy();
    },


    _initChildren: function () {
      var ui = this.get('ui');

      ui.each(ui, function (elem) {
        elem.anchor = '.dialog-ui';
      });

      this.set('children', ui);
    },


    _setCloseAction: function () {
      var anchor = this.get('anchor');

      this._closeEvent = anchor.addDOMEvent({
        excludeClass: '.dialog',
        eventName: 'click',
        callback: 'close',
        context: this
      });
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
