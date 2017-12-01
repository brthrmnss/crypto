var u = uiUtils;


uiUtils.fxRetry = function fxRetry(fx, fxTarget, _args, maxTry, iterationCount) {
    var error = new Error()
    var cfg = {}
    cfg.fx = fx;
    throwIfNull(fx, 'need a fxTest to test against')
    throwIfNull(fxTarget, 'need a fxTarget to succeed with')
    cfg.fxTarget = fxTarget;
    if (_args != null)
        var args = convertArgumentsToArray(_args)
    else
        args = [];

    cfg.args = args;
    if (maxTry != null) {
        cfg.maxTry = maxTry;
    }
    if (iterationCount != null) {
        cfg.iterationCount = iterationCount;
    }
    return uiUtils.fxRetrySimp(cfg)
}


uiUtils.fxRetrySimp = function fxRetrySimp(cfg) {
    cfg.errorForStack = sh.dv(cfg.errorForStack, new Error())
    if (cfg.maxTry == null) {
        cfg.maxTry = 40;
    }
    if (cfg.iterationCount == null) {
        cfg.iterationCount = 0;
    }
    if (cfg.maxTry < cfg.iterationCount) {
        console.error('failed too many times', cfg.fx.name)
        console.error(cfg.errorForStack)
        return;
    }
    try {
        var result = cfg.fx()
    } catch (e) {
        setTimeout(function retryLater() {
            cfg.iterationCount++
            uiUtils.fxRetrySimp(cfg)
        }, 500);
        console.info(cfg.fx.name, cfg.iterationCount, 'trying again')
        return true;
    }


    //debugger;

    console.info(cfg.fx.name, cfg.iterationCount, 'ok...')

    if (cfg.iterationCount > 0) {

        cfg.fxTarget.apply(this, cfg.args)
        return;
    }

    return false;
}


