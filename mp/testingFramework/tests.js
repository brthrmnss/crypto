/**
 * Created by user2 on 2/13/16.
 */

window.testsLoaded = true;

//test2.html?runTest=true&testName=rHome
//http://10.211.55.4:33031/index.html?runTest=true&testName=rHome#

function testStackingDemo2() {
// return
    window.tests.rHome = function defineTestA(tH) {
        var t = tH.createNewTest();

        function searchDialogClose() {
            tH.clickJ('#dialogSearch .closebtn')
        }

        tH.click('test 2');
        tH.log('test 2')
        searchDialogClose(); //just in case
        tH.run(function addSearchText(){
            $('#search').val('Test Started ')
        })
        tH.desc('waiting for task page to load')
        tH.waitFor(function(){
            return $('.media-num').length > 10;
            t.data.mediaFiles = $('.media-num').length
        } )
        tH.desc('click to get more b uttons')
        tH.clickJ('#btnMore');
        tH.wait(1)
        tH.desc('verify more buttons created')
        tH.run(function addSearchText(){
            t.data.mediaFiles2 = $('.media-num').length;
            if ( t.data.mediaFiles2 <= t.data.mediaFiles ) {
                tH.fail();
            }
        })
        tH.run(function addSearchText(){
            $('#search').val('yyy ... ')
            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
            var e = jQuery.Event("keypress");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            e.charCode = 13;
            $('#search').trigger(e)
        })

        tH.run(function addSearchText(){
            $('#search').val('yyy ... ')
            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
            var e = jQuery.Event("keypress");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            e.charCode = 13;
            $('#search').trigger(e)
        });

        tH.desc('try search isDialogVisible')
        tH.waitFor(function isDialogVisible(){
            return $("#dialogSearch").is(":visible")
        });
        tH.desc('try search once');
        //tH.wait(3); //wait for results to come back
        tH.waitFor(function verifyNoSearchResults(){
            if ( $('.search-result').length == 0 )
                return true;

            if ( $('.search-result').length == 1 &&
                $('.search-result').text().indexOf('00') != -1  )
                return true;
            return false
        });
        tH.desc('try search again')
        tH.clickJ('#dialogSearch .closebtn')

        tH.waitForHide( "#listing");

        function performSearch(query) {
            tH.run(function addSearchText(){
                query = sh.dv(query)
                $('#search').val(query)
                var e = jQuery.Event("keypress");
                e.which = 13; //choose the one you want
                e.keyCode = 13;
                e.charCode = 13
                $('#search').trigger(e)
            });
        }

        performSearch();




        //tH.enter();
        tH.waitForShow( "#dialogSearch" );

        tH.moreThanX( '.search-result', 0 );
        tH.wait(1);
        tH.clickOne( '.search-result', 0 );
        tH.wait(1);
        tH.desc('expect the error container to show')
        tH.waitForShow( '#containerError')

        tH.clickJ('.video-wrapper .closebtn')
        tH.desc('hide the error container')
        tH.waitForHide( '#containerError')

        tH.desc('seach again')
        performSearch();
        tH.waitForShow( "#dialogSearch" );
        tH.moreThanX( '.result', 0 );
        tH.wait(1);
        //tH.clickOne( '.result', -2*-1 );
        tH.clickOne( '.result', 4 );
        tH.desc('playing vid')

        tH.waitForShow( '#videoplayer')

        tH.verifyHidden( '#containerError');
        tH.wait(3);
        tH.run(function verifyPlayer(){
            var vp = videojs('#videoplayer');
            vp.src() //verify source
            t.data.currentTime = vp.currentTime();
        });



        tH.wait(2);
        tH.verify(function verifyPlayer(){
            var vp = videojs('#videoplayer');
            vp.src() //verify source
            return t.data.currentTime < vp.currentTime();
        });
        tH.wait(1)
        tH.clickJ('.vjs-play-control.vjs-control.vjs-playing')
        tH.run(function pausePlayerWithClick(){
            var vp = videojs('#videoplayer');
            t.data.currentTime = vp.currentTime();
        });
        tH.wait(1)
        tH.desc('ensure player is paused... ')
        tH.verify(function pausePlayerWithClick(){
            var vp = videojs('#videoplayer');
            return t.data.currentTime == vp.currentTime();
        });


        tH.wait(1)
        tH.clickJ('.video-wrapper .closebtn')
        // tH.waitForHide( '#videoplayer')
        tH.wait(1)
        tH.clickJ('#dialogSearch > .closebtn')
        //Next Steps ... login and account page test
        tH.desc('dialogSearch vid')
        tH.wait(3)
        //test payment
        tH.waitForHide( "#dialogSearch" )

        tH.log('test 2')
        /*tH.run(function(){
         alert('ran test 2')
         })*/
    }



}
testStackingDemo2();



