define([

  'lib/ui/abstract-movables-container',
  'lib/base/inherit',
  'lib/dom/node',
  'lib/dom/browser',
  'lib/base/test/fixtures',
  'lib/base/test/simulate'

], function (AbstractMovablesContainer, inherit, DOMNode, Browser, Fixtures, Simulate) {

  describe('AbstractMovablesContainer', function () {
    var fixture;
    var movable;
    var domNode;
    var a;
    var b;
    var c;


    function Movable() {
      Movable.superClass.apply(this, arguments);
    }
    inherit(Movable, AbstractMovablesContainer);
    Movable.prototype.move = function () {};


    beforeEach(function () {
      fixture = Fixtures.create();
      domNode = new DOMNode('.fixture');

      movable = new Movable('div',
        '<div class="a"></div>' +
        '<div class="b"></div>' +
        '<span class="c"></span>', {});

      movable.attach(domNode);

      a = domNode.one('.a');
      b = domNode.one('.b');
      c = domNode.one('.c');
    });


    afterEach(function () {
      Fixtures.remove(fixture);
      movable.destroy();
    });


    it('should activate a DOMNode on mouse or touch events', function () {
      Simulate.event(a, 'mousedown');
      Simulate.event(a, 'mousemove');
      expect(movable._activeMovable).toEqual(a);

      Simulate.event(a, 'mouseup');
      expect(movable._activeMovable).toEqual(null);

      if (Browser.supportsTouch()) {
        Simulate.event(a, 'touchstart');
        Simulate.event(a, 'touchmove');
        expect(movable._activeMovable).toEqual(a);

        Simulate.event(a, 'touchend');
        expect(movable._activeMovable).toEqual(null);
      }
    });


    it('should only consider DOMNodes that match the given selector', function () {
      Simulate.event(c, 'mousedown');
      Simulate.event(c, 'mousemove');
      expect(movable._activeMovable).toEqual(null);

      if (Browser.supportsTouch()) {
        Simulate.event(c, 'touchstart');
        Simulate.event(c, 'touchmove');
        expect(movable._activeMovable).toEqual(null);
      }
    });
  });

});