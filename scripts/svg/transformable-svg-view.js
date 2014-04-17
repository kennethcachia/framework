
define([

  'core/create',
  'svg/svg-view',
  'core/dom-element'

], function (Create, SVGView, DOMElement) {

  /**
   * Transformable SVG View
   */
  var TransformableSVGView = Create('TransformableSVGView', {

    initializer: function () {
      this._bindEvents();
    },


    destructor: function () {
      for (var e = 0; e < this._events.length; e++) {
        this._events[e].destroy();
      }
    },


    _bindEvents: function () {
      var targets = this.get('selector');
      var container = this.get('container');

      this._events = [];

      this._events.push(container.addDOMEvent({
        eventName: 'mousedown',
        callback: '_onTargetMouseDown',
        context: this
      }));

      this._events.push(container.addDOMEvent({
        eventName: 'mouseup',
        callback: '_onTargetMouseUp',
        context: this
      }));

      this._events.push(container.addDOMEvent({
        eventName: 'mousemove',
        callback: '_onTargetMouseMove',
        context: this
      }));
    },


    _onTargetMouseDown: function (domElement, e) {
      var children = this.getRenderedChildren();

      var child;
      var childContainer;

      var x;
      var y;

      for (var c = 0; c < children.length; c++) {
        child = children[c];
        childContainer = child.get('container');

        if (childContainer.isEqualTo(domElement)) {
          console.log('down');
          this._activeView = child;
          break;
        }
      }
    },


    _onTargetMouseUp: function () {
      this._activeView = null;
      console.log('up');
    },


    _onTargetMouseMove: function (domElement, e) {
      console.log('move');

      if (this._activeView) {
        var x = e.layerX;
        var y = e.layerY;

        this._activeView.setPosition(x, y)
      }
    }

  }, SVGView);


  return TransformableSVGView;

});
