/**
 * Why: class is an example iterator for JSONSetIterator_Generic
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var columnify = require('columnify')

function JSONSetIterator_Generic() {
    var p = JSONSetIterator_Generic.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}
    self.data.itemCount = 0;
    self.name = 'rename';

    p.init = function init(config) {
        //self.name = JSONSetIterator_Generic.iteratorName;
        self.settings = sh.dv(config, {});
        //if ( self.settings.it ) {
        self.name = self.settings.it.iteratorName;
        //}
        config = self.settings;
        self.data.matches = [];
    }


    self.isAmz = function isAmz() {
        var validMatches = self.settings.it.matchesDefault;


        var addItem = false
        if ( self.utils2.filterIfPropMatches(self.item, validMatches) )
        {
            addItem = true;
        }

        if ( addItem == false  ) {
            var validMatches = self.settings.it.matchesPersonal;
            if (validMatches &&
                self.utils2.filterIfPropMatches(self.item, validMatches)) {
                addItem = true
            }
        }
        if ( self.settings.it.fxFilter ) {
            self.item.date2 = new Date(self.item.date);
            // console.log(self.item)
            self.item.desc = self.item.originalDescription.toLowerCase();
            self.item.desc2 = self.item.originalDescription;
            self.item.amount = parseFloat(self.item.amount)
            //  assddf.g
            var output = sh.callIfDefined(self.settings.it.fxFilter,self.item)
            if ( output !== true  ) { //item did not match, it can continue

                // console.log('+++', self.item)
                //self.item.rejected = true;
                self.fx()
                return;
            }
            if ( output  == true) {
                addItem = true;
            }
        }
        //remove item;
        if ( self.settings.it.matchAll ) {
            addItem = true;
        }

        if ( addItem ) {
            if ( self.settings.it.tagWhy ){
                self.item.why = self.settings.it.tagWhy
                //  asdf.g
            }
            if ( self.settings.it.peachTreeAcct ){
                self.item.peachTreeAcct = self.settings.it.peachTreeAcct
                //  asdf.g
            }
            self.item.filtered = true;
            self.item.rejected = true;
            //delete self.item.rejected;
            self.data.matches.push(self.item)
            // console.log(sh.each.print.values(self.item))
        } else {
            // self.item.rejected = true;
        }

        self.fx()

    }



    p.fxCallback = function fxCallback(item,  fx, i, runner) {
        self.data.itemCount++
        //asdf.g
        self.isAmz();
        return;
    }





    p.fxDone = function onDone(){

        sh.sortByTime(self.data.matches, 'date')

        var percentage = self.utils2.percentageOfWorkList(self.data.matches , self.name)
        var sum = self.utils2.sumArray(self.data.matches, 'amount' , self.name)
        //self.runner.createAdditionalFile(self.name, self.data.matches)


        self.utils.groupByDescription = function groupByDescription(items) {
            var dictPaymentsSameDesc = new sh.DictArray()
            var sortedList = []
            sh.each(items, function or(k,item) {
                dictPaymentsSameDesc.add(item.description, item);
            })
            sortedList.push({})
            /*dictPaymentsSameDesc.each(function or(kDesc,items2) {
                //console.log(items)
                sh.sortByDate(items2)
                sh.each(items2, function or(kDesc,item) {
                    sortedList.push(item)
                })
            })*/

            var allDescs=[];
            var dictDescToItems = {};
            dictPaymentsSameDesc.each(function or(i,items2, kDesc) {
                //console.log(items)
                sh.sortByDate(items2)
                //sh.each(items2, function or(kDesc,item) {
                 //   sortedList.push(item)
                //})
               // console.log('k', i, k)
                dictDescToItems[kDesc] = items2;
                allDescs.push(kDesc)
            })

            /*
            dictPaymentsSameDesc.each(function or(kDesc,items2) {
                console.log(kDesc, items2)
                allDescs.push(kDesc)
            })
*/
            var sortedDecs = allDescs.sort();
            //console.log('sorted', sortedDecs)
            sh.each(sortedDecs, function or(i, kDesc) {
                var items2 = dictDescToItems[kDesc]
               // console.log('k', i, kDesc)
                sh.sortByDate(items2)
                sh.each(items2, function or(kDesc,item) {
                    sortedList.push(item)
                })
            })

            return sortedList;
        }

        var columns         = columnify(  self.data.matches );
        var groupedByDescription = self.utils.groupByDescription( self.data.matches)
        var columns =  columnify(  groupedByDescription );

        
        //asdf.g
        
        self.runner.createAdditionalFlatFile(self.name, columns)


        JSONSetIterator_Generic.comments = sh.dv(JSONSetIterator_Generic.comments, [])
        JSONSetIterator_Generic.allLines = sh.dv(JSONSetIterator_Generic.allLines, [])
        //console.error('whole config', self.settings)
        //  process.exit()

        if ( self.name == 'Deposits') {
            JSONSetIterator_Generic.totalIncome = parseFloat(sum);

            self.settings.it.setAllItemCount
            //}
            //if ( JSONSetIterator_Generic.totalCount == null ) {
            JSONSetIterator_Generic.totalCount =  self.data.itemCount;
        }



        var exportObj = {}
        exportObj.name = self.name;



        var name2 = self.name
        if ( self.settings.includeAllItems) {
            var name2 =  self.name + ' (all)'
            exportObj.all = true;
        }
        name2 = name2.padRight(35);

        var logLine =    sh.join('T:', name2, sh.t,
            sum,sh.t,
            self.data.matches.length, sh.t,
            percentage)

        //exportObj.perItems = percentage;


        var sumPrintable = sum.toString()
        if ( sum >= 0 ) {
            sumPrintable = ' ' + sumPrintable;
        }

        exportObj.sum = self.utils.padNum(sum) ; //sumPrintable

        var xyx = self.data.matches.length + '/'+self.data.itemCount;



        exportObj.length = self.data.matches.length

        exportObj.itemCount = self.data.itemCount


        var  listAllItemsCount = self.settings.listAllItemsCount;
        if ( listAllItemsCount) {
            xyx = self.data.matches.length + '/'+self.data.itemCount+'/' + self.settings.listAllItemsCount;

            //xyx += 'd'+self.data.itemCount
            percentage = self.utils2.percentageOfWorkList(self.data.matches , self.name, self.settings.listAllItemsCount)
            //xyx += 'd'
            // sdfg.h
        }
        //  console.error('asdf',listAllItemsCount);
        //process.exit()

        var items = [
            sumPrintable,
            xyx,
            percentage]

        if ( self.settings.includeAllItems) {
            var items = [
                sumPrintable,
                self.data.matches.length,
                //'all',
                percentage]
        }

        var logLine =    sh.join('T:', name2, sh.t,'...')
        sh.each(items, function padAllColumns(k,v) {
            // console.log('v', v)
            v = v.toString();
            logLine +=v.padRight(12)
        })

        if ( JSONSetIterator_Generic.totalIncome ) {

            var perTocalIncome = sh.toPercent(sum/JSONSetIterator_Generic.totalIncome)
            exportObj.per$ =  self.utils.padNum(perTocalIncome) ;

        }

        if ( JSONSetIterator_Generic.totalCount ) {
            var percCount = sh.toPercent(self.data.matches.length/JSONSetIterator_Generic.totalCount)
            exportObj.percCount =  self.utils.padNum(percCount) ;
        }


        //exportObj.listY = [1,2,3]
     //  asdf.g

        /*  JSONSetIterator_Generic.comments.push(
         logLine
         )*/
        JSONSetIterator_Generic.comments.push(
            exportObj
        )

        JSONSetIterator_Generic.allLines.push(
            exportObj
        )
        sh.each(groupedByDescription, function onADd(k,lineItem) {
            JSONSetIterator_Generic.allLines.push(
                lineItem
            )
        })




        var output = sh.callIfDefined(self.settings.it.fxDone,self.runner,self.item);
        var output = sh.callIfDefined(self.settings.it.fxDone2,self.runner,self.item);
    }
    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};


        function padLeft(str,size,padWith) {
            padWith = sh.dv(padWith, ' ')
            if(size <= str.length) {
                return str;
            } else {
                return Array(size-str.length+1).join(padWith||'0')+str
            }
        }
        String.prototype.padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ")}
        //padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ")}




        self.utils = {};
        self.utils.padNum = function padNum(num) {
            var numPrintable = num
            if ( num >= 0 ) {
                numPrintable = ' ' + numPrintable;
            }
            if ( sh.isNumber(num) == false ) {
                if ( num.slice(0,1)!='-' ) {
                    numPrintable = ' ' + numPrintable;
                }
            }

            return '|'+numPrintable
        }


        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.JSONSetIterator_Generic = JSONSetIterator_Generic;
exports.IteratorClass =  JSONSetIterator_Generic

if (module.parent == null) {
    var instance = new JSONSetIterator_Generic();
    var config = {};
    instance.init(config)
    instance.test();
    instance.fxCallback({}, function done(){

    })
}


