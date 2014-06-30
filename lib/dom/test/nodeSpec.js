define(['lib/dom/node'], function (DOMNode) {

  describe('DOMNode', function () {
    var fixture = document.createElement('div');
    fixture.classList.add('fixture');

    document.body.appendChild(fixture);

    beforeEach(function () {
      fixture.innerHTML = '';
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

      expect(d._node).toEqual(div);
    });

    it('should return an array of matching DOMNodes when all() is used', function () {
      var div = document.createElement('div');
      var span = document.createElement('span');

      fixture.appendChild(div);
      fixture.appendChild(span);

      var f = new DOMNode('.fixture');
      var e = f.all('*');

      expect(e.length).toEqual(2);
      expect(e[0]._node).toEqual(div);
      expect(e[1]._node).toEqual(span);
    });

    it('should append a DOMNode', function () {
      var div = document.createElement('div');

      var d = new DOMNode(div);
      var n = new DOMNode('.fixture');
      
      n.append(d);

      expect(n._node.innerHTML).toEqual('<div></div>');
    });

    it('should remove a node from the dom after a destroy()', function () {
      var div = document.createElement('div');
      fixture.appendChild(div);

      var n = new DOMNode('.fixture div');
      n.destroy();

      expect(document.querySelector('.fixture div')).toBeNull();
    });

    it('should destroy any appended DOMNodes after a destroy()', function () {
      var div = document.createElement('div');
      var span = document.createElement('span');

      var f = new DOMNode(fixture);
      var d = new DOMNode(div);
      var s = new DOMNode(span);

      d.append(s);
      f.append(d);

      d.destroy();

      expect(d._isDestroyed).toBeTruthy();
      expect(s._isDestroyed).toBeTruthy();
    });
  });

});