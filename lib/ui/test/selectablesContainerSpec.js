define([

  'lib/ui/selectables-container',
  'lib/base/inherit',
  'lib/dom/node',
  'lib/dom/browser',
  'lib/base/test/fixtures',
  'lib/base/test/simulate'

], function (SelectablesContainer, inherit, DOMNode, Browser, Fixtures, Simulate) {

  describe('SelectablesContainer', function () {
    var fixture;
    var selectable;
    var domNode;
    var a;
    var b;
    var c;


    beforeEach(function () {
      fixture = Fixtures.create();
      domNode = new DOMNode('.fixture');

      selectable = new SelectablesContainer('div',
        '<div class="a"></div>' +
        '<div class="b"></div>' +
        '<span class="c"></span>', {});

      selectable.attach(domNode);

      a = domNode.one('.a');
      b = domNode.one('.b');
      c = domNode.one('.c');
    });


    afterEach(function () {
      Fixtures.remove(fixture);
      selectable.destroy();
    });


    it('should select a DOMNode on mouse or touch events', function () {
      Simulate.event(a, 'mousedown');
      expect(selectable._activeChild).toEqual(a);

      Simulate.event(c, 'mousedown');
      expect(selectable._activeChild).toEqual(null);

      if (Browser.supportsTouch()) {
        Simulate.event(a, 'touchstart');
        expect(selectable._activeChild).toEqual(a);

        Simulate.event(c, 'touchstart');
        expect(selectable._activeChild).toEqual(null);
      }
    });


    it('should only consider DOMNodes that match the given selector', function () {
      Simulate.event(c, 'mousedown');
      expect(selectable._activeChild).toEqual(null);

      if (Browser.supportsTouch()) {
        Simulate.event(c, 'touchstart');
        expect(selectable._activeChild).toEqual(null);
      }
    });


    it('should fire a selected event when a child is selected', function () {
      var selected = jasmine.createSpy();
      selectable.on('selected', selected, this);

      Simulate.event(a, 'mousedown');
      expect(selected).toHaveBeenCalledWith({
        domNode: a
      });

      selected.calls.reset();

      if (Browser.supportsTouch()) {
        Simulate.event(a, 'touchstart');
        expect(selected).toHaveBeenCalledWith({
          domNode: a
        });
      }
    });


    it('should fire a deselected event when a child is deselected', function () {
      var deselected = jasmine.createSpy();
      selectable.on('deselected', deselected, this);

      Simulate.event(a, 'mousedown');
      Simulate.event(c, 'mousedown');
      expect(deselected).toHaveBeenCalled();

      deselected.calls.reset();

      if (Browser.supportsTouch()) {
        Simulate.event(a, 'touchstart');
        Simulate.event(c, 'touchstart');
        expect(deselected).toHaveBeenCalled();
      }
    });
  });

});