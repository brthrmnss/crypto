
var angular = {};

var noOp = function () {
  return angular;
}
angular.module = noOp
angular.factory = noOp
angular.directives = noOp
window.angular= angular;

window.reloadableHelper = {};
window.reloadableHelper.upgradeApp = function () {
    return angular;
}

window.reloadableHelper.makeServiceReloadable = function () {
    return angular;
}


angular.reloadableDirective = noOp
angular.reloadableController = noOp