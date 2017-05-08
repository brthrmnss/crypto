
function tryToReloadSetup() {
	//why: is this needed?

	return


	/*
	 @author ebooks.wtf@yandex.com
	 @license do what you want with this simple chrome extension
	 @date 2016-02-28
	 @version 0.5
	 */
	var four = 2 + 2
	console.log('boody')
	eval('four = 3 + 2; console.log("fff", "four")')
	var url = "http://localhost:10110/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/amz_hijacks.js"
	url += '?=' + Math.random();
	window.$ = $;
	/*$.getScript(url, function( data, textStatus, jqxhr ) {
	 console.log( data ); // Data returned
	 console.log( textStatus ); // Success
	 console.log( jqxhr.status ); // 200

	 console.log( "Load was performed." );
	 });*/

	console.log('loaded', 'script.js')

	function loadScriptSync(src) {
		var s = document.createElement('script');
		s.src = src;
		s.type = "text/javascript";
		s.onload = function () {
			console.log('Done', 'script.js');
			//debugger
			console.log('loaded')
		}
		//debugger
		s.async = false;                                 // <-- this is important
		document.getElementsByTagName('head')[0].appendChild(s);
		//debugger
	}

//loadScriptSync('amz_hijacks.js')

	function onBtn() {
		$.ajax({
			url: url,
			success: function (data) {
				console.log('loaded amz_hijacks')
				eval(data);
			},
			error: function (xhr, textStatus, errorThrown) {
				console.error('xhr', textStatus, errorThrown)
			},
			dataType: "text"
		});
	}


	var btn = $('<button style="position:absolute">Retry</button>')
	btn.css('position', 'absolute');
	btn.css('z-index', '500');
	btn.css('top', '0px');
	btn.css('position', 'absolute');
	btn.click(function load() {
		onBtn()
	})

	onBtn()
	$('body').append(btn)

//m


//firstly check if "read on any device" image is present, hence this is a kindle page,
// #this might change if the amazon redesign their page of course
	if ($('#udpKcpAppAdImage').length > 0) {

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


	function processAmazon() {
//console.clear()
		console.log('processAmazon')
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
				console.log('txt-h2', txt)
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

			debugger
		}

		ok()
		//return;
		//debugger
		setTimeout(ok, 0)
		setTimeout(ok, 500)

		setTimeout(ok, 2500)

	}

//debugger
//processAmazon();

}
tryToReloadSetup();