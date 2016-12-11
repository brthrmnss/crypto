var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var pathJSONSetRunner = './../../../ritv/distillerv3/utils/JSONSet/JSONSetRunner'
var file = sh.fs.resolve(pathJSONSetRunner)
console.log(pathJSONSetRunner)
var JSONSetRunner = require(pathJSONSetRunner).JSONSetRunner;
//var JSONSetRunner = require('./JSONSetRunner').JSONSetRunner;
//G:\Dropbox\projects\crypto\ritv\distillerv3\utils\JSONSet\JSONSetRunner.js
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
    fileInput = sh.fs.resolve(fileInput)
    JSONSetRunner.runSetDir(fileInput, dirIteratorsAuto)
    //return;
    var cfg = {}
    cfg.it = {}
    cfg.announce = false;
    cfgBase = sh.clone(cfg);

    cfg.fxPreProcess = function preProccess(item) {
        item.amount = parseFloat(item.amount);
        if (  item.transactionType == 'credit') {

        } else {
            if ( item.amount > 0 )
                item.amount = item.amount * -1
        }

        return item;
    }



    var fileIterator = dirIterators + 'JSONSetIterator_Generic.js'
    var JSONSetIterator_Generic = require('./'+fileIterator).IteratorClass
    fileIterator = sh.fs.resolve(fileIterator)
    //cfg.resetList = true
    cfg.it.iteratorName = 'Cell Phone'
    cfg.it.matchesDefault = ['Sprint', 'Wireless']
    /*JSONSetIterator_Generic.utils.tag = function () {

     } */

    JSONSetRunner.runSet.fxPost = function clearIt(){
        cfg.it.iteratorName = null
        cfg.it.matchesDefault = null
        cfg.it.matchesPersonal = null
        cfg.resetList = false
        cfg.it.fxDone = null ;
        cfg.it.fxDone = null;
        cfg.includeAllItmes = null
    }

    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Air Travel'
    cfg.it.matchesDefault = ['Airlines', 'SW AIR', 'Southwest Airlines']
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Transfers'
    cfg.it.matchesDefault = ['Transfer']
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Rental Cars'
    cfg.it.matchesDefault = [
        'BUDGET RENT A CAR',
        'BUDGET.COM']
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
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Rent'
    cfg.it.matchesDefault =
        ["PRESERVE M - P"

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Dry Cleaning'
    cfg.it.matchesDefault =
        ['BAYVIEW CLEANERS'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Amex Payments'
    cfg.it.matchesDefault =
        ['EPAYMENT AMEX EPayment'
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
        ['FS *FSPRG.COM', //file sharing ? Fast Share
            'Gpo Haslemere Gb'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Gym'
    cfg.it.matchesDefault =
        ['WORLD GYM'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Crypto currencies'
    cfg.it.matchesDefault =
        ['Coinbasebtc'
            ,'WEBCOINBASE',

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Loans'
    cfg.it.matchesDefault =
        ["Sallie Mae",
            'Slma Ed Serv'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Federal Taxes'
    cfg.it.matchesDefault =
        ["IRS (USATAXPYMT)",
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'State Taxes'
    cfg.it.matchesDefault =
        ["COMP OF MARYLAND",
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Gas'
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
            'IDrive'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Income'
    cfg.it.matchesDefault =
        ['Deposit',
            '']
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
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Junk Food'
    cfg.it.matchesDefault =
        ['Pizza','Pizzeria',
            'Chipotle',
            'Taka House',
            'ESPADA BRAZILIAN'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Crypto currencies'
    cfg.it.matchesDefault =
        ['Coinbasebtc'
            ,'WEBCOINBASE',

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Retirement IRA Cont'
    cfg.it.matchesDefault =
        ['Betterment',

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Insurance'
    cfg.it.matchesDefault =
        ['PREM CAR RENTAL PROTECTION',
            'Golden Rule Ins'
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Clothes'
    cfg.it.matchesDefault =
        ["Khol's",'Target',
            "KOHL'S"
        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'ATM'
    cfg.it.matchesDefault =
        ['Withdrawaln',

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Doctor'
    cfg.it.matchesDefault =
        ['Rghs Rochester',
            '@ WEBSTER MEDICAL GROUP'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Travel Incidentals'
    cfg.it.matchesDefault =
        ['MCAA PARKING'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Mobile Apps'
    cfg.it.matchesDefault =
        ['Google.com/'

        ]
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Total Deposits'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItmes = true
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.transactionType == 'credit' ){
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Total Debits'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItmes = true
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.transactionType == 'debit' ){
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

    cfg.it.iteratorName = 'Total Debits'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItmes = true
    cfg.it.fxFilter = function fxFilter(item) {
        if ( item.transactionType == 'debit' ){
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    cfg.it.iteratorName = 'Large Purchases'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItmes = true
    cfg.it.fxFilter = function fxFilter(item) {
        item.amount = parseFloat(item.amount);
        if ( item.transactionType == 'credit' ){
            return false;
        }
        if ( Math.abs(item.amount) > 10000 ){
            return true;
        }
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)



    var count = 0;
    cfg.it.iteratorName = 'Unknown'
    cfg.it.matchesDefault = []
    cfg.it.noOutput = true
    cfg.includeAllItmes = false
    cfg.it.fxFilter = function fxFilter(item) {
        count++
        //console.log(count)
        return true;
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)


    cfg.it.iteratorName = 'Final'
    cfg.it.matchesDefault = []
    cfg.it.fxDone = function fxDone(runner, it) {
        runner.createAdditionalFile('comments', JSONSetIterator_Generic.comments)
    }
    JSONSetRunner.runSet(fileInput, fileIterator, cfg)

}



