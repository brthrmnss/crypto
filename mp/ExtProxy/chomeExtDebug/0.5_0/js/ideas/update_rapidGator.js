/**
 * Created by user1 on 10/13/2017.
 */
console.log('loaded', 'ChromeRapidGator.js')

function ChromeRapidGator() {
    var self = this;

    var p = self;

    p.init = function init() {
        if (window.what == null) {
            window.what = 0
        } else {
            window.what += 1;
        }
        console.log('3yyy-4', window.what)
       // console.clear()
        setTimeout(function () {
            $('.btn-download').click()
            debugger
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                debugger;
               $.each(tabs, function close(k,tab) {
                   chrome.tabs.remove(tab.id, optionalCallback);
                   function optionalCallback() {}
               })
            });
        },250)

    }

    p.getEbooksWtf = function getEbooksWtf() {
        if ($('#udpKcpAppAdImage').length > 0) {

            debugger
            //get current URL from current tab on this amazon kindle page
            var currentUrl = window.location.href;

            //now we send this URL to ebooks.wtf to check if this book exists there
            $.ajax({
                type: "POST",
                dataType: "json",
                url: 'https://ebooks.wtf/?q=combineharvester',
                data: {
                    "d": currentUrl
                },
                success: function (data, textStatus, xhr) {

                    //console.log('go')

                    if (data.status == 'ok') {

                        //check response has a valid asin (hence exists on ebook.farm)
                        if (data.asin != 0) {

                            //add a green bar with a link to ebook.farm
                            $("body").prepend('<div style="background-color: #006600;text-align: center;"><br /><a style="font-size: 200%; color: #ffffff;" href="https://ebooks.wtf/?q=find:submit&searchQuery=' + data.asin + '">This ebook is available on ebooks.wtf!</a><br /><br /></div>');
                        }
                        else {

                            //do nothing
                        }
                    }
                    else if (data.status == 'error') {

                        //do nothing
                    }
                    else {

                        //do nothing
                    }
                },
                error: function (xhr, textStatus, errorThrown) {

                    //do nothing
                }
            });
        }
    }


    p.getEbookFromBookzz = function getEbookFromBookzz() {
        var bookname = self.utils.getBookName();

        console.log('bookname', bookname)

        if (self.utils.isKindle() == false) {
            //    return; //trying this anyway...
        }

        var requestUrl = 'http://localhost:10110/searchBookzz/?query=' +
            bookname
        self.utils.get(requestUrl, function onT(data) {
            console.log('data', data)

            if (data.needToLogin) {
                console.warn('need to login')

                self.utils.getR(data.url, function onGotData(data) {
                    console.log('got new data', data)


                    self.utils.post(requestUrl,
                        data,
                        function onResponseReDo(dataX) {
                            console.info('what is the reult', dataX)
                            if (dataX.needToLogin) {
                                console.error('failed on 2nd time ... give up')
                                alert('need to login into http://book4you.org')
                                window.location = 'http://book4you.org'
                                debugger
                                return;
                            }
                            onT(dataX)
                        })

                })
                //preResponseBody
                return;
            }

            var bbC = $('#buyBoxCustom')
            if (bbC.length > 0) {

            } else {
                var innerBox = $('#buybox')//.find('.a-box-inner')
                if (innerBox.length == 0) {
                    innerBox = $('#mediaTabs_tabSetContainer')
                }
                var bbC = $('<div/>')
                bbC.attr('id', 'buyBoxCustom')
                innerBox.append(bbC)
                bbC = $('#buyBoxCustom')
            }
            bbC.html('')
            //uiUtils.toJSONString(data)
            //uiUtils.toJ(data)
            //bbC.html(JSON.stringify(data))
            uiUtils.flagCfg = {};
            uiUtils.flagCfg.addTo = bbC;
            // uiUtils.flagCfg.addSpacerAfter = true;

            uiUtils.addSpan({text: '&nbsp; ZZ', title: 'How Many macthes'})
            var u = uiUtils;

            // u.addSpace()
            // u.addLink({text: data.readableLength})

            u.addSpace()
            u.addLink({text: data.readableLength, title: 'Readable length', blank: true, href: data.url})
            u.lastUI.attr('title', 'Readable length')

            u.addSpace()
            u.addLink({text: data.pdfLength, title: 'Search any', blank: true, href: data.url.replace('&e=1', '')})
            u.lastUI.attr('title', 'Search Any')

        })
    }

    p.processAmazon = function processAmazon() {
        console.log('in this ..', window.$)

        function ok() {
            console.log('cleaning up layouts')
            //var element = document.getElementById('div-gpt-ad')
            // element.outerHTML = "";
            // delete element;
            $('#amsDetailRightEBookTall_feature_div').html('')
            //$('#div-gpt-ad').remove();
            $('#navSwmHoliday').remove()
            $('#nav-swmslot').remove();
            $('#sendSampleBox').remove();

            var ids = ['sponsored-products-dp_feature_div',
                'redeemCode', 'tellAFriendBylineBox_feature_div',
                // 'kcpApp_feature_div', //try kindle button, //need this for identifing ikindle
                'quickPromoBucketContent', //random content above
                'nav-subnav', //advance search resleas bes sellers ...ugh
                'heroQuickPromo_feature_div',
                'aboutEbooksSection', //word wise
                'sponsoredLinksCsaIframe', //other links,
                //'nav-logo',
                'nav-xshop',
                'nav-upnav',
                'universal-hero-quick-promo',
                'ad',
                'amsDetailRightPBookTall',
                'sitbLogo', //look inside
            ]

            $.each(ids, function removeId(k, id) {
                if (id.trim() == '') return;
                var ui = $('#' + id)
                ui.remove()
            })
            $('[name="goKindleStaticPopDiv"]').remove();
            $('[name="submit.give-as-gift"]').remove();


            $('#kcpApp_feature_div').css('opacity', 0.0)

            //fix kindle bar
            $('.print-list-price').remove();
            $('.print-sold-by').remove();
            //for books remove book price
            $('.a-column.a-span7.a-text-right.a-span-last').remove()

            'Unlimited reading. Over 1 million titles.' //go up to and elete
            $('.a-section .a-spacing-small .a-spacing-top-micro .a-text-left').remove();
            $('#deliverTo').remove()
            $('.botmORDivider').remove();

            $('#giftButtonStack').remove()

            //remove unlimited icon
            $('.a-icon.a-icon-kindle-unlimited.a-icon-medium').parent().parent().remove()

            $('.nav-search-scope').css('border-radius', '0px')
            $('.nav-search-submit').css('border-radius', '0px')
            $('.nav-search-dropdown').css('border-radius', '0px')

            $('nav-left').find('nav-line-1').remove(); //remove departmetns drop down
            $('#nav-shop').find('.nav-line-2').remove(); //remove departmetns drop down
            $('#nav-logo').css('opacity', '0')


            function getText(ui) {
                ui = $(ui);
                var text = ui.text().toLowerCase().trim();
                return text;
            }

            function changeTextTo(from, to, type, like) {
                if (like === undefined) like = true;
                if (from.length == 1) {
                    from.text(to)
                    return;
                }

                var foundUI = null;

                from = from.trim().toLowerCase();

                var uiItems = $(type)
                $.each(uiItems, function (k, ui) {
                    ui = $(ui)

                    var txt = getText(ui)
                    var isLike = like && txt.includes(from)
                    if (isLike == false && type == 'span') {
                        // console.log(txt, '$', from)
                    }
                    if (txt == from || isLike) {
                        ui.text(to)
                        foundUI = ui;
                    }
                })
                return foundUI;
            }

            // changeTextTo('buy now with', 'buy', 'a')
            var btnRead = changeTextTo('read for free', 'read', 'span')
            if (btnRead) {
                btnRead.css('padding-top', '10px')
            }
            //.css('padding-top', '10px')
            //changeTextTo('#one-click-button', 'buy')
            $('#one-click-button').parent().text('buy')


            var removeH2Titles = [
                'Editorial Reviews',
                'Book Details',
                'More About the Author', 'More About the Author',
                'Customer Reviews',
                'Customers Who Bought This Item Also Bought',
                'Customers who viewed this item also viewed',
                'Product Details',
                'Editorial Reviews',
                'Frequently Bought Together'
            ]
            $.each(removeH2Titles, function on(k, v) {
                removeH2Titles[k] = v.trim().toLowerCase()
            })
            console.debug(removeH2Titles, $('h2'))
            //console.log('ok', $('h2'))
            $.each($('h2'), function (k, ui) {
                ui = $(ui)
                var txt = ui.text().trim().toLowerCase();
                console.debug('\t', 'search txt', txt)
                if (removeH2Titles.includes(txt)) {
                    ui.remove();
                    return;
                }
                else {
                    console.debug('\t', 'no match for', txt)
                }
            })

            return;

            var removeH3Titles = [
                'Biography',
                'Amazon.com Review',
                'Top Customer Reviews',
                'Most Recent Customer Reviews',
                'Customer Images',
                'Amazon Author Rank'
            ]
            $.each(removeH3Titles, function on(k, v) {
                removeH3Titles[k] = v.trim().toLowerCase()
            })

            window.removeH3Titles = removeH3Titles;
            //console.debug(removeH3Titles)
            //   console.log('h3', $('h3'))
            $.each($('h3'), function (k, ui) {
                ui = $(ui)
                var txt = ui.text().trim().toLowerCase();
                console.log('h3', 'txt', txt)
                if (removeH3Titles.includes(txt)) {
                    ui.remove();
                    return;
                } else {
                    console.debug('\t', 'no match for', txt)
                }
            })
            //remove orders link
            $('#nav-orders').remove();
            //remove prime button
            $('#nav-link-prime').remove()

            //remove search icon
            $('.nav-searchbar').find('.nav-right').remove();

            //#buybox
            $('.a-row.a-carousel-header-row.a-size-large').remove()
            //top of carosel
            //
        }

        ok()
        //debugger
        /*setTimeout(ok, 0)
         setTimeout(ok, 500)

         setTimeout(ok, 2500)*/
    }


    p.getEbookFromBookzz2 = function getEbookFromBookzz2() {

        if (self.utils.isKindle() == false) {
            return;
        }

        var bookname = self.utils.getBookName();
        console.log('bookname', bookname)
    }


    p.getWTF = function getWTF() {


        if (self.utils.isKindle() == false) {
            return;
        }
        //get current URL from current tab on this amazon kindle page
        var currentUrl = window.location.href;

        //  debugger
        var bookName = $('#ebooksProductTitle').text()

        console.log('getWTF', 'bookname', bookName)

        if (bookName.includes(':')) {
            bookName = bookName.split(':')[0]
        }
        bookName = bookName.replace(/[^\w\s]/gi, '')

        // var url = 'http://localhost:10110/searchpb/'//?query=what%20if
        //now we send this URL to ebooks.wtf to check if this book exists there
        //get current URL from current tab on this amazon kindle page
        var currentUrl = window.location.href;

        console.log('wtf....')
        //now we send this URL to ebooks.wtf to check if this book exists there
        $.ajax({
            type: "POST",
            dataType: "json",
            //url: 'https://ebooks.wtf/?q=combineharvester',
            url: 'https://ebook.farm/?q=combineharvester',
            data: {
                "d": currentUrl
            },
            success: function onEbookWTFretuned(data, textStatus, xhr) {

                console.log('got content, wtf', data)

                if (data.status == 'ok') {

                    //check response has a valid asin (hence exists on ebook.farm)
                    if (data.asin != 0) {

                        //add a green bar with a link to ebook.farm
                        $("body").prepend(
                            '<div style="background-color: #006600;text-align: center;">' +
                            '<br />' +
                            '<a style="font-size: 200%; color: #ffffff;"' +
                            ' href="https://ebook.farm/?q=find:submit&searchQuery=' + data.asin + '">This ebook is available on ebooks.wtf!</a><br /><br /></div>');
                    }
                    else {

                        //do nothing
                    }
                }
                else if (data.status == 'error') {

                    //do nothing
                }
                else {

                    //do nothing
                }
            },
            error: function onEbookError(xhr, textStatus, errorThrown) {

                console.error('wtf probably loading book')
                console.error(xhr, textStatus, errorThrown)
                //do nothing
            }
        });
    }


    function defineUtils() {
        var u = {};
        p.utils = u;
        u.isKindle = function isKindle() {
            if ($('#udpKcpAppAdImage').length > 0) {
                return true
            }
            return false;
        }

        u.get = function getJSON(url, fxDone) {
            $.ajax({
                type: "get",
                dataType: "json",
                url: url,
                /*data: {
                 "d": currentUrl,
                 query:bookName
                 },*/
                success: function onSuccess(data, textStatus, xhr) {
                    if (fxDone) {
                        fxDone(data)
                    }
                    ;
                },
                error: function onError(xhr, textStatus, errorThrown) {
                    console.error('error with url', url)
                    console.error('error with url', url)
                    console.error('error with url', url)
                    if (fxError) {
                        fxError(xhr, textStatus, errorThrown)
                    }
                }
            });
        }


        u.getR = function getRawRequest(url, fxDone, fxError) {
            $.ajax({
                type: "get",
                dataType: "text",
                // data: data,
                url: url,
                success: function onSuccess(data, textStatus, xhr) {
                    if (fxDone) {
                        fxDone(data)
                    }
                    ;
                },
                error: function onError(xhr, textStatus, errorThrown) {
                    console.error('error with url', url)
                    if (fxError) {
                        fxError(xhr, textStatus, errorThrown)
                    }
                }
            });
        }


        u.post = function postJSON(url, data, fxDone, fxError) {
            $.ajax({
                type: "post",
                dataType: "json",
                url: url,
                data: {data: data},
                /*data: {
                 "d": currentUrl,
                 query:bookName
                 },*/
                success: function onSuccess(data, textStatus, xhr) {
                    if (fxDone) {
                        fxDone(data)
                    }
                    ;
                },
                error: function onError(xhr, textStatus, errorThrown) {
                    console.error('error with url', url)
                    console.error('error with url', url)
                    console.error('error with url', url)
                    if (fxError) {
                        fxError(xhr, textStatus, errorThrown)
                    }
                }
            });
        }


        u.getBookName = function isKindle() {
            var bookName = $('#ebooksProductTitle').text()
            if (bookName == '') {
                var bookName = $('#productTitle').text()
            }
            if (bookName.includes(':')) {
                bookName = bookName.split(':')[0]
            }
            bookName = bookName.replace(/[^\w\s]/gi, '')
            return bookName;
        }



    }

    defineUtils();
}

/*if (window.location.host.includes('rapidgator.com')) {*/
var i = new ChromeRapidGator();
i.init();
//i.processAmazon();
//i.getEbookFromBookzz();
//i.getWTF();
/*
 } else {
 console.warn('why did u do this? amazon.com not in hostname')
 }
 */
