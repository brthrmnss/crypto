var u = uiUtils;


function GenericListHelper() {
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
        //u.dv(sel)

        /*if (serverHelper.utils.test(self.settings.urlHash)) {
         self.openContentListDialog();
         }
         ;*/

        //console.debug('ok in content')
        self.getContent(self.setupUIs)
    };
//http://localhost:33031/index.html?test=contentListDialog&listId=ls1567897

    p.getContent = function getContent(fx) {
        var cfg = {}
        //cfg.div = '.modal-contact .content'
        // cfg.append = true
        cfg.divCreatable = u.join2('holder', self.settings.id)
        var d = document;
        cfg.url = "/themes/minimal_v0"+"/js/comps/glh.html"
        //debugger;
        cfg.fxDone = fx;
        cfg.replaceThis = 'dialogMyLibrary';
        cfg.withThis = self.settings.id;
        //debugger
        gUtils.loadPage(cfg)
    }

    p.setupUIs = function setupUIs() {
        //debugger
        self.data.ui = self.ui = {};
        self.data.txtSearch = u.makeId(self.settings.id, '_txtSearch')
        self.ui.txtSearch = u.getUIById(self.data.txtSearch)
        self.data.lblTitle = u.makeId(self.settings.id, 'Title')
        self.ui.lblTitle = u.getUIById(self.data.lblTitle)
        u.setText(self.ui.lblTitle, self.settings.name, true)

        self.data.lblUserAction = u.makeId(self.settings.id, 'UserAction');
        self.ui.lblUserAction = u.getUIById(self.data.lblUserAction);
        u.setText(self.ui.lblUserAction, self.settings.userAction, true);

        self.utils.addSect = function addSect(uiId, txtMsg) {
            var key = u.makeId(self.settings.id, uiId);
            self.data[key] = '#' + key;
            self.ui[key] = u.getUIById(self.data[key]);
            self.ui[uiId] = u.getUIById(self.data[key]);
            if (txtMsg) {
                // debugger
                u.setText(self.ui[key], txtMsg, true);
            }
            return '#' + key;
        }
        /*self.ui[uiId] = */
        self.utils.addSect('List_NoResults_NoMatches',
            self.settings.txtEmptyMessage)

        self.data.dialog = u.makeId(self.settings.id, 'DialogWrapper')
        self.ui.dialog = u.getUIById(self.data.dialog)

        self.data.listId =
            self.utils.addSect('ListContainer')

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
        //self.data.ui = {};
        self.data.ui.txtResultCount = self.utils.addSect('txtCount')
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

        gUtils.onClick(self.data.ui.btnBackToTop, self.uiHelper.onBackToTop);


        self.data.pag = new Paginator();
        self.data.pag.init()
        if (self.settings.limit) {
            self.data.pag.settings.pageSize = self.settings.limit;
        }
        self.data.pag.data.btnMore = $(self.data.btnMore);
        self.data.pag.data.btnEndOfResults = $(self.data.ui.btnEndOfResults);
        self.data.pag.data.btnBackToTop = $(self.data.ui.btnBackToTop);

        if (GenericListHelper.oldInstances == null) {
            GenericListHelper.oldInstances = {};
        }
        var oldInstance = GenericListHelper.oldInstances[self.settings.id]
        if (oldInstance) {
            // self.data.list = window.old_searchDialogList.data.list;
            //  window.old_searchDialogList.destroyMyLibraryHelper();
        }
        GenericListHelper.oldInstances[self.settings.id] = self;

        var d = self;
        var pd = self.searchLibrary2
        //debugger;
        gUtils.onEnter(self.data.btnRetry, self.searchLists);
        //debugger
        gUtils.onClick(self.data.btnMore, self.searchLists2);
        gUtils.onEnter(self.data.txtSearch, self.searchLists);
        gUtils.onChangeDebounced(self.data.txtSearch, self.searchLists);
        //gUtils.onClick(self.data.btnMyLibrary, self.openMyLibraryDialog);
        gUtils.onClick(self.data.title, self.searchLists, true)
        gUtils.makeBtn(self.data.title, 'Refresh my library')
        //$('#header-list').on('click', self.openSearchListDialog);

        var btnClear = $(self.data.ui.btnClearSearch);
        //	btnClear.hide()
        //console.log('reload x init helper', btnClear)

        uiUtils.fadeInOnHover(self.data.ui.btnClearSearch);
        gUtils.onClick(self.data.ui.btnClearSearch, self.clearSearchLists);
        gUtils.makeBtn(self.data.ui.btnClearSearch, 'clear');

        var ui = $(self.data.dialogId);
        self.data.dialog = ui;
        self.data.ui.dialog = ui;
        //debugger
        ui.bind('mousewheel', self.uiHelper.onMouseWheel);

        $(self.data.ui.headerBtn).on('click', self.openSearchListDialog);

        self.listenToLiClick()


        /*if (serverHelper.utils.test(self.data.stateName)) {
         self.openContentListDialog();
         }*/
        if (uiUtils.getUrlVal(self.data.stateName) ) {
            self.tryToResumeSearch();
            self.openContentListDialog();
        }

        if (serverHelper.utils.inUrl('badSearch')) {
            setTimeout(self.setTextTo, 500, 'asdee^^&');
        }

        //self.data.listId = '#view-content-list';
        gUtils.onChangeDebounced(self.data.txtSearch, self.highlightQueryInSearchResults, 100);

        if (self.settings.openOnInit) {
            self.openContentListDialog()
        }
    }

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

            console.error('shuldScroll', shouldScroll, canScrollToTop, scrollTop, self.data.ui.btnBackToTop)
            gUtils.ifShow(canScrollToTop, self.data.ui.btnBackToTop)

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
        shift.name = gUtils.fixTitle(shift.name);
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

                var rep = gUtils.replace(html, '<strong>', '');
                rep = gUtils.replace(rep, '</strong>', '');
                if (val == '') base.html(rep);
                ;
                rep = gUtils.replace(rep, val, '<strong>$&</strong>');
                base.html(rep);
            })
        }

        var contentList = sdf;
        var results = $(self.data.listId).find('.list-search-list').find('.desc,.link')
        contentList = results;
        gUtils.ifShow(contentList.length == 0, '#contentListNoResults')

    }

    p.initContentListDialogList = function initContentListDialogList() {
        if (self.data.initedList == true) {
            return;
        }
        self.data.initedList = true;

        var options = {
            valueNames: [
                'name',
                'rating',
                'number',
                'desc',
                {data: ['id']},
                {name: 'timestamp', attr: 'data-timestamp'},
                //{ name: 'link', attr: 'href' },
                {name: 'image', attr: 'src'},
                {name: 'idview', attr: 'idview'},
            ],
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
        //window.location.hash = '#listContentDialog'
        /* gUtils.setFocus(self.ui.txtSearch)
         self.ui.dialog.show();
         gUtils.hideTall();
         p.initContentListDialogList();*/

        debugger
        gUtils.setLocationHash('#' + self.settings.stateName);
        gUtils.setFocus(self.data.ui.txtSearch);

        //console.debug('search list...')
        if (self.data.openedContentListFromLink) {
            console.debug('openedContentListFromLink list...')
            if (self.data.scrollTopPos) {
                setTimeout(function updateScrollPosition() {
                    var ui = $(self.data.dialogId);
                    ui.scrollTop(self.data.scrollTopPos);
                    self.data.scrollTopPos = null;
                }, 500)

            }
        } else {
            self.searchLists();
            self.countLists();
        }

        self.ui.dialog.show();
        gUtils.hideTall();

        sh.cid(self.settings.fxOpen, self)

        //$('#dialogModal').show();

        self.initContentListDialogList();
    };

    p.openDialog = p.showContentListDialog = p.openContentListDialog


    p.closeDialog = p.closeContentListDialog = function closeContentListDialog(doCheck) {
        // debugger
        if (doCheck) {
            //debugger
            if (window.serverHelper.utils.inUrl('#' + self.settings.stateName) ) {
                gUtils.hideTall();
                self.showContentListDialog();
                self.tryToResumeSearch()
                return;
            }
        }
        self.ui.dialog.hide();
        $('#dialogModal').hide();
        if (doCheck != true)
            gUtils.showTall();
    }
    ;


    p.tryToResumeSearch = function tryToResumeSearch() {
        gUtils.getParams()

        if (self.settings.urlPropResumeSearch) {
            var seachDialogText = gUtils.params[self.settings.urlPropResumeSearch]; //seachDialogText;

            if (seachDialogText == null) {
                return;
            }
            $(self.data.txtSearch).val(seachDialogText)
            // self.setListTo(seachDialogText)
        }


        if (self.settings.urlPropResumeSearch) {
            var seachDialogText = gUtils.params[self.settings.urlPropResumeSearch]; //seachDialogText;
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
        window.serverHelper.utils.request2(cfg);
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

                        var rep = gUtils.replace(html, '<strong>', '');
                        rep = gUtils.replace(rep, '</strong>', '');
                        if (val == '') base.html(rep);
                        ;
                        rep = gUtils.replace(rep, val, '<strong>$&</strong>');
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

                    var rep = gUtils.replace(html, '<strong>', '');
                    rep = gUtils.replace(rep, '</strong>', '');
                    if (val == '') base.html(rep);
                    ;
                    rep = gUtils.replace(rep, val, '<strong>$&</strong>');
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
                /*  var seachDialogText = gUtils.params[self.settings.urlPropResumeSearch]; //seachDialogText;

                 debugger;

                 self.setListTo(seachDialogText)*/
            }

            if (gUtils.fxRetry(self.utils.getServerUrl, self.searchLists, arguments)) {
                return;
            }
            console.error('searchLists', txt2, moreBt2, self.data.pag.data.offset)
            var url = p.utils.getServerUrl(self.settings.searchUrl);

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
            window.serverHelper.utils.request2(cfg);
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
                v.link = window.serverHelper.utils.getUrl(
                    window.serverHelper.data.servers.searchLists.port,
                    '/api/content_lists/view/' + v.list_id
                );
                v.content_list_id = v.list_id;
                v.number = k + 1 + self.data.offset;
                v.desc = sh.dv(v.desc, '')
                v.desc = gUtils.fixStr(v.desc)
                var maxLength = 500
                if (v.desc.length > maxLength) {
                    v.desc = v.desc.slice(0, maxLength)
                }
                v.name = sh.dv(v.name, '')
                v.name = gUtils.fixTitle(v.name);

                if (self.settings.fxProcessItem) {
                    v = sh.cid(self.settings.fxProcessItem, v)
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
                gUtils.ifShow(isResultEmpty, self.data.ui.txtNoResults)
            } else {

                gUtils.hide(isResultEmpty, self.data.ui.txtNoResults)
            }

            var things = ['Rock', 'Paper', 'Scissor'];
            var txt = things[Math.floor(Math.random() * things.length)];
            for (var i = 0; i < 500; i++) {
                txt += things[Math.floor(Math.random() * things.length)] + ' '
            }
            $('.addLorem').text(txt)

        };


        p.countLists = function countLists() {
            if (gUtils.fxRetry(self.utils.getServerUrl, self.countLists)) {
                return;
            }

            var url = p.utils.getServerUrl(self.settings.searchUrl + '/count');
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
                gUtils.setText(self.data.ui.txtResultCount, paren(results))

                //gUtils.ifShow(results == 0, self.data.ui.txtEmptyLibrary);
                gUtils.ifShow(results == 0, self.data.ui.txtNoResults);
            };
            window.serverHelper.utils.request2(cfg);
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

///debugger
function SearchFilesDialogHelper() {
    var self = this;
    var p = this;
    self.data = {};

    p.init = function init(cfg) {
        cfg = uiUtils.dv(cfg, {})
        self.settings = cfg;
        self.settings.id = 'dialogSearchFiles'
        self.data.glh = new GenericListHelper()
        self.data.glh.init(self.settings);
        p.closeDialog = self.data.glh.closeDialog
        //debugger
        return;

    };

    p.updateContentListDisplay = function updateContentListDisplay(contentList) {
        debugger
        self.data.list.clear();
        var shift = contentList.shift();
        shift.name = gUtils.fixTitle(shift.name);
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

                var rep = gUtils.replace(html, '<strong>', '');
                rep = gUtils.replace(rep, '</strong>', '');
                if (val == '') base.html(rep);
                ;
                rep = gUtils.replace(rep, val, '<strong>$&</strong>');
                base.html(rep);
            })
        }

        var contentList = sdf;
        var results = $(self.data.listId).find('.list-search-list').find('.desc,.link')
        contentList = results;
        gUtils.ifShow(contentList.length == 0, '#contentListNoResults')

    }

    p.openDialog = function openDialog() {
        self.data.glh.openContentListDialog();

    };
    p.showContentListDialog = p.openContentListDialog


}

