
define([

  'lib/base/create',
  'lib/base/base'

], function (Create, Base) {

  /**
   * DataBinding
   */
  var DataBinding = Create('DataBinding', {

    initializer: function () {
      this._registerDataChangeEvent();
      this._registerElementEvent();
    },


    _registerDataChangeEvent: function () {
      var context = this.get('context');
      var key = this.get('key');
      var eventName = 'data.' + key + 'Change';

      context.on(eventName, this._onDataChange, this);
    },


    _registerElementEvent: function () {
      var context = this.get('context');
      var container = context.get('container');
      var element = this.get('element');

      if (element) {
        this._element = container.one(element);
      } else {
        this._element = container;
      }

      var event = this.get('event');

      if (event) {
        this._element.addDOMEvent({
          context: this,
          eventName: event,
          callback: '_onElementEvent'
        });
      }
    },


    _onElementEvent: function (domElement) {
      var attribute = this.get('attribute');

      // TODO: Improve this - getAttribute() returns old value.
      var value = this._element._node[attribute];

      var context = this.get('context');
      var key = this.get('key');

      context.set('data.' + key, value);
    },


    _onDataChange: function () {
      var context = this.get('context');
      var setter = this.get('setElementValue');

      var value;

      if (setter) {

        value = setter.call(context);

      } else {

        var data = context.get('data');

        var key = this.get('key');
        var value = data[key];

      }

      var attribute = this.get('attribute');

      this._element.setAttribute(attribute, value);
    },


    _attrs: {
      context: {
        value: null
      },

      key: {
        value: null
      },

      attribute: {
        value: null
      },

      element: {
        value: null
      },

      // TODO: Rename to eventName.
      event: {
        value: null
      },

      setElementValue: {
        value: null
      }
    }

  }, Base);


  return DataBinding;

});
