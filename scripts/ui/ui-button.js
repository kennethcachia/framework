
/*
 * Input
 */
var UIButton = Create('UIButton', {

  _onClick: function() {
    this.fire('clicked');
  },


  _attrs: {
    label: null,
    template: '<button class="ui-button">{{label}}</button>',
    mergeData: ['label'],

    domEvents: [{
      selector: 'button',
      eventName: 'click',
      callback: '_onClick'
    }]
  }

}, UI);
