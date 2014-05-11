
define([

  'core/create',
  'core/dom',
  'core/dom-query'

], function (Create, DOM, DOMQuery) {

  // TODO: Avoid this circular dep?
  var DOMElement;
  require(["core/dom-element"], function (domElement) {
    DOMElement = domElement;
  });


  /**
   * DOMEvent
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

      var callbackFn = context[callback];

      if (callbackFn) {

        var matchClass = this.get('matchClass');
        var target = e.target;

        if (matchClass) {
          var isTarget = this._query.matches(target);

          if (!isTarget) {
            target = this._query.getMatchingAncestor(target);          
          }
        }

        var domElement = new DOMElement();
        domElement.fromNode(target);

        callbackFn.call(context, domElement, e);

      } else {
        throw 'Callback does not exist - ' + callback;
      }
    },


    _attrs: {
      source: {
        value: null
      },

      matchClass: {
        value: null
      },

      eventName: {
        value: null
      },

      callback: {
        value: null
      },

      context: {
        value: null
      }
    }

  });


  return DOMEvent;

});
