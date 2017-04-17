/**
 * Created by user2 on 2/13/16.
 */
//debugger
window.tests.loaded = true;
window.testHelper.defaults.timeout = 5;
window.testHelper.defaults.timeout = 30;
/*
 window.testHelper.defaults.fxPre = [
 ro.ensureWeHaveX
 ]
 */

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

        p.goHome = function goHome(tH) {
            tH.addSync(function (){
                gUtils.setLocationHash('')
            })
            tH.wait(1)
            tH.waitForShow('#taskPageArea');
        }
        p.home = p.goHome

        p.goList = function goList(tH) {
            tH.addSync(function (){
                gUtils.setLocationHash('searchListDialog')
            })
            tH.wait(1)
            tH.waitForShow('#dialogLists');
        }

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

            p.getFiles = function getFiles(tH, fxDone, noTest) {
                if ( noTest ) {
                    getFiles2(true)
                    return;
                }


                function getFiles2(){
                    window.serverHelper.getDefaultData(verifyUserC);
                    function verifyUserC(data) {

                        tH.data.files = data.nono;
                        //verified();
                        //debugger
                        callIfDefined(fxDone)
                        if ( noTest != true)
                            tH.test.cb();
                    }
                    return;
                }

                tH.add(getFiles2);
            };


            p.ensureWeHaveX = function ensureWeHaveX(tH) {
                tH.add(function checkFIFilesReady(){
                    if ( tH.data.files ){
                        tH.test.cb();
                        return
                    }

                    ro.getFiles(tH, tH.test.cb, true );

                })
            }

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

            p.setAutoPlayTo = function setAutoPlayTo(tH, autoPlayENabled, fxDone) {
                tH.add(function setCreditRemote(){
                    tH2.setAutoplay(autoPlayENabled, verifyCount);
                    function verifyCount() {
                        callIfDefined(fxDone)
                        tH.test.cb();
                    }
                    return;
                })
            };
            p.whatIsAutoplay = function whatIsAutoplay(tH, fxDone) {
                tH.add(function setCreditRemote(){
                    var val = tH2.hasAutoplay();
                    console.log('val', val)
                    callIfDefined(fxDone)
                    tH.test.cb();

                })
            };

            p.setCreditsToX = function setCreditsTo(tH, creditCount, fxDone) {
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


            p.verifyCreditCount = function verifyCreditCount(tH, creditCount, fxDone, negate) {
                tH.add(function setCreditRemote(){
                    window.serverHelper.getUserInfo(verifyUserC);
                    function verifyUserC() {
                        var userCreditCount = window.serverHelper.data.user.credits;
                        var didCreditMatchUP = userCreditCount == creditCount;
                        if ( negate != true ) {
                            tH.assert(didCreditMatchUP, 'Credits did not match up', creditCount, '!=', userCreditCount);
                        } else {
                            tH.assert(!didCreditMatchUP, 'Credits  not match up', creditCount, '==', userCreditCount);
                        }

                        callIfDefined(fxDone)
                        tH.test.cb();
                    }
                })
            };


            p.clearUsersCredits = function clearUsersCredits(tH, creditCount, fxDone) {
                tH.add(function clearUsersCredits_Remote(){
                    tH2.clearCredits(onCreditsCleared);
                    function onCreditsCleared(data) {
                        window.serverHelper.getUserInfo(verifyUserC);
                        function verifyUserC() {
                            // var didCreditMatchUP = window.serverHelper.data.user.credits == creditCount;
                            // tH.assert(didCreditMatchUP, 'Credits did not match up');
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
                    if( file == null ) {
                        file = tH.data.files.fileTestVidShooter+'?random='+Math.random()
                    }
                    if ( file == null ) {
                        file = tH.data.files.fileTestVideo
                    }
                    window.serverHelper.watchShow(file, onCheckWatchabilityOfFile, 50);
                    function onCheckWatchabilityOfFile(result) {
                        // window.serverHelper.getUserInfo(verifyContent);
                        // function verifyContent() {
                        if (cannotWatch) {
                            //console.error(result)
                            if ( result.responseText == null )
                            {
                                tH.assert(false, 'Could watch content', file);

                            }
                            result.responseText
                                .includes('could not get credit');
                            var failed = result.status.toString().slice(0,1) == ('4') //404 400
                            //
                            tH.assert(failed, 'Could watch content', file, result);
                        } else {
                            tH.assert( ! result.responseText
                                .includes('could not get credit'), 'Could not watch conent', file , result);;
                            // var didCreditMatchUP = $.isString(result) == false;
                            // tH.assert(didCreditMatchUP, 'Coudl watch conent');
                        }
                        //verified();
                        callIfDefined(fxDone)
                        tH.test.cb();
                        // }
                    }
                    return;
                })
            };

            p.canNotWatchVideo = function canNotWatchVideo(tH, file, fxDone) {
                p.canWatchVideo(tH, file, true, fxDone)
            };

        }
        defineCreditStuff();

        p.searchHomePageSet = function searchHomePageSet(tH) {
            tH.clickJ('#header-home');
            tH.waitForShow('#taskPageArea');
            tH.run(function addSearchText(){
                $('#search').val('Test Started ')
            })
            tH.desc('waiting for task page to load')

            tH.wait(0.5)


            tH.run(function addSearchText(){
                $('#search').val('Test Started ')
            })
            tH.desc('waiting for task page to load');
            tH.waitFor(function(){
                return $('.media-num').length > 10;
                t.data.mediaFiles = $('.media-num').length
            } )
            tH.desc('click to get more b uttons');
            tH.clickJ('#btnMore');
            tH.wait(1);
            tH.desc('verify more buttons created');
            tH.run(function addSearchText(){
                tH.data.mediaFiles2 = $('.media-num').length;
                if ( tH.data.mediaFiles2 <= tH.data.mediaFiles ) {
                    tH.fail();
                }
            });

            ro.searchHomePage(tH, 'yyy ....');

            tH.desc('try search isDialogVisible');
            tH.waitFor(function isDialogVisible(){
                return $("#dialogSearch").is(":visible")
            });
            tH.desc('try search once');
            //tH.wait(3); //wait for results to come back
            tH.waitFor(function verifyNoSearchResults(){
                if ( $('.search-result').length == 0 ) {
                    return true;
                }

                if ( $('.search-result').length == 1 &&
                    $('.search-result').text().indexOf('00') != -1  )
                    return true;
                return false
            });
            tH.desc('try search again');
            tH.clickJ('#dialogSearch .closebtn');
            tH.waitForHide( "#listing");

            ro.searchHomePage(tH, '');

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
            ro.searchHomePage(tH, '');
            tH.waitForShow( "#dialogSearch" );
            tH.moreThanX( '.result', 0 );
            tH.wait(1);
        }

        p.searchHomePage = function searchHomePage(tH, text) {
            tH.run(function addSearchText(){
                var txtInput =  $('#search');
                txtInput.val('yyy ... ');
                tH.moveCursorTo(txtInput);
                //$('#search').trigger(jQuery.Event('keypress', {which: 13}));
                var e = jQuery.Event("keypress");
                var e = jQuery.Event("keydown");
                e.which = 13; //choose the one you want
                e.keyCode = 13;
                e.charCode = 13;
                txtInput.trigger(e)
            });
        };


        p.searchDialogClose =  function searchDialogClose(tH) {
            tH.clickJ('#dialogSearch .closebtn')
        }



        p.isCreditDialogUp = function isCreditDialogUp(tH, msg) {
            msg = dv(msg, '')
            tH.waitForShow('#creditDialog', 'did not see the credit dialog ' + msg);

        }

        p.isCreditDialogClosed = function isCreditDialogUp(tH, msg) {
            msg = dv(msg, '')
            tH.waitForHide('#creditDialog', 'did not hide the credit dialog ' + msg);
        }


        p.creditDialogOk = function creditDialogOk(tH) {
            tH.waitForShow('#creditDialog', 'cant click to watch b/c video is here, but video palyer did not show');
            tH.clickJ('#cd_btnOK');
        }




        p.clickWatchIt = function clickWatchIt(tH) {
            tH.waitForShow('#creditDialog', 'cant click to watch b/c video is here, but video palyer did not show');
            tH.click('#cd-usecredit');
        }




        p.videoIsPlaying = function videoIsPlaying(tH) {
            tH.wait(0.5)
            tH.addSync(function storeTime(){
                tH.data.playheadTime = vp.currentTime();
            })
            tH.wait(1.5)
            tH.addSync(function storeTime(){
                var furtherAlong = tH.data.playheadTime > vp.currentTime()
                tH.assert(furtherAlong, 'Videl player not movingvp.')
                tH.assert(vp.paused()==false, 'Videl player not movingvp.')
            })
        }





        p.watchVid = function watchVid(tH, file, cannotWatch, fxDone) {

            ro.ensureWeHaveX(tH)
            tH.add(function goToVid(){
                if( file == null ) {
                    file = tH.data.files.fileTestVidShooter+'?random='+Math.random()
                }
                file = file+'?random='+Math.random()

                window.serverHelper.utils.playMedia(file)
                //showVideoPlayer(file);
                tH.test.cb()
            })

            tH.waitForShow('#videoplayer', 'when to video state, but video palyer did not show');
            tH.add(function playVid(){
                vp.currentTime(0);
                vp.play();
                tH.test.cb()
            })
            return;
            //self.go
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

        function defineCreditDialogStuff() {
            var ro = self;
            ro.cd = {}
            ro.cd.hasXCredits = function hasXCredits(tH, creditCount) {
                ro.cd.waitForDialog(tH)
                tH.addAttrTest('#txtCreditCount', 'creditCount', creditCount,
                    'Credit count did not match' + creditCount)
            }
            ro.cd.canReplay = function canReplay(tH) {
                ro.cd.waitForDialog(tH)
                tH.waitForShow("#cd-replay", 'did not see the replay option on cd');
            }
            ro.cd.clickUseCredit = function clickUseCredit(tH) {
                ro.cd.waitForDialog(tH)
                tH.clickJ("#cd-usecredit", 'use a credit');
            }
            ro.cd.isAutoPlayVisible = function showingAutoplay(tH) {
                ro.cd.waitForDialog(tH)
                tH.waitForShow("#cd-autoplay", 'did not see the autoplay option on cd');
            }
            ro.cd.isAutoplayHidden = function isAutoplayHidden(tH) {
                ro.cd.waitForDialog(tH)
                tH.waitForHide("#cd-autoplay");
            }
            ro.cd.canUseCredit = function canUseCredit(tH) {
                ro.cd.waitForDialog(tH);
                tH.waitForShow("#cd-usecredit", 'coudl not use a credit');
            }
            ro.cd.canBuyMoreCredits = function canBuyMoreCredits(tH) {
                ro.cd.waitForDialog(tH)
                tH.waitForShow("#cd-account", 'coudl not go to moy account from cd dialog');
            }
            ro.cd.canNotBuyMoreCredits = function canBuyMoreCredits(tH) {
                ro.cd.waitForDialog(tH)
                tH.waitForHide("#cd-account", 'coudl go to moy account from cd dialog');
            }

            ro.cd.waitForDialog = function waitForDialog(tH, msg) {
                tH.waitForShow('#creditDialog', 'did not see the credit dialog ');
            }

            ro.cd.showing = ro.cd.waitForDialog;

            ro.cd.hidden = function isHiddenCreditDialog(tH, msg) {
                tH.wait(1);
                tH.waitForHide('#creditDialog', 'did not see the credit dialog');
            };

        }
        defineCreditDialogStuff();

        function definePlayerFx() {
            var ro = self;
            ro.player = {}
            ro.player.closeDialog = function closeDialog(tH) {
                tH.addSync(function closeDialog2(){
                    window.creditHelper.closeCreditDialog();
                })
            }
            ro.player.volume = function setvolume(tH, v) {
                v = dv(v, 0)
                tH.addSync(function closeDialog2(){
                    vp.volume(v)
                })

            }
            ro.player.watchVideoNoAutoplay = function watchRealVideoNoAutoplay() {
                tH.log3('watchVideoNoAutoplay')
                ro.goHome(tH);
                ro.player.volume(tH)
                ro.player.closeDialog(tH)
                ro.setAutoPlayTo(tH, false)
                ro.clearUsersCredits(tH);
                ro.setCreditsTo(tH, 2000);
                ro.canNotWatchVideo(tH);
                ro.watchVid(tH);
                ro.isCreditDialogUp(tH);
            }
            ro.player.watchVideoAutoplay = function watchVideoAutoplay() {
                tH.log3('watchVideoAutoplay')
                ro.goHome(tH);
                ro.player.closeDialog(tH)
                ro.setAutoPlayTo(tH, false)
                ro.clearUsersCredits(tH);
                ro.canNotWatchVideo(tH);
                ro.setAutoPlayTo(tH, true)
                ro.setCreditsTo(tH, 0);
                ro.canNotWatchVideo(tH);
                ro.setCreditsTo(tH, 2000);
                ro.watchVid(tH);
                ro.cd.hidden(tH);
            }
            ro.player.watchVideoAutoplayNoCredits = function watchVideoAutoplayNoCredits() {
                tH.log3('watchVideoAutoplayNoCredits')
                ro.goHome(tH);
                ro.player.closeDialog(tH)
                ro.setAutoPlayTo(tH, false)
                ro.whatIsAutoplay(tH)
                ro.clearUsersCredits(tH);
                ro.canNotWatchVideo(tH);
                ro.setAutoPlayTo(tH, true)
                ro.whatIsAutoplay(tH)
                ro.setCreditsTo(tH, 0);
                ro.canNotWatchVideo(tH);
                ro.watchVid(tH);
                ro.cd.showing(tH, 'Buy more');
                ro.cd.hasXCredits(tH, 0)
                //ro.cd.canReplay(tH)
                ro.cd.canBuyMoreCredits(tH);

            }

            ro.player.watchVideoNoCreditsNoAutoplay = function watchVideoNoCreditsNoAutoplay() {
                tH.log3('watchVideoNoCreditsNoAutoplay')
                ro.goHome(tH);
                ro.player.closeDialog(tH)
                ro.setAutoPlayTo(tH, false)
                ro.whatIsAutoplay(tH)
                ro.clearUsersCredits(tH);
                ro.setCreditsTo(tH, 0);
                ro.canNotWatchVideo(tH);
                ro.watchVid(tH);
                ro.isCreditDialogUp(tH);
                ro.cd.hasXCredits(tH, 0)
                //ro.cd.canReplay(tH)
                ro.cd.canBuyMoreCredits(tH);
            }


            ro.player.watchBadVideo = function watchBadVideo() {
                tH.log3('watchBadVideo')
                ro.goHome(tH);
                ro.player.closeDialog(tH)
                var badFile = 'asdf44442';

                ro.canNotWatchVideo(tH, badFile);
                ro.watchVid(tH, badFile);
                ro.isCreditDialogUp(tH, 'Error');
                ro.cd.canNotBuyMoreCredits(tH);
                ro.creditDialogOk(tH);
                ro.isCreditDialogClosed(tH, 'Error');
            }

            ro.player.watchVideo = function watchVideo() {
                tH.log3('watchVideo')
                ro.goHome(tH);
                ro.player.closeDialog(tH)
                ro.setAutoPlayTo(tH, false);
                ro.whatIsAutoplay(tH)
                ro.clearUsersCredits(tH);
                ro.setCreditsTo(tH, 1);
                ro.canNotWatchVideo(tH);
                ro.watchVid(tH);
                ro.isCreditDialogUp(tH);
                ro.cd.hasXCredits(tH, 1)
                // tH.log3('what?')
                ro.cd.clickUseCredit(tH)
                ro.cd.hidden(tH);

                ro.player.isPlaying(tH)
                //ro.cd.canReplay(tH)
            };

            p.player.isPlaying = function isPlaying(tH) {
                tH.wait(0.1)
                tH.desc('ensure player is paused... ')
                tH.verify(function pausePlayerWithClick(){
                    //var vp = videojs('#videoplayer');
                    return vp.paused() == false;
                });
            }
        }
        definePlayerFx();

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




function defineListerHelper() {
    function ListHelper() {
        var p = ListHelper.prototype;
        p = this;
        var self = this;
        self.data = {};

        p.init = function init(url, appCode) {
        };
        p.configureListHelper = function configureListHelper(
            listId, btnClear, btnMore, txtSearch) {
            self.data.listId    = listId;
            self.data.btnClear  = btnClear;
            self.data.btnMore   = btnMore;
            self.data.txtSearch = txtSearch;
        };

        p.waitForList = function waitForList(tH) {
            tH.waitForShow(self.data.listId);
        }
        p.clearList = function clearList(tH) {
            tH.clickJ(self.data.btnClear)
        }
        p.getMoreListItems = function getMoreListItems(tH) {
            tH.clickJ(self.data.btnMore)
        }
        p.verifySizeOfList = function verifySizeOfList(tH, verifySize) {
            tH.wait(0.5);
            tH.addSync(function (){
                var list = $(self.data.listId);
                if ( self.data.listId == null || self.data.listId == '' ) {
                    tH.assert(false, 'do not have a listId')
                }
                var size = list.find('li');
               // console.log('what is this? ')
                var listItemsCount = size.length;
                if (verifySize == null ) {
                    tH.log('size of list', self.data.listId, listItemsCount);
                } else {
                    if ( $.isFunction(verifySize)) {
                        var sizeTheSame = verifySize(listItemsCount);
                        tH.assert(sizeTheSame, 'fx failed were not the same', listItemsCount, '!=', verifySize.name)
                    }else {
                        var sizeTheSame = listItemsCount == verifySize;
                        tH.assert(sizeTheSame, 'sizes were not the same', listItemsCount, '!=', verifySize);
                    }
                }
                tH.data.lastSizeOfList = listItemsCount;
            })
            tH.wait(0.5)
        }
        p.verifySizeOfList_MoreThan = function verifySizeOfList_MoreThan(tH, moreThanVerifySize, msg) {
            self.verifySizeOfList(tH, function verifySizeMotherThan(size) {
                tH.assert(size>moreThanVerifySize, 'Too small', size, '! >', moreThanVerifySize, msg)
            })
        }
        p.verifySizeOfList_MoreThanLastTime = function verifySizeOfList_MoreThanLastTime(tH, moreThanVerifySize, msg) {
            self.verifySizeOfList(tH, function verifySizeMotherThan(size) {
                tH.assert(size> tH.data.lastSizeOfList, 'Too small', size, '! >',  tH.data.lastSizeOfList, msg)
            })
        }
        p.verifySizeOfList_FewerThanLastTime = function verifySizeOfList_FewerThanLastTime(tH, moreThanVerifySize, msg) {
            self.verifySizeOfList(tH, function verifySizeFewerThanThan(size) {
                tH.assert(size <  tH.data.lastSizeOfList, 'Too large', size, '! <',  tH.data.lastSizeOfList, msg)
            })
        }
        p.searchListByText = function searchListByText(tH,text) {
            // tH.addSync(function (){
            tH.trace('set text to', self.data.txtSearch, text)
            tH.setItem(self.data.txtSearch, text)
            tH.pressEnter(self.data.txtSearch )
            tH.wait(1)
            //})
        }

        p.clickListItem = function clickListItem(tH, index) {
            tH.wait(0.5);
            tH.addSync(function (){
                var list = $(self.data.listId);
                var size = list.find('li');
                var ui = size[index];
                var ui = $(ui)
                var link = ui.find('a');
                tH.clickNow(link)
            })
            tH.wait(0.5)
        }
        p.verifyAt = function verifyAt(tH, id) {
            tH.waitForShow(self.data.nextPageAfterClick);
        }
        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return
            }
            sh.sLog(arguments)
        }
    }
    var lH = new ListHelper();
    window.lH = lH;
    window.ListHelper = ListHelper;
}
defineListerHelper();






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
        ro.clearUsersCredits(tH)
        ro.setCreditsTo(tH, 0)
        //ro.useCredit(tH, ro.urls.file1)
        ro.canNotUseCredit(tH, ro.urls.file1)
        ro.canNotWatchVideo(tH, ro.urls.file1)

        ro.setCreditsTo(tH, 2000)
        ro.useCredit(tH, ro.urls.file1)
        ro.verifyCreditCount(tH, 1999)
        ro.canNotUseCredit(tH, 'asdf')
        ro.verifyCreditCount(tH, 1998, null,  true)
        ro.verifyCreditCount(tH, 1999)

        ro.canWatchVideo(tH, ro.urls.file1)
        ro.clearUsersCredits(tH)

        ro.canNotWatchVideo(tH, ro.urls.file1)
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
    }
    test.desc = 'Test Paying stuff'
    window.tests.rPay = test;


    var test = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log('test 2')
        //tH.click('home');
        tH.wait(0.5)

        ro.searchHomePageSet(tH);

        return;


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
    test.desc = 'Touch Every Screen Hard'
    window.tests.rSmoke2 = test;


    var test = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log(defineTestA.name);

        ro.ensureWeHaveX(tH)

        //tH.click('home');
        tH.wait(0.5)
        ro.goHome(tH);


        ro.player.watchVideoNoAutoplay()
        ro.player.watchVideo();
        ro.player.watchBadVideo()
        ro.player.watchVideo();
        ro.player.watchVideoNoCreditsNoAutoplay()
        ro.player.watchVideo();
        ro.player.watchVideoAutoplay()
        ro.player.watchVideo();
        ro.player.watchVideoAutoplayNoCredits()
        ro.player.watchVideo();


        return;

        //ro.searchHomePageSet(tH);
        ro.clickWatchIt(tH);
        ro.videoIsPlaying(tH);

        return;
    }
    test.desc = 'Test Credit Dialog'
    window.tests.rCreditDialog = test;




    var test = function defineTestA(tH) {
        var t = tH.createNewTest();
        tH.log(defineTestA.name);

        ro.ensureWeHaveX(tH)

        //tH.click('home');
        tH.wait(0.5)
        ro.goHome(tH);

        ro.goList(tH);
        //  return;

        var lH = new window.ListHelper()


        var listId    = '#dialogSearchLists_list';
        var btnClear  = '#dialogSearchLists_btnClear';
        var btnMore   = '#dialogSearchLists_btnMoreLoadingHolder';
        var txtSearch = '#txtSearchLists';
        lH.configureListHelper(listId, btnClear, btnMore, txtSearch)

        lH.clearList(tH)

        lH.verifySizeOfList(tH)
        lH.verifySizeOfList(tH,0)
        lH.searchListByText(tH, 'yyy$s')

        lH.verifySizeOfList(tH,0)

        lH.searchListByText(tH, '')

        lH.verifySizeOfList_MoreThan(tH,0, 'did not perform valid search')

        lH.getMoreListItems(tH)

        lH.verifySizeOfList_MoreThanLastTime(tH,0)

        lH.clickListItem(tH, 3)
        lH.data.nextPageAfterClick = '#view-content-list';
        lH.verifyAt(tH)

        tH.wait(1);
        tH.logNext('finished testing main list')

        var lH2 = new window.ListHelper()
        var listId    = '#view-content-list';
        var btnClear  = '#dialogSearchLists_btnClear';
        var btnMore   = '#dialogSearchLists_btnMoreLoadingHolder';
        var txtSearch = '#txtContentListsDialog';
        lH2.configureListHelper(listId, btnClear, btnMore, txtSearch)
        lH2.searchListByText(tH, ' ')
        lH2.verifySizeOfList_MoreThan(tH,3)
        lH2.verifySizeOfList(tH)
        lH2.searchListByText(tH, 'ee')
        lH2.verifySizeOfList_FewerThanLastTime(tH,0)
        lH2.searchListByText(tH, '')
        lH2.verifySizeOfList_MoreThanLastTime(tH,0)
        lH2.searchListByText(tH, 'e#$^%#,,,e')
        lH2.verifySizeOfList_FewerThanLastTime(tH,0)
        lH2.verifySizeOfList(tH,0, 'has more than 0 items for bad search result')
        return

        ro.player.watchVideoNoAutoplay()
        ro.player.watchVideo();
        ro.player.watchBadVideo()
        ro.player.watchVideo();
        ro.player.watchVideoNoCreditsNoAutoplay()
        ro.player.watchVideo();
        ro.player.watchVideoAutoplay()
        ro.player.watchVideo();
        ro.player.watchVideoAutoplayNoCredits()
        ro.player.watchVideo();


        return;

        //ro.searchHomePageSet(tH);
        ro.clickWatchIt(tH);
        ro.videoIsPlaying(tH);

        return;
    }
    test.desc = 'Test Lists Dialog'
    window.tests.rLists = test;
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



