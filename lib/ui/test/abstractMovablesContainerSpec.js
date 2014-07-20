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


    it('should initiate a move on mousemove or touchmove', function () {
      Simulate.event(a, 'mousedown');
      Simulate.event(a, 'mousemove');
      expect(movable._activeChild).toEqual(a);
      expect(movable._hasGesture).toBeTruthy();

      Simulate.event(a, 'mouseup');
      expect(movable._activeChild).toEqual(a);
      expect(movable._hasGesture).toBeFalsy();

      Simulate.event(c, 'mousedown');
      expect(movable._activeChild).toBeNull();
      expect(movable._hasGesture).toBeTruthy();

      if (Browser.supportsTouch()) {
        Simulate.event(a, 'touchstart');
        Simulate.event(a, 'touchmove');
        expect(movable._activeChild).toEqual(a);
        expect(movable._hasGesture).toBeTruthy();

        Simulate.event(a, 'touchend');
        expect(movable._activeChild).toEqual(a);
        expect(movable._hasGesture).toBeFalsy();

        Simulate.event(c, 'touchstart');
        expect(movable._activeChild).toBeNull();
        expect(movable._hasGesture).toBeTruthy();
      }
    });
  });

});