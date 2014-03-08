
define(['core/create', 'core/DOM'], function (Create, DOM) {

  /**
   * DOM Event
   */
  var DOMEvent = Create('DOMEvent', {

    initializer: function () {
      this._delegate();
    },


    destructor: function () {
      var source = this.get('source');
      var eventName = this.get('eventName');

      DOM.off(source, eventName, this._pointer);
    },


    _delegate: function () {
      var source = this.get('source');
      var eventName = this.get('eventName');

      var delegateFn = function (e) {
        this._delegator.call(this, e);
      };

      this._pointer = DOM.on(source, eventName, delegateFn, this);
    },


    _isTargetOrChild: function (element, attr, reverse) {
      var className = this.get(attr);
      var match = null;

      if (className) {
        className = className.replace('.', '');

        var isTarget = DOM.hasClass(element, className);
        var isChild = DOM.getAncestor(element, className);

        match = (isTarget || isChild);
        match = reverse ? !match : match;
      }

      return match;
    },


    _delegator: function (e) {
      var source = this.get('source');
      var context = this.get('context');

      var filterMatch = this._isTargetOrChild(e.target, 'matchClass');
      var excludeMatch = this._isTargetOrChild(e.target, 'excludeClass', true);

      var callback = this.get('callback');
      callback = context[callback];

      if (filterMatch || excludeMatch) {
        if (!callback) {
          throw 'Callback does not exist - ' + callback;
        } else {
          callback.call(context, e);
        }
      }
    },


    _attrs: {
      source: null,

      /**
       * Match elements by class
       * and/or avoid any element 
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
