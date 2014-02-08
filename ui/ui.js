
/*
 * UI Base
 */
var UI = Create({

  initializer: function () {
    var id = this.get('id');

    if (!id) {
      throw 'UI does not have an ID';
    }
  },


  broadcast: function (eventName, data) {
    var id = this.get('id');

    eventName = eventName[0].toUpperCase() + eventName.slice(1);
    eventName = id + eventName;

    this.fire(eventName, data);
  },


  _attrs: {
    id: null,
    container: '<div class="ui-box"></div>'
  }

}, View);
