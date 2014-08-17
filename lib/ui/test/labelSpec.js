define([

  'lib/ui/label',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (Label, DOMNode, Fixtures) {

  describe('RangeValue', function () {
    var fixture;
    var domNode;

    beforeEach(function () {
      fixture = Fixtures.create();
      domNode = new DOMNode('.fixture');
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should render a Label within a DOMNode', function () {
      var label = new Label('Label');
      label.attach(domNode);

      expect(domNode.hasClass('ui')).toBeTruthy();
      expect(domNode.hasClass('ui-label')).toBeTruthy();
      expect(domNode._node.innerHTML).toEqual('<span>Label</span>');
    });
  });

});