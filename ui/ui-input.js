
/*
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
    value: null,
    template: '<input value="{{value}}"/>',
    mergeData: ['value'],
    resolveId: 'value',

    domEvents: [{
      selector: 'input',
      eventName: 'change',
      callback: '_onChange'
    }]
  }

}, UI);
