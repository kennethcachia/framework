
define([

  'core/create',
  'core/DOM',
  'core/dom-query'

], function (Create, DOM, DOMQuery) {

  /**
   * DOM Event
   */
  var DOMEvent = Create('DOMEvent', {

    initializer: function () {
      this._delegate();
      this._createQuery();
    },


    destructor: function () {
      var source = this.get('source');
      var eventName = this.get('eventName');

      DOM.off(source, eventName, this._pointer);

      if (this._query) {
        this._query.destroy();
      }
    },


    _createQuery: function () {
      var matchClass = this.get('matchClass');

      if (matchClass) {
        this._query = new DOMQuery({
          query: matchClass
        });
      }
    },


    _delegate: function () {
      var source = this.get('source');
      var eventName = this.get('eventName');

      var delegateFn = function (e) {
        this._delegator.call(this, e);
      };

      this._pointer = DOM.on(source, eventName, delegateFn, this);
    },


    _delegator: function (e) {
      var callback = this.get('callback');
      var context = this.get('context');
      var source = this.get('source');

      var noClass = !this._hasClass();
      var currentTarget;

      if (!noClass) {
        var isTarget = this._query.matches(e.target);
        var parent = false;

        if (!isTarget) {
          parent = this._query.getMatchingAncestor(e.target);
        }

        currentTarget = isTarget || parent;
      }

      callback = context[callback];

      if (noClass || currentTarget) {
        if (!callback) {
          throw 'Callback does not exist - ' + callback;
        } else {
          this._executeCallback(callback, context, e, currentTarget);
        }
      }
    },


    _executeCallback: function (callback, context, e, currentTarget) {
      var className = this.get('matchClass');
      var data = {};

      if (className) {
        data.element = currentTarget;
      }

      callback.call(context, e, data);
    },


    _hasClass: function () {
      var matchClass = this.get('matchClass');
      var excludeClass = this.get('excludeClass');

      return matchClass || excludeClass;
    },


    _attrs: {
      source: null,

      /**
       * Match elements by class
       * and/or avoid any elements
       */
      matchClass: null,
      excludeClass: null,

      eventName: null,
      callback: null,
      context: null
    }

  });


  return DOMEvent;

});
