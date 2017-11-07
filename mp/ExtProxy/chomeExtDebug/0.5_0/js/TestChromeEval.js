var shelpers = require('shelpers')
var sh = shelpers.shelpers;
var ReloadWatcher = shelpers.ReloadWatcher;

if (module.parent == null) {
    var instance = new ReloadWatcher();
    var config = {};
    instance.init(config)

    instance.watchFileOnSOcket2(/*'bookCcvert'*/)

    instance.sendMsg('window.eval',
        {
            name: 'xcal',
            evalStr: 'console.debug("test")'
        })



    instance.sendMsg('window.eval',
        {
            name: 'xcal',
            evalStr: 'console.debug("---",window.boomBoomId)'
        })


    instance.sendMsg('window.eval',
        {
            name: 'xcal',
            evalStr: '$("input").css("background-color", "red");'
        })


    instance.sendMsg('window.eval',
        {
            name: 'xcal',
            evalStr: '$("input").css("background-color", "blue");'
        })
    //

    instance.sendMsg('window.eval',
        {
            name: 'xcal',
            evalStr: 'window.location = "http://www.yahoo.com"'
        })

}