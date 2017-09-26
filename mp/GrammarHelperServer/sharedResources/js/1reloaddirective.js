/**
 * Created by user2 on 4/16/16.
 */
var reloadableHelper = {};
window.reloadableHelper = reloadableHelper;
reloadableHelper.formalParameterList = function formalParameterList(fx) {
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    function formalParameterList(fn) {
        var fnText,argDecl;
        var args=[];
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS);

        var r = argDecl[1].split(FN_ARG_SPLIT);
        for(var a in r){
            var arg = r[a];
            arg.replace(FN_ARG, function(all, underscore, name){
                args.push(name);
            });
        }
        return args;
    }

    return formalParameterList(fx);
}


var debugRelodable = true;
debugRelodable = false;
reloadableHelper.dirs = {};

reloadableHelper.saveDirectiveCtx = function saveDirectiveCtx(name, args) {
    if (  reloadableHelper.dirs[name] ) {
        return;
    }
    var ctx = {};
    ctx.name = name;
    ctx.dirInitArgs =  Array.prototype.slice.call(args);;
    reloadableHelper.dirs[name]  = ctx
}

reloadableHelper.directiveReloadingEnabled = function directiveReloadingEnabled(name, args) {
    var ctx =  reloadableHelper.dirs[name]
    if ( ctx == null ) return false;
    if ( ctx.ddo )
        return true
    return false;
}

reloadableHelper.directiveRecreateDDO = function directiveRecreateDDO(name, newDirFx) {
    var ctx =  reloadableHelper.dirs[name]
    if ( ctx == null ) return;
    /* if ( ctx.ddo == null ) //TODO: what happens, if item is not loaded first?
     return*/

    //Att 5: forward outside of compile method
    var ddo = newDirFx.apply(newDirFx, ctx.dirInitArgs); //prevent $provider is reininiting stuff
    //window.ddo.compile = ddo.compile;
    //Attempet 6: forward inside of compile method
    ctx.ddoNew = ddo;
}


reloadableHelper.recompileDirective = function
    recompileDirective(name, args, _this, preventRecursion) {
    var args = Array.prototype.slice.call(args);
    var ctx =  reloadableHelper.dirs[name]


    if ( ctx == null ) { console.error('nothing for', name)  }
     if ( ctx == null ) return;
    /*if ( ctx.createdOriginalDDO != true  ) {
     ctx.createdOriginalDDO = false; //skip first time
     return
     }*/
    //q: why is repeat important?
    if (  ctx.ddoNew  && preventRecursion == undefined
        && ctx.ddoNew.runOnce == null ) {
        //console.warn('forwarding', tElem, repeat);
        args.pop();
        args.push(true); //preventRecursion
        ctx.ddoNew.runOnce = true;
        return ctx.ddoNew.compile.apply(_this, args);
    }


    if (  ctx.ddoNew  && preventRecursion == undefined
        && ctx.ddoNew.runOnce == true ) {
        console.error('reloading', name)
        //console.warn('forwarding', tElem, repeat);
        args.pop();
        args.push(true); //preventRecursion
        ctx.ddoNew.runOnce = true;
        return ctx.ddoNew.compile.apply(_this, args);
    }

    return null;
}


