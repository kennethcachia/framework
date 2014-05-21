
define([

  'core/create',
  'core/object-array'

], function (Create, ObjectArray) {

  /**
   * Layout
   */
  var Layout = Create('Layout', {

    initializer: function () {
      this._createViews();
      this._bindEvents();
    },


    destructor: function () {
      this._views.destroy();
    },


    render: function () {
      this._views.each(function (view) {
        view.render();
      });
    },


    getViewById: function (id) {
      return this._views.getById(id);
    },


    _createViews: function () {
      var views = this.get('views');

      this._views = new ObjectArray();
      this._views.addFromList(views);
    },


    // TODO: Move this to ex: EventList when events are more modular.
    _bindEvents: function () {
      var events = this.get('events');

      var event;
      var view;
      var callback;

      for (var e = 0; e < events.length; e++) {
        event = events[e];

        view = this.getViewById(event.viewId);
        callback = this[event.callback];

        view.on(event.eventName, callback, this);
      }
    },


    _attrs: {
      views: {
        value: []
      },

      events: {
        value: []
      }
    }

  });


  return Layout;

});
