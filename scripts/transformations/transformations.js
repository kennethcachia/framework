
define([

  'core/create',
  'core/dom-element',
  'transformations/crosshair'

], function (Create, DOMElement, Crosshair) {

  /**
   * Transformations
   */
  var Transformations = Create('Transformations', {

    initializer: function () {
      this._body = new DOMElement();
      this._body.fromNode(document.body);

      var boundingElement = this.get('boundingElement');
      this._boundingBox = boundingElement.get('container');

      this._render();
      this._bindEvents();
    },


    destructor: function () {
      for (var e = 0; e < this._events.length; e++) {
        this._events[e].destroy();
      }
    },


    _render: function () {
      var crosshair = this.get('crosshair');
      this._body.appendChild(crosshair);
    },


    _bindEvents: function (domElement) {
      var targets = this.get('targets');
      this._events = [];

      this._events.push(this._boundingBox.addDOMEvent({
        eventName: 'mousedown',
        callback: '_onTargetMouseDown',
        context: this
      }));

      this._events.push(this._body.addDOMEvent({
        eventName: 'mouseup',
        callback: '_onTargetMouseUp',
        context: this
      }));

      // mousedown should still work when
      // crosshair is on top of a target
      var crosshair = this.get('crosshair');

      crosshair.addDOMEvent({
        eventName: 'mousedown',
        callback: '_onTargetMouseDown',
        context: this
      });
    },


    _registerMouseMove: function () {
      this._mouseMoveEvent = this._boundingBox.addDOMEvent({
        eventName: 'mousemove',
        callback: '_onTargetMouseMove',
        context: this
      });
    },


    _destroyMouseMove: function () {
      this._mouseMoveEvent.destroy();
    },


    _activateCrosshair: function (domElement) {
      var crosshair = this.get('crosshair');
      crosshair.activate(domElement);

      this.fire('selected', {
        target: domElement
      });
    },


    _deactivateCrosshair: function () {
      var crosshair = this.get('crosshair');
      crosshair.deactivate();

      this.fire('unselected');
    },


    _getPos: function () {
      var fn = this.get('getPos');
      return fn.call(this, this._isActive);
    },


    _setPos: function (x, y) {
      var fn = this.get('setPos');
      fn.call(this, this._isActive, x, y);
    },


    _onTargetMouseDown: function (domElement, e) {
      var targets = this.get('targets');

      if (domElement.hasClass(targets)) {

        if (!this._isActive) {
          this._isActive = domElement;
          this._registerMouseMove();

          var coords = this._getPos();

          this._offset = {
            x: e.layerX - coords.x,
            y: e.layerY - coords.y
          };

          this._activateCrosshair(domElement);
          console.log('down');
        }

      } else {
        this._deactivateCrosshair();
      }
    },


    _onTargetMouseUp: function () {
      if (this._isActive) {
        this._isActive = null;
        this._destroyMouseMove();
        console.log('up');
      }
    },


    _onTargetMouseMove: function (domElement, e) {
      var crosshair = this.get('crosshair');

      if (this._isActive.isEqualTo(domElement)) {
        console.log('move');
        var x = e.layerX - this._offset.x;
        var y = e.layerY - this._offset.y;

        this._setPos(x, y);
        crosshair.setBoundary(this._isActive);
      }
    },


    _attrs: {
      boundingElement: null,
      targets: null,
      crosshair: new Crosshair(),

      getPos: function () {
        throw 'Abstract method - attrs.getPos()';
      },

      setPos: function () {
        throw 'Abstract method - attrs.setPos()';
      }
    }

  });


  return Transformations;

});
