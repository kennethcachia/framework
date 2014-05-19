
define([

  'core/Create',
  'core/dom-element',
  'core/object-array',
  'mv/data-binding',
  'third-party/mustache'

], function (Create, DOMElement, ObjectArray, DataBinding, Mustache) {

  /**
   * View
   */
  var View = Create('View', {

    initializer: function () {
      this._rendered = false;
      this._visible = false;

      this._dataBindings = new ObjectArray({
        defaultType: DataBinding
      });

      this._initAnchor();

      this.on('rendered', this.bindEvents, this);
    },


    destructor: function () {
      var anchor = this.get('anchor');
      var container = this.get('container');

      container.destroy();

      this._rendered = false;
      this._visible = false;

      this._dataBindings.destroy();
    },


    show: function () {
      if (this._rendered) {

        this._toggleVisibility('remove');
        this._visible = true;

      } else {
        throw new Error('View not rendered yet');
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
        throw new Error('View already rendered -- Skipping');
      }
    },


    isRendered: function () {
      return this._rendered;
    },


    bindEvents: function () {},


    _initAnchor: function () {
      var anchor = this.get('anchor');

      if (!anchor) {
        anchor = new DOMElement();
        anchor.fromNode(document.body);

        this.set('anchor', anchor);
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
        throw new Error('View has no container for rendering');
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

      this._dataBindings.purge();

      for (var d = 0; d < dataBindings.length; d++) {
        attr = dataBindings[d];
        attr.context = this;

        this._dataBindings.add(attr);
      }
    },


    _attrs: {
      container: {
        value: null
      },

      containerType: {
        value: DOMElement
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
