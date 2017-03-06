

function ChromeExtMod() {
    var self = this;

    p.getEbooksWtf = function getEbooksWtf() {
        
    }
}



var i = new ChromeExtMod();

/*

 G:/Dropbox/projects/crypto/mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 http://localhost:10110/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/hijack.js
 */

function processAmazon() {
//console.clear()
    console.log('in this ..', window.$)
// debugger
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
            'kcpApp_feature_div', //try kindle button,
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
                }
            })
        }

        // changeTextTo('buy now with', 'buy', 'a')
        changeTextTo('read for free', 'read', 'span')
        //.css('padding-top', '10px')
        //changeTextTo('#one-click-button', 'buy')
        $('#one-click-button').parent().text('buy')


        var removeH2Titles = [
            'Editorial Reviews',
            'Book Details',
            'More About the Author',
            'More About the Author',
            'Customer Reviews',
            'Customers Who Bought This Item Also Bought',
            'Product Details',
            'Editorial Reviews',
            'Frequently Bought Together'
        ]
        $.each(removeH2Titles, function on(k, v) {
            removeH2Titles[k] = v.trim().toLowerCase()
        })

        //console.log('ok', $('h2'))
        $.each($('h2'), function (k, ui) {
            ui = $(ui)
            var txt = ui.text().trim().toLowerCase();
            console.log('txt', txt)
            if (removeH2Titles.includes(txt)) {
                ui.remove();
                return;
            }
        })


        var removeH3Titles = [
            'Biography',
            'Amazon.com Review',
            'Top Customer Reviews',
            'Most Recent Customer Reviews',
            'Customer Images',
            'Amazon Author Rank'
        ]
        $.each(removeH2Titles, function on(k, v) {
            removeH2Titles[k] = v.trim().toLowerCase()
        })

        // console.log('ok', $('h3'))
        $.each($('h3'), function (k, ui) {
            ui = $(ui)
            var txt = ui.text().trim().toLowerCase();
            console.log('txt', txt)
            if (removeH3Titles.includes(txt)) {
                ui.remove();
                return;
            }
        })

    }

    ok()
    //debugger
    setTimeout(ok, 0)
    setTimeout(ok, 500)

    setTimeout(ok, 2500)

}
processAmazon(); 

//alert('boo')
//firstly check if "read on any device" image is present, hence this is a kindle page,
// #this might change if the amazon redesign their page of course
if ($('#udpKcpAppAdImage').length > 0) {

    //get current URL from current tab on this amazon kindle page
    var currentUrl = window.location.href;

    var bookName = $('#ebooksProductTitle').text()
    if ( bookName.includes(':')) {
        bookName = bookName.split(':')[0]
    }
    bookName = bookName.replace(/[^\w\s]/gi, '')

    var url = 'http://localhost:10110/searchpb/'//?query=what%20if
    //now we send this URL to ebooks.wtf to check if this book exists there
    $.ajax({
        type: "get",
        dataType: "json",
        url: url,
        data: {
            "d": currentUrl,
            query:bookName
        },
        success: function (data, textStatus, xhr) {

            if ( data.status == 'ok' || data.linkz != null ) {
                var btn = $('<button/>')
                var c = $('#buybox').find('a-box-inner')

                console.log('c', c)
                c.append(
                    btn
                )
                var div = $('<div style="background-color: #006600;text-align: center;"><br />' +
                    '<a style="font-size: 200%; color: #ffffff;" href="https://ebooks.wtf/?q=find:submit&searchQuery=' + data.asin + '">This ebook is available on ebooks.pb!</a>' +
                    '<br /><br /></div>');

                div.append(data.linkz.length)
                var a = $('<a/>')
                a.attr('href', data.url)
                a.text('listing')
                div.append(a)
                $("body").prepend(div)
                //check response has a valid asin (hence exists on ebook.farm)
                if( data.asin != 0 ){

                    //add a green bar with a link to ebook.farm
                    // $("body").prepend('<div style="background-color: #006600;text-align: center;"><br /><a style="font-size: 200%; color: #ffffff;" href="https://ebooks.wtf/?q=find:submit&searchQuery=' + data.asin + '">This ebook is available on ebooks.wtf!</a><br /><br /></div>');
                }
                else{

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
