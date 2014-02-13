
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
    // TODO: model data?
    //value: null,
    //mergeData: ['value'],

    template: '<input class="ui-input" value="{{value}}"/>',
    useIdFor: 'value',

    domEvents: [{
      selector: 'input',
      eventName: 'change',
      callback: '_onChange'
    }]
  }

}, UI);
