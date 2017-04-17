//'use strict';

( function() {

  function TransclutionHelper2() {

    var self = this;
    var p = this;
    var utils = self;
    self.dictTemplates = {}
   // debugger
    
    /**
     * Stores template sent to compile method
     * This is our only opportunnity to get
     * the template in a raw state.
     * Store in a dictionary
     * @param tElem
     * @param attrs
     */
    p.storeTemplate = function storeTemplate(tElem, attrs ) {
      /*var forceKeys = true;
       var key = attrs.id;
       if ( key == null ) {
       key = attrs.title
       }
       if ( key == null ) {
       if ( forceKeys ) {
       attrs.id = Math.random();
       key = attrs.id
       }
       else {
       console.error('no key for', tElem, attrs)
       throw new Error('no key');
       //or add one?
       }
       }*/

      debugger

      if ( attrs == null ) { throw 'send attrs'}
      var key = attrs.q_key_id;
      if ( key == null ) {
        key = Math.random();
        //update the DOM with random id
        attrs.q_key_id = key;
      }
      self.dictTemplates[key]=tElem.clone();
      self.lastKey = key;
      //store original template content
      self.contentDev = tElem.clone();
      return self.lastKey;
    }


    /**
     * Store the user content.
     * This is the dom specified with the directive.
     * Why: We need to store this b/c if a user
     * has multiple instances of directive, each
     * can have different template content.
     * We can only access this property in the compile() method
     * @param tElem
     */
    p.storeUserContent = function storeUserContent(tElem) {
      self.contentDev = tElem.clone();
    }


    p.showElem = function showElem(node, str) {

      console.error(str, self.outerHTML(node))
    }
    p.outerHTML = function outerHTML(node){
      if ( node == null ) {
        return 'null'
      }
      if ( node[0] ) {
        node = node[0]
      }
      return node.outerHTML || new XMLSerializer().serializeToString(node);
    }



    p.renderAttempt = function renderAttempt(scope) {
      if (   scope.countRenderers == null)
        scope.countRenderers = 0
      scope.countRenderers++
      console.error('what is -element count ', scope.countRenderers)
    }

    p.showElements = function showElements(element) {
      //console.error('what is element count ', scope.countRenderers)
      if ( element ) {
        console.error('what is -element1 ', self.outerHTML(element[0]).length)
      }
      console.error('what is -element2 ', self.outerHTML(self.contentOutput).length)
      console.error('what is -element3 ', self.outerHTML(self.contentDev).length)
    }



    p.setupTransclution = function setupTransclution(name, scope, $compile, element, html, attrs) {
      if ( name == null ) {
        throw new Error('need a name')
      }
      self.name = name;
      self.element = element;
      self.$compile = $compile;
      self.scope = scope;
      self.loadTemplates(html, element, attrs)
      //debugger
    }

    p.resetTemplate = function resetTemplate() {
      self.contentOutput =  self.contentDefault.clone()
    }
    
    /**
     * Get component template (skin) and
     * reference to element.
     * Note this is only valid for this one iteration
     *
     * @param html
     * @param element
     */
    p.loadTemplates = function loadTemplates(html, oldAttrs) {
      var contentDefault = angular.element(html);
      self.contentDefault = contentDefault;
     /* 
      //self.contentDev = templateOriginal;
      //keyTemplate = sh.dv(keyTemplate, self.lastKey);
      var keyTemplate= null;
      if (oldAttrs != null ) {
        //self.getKey(oldAttrs)
        keyTemplate = oldAttrs.q_key_id ;
      };

      if ( keyTemplate == null ) {
        //keyTemplate = self.lastKey;
      };*/

      /*if ( keyTemplate == null  ) {
        throw new Error('template key is null');
      }*/
      var prevData = TransclutionHelper2.dictX[self.name];
      //self.dictTemplates[keyTemplate]
      if ( prevData == null ) {
        throw new Error('contentDev is null')
      }
      self.contentDev = prevData.tElem.clone();
      self.contentOutput =  self.contentDefault.clone()
      //debugger
    }

    p.getFinalOutput = function getFinalOutput() {
      return self.contentOutput[0];
    }

    
    p.finishContent = function finishContent(htmlFinalized, scope , target) {
      if ( htmlFinalized == null ) {
        htmlFinalized = self.getFinalOutput();
      }
      var directiveElements = self.$compile(htmlFinalized)(self.scope)
      if ( target ) {
        //todo
      }
      self.element.html(directiveElements);
    }

    /**
     * Search userTemplate for fromQuery
     * Place content in toQuery
     * @param from
     * @param to
     */
    p.copyContentGroup = function ( from, to) {
      var fromContent = self.userContent.find(from)[0];
      if ( fromContent == null || fromContent.length == 0  ) {
        self.contentOutput.find(to).hide();
        return;
      }
      self.contentOutput.find(to).append(fromContent);
    };

    /**
     * Search userTemplate, remove item from template
     * so it is not reapplied to contentOutput
     * (think of this as a trasnclude)
     * @param from
     * @param to
     * @returns {*}
     */
    p.copyContentGroup2 = function ( from, to, clear, fxModify,
                                         getChildrenOnly, hideIfNotFound) {
      var fromContent = self.contentDev.find(from)[0];
      //var fromContent = self.contentOutput.find(from)[0];
      //debugger
      //self.userContent.find(from).remove();
      if ( fromContent == null || fromContent.length == 0  ) {
        if ( hideIfNotFound != false ) {
          self.contentOutput.find(to).hide();
        }
        return;
      };
      if ( getChildrenOnly == true ) {
        fromContent = fromContent.children;
      }
      if ( fxModify != null ) {
        var tempFromContent = fxModify(fromContent);
        if (   tempFromContent == false ) {
          return;
        }
        if ( tempFromContent != null ) {
          fromContent = tempFromContent
        }
      }
      if ( clear == true  ) {
        self.contentOutput.find(to).empty();
      }
      self.contentOutput.find(to).append(fromContent);
      self.contentOutput.find(to).show();
      return fromContent;
    };

    p.transclude = self.copyContentGroup2;

    /**
     * Copies attribute, will by default skip
     * if attribute not found
     * @param value
     * @param to
     * @param hideIfNoContent
     * @returns {boolean}
     */
    p.ifDefinedAddTo = function ( value, to, hideIfNoContent) {
      if ( value == null || value.length == 0  ) {
        if (hideIfNoContent == true) {
          self.contentOutput.find(to).hide()
        }
        return false;
      }
      self.contentOutput.find(to).show()
      self.contentOutput.find(to).append(value);
    };

    self.ifAttrDefinedAppendTo = self.ifDefinedAddTo;

    /**
     * Usage - will copy content of value,
     * and if child content is defined
     * will copy content to 'to'
     * @param value
     * @param to
     * @param wrapInContent
     * @returns {boolean}
     */
    p.ifContentDefinedAddTo = function ( value, to,
                                             wrapInContent,
                                             hideIfNoContent,
                                             rawValue) {
      if ( value == null || value == '' || value.length == 0  ) {
        return false;
      };

      var valueElement =null
      if ( rawValue != true ) {
        var valueElement = angular.element(value);
        var valueElement = self.contentDev.find(value)[0];
        if (valueElement == null) {
          return false;
        }  ;
        valueElement = valueElement.children;
      } else {
        valueElement = value;
      }

      if ( wrapInContent != null ) {
        var wrapElement = angular.element(wrapInContent);
        wrapElement.append(valueElement);
        valueElement = wrapElement;
      };

      self.contentOutput.find(to).show();
      self.contentOutput.find(to).append(valueElement);
    };

    p.ifContentDefinedAddTo = self.ifContentDefinedAddTo;

    /**
     * If value is truthy, invoke callback
     * @param value
     * @param fxCallback
     * @returns {boolean}
     */
    p.ifTrue = function ( value, fxCallback ) {
      if ( value == null || value == '' || value.length == 0  ) {
        return false;
      }
      if ( value == true ||  value == 'true' ) {
        fxCallback();
        return true;
      }
      return false;
    }

    self.ifFalse = function ( value, fxCallback ) {
      if ( value == null || value === '' || value.length == 0  ) {
        return false;
      }
      if ( value == false ||  value == 'false' ) {
        fxCallback();
        return true;
      }
      return false;
    }

    p.ifDefined = function ( value, fxCallback ) {
      if ( value == null || value === '' || value.length == 0  ) {
        return false;
      }
      if ( value != null ) {
        fxCallback(value);
        return true;
      }
      return false;
    }

    //The following methods affect the contentOutput
    p.setHtml = function ( elemQuery, val,  hideIfNull ) {
      if ( val == null )  {
        self.contentOutput.find(elemQuery).addClass('hide');
        return ;
      }
      self.contentOutput.find(elemQuery).html(val);
    }

    p.show = function ( elemQuery ) {
      self.contentOutput.find(elemQuery).show()
      self.contentOutput.find(elemQuery).removeClass('hide')
    }

    /**
     * If val is truthy, display elemQuery
     * else hide elemQuery
     * @param val
     * @param elemQuery
     * @returns {boolean}
     */
    p.ifTrueShow = function (val,  elemQuery ) {
      self.hide(elemQuery);
      return self.ifTrue(val, function () {
        self.show(elemQuery);
      });
    }

    p.ifFalseHide = function (val,  elemQuery, hideDetach ) {
      return self.ifFalse(val, function () {
        self.hide(elemQuery);
        if ( hideDetach) {
          self.contentOutput.find(elemQuery).detach();
        }
      });
    }

    p.hide = function ( elemQuery ) {
      self.contentOutput.find(elemQuery).hide()
    }



    p.convertItem = function convertItem() {

      var output = [];
      for (var i = 0; i <  self.contentOutput.length; i++) {
        var node = self.contentOutput[i]
        if ( node.data != null ) {
          output.push( "\n"+node.data );
        } else {
          output.push( node.valueOf() );
        }
      }
      html = output.join("\n");

    }


    /**
     * Set data in the final template
     */

    p.setHtml = function ( elemQuery, val,  hideIfNull ) {
      if ( val == null && hideIfNull != false  )  {
        self.contentOutput.find(elemQuery).addClass('hide');
        return ;
      }
      self.contentOutput.find(elemQuery).html(val);
    }

    p.getHTML = function () {
      var html = self.contentOutput[0];
      return html;
    }

    function defineAttributeHelpers() {
      /**
       * Set self.attrs first
       * @param name
       * @param val
       */
      self.defaultAttribute = function defaultATtr(name, val, attrs) {
        if (attrs != null) {
          self.attrs = attrs;
        }
        if (self.attrs[name] == null) {
          self.attrs[name] = val.toString();
        }
        ;
      }
      self.defaultAttr = self.defaultAttribute;
    }
    defineAttributeHelpers();


    p.watch_copyToScope= function watch_copyToScope(prop, propTo,
                                                        onlyIfNotNull,
                                                        equalityWatch) {

      var scope = self.$scope;
      scope.$watch(prop,
          function (v, oldVal) {
            if (v != null && onlyIfNotNull === true) {
              /* console.log('scope.vm.formObject... changed: ',
               scope.vm.formObject, v);*/
              console.log('copying ',propTo, v)
              scope[propTo] = v;
            };
            /*if (v !== null  ) {
             scope[propTo] = v;
             };*/
            /*console.log('quickCrud',
             'scope.vm.formObject... changed: ',
             scope.vm, v,oldVal);*/
          },equalityWatch);

    }

    function defineHTMLHelpers() {
      self.wrap = function wrap(valueElement,  wrapInContent) {
        //if ( sh.startsWith(valueElement))
        if ( wrapInContent.slice(0,1)!='<') {
          wrapInContent = '<'+wrapInContent+'/>';
        }
        if ( wrapInContent != null ) {
          var wrapElement = angular.element(wrapInContent);
          wrapElement.append(valueElement);
        };

        return wrapElement;
      }
    }
    defineHTMLHelpers();

    function defineScopeHelpers() {
      self.dictElements = {};
      self.destroyDuplicateScopes = function destroyDuplicateScopes(element, scope) {
        return;
        var otherScope = self.dictElements[element];

        if ( otherScope != null && otherScope != scope ) {
          console.error('new scope....')
          otherScope.$destroy();
        }
        self.dictElements[element] = scope;
      };
    }

    defineScopeHelpers();


    function defineComponentHelpers() {
      self.log = function log(msg) {
        console.log()
      }
    }


/*


    p.new = function(item) {
      // debugger;
      return new TransclutionHelper2(item);
    }
*/



    p.move = function (from, to, getChildren) {
      var contents = angular.element(from);
      if ( getChildren ) {
        contents = angular.element(from).children();
      }
      angular.element(to).append(contents);
    }
  }

  TransclutionHelper2.dictX = {};
  TransclutionHelper2.addInitStuff = function addInitStuff(name, tElem, attrs) {
    TransclutionHelper2.dictX[name] = {tElem:tElem.clone(), attrs:attrs}
  };
  
  window.TransclutionHelper2 = TransclutionHelper2; 

  if ( window.reloadableHelper ) {
    function defineQuickReloadingDir() {
      var app = angular.module('com.sync.quick');
      window.reloadableHelper.upgradeApp(app)
      return app;
    }
    var app = defineQuickReloadingDir();
    var wrapperRelodableService = window.reloadableHelper
        .makeServiceReloadable('transcludeHelper2', TransclutionHelper2);
    app.factory('transcludeHelper2', wrapperRelodableService);
  } else {
    app.factory('transcludeHelper2', TransclutionHelper2);
  }

  //angular.module('74App').factory('transcludeHelper', transcludeHelper );
}());
