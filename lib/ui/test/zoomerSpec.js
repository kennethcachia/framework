define([

  'lib/ui/zoomer',
  'lib/dom/node',
  'lib/base/test/fixtures',
  'lib/base/test/simulate'

], function (Zoomer, DOMNode, Fixtures, Simulate) {

  describe('Zoomer', function () {
    var fixture;
    var domNode;
    var zoomer;
    var zoomIn;
    var zoomOut;


    beforeEach(function () {
      fixture = Fixtures.create();
      domNode = new DOMNode('.fixture');

      zoomer = new Zoomer('.fixture');
      zoomer.attach(domNode);

      zoomIn = zoomer.findDOMNodes('.zoomer-scale-in');
      zoomOut = zoomer.findDOMNodes('.zoomer-scale-out');
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should increase scale when clicking on zoom in', function () {
      Simulate.event(zoomIn, 'click');
      expect(zoomer._scale).toEqual(1.2);
    });


    it('should decrease scale when clicking on zoom out', function () {
      Simulate.event(zoomOut, 'click');
      expect(zoomer._scale).toEqual(0.8);
    });


    it('should not go above a scale of 2', function () {
      for (var i = 0; i < 10; i++) {
        Simulate.event(zoomIn, 'click');
      }

      expect(zoomer._scale).toEqual(2);
    });


    it('should not go under a scale of 0.4', function () {
      for (var i = 0; i < 10; i++) {
        Simulate.event(zoomOut, 'click');
      }

      expect(zoomer._scale).toEqual(0.4);
    });
  });

});