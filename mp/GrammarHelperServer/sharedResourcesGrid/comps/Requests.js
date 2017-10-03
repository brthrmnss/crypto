/**
 * Created by user1 on 10/2/2017.
 */

function PaginatorX() {
    var self = this;
    var p = this;
    self.data = {};


    self.data.btnMore;
    self.data.btnMore2;

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init() {}

    p.search = function search(query) {
        self.data.offset = 0 ;
        query.limit = self.settings.pageSize;
        query.offset = self.data.offset;
        self.data.offset += self.settings.pageSize;
        self.data.noMoreResults = false
    };

    p.searchMore = function searchMore(query) {
        if ( self.data.searchActive) {
            return 'search active';
        }
        if ( self.data.noMoreResults === true) {
            console.warn('no more results')
            return 'no more results';
        }
        //query.pageSize = self.settings.pageSize;
        //	debugger;
        query.offset 		= 	self.data.offset;
        self.data.offset 	+= 	self.settings.pageSize;
        query.limit = self.settings.pageSize;

        var searchId = Math.random();
        self.data.searchActive = true;
        self.data.searchId = searchId;

        setTimeout(function searchTimedOut() {
            if ( self.data.searchId == searchId) {
                console.error('search timed out ... ')
                self.utils.resetSearchId()
            }
        },30*1000);

    };

    p.pagResults = function pagResults(results) {
        var lastPage = results.length < self.settings.pageSize;
        console.info('search', 'lastPage out page', lastPage, results.length ,self.settings.pageSize );
        gUtils.ifHide(lastPage, self.data.btnMore)
        gUtils.ifShow(lastPage, self.data.btnEndOfResults)
        if ( lastPage )
            self.data.noMoreResults = true;
        //if (xMode)
        //gUtils.ifHide(firstPage, self.data.btnPrevious)
        self.utils.resetSearchId()
    };

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}