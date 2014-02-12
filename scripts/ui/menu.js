
/*
 * Menu
 */
var Menu = Create('Menu', {

  _attrs: {
    container: '<div class="menu"></div>'
  }

}, ParentView);


/*
 * Draggable menu
 */
var DraggableMenu = Create('DraggableMenu', {

  initializer: function () {

  }

}, Menu);


/*
 * Collapsable menu
 */
var CollapsableMenu = Create('CollapsableMenu', {

  initializer: function () {

  }

}, Menu);
