'--use strict';
/**
 * RestHelper provides service for basic helper method calls
 */
//( function() {
// console.clear()
//console.warn('inside resthelper')
function QRestHelper() {
    function Tbl() {
        var self = this;
        var p = this;
        self.data = {};
        p.loadItems = function loadItems(items) {
            self.data.inMemory = true;
            self.items = items;
            self.dict = {};
            self.ids = items.length;
            items.forEach(function addIdsToItems(x, i) {
                x.id = i;
            })
        };


        /*
         function defineStub() {
         var stub = {};
         stub.success = function success(fx) {
         stub.fx = fx;
         return stub;
         };
         stub.success2 = function success() {
         return stub;
         };
         }

         function instanceStub() {
         var deferred = $q.defer();
         deferred.promise.success = function (_fx) {
         _fx(customers); //not sure if valid ...
         return deferred.promise
         }
         deferred.promise.error = function (_fx) {
         _fx(customers)
         }

         setTimeout(function () {
         deferred.resolve(customers)
         }, 20);

         //asdf.g
         return deferred.promise;
         }

         function defineDelayed() {
         var deferred = $q.defer();
         deferred.promise.success = function (_fx) {
         deferred.fxSuccess = _fx; //_fx(customers)
         return deferred.promise
         };

         deferred.promise.error = function (_fx) {
         deferred.fxError = _fx;
         //_fx(customers)
         return deferred.promise
         };

         setTimeout(function () {
         deferred.resolve(self.src.list);
         deferred.fxSuccess(self.src.list)
         }, 20);

         return deferred.promise;
         }
         return defineDelayed();

         */
        p.get = function (url_, data_) {
            function urlIncludes(urlSnippet) {
                return url_.indexOf(urlSnippet) != -1;
            };
            if (url_, data_) {
                if (urlIncludes('/create')) {
                    return self.save(data_.params);
                }
            }
            if (url_, data_) {
                if (urlIncludes('/read')) {
                    return self.save(data_.params);
                }
            }
            if (url_, data_) {
                if (urlIncludes('/update')) {
                    return self.save(data_.params);
                }
            }
            if (url_, data_) {
                if (urlIncludes('/delete')) {
                    return self.deleteId(data_.params);
                }
            }
            return self.mockRequest(self.items);
            ;
        }

        p.save = function (newItem) {
            //prevent binding
            newItem = sh.clone(newItem);
            if (newItem.id == 0 || newItem.id == null) {
                self.ids++
                newItem.id = self.ids;
                self.items.push(newItem)
            } else {
                //var copy = self.dict[newItem.id]
                self.reDict();
                var inArray = self.dict[newItem.id];
                if (inArray != null) {
                    var index = self.items.indexOf(newItem);
                    self.items.splice(index, 1, newItem);
                } else {
                    self.items.push(newItem)
                }
                ;
                self.dict[newItem.id] = newItem;
                /*
                 if ( inArray == null ) {
                 copy = newItem.id;
                 }
                 */
            }
            return self.mockRequest(newItem);
        }


        p.deleteId = function deleteId(objToDelete) {
            var id = objToDelete.id;
            if (id == null) {
                throw new Error('need id ')
            }
            var obj = self.dict[id];
            self.reDict();
            var index = self.items.indexOf(objToDelete)
            self.items.splice(index, 1);
            return self.mockRequest('deleted');
        }

        /**
         * Generates promise for request
         * @param results
         * @param fx
         * @returns {*}
         */
        p.mockRequest = function mockRequest(results,
                                             fxModifyResults,
                                             fxModify2) {
            var deferred = $q.defer();
            deferred.promise.success = function (_fx) {
                deferred.fxSuccess = _fx; //_fx(customers)
                return deferred.promise
            };

            deferred.promise.error = function (_fx) {
                deferred.fxError = _fx;
                //_fx(customers)
                return deferred.promise
            };

            setTimeout(function () {
                if (fxModifyResults != null) {
                    var modifiedResults = fxModifyResults(results)
                    results = modifiedResults;
                }
                if (fxModify2 != null) {
                    var modifiedResults = fxModify2(results)
                    if (modifiedResults != null) {
                        results = modifiedResults;
                    }
                }

                deferred.resolve(results);
                deferred.fxSuccess(results)
            }, 20);

            return deferred.promise;
        };

        p.reDict = function () {
            for (var i = 0; i < self.items.length; i++) {
                var item = self.items[i];
                self.dict[item.id] = item;
            }
            ;
        }

    }

    var self = this;
    var restHelper = self;
    var p = self;

    p.init = function init(config) {
        self.settings = config;
        self.createPaginatior();
    };

    p.createPaginatior = function createPaginatior(fxDone) {

        //var p = new Pageinator();
       // p.

    };
    p.getQList = function getQList(fxDone) {
        uiUtils.getUrl(self.settings.baseUrl, function onGetList(data) {
            console.log('qlist', data)
            sh.cid(fxDone, data)
        })
    };

    p.createQItem = function createQItem(item, fxDone) {
        var url = self.settings.baseUrl + 'create'
        item.timestamp = '?' + new Date().getTime();
        uiUtils.getUrl(url, function onCreateItem(data) {
            console.log('onCreateItem', data)
            sh.cid(fxDone, data)
        }, item)
    };
    p.countQItem = function countQItem(fxDone) {
        var url = self.settings.baseUrl + 'count'
        uiUtils.getUrl(url, function onCountOfItems(data) {
            console.log('onCountOfItems', data)
            sh.cid(fxDone, data)
        })
    };

    p.updateQItem = function updateQItem(item, fxDone) {
        var url = self.settings.baseUrl + 'update'
        item.timestamp = '?' + new Date().getTime();
        uiUtils.getUrl(url, function onUpdatedItem(data) {
            console.log('onUpdatedItem', 'id:', data)
            sh.cid(fxDone, data)
        }, item)
    };
    p.deleteQItem = function deleteQItem(item, fxDone) {
        var url = self.settings.baseUrl + 'delete'
        item.timestamp = '?' + new Date().getTime();
        uiUtils.getUrl(url, function onDeletedQItem(data) {
            console.log('onDeletedQItem', data)
            sh.cid(fxDone, data)
        }, item)
    };

    p.initRestHelper = function initRestHelper(config) {
        //debugger
        if (config != null) {
            self.config = config;
        }
        if (self.config != null) {
            self.url = self.config.url;
        }

        self.config = sh.dv(self.config, {})

        self.config.debug //()
        self.config.refreshObjOnSave //if true, will
        //do a get after a create and update
        //user will always have current version

        self.config.smartSave //if object has id,
        //will do update, if not, do a create

        self.fxListResults; //convience method.
        //  is invoked when new records are added
    }
    //self.init = self.initRestHelper;

    //restHelper.get();
    p.get = function get(id) {
        var url = '';
        url = self.url + '/' + id //+ '/get'
        //unflatten
        return self.$http.get(url);
    };

    p.list = function list(page) {
        //debugger
        var url = '';
        url = self.url //+ '/get'
        if (page != null) {

        }
        ;

        //unflatten
        return self.$http.get(url);
    };

    function definePagination() {
        /**
         * List with pagination support
         * @param page
         * @returns {*}
         */
        restHelper.list2 = function list2(offset, limit,
                                          query) {
            //debugger
            var autoQuery = false;
            if (offset != self.paginator) {
                offset = sh.dv(offset, 0);
                limit = sh.dv(limit, 10);
                query = sh.dv(query, {});
                self.paginationSettings = {
                    offset: offset,
                    limit: limit,
                    query: query
                };
            } else {
                autoQuery = true;
            }
            var url = '';
            url = self.url + '/search'

            console.log('get', self.paginationSettings)

            if (self.url == undefined) {
                var q2 = self.utils.createPromise()

                function returnNothing(_items) {
                    // var item = [];
                    q2.resolve(_items);
                    sh.callIfDefined(q2.promise.fxSuccess, _items);
                    sh.callIfDefined(self.fxListResults, _items);
                    console.warn('resthelper', 'list', 'undefined url', self);
                }

                if (self.config.dataSrc && self.config.dataSrc.inMemory == true) {
                    setTimeout(returnNothing, 10, self.config.dataSrc.items)

                } else {
                    console.warn('resthelper', 'list', 'undefined url', self);
                    setTimeout(returnNothing, 10, [])
                }


                return q2.promise;
            }
            self.count(query).success(function (count) {
                //not proper linking?

                self.paginator = {}
                self.paginator.count = count;
                self.paginator.pages = Math.ceil(
                    count / self.paginationSettings.limit
                );
                self.paginator.page_index = 0;
                self.paginator.morePages = count
                    >= self.paginationSettings.offset +
                    self.paginationSettings.limit;

                //self.pagination.offset = 0;

                if (autoQuery) {
                    self.paginator.page_index =
                        Math.ceil(
                            self.paginationSettings.offset /
                            self.paginationSettings.limit
                        )
                }
                ;

                self.$http.get(url,
                    {params: self.paginationSettings}
                )
                    .success(function (item) {
                            self.utils.unflattenList(item)
                            q.resolve(item);
                            sh.callIfDefined(q.promise.fxSuccess, item);
                            sh.callIfDefined(self.fxListResults, item);
                        }
                    ).error(function (err) {
                    q.reject(err)
                    q.promise.fxError(err);
                    //sh.callIfDefined(q.promise.fxError, err);
                })
            }).error(function (err) {
                q.reject(err)
                sh.callIfDefined(q.promise.fxError, err);
            })


            //return self.$http.get(url)


            var q = self.utils.createPromise()
            return q.promise;

        };

        self.pageGet = function getPage() {

        }
        self.pageNext = function getPage() {
            self.paginationSettings.offset +=
                self.paginationSettings.limit;
            return self.list2(self.paginator);
        }
        self.pageGoTo = function pageGoTo(page) {
            self.paginationSettings.offset =
                self.paginationSettings.limit * (page - 1);
            return self.list2(self.paginator);
        }


        self.count = function pagecount(query) {
            var url = self.url;
            url += '/count'
            return self.$http.get(url);
        }
    }

    definePagination();

    p._create = function create(obj) {
        var url = '';
        url = self.url + '/create';
        obj.timestamp = '?' + new Date().getTime();
        var promise = self.$http.get(url, {params: obj});
        return promise;
    }

    /**
     * In Raw for, will make create request
     * Default will return object and update id
     * @param obj
     * @param raw
     * @returns {*}
     */
    p.save = function save(obj, raw) {

        var url = '';
        url = self.url + '/create';
        obj.timestamp = '?' + new Date().getTime();
        if (raw != true /* && self.condependent */) {
            if (obj.id != null && obj.id != 0) {
                //do update
                restHelper.update(obj);
            }

        }
        self.utils.flatten(obj)
        //debugger
        var promise = self.$http.get(url, {params: obj});
        if (raw == true) {
            return promise;
        }
        //return promise;

        console.info('restHelper', 'save', obj, self)
        var d = $q.defer();
        promise
            .success(function onSaved(data, _p, headers) {
                if (self.debug) {
                    console.log('saved');
                }
                /*var location = header.location;
                 if ( location != null ) {
                 var id = location.split('/').slice(-1)
                 }
                 if ( location.indexOf('created')==-1) {
                 console.error('nothing created');
                 }*/
                var id = data;
                obj.id = id;
                if (d.promise.fxSuccess != null) {
                    d.promise.fxSuccess(obj);
                }
                d.resolve(obj)
            }).error(function oError(data) {
            console.log('error', data)
            if (d.promise.fxError == null) {
                d.promise.fxError(data);
            }
            d.reject(obj)
        });

        self.utils.decoratePromiseForAng(d)

        return d.promise;
    };


    p.update = function update(obj, raw) {
        var url = '';
        url = self.url + '/update';
        obj.timestamp = '?' + new Date().getTime();
        self.utils.flatten(obj);


        if (obj.id == null) {
            console.error('cannot update object without id')
        }

        console.info('restHelper', 'url', obj, self)

        // url = self.url  + '/update' + '/'+obj.id;
        var promise = self.$http.get(url, {params: obj});
        if (raw == true) {
            return promise;
        }
        var d = $q.defer();
        promise
            .success(function onSaved(data, _p, headers) {
                if (self.debug) {
                    console.log('updated');
                }
                //obj.id = id;
                if (d.promise.fxSuccess != null) {
                    d.promise.fxSuccess(obj);
                }
                d.resolve(obj)
            }).error(function oError(data) {
            self.error('error', data)
            if (d.promise.fxError == null) {
                d.promise.fxError(data);
            }
            d.reject(data)
        });

        self.utils.decoratePromiseForAng(d)

        return d.promise;
    };

    p.delete = function deleteId(id) {
        if (id == null)
            throw new Error('id is null on item')
        var url = '';
        url = self.url + '/delete';
        var obj = {};
        obj.id = id;
        obj.timestamp = '?' + new Date().getTime();
        console.info('restHelper', 'delete', obj, self)
        return self.$http.get(url, {params: obj});
    };

    function defineUtils() {
        self.utils = {}
        self.utils.decoratePromiseForAng = function decoratePromiseForAng(d) {
            //Yes, indeed. $http return objects are promises that also have these .success and .error methods for legacy reasons.
            d.promise.success = function onSuccess(fxSuccess) {
                d.promise.fxSuccess = fxSuccess;
                return d.promise;
            };
            d.promise.error = function onError(fxError) {
                d.promise.fxError = fxError;
                return d.promise;
            }
        };

        self.utils.createPromise = function createPromise(d) {
            var deferred = $q.defer();
            self.utils.decoratePromiseForAng(deferred)
            return deferred;
        };

        self.error = function () {
            console.error(arguments);
        }


        self.utils.flatten = function flatten(obj) {
            if (self.config.flatten = true) {
                var clone = sh.clone(obj)
                delete clone['data_json'] //clone.data_json = null;
                //debugger
                obj.data_json = JSON.stringify(clone);
            }
        };

        self.utils.flattenList = function flattenList(list) {
            if (self.config.flatten = true) {
                sh.each(list, function procItem(i, item) {
                    self.utils.flatten(item)
                })
            }
        }

        self.utils.unflatten = function flatten(obj) {
            if (self.config.flatten = true) {
                if (obj.data_json == null) {
                    return; //why: redieved vanilla json objects, nothing to parse
                }
                var live = JSON.parse(obj.data_json);
                for (var k in live) {
                    if (k == 'id ') continue;
                    obj[k] = live[k];
                }
            }
        };

        self.utils.unflattenList = function unflattenList(list) {
            if (self.config.flatten = true) {
                sh.each(list, function procItem(i, item) {
                    self.utils.unflatten(item)
                })
            }
        }
    }

    defineUtils();
}


//}());
