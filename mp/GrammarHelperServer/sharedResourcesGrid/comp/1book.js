
var angular = {};

var noOp = function () {
  return angular;
}
angular.module = noOp
angular.factory = noOp
angular.directive = noOp
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
window.app = {};
window.app.directive = noOp;
window.app.controller = noOp;
window.angular.controller = noOp;
window.app.filter =
window.angular.filter = noOp;