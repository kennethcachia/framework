define([

  'lib/ui/grid',
  'lib/base/test/fixtures',
  'lib/dom/node'

], function (Grid, Fixtures, DOMNode) {

  describe('Grid', function () {
    var fixture;
    var context;

    beforeEach(function () {
      fixture = Fixtures.create();

      context = {
        items: [1, 2, 3]
      };
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should render a grid within a DOMNode', function () {
      var d = new DOMNode('.fixture');
      var grid = new Grid(context, 'items');

      grid.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-grid')).toBeTruthy();
      expect(d._node.innerHTML).toEqual(
        '<div class="ui-grid-item"><div class="ui-grid-item-intrinsic"></div></div>' +
        '<div class="ui-grid-item"><div class="ui-grid-item-intrinsic"></div></div>' +
        '<div class="ui-grid-item"><div class="ui-grid-item-intrinsic"></div></div>');
    });


    it('should fire an event when an item is selected', function () {
      var d = new DOMNode('.fixture');
      var grid = new Grid(context, 'items');
      var callback = jasmine.createSpy();

      grid.attach(d);
      grid.on('selected', callback);

      var first = fixture.querySelector('.ui-grid-item');
      var last = fixture.querySelector('.ui-grid-item:last-of-type');

      first.click();
      expect(callback).toHaveBeenCalledWith({ item: 1 });

      last.click();
      expect(callback).toHaveBeenCalledWith({ item: 3 });
    });
  });

});