if ( window.dialogs == null ) {
    window.dialogs = [];
}

setTimeout(function testSearchDialog() {
    window.searchFilesDialogHelper = new SearchFilesDialogHelper();
    var sFDH = window.searchFilesDialogHelper;
    var cfg = {};

    cfg.name = 'Search'
    cfg.userAction = 'Click to watch'
    cfg.txtEmptyMessage = 'No search matches your query'
    cfg.fxEmpty = function onIsEmpty() {

    }
    if (window.serverHelper.data.servers == null) {
        setTimeout(function ok() {
            testSearchDialog();
        }, 500)
        return;
    }
    cfg.searchPort = window.serverHelper.data.servers.search.port
    cfg.searchUrl = 'api/file'
    cfg.limit = 10

    //cfg.hashUrl = 'searchDialog'
    cfg.stateName = 'searchDialog'

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


    cfg.idPartial = '#dialogSearchFiles'

    var partialFound = $(cfg.idPartial).length > 0
    if (sh.retryFx(partialFound, testSearchDialog)) {
        return;
    }

    cfg.urlPropResumeSearch = 'searchDialogSearchText'


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
        if (ui.hasClass('series_name')) {
            sFDH.data.glh.setTextTo(ui.text());
            sFDH.data.glh.searchLists()
            return;
        }
        sFDH.closeDialog()

        var urlVideo  = window.config.files.default_server + item.localFilePath
        vc.playContent(item, urlVideo )
        //window.showVideoPlayer(urlVideo)
        //  debugger;
        // return data
    }


    cfg.fxOpen = function fxOpen() {
        $('#header-search').addClass('current');
    }

    /*
     cfg.openOnInit = true;
     cfg.openOnInit = true;
     cfg.searchTxtInit = 'Sopranos'
     cfg.searchTxtInit = null;
     */

    sFDH.init(cfg)
    // sFDH.openDialog()
    window.sFDH = sFDH;
    window.dialogs.push(sFDH)

}, 200)


