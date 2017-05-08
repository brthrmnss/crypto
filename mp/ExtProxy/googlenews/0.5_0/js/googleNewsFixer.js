/**
 * Created by user1 on 4/14/2017.
 */


//$('body').css('background-color', '#f2f2f2')

function scrap() {


    $('.top-stories-section').remove()
    $('.nv-FRONTPAGE').remove()
    //right side
    $('.section-BREAKING_NEWS_BOX').remove()
    $('.gadget-wrapper.gsid-WTH').remove();
    $('.gadget-wrapper.gsid-LCL').remove();
    $('.gadget-wrapper.gsid-EPG').remove();

    $('.goog-inline-block.goog-flat-menu-button.edition-select').remove();
    $('#view-filter-select').remove();

    //image attributions
    $('.esc-thumbnail-image-source-wrapper').remove()

    //
    $('.goog-inline-block.kd-appname').remove()


    $('[title=News]').remove()
    $('.esc-thumbnail-image').css('opacity', 0.6)
    $('.browse-sidebar').css('opacity', 0.6)


    $('.basic-title').css('background-color', 'white')


    $('.title-text').css('color', '#34495E')
    return;

    var instance = new ListExtractorScraper();
    var config = {};
//config.file = 'example_bookzz.html';
    config.jquery = true;

    //config.maxItems = 2;

    //debugger
    instance.init(config)
    instance.setupAreas('#searchResultBox', '.resItemBox')
    instance.setupLiField('name', instance.utils.prop('itemprop', 'name'))
    instance.setupLiField('author', instance.utils.prop('itemprop', 'author'))
    instance.setupLiField('searchAmz', instance.utils.prop('itemprop', 'name'))
    instance.props.defaultAnnotation('extrasAnnots')
    instance.props.doNotStore()
    instance.props.addItem({
        type:'a', text:'Search',
        blank:true,
        href:function makeRef(o) {
       //     debugger
        return 'https://www.google.com/search?q=goodread '+o.name + ' ' + o.author
    }
    })
   // debugger
    instance.test();

    window.instance = instance;
}
window.scrap()