function defineRo() {
    function RO() {
        var p = RO.prototype;
        p = this;
        var self = this;
        p.init = function init(url, appCode) {
        };

        p.goHome = function goHome(arg) {
        }
        p.home = p.goHome

        p.goWatch = function goWatch(arg) {
        }
        p.goSearch = function goSearch(arg) {
        }
        p.goAccount = function goToAccount(arg) {
        }
        p.goContact = function goContact(arg) {
        }
        p.goLogout = function goLogout(arg) {
        }

        p.goWatchItem = function goLogout(arg) {
        }

        p.goWatchItem = function goLogout(arg) {
        }

        function defineCreditStuff() {
            //why: chains as loop pairs

            p.getFiles = function getFiles(tH, creditCount, fxDone) {
                tH.add(function getFiles2(){
                    window.serverHelper.getDefaultData(verifyUserC);
                    function verifyUserC(data) {
                       //

                        tH.data.files = data.nono;
                        //verified();
                        //debugger
                        callIfDefined(fxDone)
                        tH.test.cb();
                    }
                    return;
                })
            };


            p.setCreditsTo = function setCreditsTo(tH, creditCount, fxDone) {
                tH.add(function setCreditRemote(){
                    tH2.resetCreditCount(creditCount, verifyCount);
                    function verifyCount() {
                        window.serverHelper.getUserInfo(verifyUserC);
                        function verifyUserC() {
                            var didCreditMatchUP = window.serverHelper.data.user.credits == creditCount;
                            tH.assert(didCreditMatchUP, 'Credits did not match up');
                            //verified();
                            callIfDefined(fxDone)
                            tH.test.cb();
                        }
                    }
                    return;
                })
            };

            p.useCredit = function useCredit(tH, file, fxDone, cannotUse) {
                tH.add(function useCreditRemote(){
                    if ( file == null || file == '') {
                        file = tH.data.files.fileTestVideo
                    }
                    window.serverHelper.useCredit(file, verifyWa)
                    // tH2.resetCreditCount(file, verifyCount);
                    function verifyWa(data) {
                        // window.serverHelper.getUserInfo(verifyUserC);
                        //debugger;
                        if ( cannotUse != true ) {
                            var couldusreCredit = data.error == null;
                            tH.assert( couldusreCredit, 'Could not use credit');
                        } else {
                            var cannotUseCredit = data.error != null;
                            tH.assert( cannotUseCredit, 'Could use credit, user not supposed to');
                        }
                        callIfDefined(fxDone)
                        tH.test.cb();
                    }
                    return;
                })
            };

            p.canNotUseCredit = function canNotUseCredit(tH, file, fxDone) {
                p.useCredit(tH, file, fxDone, true)
            };






            p.canWatchVideo = function canWatchVideo(tH, file, cannotWatch, fxDone) {
                tH.add(function canWatchVideoRemote(){
                    if ( file == null ) {
                        file = tH.data.files.fileTestVideo
                    }
                    window.serverHelper.watchShow(file, verifyCount, 50);
                    function verifyCount(result) {
                        // window.serverHelper.getUserInfo(verifyContent);
                        // function verifyContent() {
                        if ( cannotWatch ) {
                            //
                        }
                        var didCreditMatchUP = $.isString(result) == false ;
                        tH.assert(didCreditMatchUP, 'Coudl watch conent');
                        //verified();
                        callIfDefined(fxDone)
                        tH.test.cb();
                        // }
                    }
                    return;
                })
            };

        }
        defineCreditStuff();

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return
            }
            sh.sLog(arguments)
        }
    }
    var ro = new RO();

    ro.urls = {};
    ro.urls.file1 = ''
    window.ro = ro;
}
defineRo();





