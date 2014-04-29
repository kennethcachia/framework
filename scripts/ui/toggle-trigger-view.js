
define([

  'core/create',
  'mv/view'

], function (Create, View) {

  /**
   * ToggleTriggerView
   */
  var ToggleTriggerView = Create('ToggleTriggerView', {

    _onClick: function () {
      this.fire('triggerClick', null, true);
    },


    _attrs: {
      action: {
        value: null
      },

      container: {
        value: '<div class="toggle-trigger-view"></div>'
      },

      domEvents: {
        value: [{
          eventName: 'click',
          callback: '_onClick'
        }]
      }
    }

  }, View);


  return ToggleTriggerView;

});