function SimpleListHelper() {
    var self = this;
    var p = this;
    self.data = {};

    p.init = function init(cfg) {
        self.settings = cfg;
        if (self.settings.debug) {
            self.debug = self.settings.debug;
            self.debug = sh.dv(self.debug, {})
        }
        u.require(self.settings, 'need settings')
        u.require(self.settings.id, 'need an id')
        u.require(self.settings.idPartial, 'need idPartial id')


        function reinit() {
            init(cfg)
        }

        //var partialFound = $(cfg.idPartial).length > 0
        u.requireJquery(cfg.idPartial, 'could not find the partial', 10)
        u.require(self.settings.idPartial, 'need idPartial id')


        //debugger
        /*  if (sh.retryFx(partialFound, function retry() {
         self.init(cfg)
         })) {
         return;
         }*/


        //u.dv(sel)

        /*if (serverHelper.utils.test(self.settings.urlHash)) {
         self.openContentListDialog();
         }
         ;*/

        //console.debug('ok in content')
        self.getContent(self.setupUIs)
        // self.renderList()
    };
//http://localhost:33031/index.html?test=contentListDialog&listId=ls1567897

    p.getContent = function getContent(fx) {
        // return;
        var cfg = {}
        //cfg.div = '.modal-contact .content'
        // cfg.append = true
        // cfg.divCreatable = u.join2('holder', self.settings.id)
        cfg.id = self.settings.targetId;
        //cfg.url = "/themes/minimal_v0" + "/js/comps/simpleList.html"
        cfg.url = '/grid/grid/sharedResourcesGrid/' + 'comps/simpleList.html'
        console.log('log', '...', document.currentScript)
        //debugger
        cfg.fxDone = fx;
        cfg.replaceThis = 'dialogMyLibrary';
        cfg.withThis = self.settings.id;
        uiUtils.utils.loadPage(cfg)
    }

    p.setupUIs = function setupUIs() {
        //debugger
        self.data.ui = self.ui = {};
        self.data.txtSearch = u.makeId(self.settings.id, '_txtSearch')
        self.ui.txtSearch = u.getUIById(self.data.txtSearch)
        self.data.lblTitle = u.makeId(self.settings.id, 'Title')
        self.ui.lblTitle = u.getUIById(self.data.lblTitle)
        u.setText(self.ui.lblTitle, self.settings.name, true)

        self.data.dialog = u.makeId(self.settings.id, 'DialogWrapper')
        self.ui.dialog = u.getUIById(self.data.dialog)

        /*        self.data.lblUserAction = u.makeId(self.settings.id, 'UserAction');
         self.ui.lblUserAction = u.getUIById(self.data.lblUserAction);
         u.setText(self.ui.lblUserAction, self.settings.userAction, true);*/

        self.utils.addSect = function addSect(uiId, txtMsg) {
            var key = u.makeId(self.settings.id, uiId);
            self.data[key] = '#' + key;
            self.ui[key] = u.getUIById(self.data[key], self.ui.dialog);
            self.ui[uiId] = u.getUIById(self.data[key], self.ui.dialog);
            if (txtMsg) {
                // debugger
                u.setText(self.ui[key], txtMsg, true);
            }
            self.data.lastUI = self.ui[uiId];
            uiUtils.lastUI = self.data.lastUI;
            return '#' + key;
        }

        self.utils.addSect('UserAction',
            self.settings.userAction)
        uiUtils.ifDefined(self.settings.userAction)
        self.utils.addSect('UserAction_Holder')
        uiUtils.ifNotFalse(self.settings.showUserAction)


        self.utils.addSect('SearchBar')
        uiUtils.ifNotFalse(self.settings.showSearch)

        self.utils.addSect('footer')
        uiUtils.ifNotFalse(self.settings.showFooter)

        /*self.ui[uiId] = */
        self.utils.addSect('List_NoResults_NoMatches',
            self.settings.txtEmptyMessage)


        self.data.listId =
            self.utils.addSect('ListContainer')
        self.data.listUL =
            self.utils.addSect('ListUl')

        if (self.settings.addStylesTiList) {
            sh.each(self.settings.addStylesTiList, function onK(k, listStyle0) {
                // self.ui.listUL.addClass(listStyle0)
                uiUtils.lastUI.addClass(listStyle0)
            })

        }

        console.error('list', self.data.listId)

//        self.ui.list = $('#'+self.data.listId)
        self.data.listItemId = //= self.data.listId =
            self.utils.addSect('ListLi');
        //self.settings.id+''
        if (self.settings.idPartial) {
            var partial = $(self.settings.idPartial);
            sh.throwIf(partial.length == 0, 'partial not found')
            var listSearchItemUI = $(self.data.listItemId);
            sh.throwIf(listSearchItemUI.length == 0, 'listSearchItemUI not found', self.data.listItemId)
            //debugger;
            listSearchItemUI.html(partial.html());
            partial.remove();
        }
        //self.initContentListDialogList();


        self.data.dbg = {}
        self.data.dialogId = '#' + self.data.dialog;
        self.data.stateName = self.settings.stateName
        self.data.txtSearch = self.utils.addSect('txtSearch')
        self.data.listName = '#dialogSearchLists_list';
        self.data.divNoResults = self.utils.addSect('ListNoResults')
        self.data.btnMore = self.utils.addSect('btnMore')
        self.data.btnRetry = self.utils.addSect('btnRetry')
        self.data.btnMyLibrary = '#btnMyLibrary';
        self.data.title = self.utils.addSect('Title')
        self.data.title = self.utils.addSect('TitleHolder')
        uiUtils.ifCopyStyle(self.settings.titlePadding, 'padding-left')
        uiUtils.ifCopyStyle(self.settings.titlePadding, 'padding-top')
        //self.data.ui = {};
        self.data.ui.txtResultCount = self.utils.addSect('txtCount')
        uiUtils.ifNotFalse(self.settings.showMatchCount)

        self.data.ui.txtNoResults = self.utils.addSect('List_NoResults_NoMatches')
        self.data.ui.headerBtn = '#header-list'

        self.data.ui.divLoading = self.utils.addSect('LoadingHolder')
        self.data.ui.loadingToken = '#dialogSearchLists_LoadingHolderToken'
        self.data.ui.divLoadingError
        self.utils.addSect('divLoadingError');//'#dialogSearchLists_LoadingError'
        //        self.data.ui.txtLoadingError = self.utils.addSect('LoadingError');//'#dialogSearchLists_LoadingError'
        self.data.ui.moreBtnHolder = self.utils.addSect('btnMoreLoadingHolder') //'#dialogSearchLists_btnMoreLoadingHolder'
        self.data.ui.btnClearSearch = self.utils.addSect('btnClear')

        self.data.ui.btnEndOfResults = self.utils.addSect('btnEndOfResults')

        self.data.ui.btnBackToTop = self.utils.addSect('btnBackToTop')
        self.data.ui.btnBackToTop = $(self.data.ui.btnBackToTop)
        self.data.ui.btnBackToTop.hide();

        u.onClick(self.data.ui.btnBackToTop, self.uiHelper.onBackToTop);


        self.data.pag = new Paginator();
        self.data.pag.init()
        if (self.settings.limit) {
            self.data.pag.settings.pageSize = self.settings.limit;
        }
        self.data.pag.data.btnMore = $(self.data.btnMore);
        self.data.pag.data.btnEndOfResults = $(self.data.ui.btnEndOfResults);
        self.data.pag.data.btnBackToTop = $(self.data.ui.btnBackToTop);

        var d = self;
        var pd = self.searchLibrary2
        //debugger;
        u.onEnter(self.data.btnRetry, self.searchLists);
        //debugger
        u.onClick(self.data.btnMore, self.searchLists2);
        u.onEnter(self.data.txtSearch, self.searchLists);
        u.onChangeDebounced(self.data.txtSearch, self.searchLists);
        //u.onClick(self.data.btnMyLibrary, self.openMyLibraryDialog);
        u.onClick(self.data.title, self.searchLists, true)
        u.makeBtn(self.data.title, self.settings.tooltip)
        //$('#header-list').on('click', self.openSearchListDialog);

        var btnClear = $(self.data.ui.btnClearSearch);
        //	btnClear.hide()
        //console.log('reload x init helper', btnClear)

        uiUtils.fadeInOnHover(self.data.ui.btnClearSearch);
        u.onClick(self.data.ui.btnClearSearch, self.clearSearchLists);
        u.makeBtn(self.data.ui.btnClearSearch, 'clear');

        var ui = $(self.data.dialogId);
        self.data.dialog = ui;
        self.data.ui.dialog = ui;
        //debugger
        ui.bind('mousewheel', self.uiHelper.onMouseWheel);

        $(self.data.ui.headerBtn).on('click', self.openSearchListDialog);

        self.listenToLiClick()


        //self.data.listId = '#view-content-list';
        u.onChangeDebounced(self.data.txtSearch, self.highlightQueryInSearchResults, 100);


        self.openContentListDialog()
    }

    p.renderList = function renderList() {
        self.openContentListDialog()
    }
    p.render = p.renderList;

    function defineUIHelpers() {
        p.uiHelper = {};
        p.uiHelper.onBackToTop = function onBackToTop(e) {
            var ui = self.data.ui.dialog;
            ui.scrollTop(0);//('scrollHeight')
        }
        p.uiHelper.onMouseWheel = function onMouseWheel(e) {
            var ui = self.data.ui.dialog;
            var matching = ui.prop('scrollHeight') - ui.scrollTop()
                - ui.height() - ui.offset().top -
                ui.offset().top

            var shouldScroll = true;

            if (matching != 0 || ui.scrollTop() != 0) {
                shouldScroll = false;
            }
            if (matching >= -2 && matching <= 0) {
                shouldScroll = true;
            }
            if (Math.abs(matching) <= 2) {
                shouldScroll = true
            }

            var canScrollToTop = false;
            var scrollTop = ui.prop('scrollTop');
            if (scrollTop > 10) {
                canScrollToTop = true;
            }


            var strArr = ['calc',
                matching,
                shouldScroll,
                'scrollHeight',
                ui.prop('scrollHeight'),
                'scrollTop', ui.scrollTop(),
                'offsetTop', ui.offset().top,
                //ui.offset(),
                //$(document).height() -ui.height(),
                'doc', $(document).height(),
                'uih', ui.height()]
            strArr = strArr.map(function formatNum(n) {
                if (n && n.toFixed) {
                    n = n.toFixed(0)
                }
                return n
            })
            strArr[1] = matching.toFixed(2);

            //strArr =  strArr.join(' ')
            if (self.debug.scrollMeasurements) {
                console.log('scroll measurements', strArr)
            }

            console.error('shouldScroll', shouldScroll, canScrollToTop, scrollTop, self.data.ui.btnBackToTop)
            u.ifShow(canScrollToTop, self.data.ui.btnBackToTop)

            if (shouldScroll == false) {

                return   // there is a crollb ar so ignorereturn
            }

            console.log('scrolling 0 scroll area');
            self.searchLists2()
            return;
            if (e.originalEvent.wheelDelta / 120 > 0) {
                alert('up');
            } else {
                alert('down');
            }
        }
    }

    defineUIHelpers();

    p.listenToLiClick = function listenToLiClick() {
        // function setupL() {
        //debugger
        self.data.ui.dialog.click(function onClickListItem(e) {
            var t = e.target;
            t = $(t)
            var href = $(t).attr('href');

            console.debug('onClickListItem', 'in')

            //debugger
            var content_list_id = $(t).attr('content_list_id');
            if (content_list_id != null) {
                console.debug('open content list', content_list_id);
                window.searchListDialogHelper.data.openedContentListFromLink = true;
                var ui = $(window.searchListDialogHelper.data.dialogId);
                window.searchListDialogHelper.data.scrollTopPos = ui.scrollTop();
                window.searchListDialogHelper.closeSearchListDialog();

                //	return;
                window.contentListDialogHelper.openContentListDialog();
                window.contentListDialogHelper.setListTo(content_list_id);

                return false;
            }

            if (t.hasClass('fxClick') == false) {
                //console.debug('onClickListItem', 'out')
                return
            }
            console.debug('booo')


            var li = t.parents('li');
            var itemIndex = li.index();

            var idview = t.attr('idview');
            console.log('id', idview, t.text())

            var listItem = self.data.list.items[itemIndex]
            u.cid(self.settings.fxClick, listItem._values, t)
            //debugger
            //window.location.search = '';
            // window.location.hash = '#results=' + idview
            // window.contentListDialogHelper.closeContentListDialog()
            e.preventDefault()
            console.error('prevent yyy')
            e.preventDefault();
            e.stopPropagation();
            console.debug('booo')
            return false;
            // debugger;
            fUtils.changeToPage(href)
            //debugger;
        });
        //  }
    }

    p.updateContentListDisplay = function updateContentListDisplay(contentList) {
        self.data.list.clear();
        debugger
        var shift = contentList.shift();
        shift.name = u.fixTitle(shift.name);
        $('#txtContentList').text(shift.name);
        $.each(contentList, function addresult(k, v) {
            /*v.link = window.serverHelper.utils.getUrl(
             window.serverHelper.data.servers.searchLists.port,
             '/api/content_lists/view/'+v.list_id
             )*/
            v.number = k + 1;
            v.name = v.title;
            v.idview = v.imdb_id;
            self.data.list.add(v);
        })
        self.highlightQueryInSearchResults()


    }

    p.highlightQueryInSearchResults = function highlightQueryInSearchResults(sdf) {
        self.data.txtFilterContentList = $('#txtContentListsDialog')
        var val = self.data.txtFilterContentList.val()

        setTimeout(updateTxtSearch, 200)

        function updateTxtSearch() {
            console.error('updating the content lsit search tox', val)
            //debugger
            var results = $(self.data.listId).find('.list-search-list').find('.desc,.link')
            $.each(results, function modresults(k, ui) {
                var base = $(ui);
                var html = base.html();

                if (base.htmlOrig) {
                    html = base.htmlOrig;
                } else {
                    base.htmlOrig = html;
                }

                if (val == '') {
                    base.html(html);
                    return;
                }

                var rep = u.replace(html, '<strong>', '');
                rep = u.replace(rep, '</strong>', '');
                if (val == '') base.html(rep);
                ;
                rep = u.replace(rep, val, '<strong>$&</strong>');
                base.html(rep);
            })
        }

        var contentList = sdf;
        var results = $(self.data.listId).find('.list-search-list').find('.desc,.link')
        contentList = results;
        u.ifShow(contentList.length == 0, '#contentListNoResults')

    }

    p.initContentListDialogList = function initContentListDialogList() {
        if (self.data.initedList == true) {
            return;
        }
        self.data.initedList = true;

        var valueNames =  [
            'name',
            'rating',
            'number',
            'desc',
            {data: ['id']},
            {name: 'timestamp', attr: 'data-timestamp'},
            //{ name: 'link', attr: 'href' },
            {name: 'image', attr: 'src'},
            {name: 'idview', attr: 'idview'},
        ]

        if ( self.settings.valueNames) {
            //debugger
            valueNames = valueNames.concat(self.settings.valueNames)
        }


        var options = {
            valueNames:valueNames,
            item: self.data.listItemId.replace('#', '')
        };

        if (self.settings.fieldMappings) {
            options.valueNames = self.settings.fieldMappings;
        }


        //self.ui.list[0]
        var id = /*'#'+*/self.data.listId
        //var listResults = new List(id, options);
        //var listResults = new List('view-content-list', options);

        var listResults = new List(self.data.listId.replace('#', ''), options);
        //#dialogMyLibrary_List
        self.data.list = listResults;
        //debugger
        self.data.list.clear();
        self.countLists()
        return;
    };

    p.openContentListDialog = function openListDialog() {

        self.searchLists();
        self.countLists();

        sh.cid(self.settings.fxOpen, self)

        self.initContentListDialogList();
    };

    p.openDialog = p.showContentListDialog = p.openContentListDialog


    p.closeDialog = p.closeContentListDialog = function closeContentListDialog(doCheck) {
        // debugger
        if (doCheck) {
            //debugger
            if (window.serverHelper.utils.inUrl('#' + self.settings.stateName)) {
                u.hideTall();
                self.showContentListDialog();
                self.tryToResumeSearch()
                return;
            }
        }
        self.ui.dialog.hide();
        $('#dialogModal').hide();
        if (doCheck != true)
            u.showTall();
    }
    ;


    p.tryToResumeSearch = function tryToResumeSearch() {
        u.getParams()

        if (self.settings.urlPropResumeSearch) {
            var seachDialogText = u.params[self.settings.urlPropResumeSearch]; //seachDialogText;

            if (seachDialogText == null) {
                return;
            }
            $(self.data.txtSearch).val(seachDialogText)
            // self.setListTo(seachDialogText)
        }


        if (self.settings.urlPropResumeSearch) {
            var seachDialogText = u.params[self.settings.urlPropResumeSearch]; //seachDialogText;
            if (seachDialogText == null) {
                return;
            }
            //debugger;

            //self.setListTo(seachDialogText)
        }
    }

    p.setListTo = function setListTo(listId) {


        debugger;
        return;

        if (listId == self.data.currentListId) {
            return;
        }
        if (window.serverHelper.data.servers == null) {
            return;
        }
        self.data.currentListId = listId;

        //window.location.hash = '#listContentDialog'+
        //	window.location.query = 			'?listId='+listId;

        window.location.hash = '#listContentDialog' + '?listId=' + listId;

        //debugger
        var txt = $('#txtSearchLists').val('');

        //debugger;
        var url = window.serverHelper.utils.getUrl(
            window.serverHelper.data.servers.searchLists.port,
            '/api/content_lists/show/' + listId);
        var cfg = {};
        cfg.url = url;
        cfg.data = {}
        cfg.data = {name: {$like: "%" + txt + "%"}}
        cfg.fxDone = function onGotContentList(results) {
            console.log('results', results.length)
            if (results.error) {
                self.updateContentListDisplay([])
                return
            }
            self.updateContentListDisplay(results)
        };
        u.utils.request2(cfg);
    }

    function defineSearch() {
        p.setTextTo = function setTextTo(sdf) {
            $(self.data.txtSearch).val(sdf)
        };

        p.monitortext = function monitortext() {
            $(self.data.txtSearch).keyup(function onChangedText() {
                var val = $(this).val()

                setTimeout(updateTxtSearch, 200)

                function updateTxtSearch() {
                    console.log('x', val)
                    //debugger
                    var results = $(self.data.listName).find('.list-search-list').find('.desc,.link')

                    $.each(results, function modresults(k, ui) {

                        base = $(ui);
                        var html = base.html();

                        if (base.htmlOrig) {
                            html = base.htmlOrig;
                        } else {
                            base.htmlOrig = html;
                        }

                        if (val == '') {
                            base.html(html);
                            return;
                        }

                        var rep = u.replace(html, '<strong>', '');
                        rep = u.replace(rep, '</strong>', '');
                        if (val == '') base.html(rep);
                        ;
                        rep = u.replace(rep, val, '<strong>$&</strong>');
                        base.html(rep);
                    })
                }
            });
        };

        p.highlightQueryInSearchResults = function highlightQueryInSearchResults(sdf) {

            var val = $(self.data.txtSearch).val()

            setTimeout(updateTxtSearch, 200)

            function updateTxtSearch() {
                ///console.log('x', val)
                //debugger
                var results = $(self.data.listName).find('.list-search-list').find('.desc,.link')
                $.each(results, function modresults(k, ui) {
                    var base = $(ui);
                    var html = base.html();

                    if (base.htmlOrig) {
                        html = base.htmlOrig;
                    } else {
                        base.htmlOrig = html;
                    }

                    if (val == '') {
                        base.html(html);
                        return;
                    }

                    var rep = u.replace(html, '<strong>', '');
                    rep = u.replace(rep, '</strong>', '');
                    if (val == '') base.html(rep);
                    ;
                    rep = u.replace(rep, val, '<strong>$&</strong>');
                    base.html(rep);
                })
            }

        };

    }

    defineSearch();

    p.errorState = function errorState() {
        self.data.ui.divLoadingError.show()
    }

    function defineSearchRemote() {
        p.searchLists2 = function searchLists2() {
            console.debug('....')
            self.searchLists('', true)
        };

        p.searchLists = function searchLists(txt2, moreBt2) {
            if (self.settings.searchTxtInit) {
                $(self.data.txtSearch).val(self.settings.searchTxtInit);
                self.settings.searchTxtInit = null
            }
            var txt = $(self.data.txtSearch).val();


            if (self.settings.urlPropResumeSearch) {
                u.setUrlVal(self.settings.urlPropResumeSearch, txt)
                /*  var seachDialogText = u.params[self.settings.urlPropResumeSearch]; //seachDialogText;

                 debugger;

                 self.setListTo(seachDialogText)*/
            }


            //  debugger
            if (self.settings.live != false) {
                if (self.settings.searchUrl.startsWith('http')) {
                    var url = self.settings.searchUrl;
                } else {
                    if (u.fxRetry(self.utils.getServerUrl, self.searchLists, arguments)) {
                        return;
                    }
                    var url = p.utils.getServerUrl(self.settings.searchUrl);
                }

            }

            console.error('searchLists', self.settings.id, txt2, moreBt2,
                url,
                self.data.pag.data.offset)


            var cfg = {};
            cfg.url = url;
            cfg.data = {};
            //cfg.data = {$any:[{name:{$like: "%"+txt+"%"}},{desc:{$like: "%"+txt+"%"}} ]};
            //cfg.data = {$or:[{name:{$like: "%"+txt+"%"}},{desc:{$like: "%"+txt+"%"}} ]}
            if (txt) {
                cfg.data = {$or: [{name: {$like: "%" + txt + "%"}}, {desc: {$like: "%" + txt + "%"}}]}
                sh.dv.cid(cfg, 'data', self.settings.fxSearchQuery, txt)
            }

            if (moreBt2 != true) {
                self.data.pag.search(cfg.data);
            } else {
                var allowSearch = self.data.pag.searchMore(cfg.data);
                if (allowSearch != null) {
                    if (allowSearch == 'no more results') {

                        return
                    }
                    console.error('in progress, chill', allowSearch)
                    return
                }
            }

            cfg.divLoading = self.data.ui.divLoading;
            cfg.divLoadingToken = self.data.ui.loadingToken;
            cfg.divLoadingError = self.data.ui.divLoadingError;
            cfg.divUpdateMessage = self.data.ui.moreBtnHolder;
            cfg.divEndMessage = self.data.ui.btnEndOfResults;

            cfg.fxDone = function onListResults(results) {
                console.log('results', results.length);
                if (results.length > 0 && results[0] == null) {
                    self.errorState()
                    console.error('got nulls')
                    return;
                } else {
                }

                if (moreBt2) {
                    self.updateListSearchResults(results, true);
                } else {
                    self.updateListSearchResults(results);
                }

                self.highlightQueryInSearchResults();
                self.data.pag.pagResults(results)
                //btnEndOfResults
            };

            if (self.settings.live == false) {
                cfg.inMemory = true;
                cfg.items = self.settings.items;
                // u.l(function (){ cfg.fxDone(self.settings.items) })
                // return;
            }
            u.utils.request2(cfg);
        };

        p.clearSearchLists = function clearSearchLists() {
            console.log('clearSearchLists')
            $(self.data.txtSearch).val('');
            self.updateListSearchResults([]);
            self.searchLists()
        }
        p.updateListSearchResults = function updateListSearchResults(sdf, additionalPage) {
            if (additionalPage != true) {
                //debugger;
                self.data.list.clear();
                self.data.offset = 0
            } else {
            }

            console.debug('showing updateListSearchResults', sdf.length, additionalPage)

            var lastIndex = 0;
            $.each(sdf, function addresult(k, v) {
                v = sh.clone(v)
                /*v.link = window.serverHelper.utils.getUrl(
                 window.serverHelper.data.servers.searchLists.port,
                 '/api/content_lists/view/' + v.list_id
                 );*/
                v.content_list_id = v.list_id;
                v.number = k + 1 + self.data.offset;
                v.desc = sh.dv(v.desc, '')
                v.desc = u.fixStr(v.desc)
                var maxLength = 500
                if (v.desc.length > maxLength) {
                    v.desc = v.desc.slice(0, maxLength)
                }
                v.name = sh.dv(v.name, '')
                v.name = u.fixTitle(v.name);

                if (self.settings.fxProcessItem) {
                    v = sh.cid(self.settings.fxProcessItem, v)
                }

                if ( self.settings.fxProcessItem2) {
                    sh.cid(self.settings.fxProcessItem2, v)
                }

                if (self.debug.showResults !== false)
                    console.log('\t', (1 + k) + '.', v.name, v)

                //	v.name = v.title;
                //	v.idview  = v.imdb_id;
                self.data.list.add(v);
                lastIndex = k
            })

            self.data.offset += lastIndex + 1;

            self.highlightQueryInSearchResults()
            var isAdditionalPage = additionalPage === true;
            var isResultEmpty = sdf.length == 0
            if (self.data.dbg.emptyStr)
                console.error('additionalpage', additionalPage, isAdditionalPage, isResultEmpty)
            if (isAdditionalPage == false) {
                u.ifShow(isResultEmpty, self.data.ui.txtNoResults)
            } else {

                u.hide(isResultEmpty, self.data.ui.txtNoResults)
            }

            var things = ['Rock', 'Paper', 'Scissor'];
            var txt = things[Math.floor(Math.random() * things.length)];
            for (var i = 0; i < 500; i++) {
                txt += things[Math.floor(Math.random() * things.length)] + ' '
            }
            $('.addLorem').text(txt)

        };


        p.countLists = function countLists() {
            if (self.settings.live == false) {
                return;
            }

            if (self.settings.searchUrl.startsWith('http')) {
                var url = self.settings.searchUrl + 'count'
            } else {
                if (u.fxRetry(self.utils.getServerUrl, self.countLists)) {
                    return;
                }
                var url = p.utils.getServerUrl(self.settings.searchUrl + '/count');
            }


            var cfg = {};
            cfg.url = url;
            cfg.data = {};

            cfg.data = {
                //user_id:window.serverHelper.data.user.session_id
            }

            cfg.fxDone = function onCleared(results) {
                console.log('results', results);
                //debugger;
                paren = function paren(text) {
                    return "(" + text + ")"
                }
                u.setText(self.data.ui.txtResultCount, paren(results))

                //u.ifShow(results == 0, self.data.ui.txtEmptyLibrary);
                u.ifShow(results == 0, self.data.ui.txtNoResults);
            };
            u.utils.request2(cfg);
        }
    }

    defineSearchRemote()


    function defineUtils() {
        p.utils = {}
        p.utils.getServerUrl = function getServerUrl(urlMethod) {
            //debugger
            var url = window.serverHelper.utils.getUrl(
                self.settings.searchPort,
                urlMethod);
            console.info(urlMethod, '...')
            //debugger;
            return url;
        }
    }

    defineUtils()
}