function testSmoke() {
    var test = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log('test 2')
        //tH.click('home');
        tH.wait(0.5)

        tH.clickJ('#header-home');
        tH.waitForShow('#taskPageArea');

        tH.wait(0.5)

        tH.clickJ('#header-list');
        tH.waitForShow('#loadingPlayistSearchHolder');

        tH.wait(0.5)

        tH.clickJ('#header-search');
        tH.waitForShow('.search-results-header');

        tH.wait(0.5)

        tH.clickJ('#header-account');
        tH.waitForShow('#txtAccountHeader');

        tH.wait(0.5)

        tH.clickJ('#header-contact');
        tH.waitForShow('#txtContactHeader');

        //  tH.desc('try search again')
        //   tH.clickJ('#dialogSearch .closebtn')
        tH.log('test 2')

    }
    test.desc = 'Touch Every Screen'
    window.tests.rSmoke = test;


    var test = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log('test 2')
        //tH.click('home');
        tH.wait(0.5)

       // tH.setTestTimeout(1)
       // tH.testHoldUpForever(tH);

        ro.getFiles(tH)
        ro.setCreditsTo(tH, 0)
        //ro.useCredit(tH, ro.urls.file1)
        ro.canNotUseCredit(tH, ro.urls.file1)
        ro.canWatchVideo(tH, ro.urls.file1, true)
        /*
         set credits to 0
         fail to use crite
         set credits to 2000
         use  1 credit
         try watch video 
         remove all credits 
         can't watch video 
         confirm credits set to 1999
         */


        tH.log('what is happening')

        tH.clickJ('#header-home');
        tH.waitForShow('#taskPageArea');

        return;;
        tH.wait(0.5)

        tH.clickJ('#header-list');
        tH.waitForShow('#loadingPlayistSearchHolder');

        tH.wait(0.5)

        tH.clickJ('#header-search');
        tH.waitForShow('.search-results-header');

        tH.wait(0.5)

        tH.clickJ('#header-account');
        tH.waitForShow('#txtAccountHeader');

        tH.wait(0.5)

        tH.clickJ('#header-contact');
        tH.waitForShow('#txtContactHeader');

        //  tH.desc('try search again')
        //   tH.clickJ('#dialogSearch .closebtn')
        tH.log('test 2')

    }
    test.desc = 'Test Paying stuff'
    window.tests.rPay = test;

}
testSmoke();




/**
 * Created by user2 on 2/13/16.
 */
//test2.html?runTest=true&testName=rHome
//http://10.211.55.4:33031/login.html?runTest=true&testName=rLogin&redirectrunTest=true&redirecttestName=rHome#
function testLogin() {
    window.tests.rLogin = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log('Starting login test')
        tH.waitForShow('#loginPasswordMain')
        tH.set('#loginUsernameMain', 'admin');
        tH.set('#loginPasswordMain', 'password');
        tH.nextTest('rHome', 'index.html')
        tH.clickJ('#btnLogin')

        return;
        function searchDialogClose() {
            tH.clickJ('#dialogSearch .closebtn')
        }

        tH.click('test 2');
        tH.log('test 2')
        searchDialogClose(); //just in case
        tH.run(function addSearchText(){
            $('#search').val('Test Started ')
        })
        tH.desc('waiting for task page to load')
        tH.waitFor(function(){
            return $('.media-num').length > 10;
            t.data.mediaFiles = $('.media-num').length
        } )
        tH.desc('click to get more buttons')
        tH.clickJ('#btnMore');
        tH.wait(1)
        tH.desc('verify more buttons created')
        tH.run(function addSearchText(){
            t.data.mediaFiles2 = $('.media-num').length;
            if ( t.data.mediaFiles2 <= t.data.mediaFiles ) {
                tH.fail();
            }
        })
        tH.run(function addSearchText(){
            $('#search').val('yyy ... ')
            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
            var e = jQuery.Event("keypress");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            $('#search').trigger(e)
        })

        tH.run(function addSearchText(){
            $('#search').val('yyy ... ')
            //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
            var e = jQuery.Event("keypress");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            $('#search').trigger(e)
        });

        tH.waitFor(function isDialogVisible(){
            return $("#dialogSearch").is(":visible")
        });
        tH.verify(function verifyNoSearchResults(){
            if ( $('.search-result').length == 0 )
                return true;

            if ( $('.search-result').length == 1 &&
                $('.search-result').text().indexOf('00') != -1  )
                return true;
            return false
        });
        tH.desc('try search again')
        tH.clickJ('#dialogSearch .closebtn')

        tH.waitForHide( "#listing");

        function performSearch(query) {
            tH.run(function addSearchText(){
                query = sh.dv(query)
                $('#search').val(query)
                var e = jQuery.Event("keypress");
                e.which = 13; //choose the one you want
                e.keyCode = 13;
                $('#search').trigger(e)
            });
        }

        performSearch();

        //tH.enter();
        tH.waitForShow( "#dialogSearch" );

        tH.moreThanX( '.search-result', 0 );
        tH.clickOne( '.search-result', 0 );
        tH.desc('expect the error container to show')
        tH.waitForShow( '#containerError')
        tH.clickJ('.video-wrapper .closebtn')
        tH.waitForHide( '#containerError')

        performSearch();
        tH.waitForShow( "#dialogSearch" );
        tH.moreThanX( '.result', 0 );
        tH.clickOne( '.result', -2 );
        tH.waitForShow( '#videoplayer')
        tH.verifyHidden( '#containerError');
        tH.wait(3);
        tH.run(function verifyPlayer(){
            var vp = videojs('#videoplayer');
            vp.src() //verify source
            t.data.currentTime = vp.currentTime();
        });
        tH.wait(2);
        tH.verify(function verifyPlayer(){
            var vp = videojs('#videoplayer');
            vp.src() //verify source
            return t.data.currentTime < vp.currentTime();
        });
        tH.wait(1)
        tH.clickJ('.vjs-play-control.vjs-control.vjs-playing')
        tH.run(function pausePlayerWithClick(){
            var vp = videojs('#videoplayer');
            t.data.currentTime = vp.currentTime();
        });
        tH.wait(1)
        tH.desc('ensure player is paused... ')
        tH.verify(function pausePlayerWithClick(){
            var vp = videojs('#videoplayer');
            return t.data.currentTime == vp.currentTime();
        });


        tH.wait(1)
        tH.clickJ('.video-wrapper .closebtn')
        // tH.waitForHide( '#videoplayer')

        //Next Steps ... login and account page test
        //test payment

        tH.log('test 2')
        /*tH.run(function(){
         alert('ran test 2')
         })*/
    }
}
testLogin();


