Draft.View = class View extends Draft.Element {
  /*render(renderer) {
    this['render' + renderer.toUpperCase()]();
  }*/
};

Draft.View.require('size');

Draft.Group.mixin({
  view: function(width, height) {
    return this.add(new Draft.View()).size(width, height).pos(0, 0);
  }
});
