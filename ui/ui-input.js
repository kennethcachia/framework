
/*
 * Input
 */
var UIInput = Create({

  _onChange: function(e) {
    this.broadcast('changed', {
      val: e.target.value
    });
  },


  _attrs: {
    template: '<input/>',

    events: [{
      selector: 'input',
      eventName: 'change',
      callback: '_onChange'
    }]
  }

}, UI);