//http://10.211.55.4:33031/account.html?runTest=true&testName=rAccount
function testAccount() {
    window.tests.rAccount = function rAccount(tH) {
        var t = tH.createNewTest();
        tH.log('Starting account test');
        tH.log('Starting account test...');
        tH.waitForShow('#btc-paybtn');
        tH.verify(function verifyUsernameSet(){
            var isUsernameSet = $('.js-accountname').html() != '';
            return isUsernameSet;
        });
        //tH.nextTest('rLogout', 'index.html');

    }
}
testAccount();


//http://10.211.55.4:33031/account.html?runTest=true&testName=rLogout
function testLogout() {
    window.tests.rLogout = function rAccount(tH) {
        var t = tH.createNewTest();
        tH.log('Starting logout test');
        tH.waitForShow('.js-logout');
        /* tH.verify(function verifyUsernameSet(){
         var isUsernameSet = $('.js-accountname').html() != ''
         return isUsernameSet;
         });*/
        tH.clickJ('.js-logout');

    }
}
testLogout();





//http://10.211.55.4:33031/login.html?runTest=true&testName=rLoginExpiredUser&redirectrunTest=true&redirecttestName=rExpiredUser#
function testExpiredUser() {
    //login
    //go to index
    //verify user cannot login

    window.tests.rLoginExpiredUser = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log('Starting login test')
        tH.waitForShow('#loginPasswordMain')
        tH.set('#loginUsernameMain', 'markExpired');
        tH.set('#loginPasswordMain', 'randomTask2');
        tH.set('#loginUsernameMain', 'markExpired');
        tH.nextTest('rLoginExpired', 'index.html')
        //tH.wait(1)
        tH.clickJ('#btnLogin')
    }

    window.tests.rLoginExpired = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log('Starting login-expired test')
        //alert('d')
        /*
         tH.waitForShow('#loginPasswordMain')
         tH.set('#loginUserMain', 'markExpired');
         tH.set('#loginPasswordMain', 'randomTask2');
         tH.nextTest('rLoginExpired', 'index.html')
         tH.clickJ('#btnLogin')
         */

        tH.waitFor(function(){
            return $('.media-num').length > 10;
            t.data.mediaFiles = $('.media-num').length
        } )
        tH.desc('click to get more buttons');
        tH.clickJ('#btnMore');
        tH.wait(1)
        tH.desc('verify user expired');
        tH.verify(function verifyPlayer(){
            return window.config.expired == true
        });
    }
}
testExpiredUser();



