
define(['core/create', 'mv/parent-view'], function (Create, ParentView) {

  /**
   * Menu
   */
  var Menu = Create('Menu', {

    _attrs: {
      container: '<div class="menu"></div>'
    }

  }, ParentView);


  return Menu;

});


/*
var DraggableMenu = Create('DraggableMenu', {

  initializer: function () {

  }

}, Menu);


var CollapsableMenu = Create('CollapsableMenu', {

  initializer: function () {

  }

}, Menu);
*/