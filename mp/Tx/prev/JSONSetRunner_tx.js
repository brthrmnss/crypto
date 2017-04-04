var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var JSONSetRunner = require('./JSONSetRunner').JSONSetRunner;
var columnify = require('columnify')


function TaxRunner() {
    var p = TaxRunner.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
    }

    p.method = function method(config) {
    }
    p.inputFile = function method(config) {
    }
    p.processTax = function method(config) {
    }
    p.saveOutput = function method(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.TaxRunner = TaxRunner;

if (module.parent == null) {
    var instance = new TaxRunner();
    var config = {};
    instance.init(config)
}

/*
 open file
 run through many 'rule' files
 keep filtering list until finished
 most do not filter list

 get things, filter list,
 generate output files, add to global question files
 remove item if you want to ...


 running docs
 questions about transactions
 useful to know facts

 tag stuff
 amz, what is total, fed, huge, fraud, housing, medical,  def business, maybe business

 items untouched (if u see something , it can be removed

 */

if (module.parent == null) {

    var dirIterators = 'txIterators/';
    var dirIteratorsAuto = 'txIteratorsAuto/';
    var fileInput = 'mint 2014.csv';
    //JSONSetRunner.runSetDir(fileInput, dirIteratorsAuto)// why do not run all the iterators ... using custom now
    //return;
    var cfg = {}
    cfg.it = {}
    cfg.announce = false;
    // cfgBase = sh.clone(cfg);





    cfg.fxPreProcess = function preProccess(item) {
        //ASDF.G
        item.amount = parseFloat(item.amount);
        if (  item.transactionType == 'credit') {

        } else {
            if ( item.amount > 0 )
                item.amount = item.amount * -1
        }

        return item;
    }


    var data = {};
    //data.allItems = sh.readFile(fileInput);


    cfg.fxGetItems = function fxGetItems(_cfg) {
        //asdf.g
        if ( _cfg.includeAllItems) {
            return data.allItems;
        }
        if ( data.allItems == null )
            return null;
        //asdf.g
        _cfg.listAllItemsCount = data.allItems.length;
        return data.unfilteredItems;

        return [];
    }

    var fileIterator = dirIterators + 'JSONSetIterator_Generic.js'
    var JSONSetIterator_Generic = require('./'+fileIterator).IteratorClass
    fileIterator = sh.fs.resolve(fileIterator);
    //cfg.resetList = true


    /*JSONSetIterator_Generic.utils.tag = function () {

     } */


    JSONSetRunner.runSet.fxResetConfig = function fxResetConfig(_cfg){
        cfg.it.iteratorName = null
        cfg.it.matchesDefault = []
        cfg.it.matchesPersonal = null
        cfg.resetList = false
        cfg.inputIsOutput_doesNotFilter=null
        cfg.it.fxDone = null ;
        cfg.it.fxDone = null;
        cfg.it.tagWhy = null
        cfg.it.peachTreeAcct = null
        cfg.it.fxDone = null;
        cfg.includeAllItems = null
        cfg.it.noOutput = false
        delete cfg.it.noOutput;
        delete cfg.it.desc;
        cfg.it.fxFilter = null;
        //  console.log('\t', 'inst', _cfg.iteratorName, inst.data.work.list.length,  inst.data.listMatched.length, inst.data.listFiltered.length)

    }

    JSONSetRunner.runSet.fxPost = function onFxPost(inst, _cfg){
        cfg.it.iteratorName = null
        cfg.it.matchesDefault = null
        cfg.it.matchesPersonal = null
        cfg.resetList = false
        cfg.it.fxDone = null ;
        cfg.it.fxDone = null;
        cfg.includeAllItems = null
        cfg.it.noOutput = false
        delete cfg.it.noOutput;
        delete cfg.it.desc;
        cfg.it.fxFilter = null;
        if ( cfg.it.spit )
            console.log('\t', 'JSONSetRunner.runSet.fxPost', 'inst', _cfg.iteratorName, inst.data.work.list.length,  inst.data.listMatched.length, inst.data.listFiltered.length)
        //console.log(  inst.data.work.list )
        //    console.log('')
        //console.log(inst.data.listFiltered)
        //console.log(inst.data.listMatched);

        if ( data.allItems == null ) {
            //why: cache all items the first time only
            data.allItems = inst.data.work.list

            //  process.exit()
        }
        data.unfilteredItems = inst.data.listFiltered;

        //asdf.g
    }


    /*
     cfg.it.iteratorName = 'Filter Years'
     cfg.it.desc = 'Ensure all payments are in valid date range'
     cfg.it.matchesDefault = []
     //cfg.it.noOutput = true
     //cfg.includeAllItems = true
     cfg.it.fxFilter = function fxFilter(item) {
     if ( item.description.includes('Deposit')  ){
     return true;
     }
     if ( item.originalDescription.includes('Deposit')  ){
     return true;
     }

     /!*if ( item.transactionType == 'credit' ){
     return true;
     }*!/
     }
     JSONSetRunner.runSet(fileInput, fileIterator, cfg)
     */



    function removeInvalidDates() {
        cfg.it.iteratorName = 'Invalid Entires'
        cfg.it.desc = 'remove outside of target year ( Ensure All Dates in range)'
        cfg.it.tagWhy = 'sdfsdfsdfsdfsdf'
        cfg.it.peachTreeAcct = 54654564

        cfg.it.matchesDefault = []
        cfg.it.fxFilter = function fxFilter(item) {
            // console.log(item.date2.getFullYear())
            if ( item.date2.getFullYear() != 2014 ) {
                //asdf.g
                return true
            }

            //item.ZZZZZZZZZZZZZZZZZZZZ = 456456456456456
            //return false;
        }
        cfg.it.fxDone = function fxDone(runner, it) { //bookmark.genereate final output

            // console.log(runner)
            sh.sortByNumber(runner.data.listFiltered, 'amount' )
            var columns         = columnify(   runner.data.listFiltered      );
            //  console.log(columns)
            runner.createAdditionalFlatFile('all_valid_sorted_amount', columns)

        }
        JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    }

    removeInvalidDates()



    cfg.it.iteratorName = 'Personal Loans through FCU'
    cfg.it.desc = 'do not count loands to other accounts. Transfers to other people '
    cfg.it.matchesDefault = []
    //cfg.it.noOutput = true
    //cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.desc.includes('transfer') && item.desc.includes('to account ')) {
            return true; //do not count transfers as income
        }
        if ( item.desc.includes('transfer') && item.desc.includes('from account ')) {
            return true; //do not count transfers as income
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Personal Loans through FCU to Rob'
    cfg.it.desc = 'do not count loands to other accounts. Transfers to other people '
    cfg.it.matchesDefault = []
    //cfg.it.noOutput = true
    //cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        /*if ( item.desc.includes('transfer') && item.desc.includes('to account ')) {
         return true; //do not count transfers as income
         }
         if ( item.desc.includes('transfer') && item.desc.includes('from account ')) {
         return true; //do not count transfers as income
         }*/
        if ( item.desc.includes('9688-3')  ) {
            return true; //do not count transfers as income
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Transfers between my accounts'
    cfg.it.desc = 'do not cound transfers as income'
    cfg.it.matchesDefault = []
    //cfg.it.noOutput = true
    //cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.desc.includes('transfer') && item.desc.includes('personal credit union ')) {
            return true; //do not count transfers as income
        }
    }

    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Deposits'
    cfg.it.desc = 'all income'
    cfg.it.matchesDefault = []
    //cfg.it.noOutput = true
    //cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {

        if ( item.desc.includes('transfer') && item.desc.includes('personal credit union ')) {
            //asdf.g
            return false; //do not count transfers as income
        }
        if ( item.description.includes('Deposit')  ){
            // asdf.g
            return true;
        }
        if ( item.originalDescription.includes('Deposit')  ){
            // asdf.g
            return true;
        }

        //Flag tax refunds
        /*if ( item.transactionType == 'credit' ){
         return true;
         }*/
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    /*

     cfg.it.iteratorName = 'Income'
     cfg.it.matchesDefault =
     ['Deposit',
     '']
     JSONSetRunner.runSet(fileInput, fileIterator, cfg)
     */

    cfg.it.iteratorName = 'DblCount American Express'
    cfg.it.matchesDefault = []
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.desc2.includes('Withdrawal-ACH-A-AMEX')) {
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)





    cfg.it.iteratorName = 'Checks-Tagger'
    //cfg.inputIsOutput_doesNotFilter = true //if doesn't filter, will use original list
    cfg.it.matchesDefault = []

    cfg.it.fxFilter = function fxFilter(item) {
        item.amount = parseFloat(item.amount);
        if (item.description.startsWith('Check ') ) {

            item.description += ' ctt'

            var fedTax = '(US-Fed-Tax)'
            var dict = {};

            dict[1127] = fedTax
            dict[1128] = fedTax

            dict[1129] = fedTax
            dict[1130] = fedTax + " - Q3 2012"
            dict[1131] = "Loan to Sylvia"
            dict[1132] = "Not found"
            dict[1140] = "Accountant Neats"
            dict[1141] = "Accountant Neats"
            dict[1143] = "State Taxes"



            var words = item.description.split(' ')
            sh.each(words, function on(k, word) {
                if ( sh.isNumber(word) == false ) {
                    return
                }

                var checkMapping = dict[word]
                if ( checkMapping ) {
                    item.description += ' ' + checkMapping
                    item.originalDescription += ' |' + checkMapping
                    console.log(item.description)
                      //  asdf.g
                }
            })

            //return true; //skip check lines
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    function test_haveChecksBeenTagged() {
        cfg.it.iteratorName = 'Checks-Tagger-Test'
        //cfg.inputIsOutput_doesNotFilter = false
        cfg.it.matchesDefault = []

        cfg.it.fxFilter = function fxFilter(item) {
            item.amount = parseFloat(item.amount);
            // asd.fg
            if (item.description.includes('ctt')) {
                // return true; //skip check lines
            }
        }
        JSONSetRunner.runSet(fileInput, fileIterator, cfg)
    }
    //test_haveChecksBeenTagged();

   // JSONSetRunner.runSet_Block = true;


    cfg.it.iteratorName = ' American Express'
    cfg.it.matchesDefault = []
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.desc2.includes('AUTOPAY PAYMENT') && item.accountName == 'Gold Card') {
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Accountant';
    cfg.it.matchesDefault = ['Neats' ];
    cfg.it.tagWhy = 'Russell Price'
    cfg.it.peachTreeAcct = 68500
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Cell Phone';
    cfg.it.matchesDefault = ['Sprint', 'Wireless'];
    cfg.it.tagWhy = 'Wireless Business Utilities'
    cfg.it.peachTreeAcct = 78000
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Air Travel'
    cfg.it.matchesDefault = ['Airlines', 'SW AIR', 'Southwest Airlines']
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    //JSONSetRunner.runSet_Block = true;
    /*
     cfg.it.iteratorName = 'IRA'
     cfg.it.matchesDefault = ['Betterment']
     JSONSetRunner.runSet(fileInput, fileIterator, cfg)*/

    cfg.it.iteratorName = 'Retirement IRA Cont'
    cfg.it.matchesDefault =
        ['Betterment', ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Rental Cars'
    cfg.it.matchesDefault = [
        'BUDGET RENT A CAR',
        'BUDGET.COM']
    cfg.it.tagWhy = 'Rental Car/ Automobile'
    cfg.it.peachTreeAcct = 61000
    cfg.it.peachTreeAcct = 74000

    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Groceries'
    cfg.it.matchesDefault =
        ['Trader Joe',
            'Giant', 'Safeway',
            'Wegmans', 'Market', 'Grocery',
            'Hegedorn',
            'Farms']
    cfg.it.matchesPersonal =
        ['Bouchard Family Farms']
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Utilities'
    cfg.it.matchesDefault = [
        'TIME WARNER CABLE',
        'Waterwatch Trace',
        'WEBWATER WATCH',
        'WATERWATCH ROCHESTER',
        'Roch Gas Elec'
    ]
    cfg.it.tagWhy = 'Water/Internet/Electric'
    cfg.it.peachTreeAcct = 7800
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Rent'
    cfg.it.tagWhy = 'Rent'
    cfg.it.peachTreeAcct = 74000
    cfg.it.matchesDefault =
        ["PRESERVE M - P"

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Dry Cleaning'
    cfg.it.matchesDefault =
        ['BAYVIEW CLEANERS'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Pills'
    cfg.it.matchesDefault =
        ['VITAMIN AND CARD OUTLE' ,
            'PUREFORMULAS.COM',
            'CUSTOMPROBI',
            '*LIFTMODE',
            'SYNAPTENT', //lifemode
            'ORGANIC3COM', //probiotics
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Fraud'
    cfg.it.matchesDefault =
        ['FS *FSPRG.COM', //file sharing ? Fast Share / putio
            'Gpo Haslemere Gb'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Gym'
    cfg.it.matchesDefault =
        ['WORLD GYM'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Crypto_currencies'
    cfg.it.matchesDefault =
        ['Coinbasebtc'
            ,'WEBCOINBASE',

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Student Loans'
    cfg.it.matchesDefault =
        ["Sallie Mae",
            'Slma Ed Serv'
        ]
    cfg.it.tagWhy = 'Student Loans'
    cfg.it.peachTreeAcct = '?????'
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Federal Taxes'
    cfg.it.peachTreeAcct = '73000'
    cfg.it.matchesDefault =
        ["IRS (USATAXPYMT)",
        ]
    cfg.it.fxFilter = function fxFilter(item) {
        /*   if ( item.description.includes('Deposit')  ){
         return true;
         }*/
        if ( item.originalDescription.includes('(USATAXPYMT)')  ){
            return true;
        }

        if ( item.originalDescription.includes('(US-Fed-Tax)')  ){
            return true;
        }


        /*if ( item.transactionType == 'credit' ){
         return true;
         }*/
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'State Taxes'
    cfg.it.matchesDefault =
        ["COMP OF MARYLAND",
            'State Taxes'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Gas'
    cfg.it.tagWhy = 'Gas Automobile'
    cfg.it.peachTreeAcct = 74000
    cfg.it.matchesDefault = [
        'EXXONMOBIL',
        'SUNOCO',
    ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'CPU Utilities'
    cfg.it.matchesDefault =
        ['GH *GITHUB.COM', 'Github',
            'Dropbox',
            'Evernote',
            'Rackspace',
            'IDrive', 'INMOTIONHOSTING', 'hover com'
        ]
    cfg.it.tagWhy = 'Business Utitilize'
    cfg.it.peachTreeAcct = 78000
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)




    cfg.it.iteratorName = 'Audiobooks'
    cfg.it.matchesDefault =
        ['Audible',
            '']
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Freelancers'
    cfg.it.matchesDefault =
        ['ELANCE INC',
            'Freelancer.com',
            'Dropbox',
            'Elance escrow',
            'WEBFREELANCER',
            'Fancy Hands']
    cfg.it.tagWhy = 'Business Online Services/Freelancers'
    cfg.it.peachTreeAcct = 78000
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Junk Food'
    cfg.it.matchesDefault =
        ['Pizza','Pizzeria',
            'Chipotle',
            'Taka House',
            'ESPADA BRAZILIAN'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    /*

     cfg.it.iteratorName = 'Crypto currencies'
     cfg.it.matchesDefault =
     ['Coinbasebtc'
     ,'WEBCOINBASE',

     ]
     JSONSetRunner.runSet(fileInput, fileIterator, cfg)
     */

    cfg.it.iteratorName = 'Insurance'
    cfg.it.matchesDefault =
        ['PREM CAR RENTAL PROTECTION',
            'Golden Rule Ins'
        ]
    cfg.it.tagWhy = 'Personal Insurance'
    cfg.it.peachTreeAcct = '?????'
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Clothes'
    cfg.it.matchesDefault =
        ["Khol's",'Target',
            "KOHL'S"
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'ATM'
    cfg.it.matchesDefault =
        ['atm', 'atmlk'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Checksz'
    /*cfg.it.matchesDefault =
     ['Check'

     ]*/
    cfg.inputIsOutput_doesNotFilter = true
    //cfg.it.noOutput = true
    cfg.it.matchesDefault = []

    cfg.it.fxFilter = function fxFilter(item) {
        item.amount = parseFloat(item.amount);
        // console.log('check', item)
        if (item.description.startsWith('Check ') ) {
            // asdf.g
            return true; //skip check lines
        }
        //TODO: Tag checks 
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Paypal'
    cfg.it.matchesDefault =
        ['paypal'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Doctor'
    cfg.it.matchesDefault =
        ['Rghs Rochester',
            '@ WEBSTER MEDICAL GROUP'

        ]
    cfg.it.tagWhy = 'Personal Medical Bills'
    cfg.it.peachTreeAcct = '?????'
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Travel Incidentals'
    cfg.it.matchesDefault =
        ['MCAA PARKING'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Mobile Apps'
    cfg.it.matchesDefault =
        ['Google.com/' ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Amazon'
    cfg.it.matchesDefault =
        ['Amazon' ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Fees'
    cfg.it.matchesDefault =
        ['Fee' ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Untagged'
    cfg.it.matchAll = true
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Total Deposits'
    cfg.it.matchesDefault = []
    cfg.it.tagWhy = 'Income'
    cfg.it.peachTreeAcct = 40000
    cfg.it.noOutput = true
    cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.description.includes('Deposit') ) {
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Total Debits'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.transactionType == 'debit' ){
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    /* cfg.it.iteratorName = 'Total Debits'
     cfg.it.matchesDefault = []
     cfg.it.noOutput = true
     cfg.includeAllItems = true
     cfg.it.fxFilter = function fxFilter(item) {
     if ( item.transactionType == 'debit' ){
     return true;
     }
     }
     JSONSetRunner.runSet(fileInput, fileIterator, cfg)*/



    cfg.it.iteratorName = 'Large Purchases'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        item.amount = parseFloat(item.amount);
        if ( item.transactionType == 'credit' ){
            return false; //skip income payments
        }
        if ( Math.abs(item.amount) > 10000 ){
            //console.error(item)
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Large Purchases Morethan Week'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        item.amount = parseFloat(item.amount);
        if ( item.transactionType == 'credit' ){
            return false; //skip income payments
        }
        //TODO: check if transfer
        if ( Math.abs(item.amount) > 10000 ){
            //console.error(item)
            return true;
        }

        if ( Math.abs(item.amount) > JSONSetIterator_Generic.totalIncome/50 ){
            //console.error(item)
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'OrganizePayments2'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItems = true
    cfg.it.fxFilter = function fxFilter(item) {
        item.amount = parseFloat(item.amount);

    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    var count = 0;
    cfg.it.iteratorName = 'Unknown'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItems = false
    cfg.it.fxFilter = function fxFilter(item) {
        count++
        //console.log(count)
        return true;
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Final'
    cfg.it.matchesDefault = []
    cfg.it.fxDone = function fxDone(runner, it) { //bookmark.genereate final output
        runner.createAdditionalFile('comments_output', JSONSetIterator_Generic.comments)
        console.log('|open comments_output.json')



        var columns         = columnify(   JSONSetIterator_Generic.comments       );
        // if ( self.settings. showAllItemsAtEnd)
        console.log(columns)

        runner.createAdditionalFlatFile('comments_output', columns)


        var cfg = {}
        cfg.columnSplitter = ',';

        var columns = columnify(   JSONSetIterator_Generic.allLines  , cfg     );
        runner.createAdditionalFlatFile('final_output', columns, 'csv')
        console.log('<|open comments_output.txt')

    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    function doXCaliber() {

        var dictItemByAmount = new sh.DictArray()
        var dictItemByAmountRaw = new sh.DictArray()
        var dictPaymentsSameDesc = new sh.DictArray()
        var dictPaymentsSameDesc1stWord = new sh.DictArray()
        var dictPayments_ReveredAmts = new sh.DictArray();
        cfg.it.iteratorName = 'OrganizePayments'
        cfg.it.matchesDefault = []
        cfg.it.noOutput = true
        //cfg.includeAllItems = true
        cfg.it.fxFilter = function fxFilter(item) {
            item.amount = parseFloat(item.amount);
            item.amount = item.amount.toFixed(2)

            // if ( item.rejected != true  ) {
            //asdf.g
            if (!item.description.toLowerCase().includes('amazon')) {
                //ignore amazon b/c price can be anything
                dictItemByAmount.add(item.amount, item)
            }
            dictItemByAmountRaw.add(item.amount, item)

            dictPaymentsSameDesc.add(item.originalDescription, item)
            var descWords = item.originalDescription.split(' ');//[0]
            var firstWords = descWords[0]
            if (firstWords.toLowerCase().includes('withdraw')) {
                var firstTwoWords = descWords.slice(0, 3).join(' ');
                //asdf.g
                firstWords = firstTwoWords
            }
            dictPaymentsSameDesc1stWord.add(firstWords, item)
            //  }

            //TODO: do this with all items in other iterator ....
            //wh: it is useful to see which transactions (loans, credit card balances) were
            //reversed
            dictPayments_ReveredAmts.add(Math.abs(item.amount), item)

        }
        cfg.convertPayments = function convertPayments(a, fxTestArray) {
            var outputDict = {};

            var cfg = {};
            if (a.itemDict) {
                cfg = a;
                a = cfg.itemDict;
            } else {
                cfg.itemDict = a;
            }

            var listObj = [];
            var totalAmount = 0;
            var totalCount = 0;
            var totalAmountNeg = 0;

            sh.each(a, function (k, listItems) {

                if (sh.isFunction(listItems)) {
                    return;
                }
                if (cfg.allow1Only != true && listItems.length <= 1) {
                    delete a[k]
                    return;
                }
                if (listItems == null) {
                    return;
                }

                /*
                 */
                sh.sortByDate(listItems, 'date')

                if (fxTestArray) {
                    var result = fxTestArray(listItems)
                    if (result !== true)
                        return;
                }

                if (cfg.fxFilterDictArrays) {
                    var result = cfg.fxFilterDictArrays(listItems)
                    if (result !== true)
                        return;
                }
                //   if ( v.sort )
                //     v.sort('date')
                // sh.each.print(listItems, 'date')
                // sh.x()
                // console.log(k, listItems)

                var firstLine = {};
                firstLine.grouping = k;
                listObj.push(firstLine)
                var total = 0;
                sh.each(listItems, function copyItemToOutputLines(kk, item) {
                    var line = item;
                    if (item == null) {
                        console.log(k, v, kk, item)
                    }
                    // item.category = k
                    item.amount = parseFloat(item.amount);
                    //item.amount = item.amount.toFixed(2)

                    total += item.amount
                    if (item.amount > 0) {
                        totalAmount += item.amount
                    } else {
                        totalAmountNeg += item.amount;
                    }
                    totalCount += 1;
                    if (cfg.skipLines != true) {
                        listObj.push(line)
                    }
                })


                firstLine.total = total.toFixed(2);
                firstLine.count = listItems.length;
                firstLine.moneyPerc = sh.toPercent(firstLine.total / JSONSetIterator_Generic.totalIncome);
                firstLine.avg$ = (total / listItems.length).toFixed(2)
                firstLine.countPerc = listItems.length / JSONSetIterator_Generic.totalCount;
                firstLine.countPerc = sh.toPercent(firstLine.countPerc);
                //console.log('totalX', total, listItems.length, JSONSetIterator_Generic.totalIncome)
                //asdf.g
            })


            if (cfg.sortItemsByVal) {
                //asdf.g
                //sh.sortByName(listObjs, 'total' )

                var field = 'total'
                listObj.sort(function (aObj, bObj) {
                    var a = aObj[field];
                    a = parseFloat(a)
                    var b = bObj[field];
                    b = parseFloat(b)
                    //  console.error('date match',  b, a, bObj, aObj)
                    var diff = b - a
                    return diff;
                });
            }

            var lineTotal = {};
            lineTotal.grouping = 'maintotal'
            lineTotal.count = totalCount;
            lineTotal.countPerc = totalCount / JSONSetIterator_Generic.totalCount;
            lineTotal.countPerc = sh.toPercent(lineTotal.countPerc);
            lineTotal.moneyPerc = totalAmountNeg / JSONSetIterator_Generic.totalIncome;
            lineTotal.moneyPerc = sh.toPercent(lineTotal.moneyPerc);
            var avg$ = totalAmountNeg / totalCount;
            lineTotal.avg$ = avg$
            lineTotal.total = totalAmount;
            lineTotal.totalNeg = totalAmountNeg;

            sh.each(lineTotal, function fixPerc(k, v) {
                if (v.toFixed != null && v.toString().includes('.'))
                    lineTotal[k] = v.toFixed(2)
            })

            listObj.unshift(lineTotal)


            return listObj
        }
        cfg.it.fxDone = function fxDone(runner, it) {


            var y = cfg.convertPayments(dictItemByAmount);
            var columns = columnify(y);
            //console.log(columns)
            runner.createAdditionalFlatFile('comments_output2', columns)

            y = cfg.convertPayments(dictPaymentsSameDesc);
            var columns = columnify(y);
            //console.log(columns)
            runner.createAdditionalFlatFile('dictPaymentsSameDesc', columns)


            var csvLines = cfg.convertPayments({
                itemDict: dictPaymentsSameDesc1stWord,
                //skipLines: true,
                allow1Only: true,
                fxFilterDictArrays: function includeItemesWith1(arr) {
                    // console.log('asdf', arr)
                    if (arr.length == 1) {
                        //asdf.g
                        return true;
                    }
                    // asdf.g.f
                },
                //sortItemsByVal:true
            });
            var csvLines2 = columnify(csvLines);
            runner.createAdditionalFlatFile('dictPayments_1OffPayments', csvLines2)


            y = cfg.convertPayments(dictPaymentsSameDesc1stWord);
            var columns = columnify(y);
            //console.log(columns)
            runner.createAdditionalFlatFile('dictPaymentsSameDesc1stWord', columns)


            var csvLines = cfg.convertPayments({
                itemDict: dictPaymentsSameDesc1stWord,
                skipLines: true,
                sortItemsByVal: true
            });
            var csvLines2 = columnify(csvLines);
            runner.createAdditionalFlatFile('dictPayments_mostExpensiveCategories', csvLines2)


            //find reversed payments

            y = cfg.convertPayments(dictPayments_ReveredAmts, function onlyIfDirectionChanges(items) {
                var h = {};
                sh.each(items, function testDir(k, v) {
                    if (v.amount > 0) {
                        h.positive = true
                    }
                    if (v.amount < 0) {
                        h.negative = true
                    }
                })
                if (h.positive && h.negative) {
                    return true;
                }
            });
            var columns = columnify(y);
            runner.createAdditionalFlatFile('dictPaymentsSameDesc1stWord_revsed', columns)


            // process.exit();

        }
        JSONSetRunner.runSet(fileInput, fileIterator, cfg)
    }
    doXCaliber();


}


