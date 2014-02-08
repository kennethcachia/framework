
/*
 * Input
 */
var UIButton = Create({

  _onClick: function() {
    this.broadcast('clicked');
  },


  _attrs: {
    label: null,
    template: '<button>{{label}}</button>',
    mergeData: ['label'],

    events: [{
      selector: 'button',
      eventName: 'click',
      callback: '_onClick'
    }]
  }

}, UI);
