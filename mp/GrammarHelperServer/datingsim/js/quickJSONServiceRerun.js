/**
 * Created by morriste on 8/9/16.
 */

var FileWatcher = require('./FileWatcher').FileWatcher;


var f = new FileWatcher();
var config = {
    file:"C://Users//morriste//train//train_drive//trash//node2//mp//QuickJSON//quickJSONService.js",
    runNode:"__file__"
}
f.init(config)