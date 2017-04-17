
function testProxy() {

    var dictFxs = {};
    dictFxs.c = function callC(arg1, arg2) {
        console.log('testproxy', arg1, arg2)
    }

    var handler = {
        get: function(target, name, reciever) {
            console.log('get-testproxy', target, name, reciever)
            var origMethod = dictFxs[name];
            if ( origMethod == null ) {
                throw new Error(['could not find fx',
                    '"'+name+'"']
                    .join(' '))
            }
            return function (...args) {
                let result = origMethod.apply(this, args);
                console.log('callmeth', name + JSON.stringify(args)
                    + ' -> ' + JSON.stringify(result));
                return result;
            };

            return name in target ?
                target[name] :
                37;
        },
/*
        apply: function(target, that, args) {
            console.log('fx-testproxy', target, that, args)

            return;
            sup.apply(that, args);
            base.apply(that, args);
        }*/
    };

    var p = new Proxy({}, handler);
    //p.a = 1;
   // p.b = undefined;

    p.c();
    p.c(4);
    p.d();
   // console.log(p.a, p.b); // 1, undefined
   // console.log('c' in p, p.c);

 //'   debugger
}


//testProxy();



/*


 function testProxy() {


 var handler = {
 get: function(target, name, reciever) {
 console.log('get-testproxy', target, name, reciever)
 const origMethod = target[name];
 return function (...args) {
 let result = origMethod.apply(this, args);
 console.log(propKey + JSON.stringify(args)
 + ' -> ' + JSON.stringify(result));
 return result;
 };

 return name in target ?
 target[name] :
 37;
 },

};

var p = new Proxy({}, handler);
//p.a = 1;
// p.b = undefined;

p.c()
p.c(4)
console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c);

//'   debugger
}


testProxy();



 */


$('x42-tree').find('x42-tree-node').find('[level=3]').find('.tree-label-anchor')

$('x42-tree').find('.tree-label-anchor')

function getLinks() {

    var links =     $('x42-tree').find('.tree-label-anchor')
    var links2 = links.filter(function filterInvalidLinks(i){
        var ui = $(this)
        //ui = ui.find('a')
        var hasHref = ui.attr('href') != null
        //console.debug('links', i, ui, hasHref, ui.attr('href'))
        if ( hasHref ) {
            return true;
        }
        return false;
    })

    console.debug('links', links.length)
    console.debug('links2', links2.length)
    return links2
}



getLinks()



function findTabs() {
    var tabs =  $('#tabHolder').find('li.uib-tab:visible')
    console.debug('tabs', tabs.length)
    return tabs
}



findTabs()

function clickkForX() {
    var table = $('pt\\:remote-table');
    $('pt-table').css('opacity');
    return tabs
}



findTabs()