reloadableHelper.upgradeApp = function upgradeapp(app) {
    //approach 1: Make a template diretive that emits most recent versions
    if ( app.reloadableDirective == null ) {
        window.reloadableDirectives = {};
        window.reloadableControllers = {};
        //debugger
        var noopDirective = function noOpDir() { return function noOpX() {}; };

        app.reloadableDirective = function (name, dirFx)  {

            //limitation only affects function based
            if (window.reloadableDirectives[name] != null ) {
                window.reloadableDirectives[name] = dirFx;


                reloadableHelper.directiveRecreateDDO(name, dirFx)
                // app.directive(name, dirFx)
                //app.factoryProvider.factory(name+'Directive', dirFx);
                //var y = app;
                // debugger;
//http://weblogs.thinktecture.com/pawel/2014/07/angularjs-dynamic-directives.html
                /*

                 for (var i = 0; i < nodeList.length; i++) {
                 attrs = new Attributes();

                 // we must always refer to nodeList[i] since the nodes can be replaced underneath us.
                 directives = collectDirectives(nodeList[i], [], attrs, i === 0 ? maxPriority : undefined,
                 ignoreDirective);

                 nodeLinkFn = (directives.length)
                 ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement,
                 null, [], [], previousCompileContext)
                 : null;

                 if (nodeLinkFn && nodeLinkFn.scope) {
                 compile.$$addScopeClass(attrs.$$element);
                 }

                 */

                //app.$provide.decorator('ngSrcDirective', function ($delegate, $parse) {
                /* app.decorator(
                 name,
                 function sectionDirectiveDecorator( $delegate, $parse ) {
                 console.log( ". . . . . . . . . . . . . ." );
                 console.log( "There are %s matching directives.", $delegate.length );
                 console.log( "Selecting a random one." );
                 console.log( ". . . . . . . . . . . . . ." );
                 debugger;
                 var randomIndex = Math.floor( Math.random() * $delegate.length );
                 var randomDirective = $delegate[ randomIndex ];
                 // Demonstrating that our custom "label" field is available on the
                 // object in the $delegate collection.
                 console.log( "That maths randomly chose: %s.", randomDirective.bensLabel );
                 console.log( ". . . . . . . . . . . . . ." );
                 // Return a new array that contains only the randomly-selected version
                 // of the directive.
                 return( [ randomDirective ] );
                 }
                 );
                 */

                return; //only update
            }
            window.reloadableDirectives[name] = dirFx;
            var args = reloadableHelper.formalParameterList(dirFx);
            if ( name == 'quickReloadable3') {
                //    console.error('creating', 'quickReloadableDir2', args);
            }

            var newRedirectionDiretive = args;

            function redirector($scope, yu) {

                console.info('redirective', name)
                var args2 = Array.prototype.slice.call(arguments);
                var redirectToDir = window.reloadableDirectives[name];
                var dir =  redirectToDir.apply(this, args2);
                // debugger;
                return dir;
            }

            //mistake" redirector must return directive
            // var y = 'function newRedirectionDiretive( ' + args.join(', ') + ') {  return redirector('+args.join(', ')+') }'
            // var result = eval(y)
            newRedirectionDiretive.push(function redirector($scope, yu) {



                console.info('redirective', name, args2)
                if ( name == 'quickReloadable3') {
                    //console.error('creating', 'quickReloadableDir2', args);
                    //debugger;
                }

                var args2 = Array.prototype.slice.call(arguments);
                var redirectToDir = window.reloadableDirectives[name];
                var dir = redirectToDir.apply(this, args2);
                //debugger;
                return dir;

            })
            // debugger;
            //alert('d')
            //var noopDirective = function noOpDir() { return function noOpX() {}; };
            //debugger;
            //return;
            app.directive(name, newRedirectionDiretive)
        }
        app.reloadableController = function (name, controllerX) {

            if (window.reloadableControllers[name] != null ) {
                window.reloadableControllers[name] = controllerX;
                return; //only update
            }

            window.reloadableControllers[name] = controllerX;
            var args = reloadableHelper.formalParameterList(controllerX)

            var reloadableController = args;
            reloadableController.push(function redirectingController() {
                //debugger;
                console.info('redirectingController', name)
                var args2 = Array.prototype.slice.call(arguments);
                var redirectToCtrl = window.reloadableControllers[name];
                var ctrl = redirectToCtrl.apply(this, args2);
                //debugger;
                return ctrl;

            })

            // debugger;
            app.controller(name, reloadableController)

            //alert('d ' + name)
            //debugger;
        }
    }



    function defineReloadableServiceMethods() {
        //debugger
        window.reloadableHelper.makeServiceReloadable = function (name, originalService) {
            //debugger
            if ( window.reloadableHelper.services == null) {
                 window.reloadableHelper.services = {};
                 window.reloadableHelper.servicesReloadCount = {};
            }
            //debugger
            var newerVersionOfService = window.reloadableHelper.services[name];
            if (newerVersionOfService != null) { //on second time update service only
                //debugger;
                var newestVersionOfService = originalService;
                window.reloadableHelper.services[name] = newestVersionOfService;
                window.reloadableHelper.servicesReloadCount[name]++;
                newestVersionOfService.version =  window.reloadableHelper.servicesReloadCount[name];
                if ( debugRelodable )
                    console.error('updating service', name, newestVersionOfService.version);
                return;
            }

            //var args = reloadableHelper.formalParameterList(originalService);
            var reloadableHelperTestService = function reloadableHelperTestService(sh, pubSub) {
                var args = Array.prototype.slice.call(arguments);
                function createService() {

                    //var service = new originalService(sh);
                    var constructor = Object.create(originalService.prototype);
                    var service = originalService.apply(constructor, args);

                    var newerVersionOfService =
                        window.reloadableHelper.services[name];
                    if (newerVersionOfService != null) {
                        //service = new newerVersionOfService();
                        //service = new newerVersionOfService();

                        var constructor = Object.create(newerVersionOfService.prototype);
                        var service = newerVersionOfService.apply(constructor, args);

                    } else {
                        window.reloadableHelper.services[name] = originalService; //init services
                        window.reloadableHelper.servicesReloadCount[name] = 0;
                        originalService.version = 0;
                    };

                    if ( debugRelodable )
                        console.error('creating service', name, service, window.reloadableHelper.servicesReloadCount[name]);
                    //debugger;
                    //service.QuickUIConvertor = QuickUIConvertor;
                    if ( service == null ) {
                        if ( debugRelodable ) {
                            console.warn('constructor had to be used', constructor, originalService)
                        }
                        service = constructor;
                        if ( constructor == null ) {
                            throw new Error('constructor % service cannot be defined ')
                        }
                    }
                    return service
                }

                //var args_ = arguments;
                //debugger;
                var service = createService();
                if ( service.create != null ) {
                    throw new Error('createMethod cannot be defined ')
                }
                service.create = function createMostRecentFromService() {
                    return createService();
                };

                return service; 
            };
            reloadableHelperTestService.$inject = ['sh', 'pubSub', '$filter'];

            var args = reloadableHelper.formalParameterList(originalService)
            reloadableHelperTestService.$inject = args;
            //debugger;
            return reloadableHelperTestService;
        }

    }
    defineReloadableServiceMethods();


}