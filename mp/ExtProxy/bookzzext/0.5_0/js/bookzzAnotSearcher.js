/**
 * Created by user1 on 4/14/2017.
 */


//$('body').css('background-color', '#f2f2f2')

function scrap() {

    var instance = new ListExtractorScraper();
    var config = {};
//config.file = 'example_bookzz.html';
    config.jquery = true;

   // config.maxItems = 1;

    instance.init(config)
    instance.setupAreas('#searchResultBox', '.resItemBox')
    instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
    instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))


 
    instance.setupLiField('searchGood', instance.utils.prop('itemprop', 'name'))
    instance.props.doNotStore()
    instance.props.addItem({
        type:'a', text:'GR',
        blank:true,
        addStyles:{padding:'2px'},
        href:function makeRef(o) {
            //    debugger
            return 'https://www.google.com/search?q=goodreads '+o.name + ' ' + o.author + '&btnI'
        }
    })




    instance.setupLiField('searchAmz', instance.utils.prop('itemprop', 'name'))
    instance.props.defaultAnnotation('extrasAnnots')
    instance.props.doNotStore()
    instance.props.addItem({
        type:'a', text:'Search',
        blank:true,
        href:function makeRef(o) {
            //    debugger
            return "http://www.google.com/search?btnI=I'm+Feeling+Lucky&q="+
                'amazon '+o.name + ' ' + o.author //+ '&btnI'
            return 'https://www.google.com/search?q=amazon '+o.name + ' ' + o.author + '&btnI'
        }
    })



    instance.test();

    window.instance = instance;
}

window.scrap()