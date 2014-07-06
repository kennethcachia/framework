define([

  'lib/ui/tabs',
  'lib/ui/base',
  'lib/dom/node',
  'lib/base/test/fixtures'

], function (Tabs, UIBase, DOMNode, Fixtures) {

  describe('Tabs', function () {
    var fixture;

    beforeEach(function () {
      fixture = Fixtures.create();
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should render and activate the first tab', function () {
      var d = new DOMNode('.fixture');
      new Tabs(2, d);

      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-tabs')).toBeTruthy();
      expect(d._node.innerHTML).toEqual(
        '<ul class="ui-tab-triggers">' +
          '<li class="ui-tab-active"></li>' +
          '<li></li>' +
        '</ul>' +
        '<div class="ui-tab-content ui-tab-active"></div>' +
        '<div class="ui-tab-content"></div>'
      );
    });


    it('should activate another tab on click', function () {
      var d = new DOMNode('.fixture');
      new Tabs(2, d);
      var triggers = d.all('.ui-tab-triggers li');
      var tabs = d.all('.ui-tab-content');

      tabs[1]._node.click();
      expect(triggers[0].hasClass('ui-tab-active')).toBeFalsy();
      expect(triggers[1].hasClass('ui-tab-active')).toBeTruthy();
      expect(tabs[0].hasClass('ui-tab-active')).toBeFalsy();
      expect(tabs[1].hasClass('ui-tab-active')).toBeTruthy();

      tabs[0]._node.click();
      expect(triggers[0].hasClass('ui-tab-active')).toBeTruthy();
      expect(triggers[1].hasClass('ui-tab-active')).toBeFalsy();
      expect(tabs[0].hasClass('ui-tab-active')).toBeTruthy();
      expect(tabs[1].hasClass('ui-tab-active')).toBeFalsy();
    });
  });

});