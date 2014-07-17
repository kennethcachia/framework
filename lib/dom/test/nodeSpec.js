define([

  'lib/dom/node',
  'lib/base/test/fixtures'

], function (DOMNode, Fixtures) {

  describe('DOMNode', function () {
    var fixture;

    beforeEach(function () {
      fixture = Fixtures.create();
    });


    afterEach(function () {
      Fixtures.remove(fixture);
    });


    it('should throw an error when a node is not found', function () {
      expect(function () {
        new DOMNode('.dummy');
      }).toThrowError('Node not found');
    });


    it('should throw an error when input is not a string or a Node', function () {
      expect(function () {
        new DOMNode({});
      }).toThrowError('Incorrect type');
    });


    it('should keep a reference to an existing Node if input is a selector', function () {
      var f = new DOMNode('.fixture');
      expect(f._node).toEqual(fixture);
    });


    it('should keep a reference to an existing Node if input is a Node', function () {
      var f = new DOMNode(fixture);
      expect(f._node).toEqual(fixture);
    });


    it('should return a matching DOMNode when one() is used', function () {
      var div = document.createElement('div');
      fixture.appendChild(div);

      var f = new DOMNode('.fixture');
      var d = f.one('div');

      expect(d._node.isEqualNode(div)).toBeTruthy();
    });


    it('should return an array of matching DOMNodes when all() is used', function () {
      var div = document.createElement('div');
      var span = document.createElement('span');

      fixture.appendChild(div);
      fixture.appendChild(span);

      var f = new DOMNode('.fixture');
      var e = f.all('*');

      expect(e.length).toEqual(2);
      expect(e[0]._node.isEqualNode(div)).toBeTruthy();
      expect(e[1]._node.isEqualNode(span)).toBeTruthy();
    });


    it('should update the node\'s inner HTML when the innerHTML property is updated', function () {
      var f = new DOMNode('.fixture');
      var n = f._node;

      expect(f.innerHTML).toEqual('');
      expect(n.innerHTML).toEqual('');

      f.innerHTML = 'test';

      expect(f.innerHTML).toEqual('test');
      expect(n.innerHTML).toEqual('test');
    });


    it('should throw an error when innerHTML is not a string', function () {
      var f = new DOMNode('.fixture');

      expect(function () {
        f.innerHTML = null;
      }).toThrowError('Not a string');

      expect(function () {
        f.innerHTML = undefined;
      }).toThrowError('Not a string');

      expect(function () {
        f.innerHTML = document.createElement('div');
      }).toThrowError('Not a string');
    });


    it('should add and remove classes on the node when using addClass() and removeClass()', function () {
      var f = new DOMNode('.fixture');
      expect(f._node.className).toEqual('fixture');

      f.addClass('new');
      expect(f._node.className).toEqual('fixture new');

      f.removeClass('new');
      expect(f._node.className).toEqual('fixture');
    });


    it('should return true when hasClass() searches for an existing class', function () {
      var f = new DOMNode('.fixture');
      expect(f.hasClass('fixture')).toBeTruthy();
      expect(f.hasClass('new')).toBeFalsy();
    });


    it('should return the node\'s parent via getParent()', function () {
      var f = new DOMNode('.fixture');
      fixture.appendChild(document.createElement('div'));

      var div = f.one('div');
      expect(div.getParent()).toEqual(f);
    });


    it('should return the node\'s client rect via getRect()', function () {
      var f = new DOMNode('.fixture');

      f._node.style.position = 'absolute';
      f._node.style.top = 0;
      f._node.style.left = 0;
      f._node.style.width = '100px';
      f._node.style.height = '100px';

      var rect = f.getRect();

      rect = JSON.stringify({
        left: rect.left,
        right: rect.right,
        top: rect.top,
        height: rect.height,
        bottom: rect.bottom,
        width: rect.width
      });

      var expected = JSON.stringify({
        left: 0,
        right: 100,
        top: 0,
        height: 100,
        bottom: 100,
        width: 100
      });

      expect(rect).toEqual(expected);
    });


    it('should return the current child index via getSiblingIndex()', function () {
      var f = new DOMNode('.fixture');

      fixture.appendChild(document.createElement('div'));
      fixture.appendChild(document.createElement('span'));
      fixture.appendChild(document.createElement('p'));

      expect(f.one('div').getSiblingIndex()).toEqual(0);
      expect(f.one('span').getSiblingIndex()).toEqual(1);
      expect(f.one('p').getSiblingIndex()).toEqual(2);

      expect(function () {
        f.one('ul').getSiblingIndex();
      }).toThrowError();
    });


    it('should remove a node from the dom after a destroy()', function () {
      var f = new DOMNode(fixture);

      f.destroy();
      expect(document.querySelector('.fixture')).toBeNull();
    });
  });

});