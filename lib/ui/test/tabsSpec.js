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
      var ui = new Tabs(2, {});

      ui.attach(d);
      expect(d.hasClass('ui')).toBeTruthy();
      expect(d.hasClass('ui-tabs')).toBeTruthy();
      expect(d._node.innerHTML).toEqual(
        '<ul class="ui-tabs-triggers">' +
          '<li class="ui-tabs-active"></li>' +
          '<li></li>' +
        '</ul>' +
        '<div class="ui-tabs-content ui-tabs-active" data-tab="1"></div>' +
        '<div class="ui-tabs-content" data-tab="2"></div>'
      );
    });


    it('should throw an error when an incorrect index is used in attachToTab()', function () {
      new DOMNode('.fixture');
      var ui = new Tabs(2, {});

      expect(function () {
        ui.attachToTab(3);
      }).toThrowError('Not true');

      expect(function () {
        ui.attachToTab(0);
      }).toThrowError('Not true');

      expect(function () {
        ui.attachToTab(1);
      }).not.toThrowError('Not true');
    });


    it('should activate another tab on click', function () {
      var d = new DOMNode('.fixture');
      var ui = new Tabs(2, {});

      ui.attach(d);

      var triggers = d.all('.ui-tabs-triggers li');
      var tabs = d.all('.ui-tabs-content');

      triggers[1]._node.click();
      expect(triggers[0].hasClass('ui-tabs-active')).toBeFalsy();
      expect(triggers[1].hasClass('ui-tabs-active')).toBeTruthy();
      expect(tabs[0].hasClass('ui-tabs-active')).toBeFalsy();
      expect(tabs[1].hasClass('ui-tabs-active')).toBeTruthy();

      triggers[0]._node.click();
      expect(triggers[0].hasClass('ui-tabs-active')).toBeTruthy();
      expect(triggers[1].hasClass('ui-tabs-active')).toBeFalsy();
      expect(tabs[0].hasClass('ui-tabs-active')).toBeTruthy();
      expect(tabs[1].hasClass('ui-tabs-active')).toBeFalsy();
    });
  });

});