SimpleListHelper.createSimpleList = function createSimpleList(name, divTarget, items) {
    var cfg = {};
    divTarget = u.dv.id(divTarget)

    cfg.targetId = divTarget
    cfg.id = 'list_' + name.split(' ').join('_')
    cfg.idPartial = divTarget + '_partial'

    cfg.name = name;
    cfg.tooltip = 'recently watched....'
    cfg.userAction = 'Click to watch'
    cfg.txtEmptyMessage = 'No search matches your query'
    cfg.showUserAction = false;
    cfg.showSearch = false;
    cfg.showMatchCount = false;
    cfg.showFooter = false;
    cfg.titlePadding = 20
    cfg.fxEmpty = function onIsEmpty() {
    }

    // cfg.searchPort = window.serverHelper.data.servers.search.port
    cfg.searchUrl = 'api/file'
    cfg.limit = 10

    cfg.live = false;
    cfg.items = items

    //cfg.hashUrl = 'searchDialog'
    //cfg.stateName = 'searchDialog'

    cfg.fieldMappings = [
        'name',
        'rating',
        'number',
        'desc',
        'sxe',
        'series_name',
        {data: ['id']},
        {name: 'timestamp', attr: 'data-timestamp'},
        //{ name: 'link', attr: 'href' },
        {name: 'image', attr: 'src'},
        {name: 'idview', attr: 'idview'},
    ]


    cfg.fxProcessItem = function fxProcessItem(o) {
        sh.dv.ifBlank(o, 'name', 'sanitized_name')
        sh.dv.ifBlank(o, 'name', 'originalFilename')
        if (o.season_number) {
            var sxe = {
                s: o.season_number.toString(),
                e: o.episode_number.toString()
            }
            o.sxe = [sxe.s.padStart(2, '0'),
                sxe.e.padStart(2, '0')].join('x')
        }
        return o;
    }

    cfg.debug = {};
    cfg.debug.showResults = false;

    //cfg.urlPropResumeSearch = 'searchDialogSearchText'

    cfg.fxSearchQuery = function fxSearchQuery(txt) {
        //debugger
        var data = {
            $or: [{name: {$like: "%" + txt + "%"}},
                {series_name: {$like: "%" + txt + "%"}},
                {desc: {$like: "%" + txt + "%"}}]
        }


        data.order = ['season_number', 'episode_number']


        return data
    }
    cfg.fxClick = function fxClick(item, ui) {

        if ( cfg.clickRouter ) {
            sh.each(cfg.clickRouter, function onCheck(k,fxClickAction) {
                if ( ui.hasClass(k)) {
                    fxClickAction(item)
                    return false;
                }
            })
        }
        console.log('clicked', item, ui)
    }

    cfg.fxOpen = function fxOpen() {
        $('#header-search').addClass('current');
    }


    setTimeout(function ok() {
        var sL = new SimpleListHelper();
        sL.init(cfg)
        sh.cid(cfg.fxInit, sL)
    }, 250)

    return cfg;
    // sFDH.openDialog()

    // window.dialogs.push(sFDH)

}


if (window.dialogs == null) {
    window.dialogs = [];
}

var basic = [
    {name: 'ok'},
    {name: 'dirty 2'},
    {name: 'dirty 3'}
]

var basic2 = [
    {name: 'ok'},
    {name: 'dirty 2'},
    {name: 'dirty 3'}
]


var cfg = SimpleListHelper.createSimpleList('Playlists', 'divPlaylistJumpBar', basic)
cfg.fxInit = function on() {
    console.log('on built')
}
cfg.addStylesTiList = ['horizontal-flex-container']
/*

 var cfg = SimpleListHelper.createSimpleList('Playlists', 'divLandingSeries', basic2)
 cfg.fxInit = function on() { console.log('on built')}

 var cfg = SimpleListHelper.createSimpleList('Playlists', 'divLandingMovies', basic2)
 cfg.fxInit = function on() { console.log('on built')}
 */
