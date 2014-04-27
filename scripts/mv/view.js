
define([

  'core/Create',
  'core/dom-element',
  'mv/data-binding',
  'third-party/mustache'

], function (Create, DOMElement, DataBinding, Mustache) {

  /**
   * View
   */
  var View = Create('View', {

    initializer: function () {
      var anchor = this.get('anchor');

      if (!anchor) {
        anchor = new DOMElement();
        anchor.fromNode(document.body);
        this.set('anchor', anchor);
      }

      this._rendered = false;
      this._visible = false;

      this._dataBindings = [];
    },


    destructor: function () {
      var anchor = this.get('anchor');
      var container = this.get('container');

      container.destroy();

      this._rendered = false;
      this._visible = false;

      this._destroyDataBindings();
    },


    show: function () {
      if (this._rendered) {

        this._toggleVisibility('remove');
        this._visible = true;

      } else {
        console.log('View not rendered yet');
      }
    },


    hide: function () {
      this._toggleVisibility('add');
      this._visible = false;
    },


    render: function (options) {

      if (!this._rendered) {

        this._createContainer();
        this._render(options);

      } else {
        console.log('View already rendered -- Skipping');
      }

    },


    _render: function (options) {
      var container = this.get('container');

      if (container) {

        var template = this.get('template');

        if (template) {
          var output = this._renderFromTemplate(template);
          container.setInnerHTML(output);
        }

        this._addToAnchor(container, options);
        this._delegateDOMEvents();
        this._rendered = true;

        this.fire('rendered');

        this._handleDataBindings();

      } else {
        throw 'View has no container for rendering.';
      }
    },


    _addToAnchor: function (element, options) {
      var anchor = this.get('anchor');

      if (!options) {
        anchor.appendChild(element);
      } else if (options.after) {
        element.insertAfter(options.after.get('container'));
      }
    },


    _renderFromTemplate: function (template) {
      var data = this.get('data');
      return Mustache.render(template, data);
    },


    _createContainer: function () {
      var container = this.get('container');
      var containerType = this.get('containerType');

      if (!containerType) {
        containerType = DOMElement;
      }

      if (typeof container === 'string') {
        var output = this._renderFromTemplate(container);

        this.set('container', new containerType({
          html: output
        }));
      }

      var className = this.get('className');

      if (className) {
        this.get('container').addClass(className);
      }
    },


    _toggleVisibility: function (mode) {
      var container = this.get('container');
      var hiddenClassName = this.get('hiddenClassName');

      var action = mode + 'Class';
      container[action](hiddenClassName);
    },


    _delegateDOMEvents: function () {
      var domEvents = this.get('domEvents');
      var container = this.get('container');

      var domEvent;

      for (var d = 0; d < domEvents.length; d++) {
        domEvent = domEvents[d];
        domEvent.context = this;
        container.addDOMEvent(domEvent);
      }
    },


    _handleDataBindings: function () {
      var dataBindings = this.get('dataBindings');

      var attr;
      var dataBinding;

      this._destroyDataBindings();

      for (var d = 0; d < dataBindings.length; d++) {
        attr = dataBindings[d];
        attr.context = this;

        dataBinding = new DataBinding(attr);
        this._dataBindings.push(dataBinding);
      }
    },


    _destroyDataBindings: function () {
      for (var d = 0; d < this._dataBindings.length; d++) {
        this._dataBindings[d].destroy();
      }

      this._dataBindings = [];
    },


    _attrs: {
      container: {
        value: null
      },

      containerType: {
        value: null
      },

      data: {
        value: {}
      },

      domEvents: {
        value: []
      },

      dataBindings: {
        value: []
      },

      anchor: {
        value: null
      },

      className: {
        value: null
      },

      hiddenClassName: {
        value: 'view--hidden'
      },

      template: {
        value: null
      }
    }

  });


  return View;

});
