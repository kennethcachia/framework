
define([

  'lib/base/create',
  'lib/base/base',
  'lib/dom/dom',
  'lib/dom/dom-query'

], function (Create, Base, DOM, DOMQuery) {

  // Fix circular dependency.
  var DOMElement;

  require(['lib/dom/dom-element'], function (domElement) {
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
      var executeCallback = true;

      if (callbackFn) {

        var matchClass = this.get('matchClass');
        var checkAncestors = this.get('checkAncestors');

        var target = e.target;

        if (matchClass) {
          var isTarget = this._query.matches(target);
          var isAncestor = false;

          if (!isTarget && checkAncestors) {
            target = this._query.getMatchingAncestor(target);
            isAncestor = (target !== null);
          }

          if (!isTarget && !isAncestor) {
            executeCallback = false;
          }
        }

        if (executeCallback) {
          var domElement = new DOMElement();

          domElement.fromNode(target);
          callbackFn.call(context, domElement, e);
        }

      } else {
        throw new Error('Callback does not exist');
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
      },

      checkAncestors: {
        value: false
      }
    }

  }, Base);


  return DOMEvent;

});
