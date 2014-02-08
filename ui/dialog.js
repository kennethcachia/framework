
/*
 * Dialog
 */

var Dialog = Create({

  initializer: function () {
    var ui = this.get('ui');
    this.on('rendered', this._renderSections, this);
  },


  _renderSections: function () {
    var container = this.get('container');

    var ui = this.get('ui');
    ui.anchor = container.one('.dialog-ui');
    this.addChild(ui);

    var buttons = this.get('buttons');
    buttons.anchor = container.one('.dialog-buttons');
    buttons = this.addChild(buttons);

    buttons.on('saveClicked', function () {
      console.log('dialog received click!');
    });
  },


  _attrs: {
    label: null,
    container: '<div class="dialog"></div>',
    template: '<div class="dialog-ui"></div><div class="dialog-buttons"></div>',
    ui: null
  }

}, View);
