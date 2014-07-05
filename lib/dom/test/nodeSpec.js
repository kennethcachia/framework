define(['lib/dom/node'], function (DOMNode) {

  describe('DOMNode', function () {
    var fixture;

    beforeEach(function () {
      fixture = document.createElement('div');
      fixture.classList.add('fixture');
      document.body.appendChild(fixture);
    });


    afterEach(function () {
      fixture.remove();
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


    it('should remove a node from the dom after a destroy()', function () {
      var f = new DOMNode(fixture);

      f.destroy();
      expect(document.querySelector('.fixture')).toBeNull();
    });
  });

});