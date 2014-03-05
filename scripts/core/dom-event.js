
define(['core/create', 'core/DOM'], function (Create, DOM) {

  /**
   * DOM Event
   */
  var DOMEvent = Create('DOMEvent', {

    initializer: function () {
      var delegate = this.get('delegate');

      if (delegate) {
        this._delegate();
      } else {
        this._addListener();
      }
    },


    destructor: function () {
      var source = this.get('source');
      var eventName = this.get('eventName');

      DOM.off(source, eventName, this._pointer);
    },


    _addListener: function () {
      var source = this.get('source');
      var eventName = this.get('eventName');
      var callback = this.get('callback');
      var context = this.get('context');

      this._pointer = DOM.on(source, eventName, callback, context)
    },


    _delegate: function () {
      var selector = this.get('delegate');
      var source = this.get('source');
      var eventName = this.get('eventName');

      var delegateFn = function (e) {
        this._delegator.call(this, e);
      };

      this._pointer = DOM.on(source, eventName, delegateFn, this);
    },


    _delegator: function (e) {
      var source = this.get('source');
      var selector = this.get('delegate');
      var child = DOM.one(selector, source);
      var callback = this.get('callback');
      var context = this.get('context');

      callback = context[callback];

      if (!callback) {
        throw 'Callback does not exist - ' + callback;
      } else if (e.target === source || e.target === child) {
        callback.call(context, e);
      }
    },


    _attrs: {
      source: null,
      delegate: null,
      eventName: null,

      /**
       * String in delegating,
       * Function otherwise
       */
      callback: null,

      context: null
    }

  });


  return DOMEvent;

});
