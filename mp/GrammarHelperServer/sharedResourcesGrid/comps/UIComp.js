/**
 * Created by user1 on 10/2/2017.
 */

function UIComp() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg)
        self.settings = cfg;
    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
    };

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

