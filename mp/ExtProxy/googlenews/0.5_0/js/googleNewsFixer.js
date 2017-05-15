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


    var self = scrap
    scrap.data = {}
    self.data.rtColHidden = false;


    var style=document.createElement('style');
    document.head.appendChild(style);
    stylesheet=style.sheet;
    function css(selector,property,value)
    {
        try{ stylesheet.insertRule(selector+' {'+property+':'+value+'}',stylesheet.cssRules.length); }
        catch(err){}
    }
    window.css = css;


    scrap.hidePersonalizeColumn = function hidePersonalizeColumn() {
        self.data.rtColHidden = ! self.data.rtColHidden;
        var ui =  $('.rt-col');
        if ( self.data.rtColHidden ) {
            ui.css('width', 'Opx');
        }
        else {
            ui.css('width', '385px');
        }
        var width = ui.css('width');
        console.log('ui', ui, width, self.data.rtColHidden)
        // debugger




        css('.rt-col, .rt-col-col', 'width', '0px')


    }

    self.hidePersonalizeColumn()
    $('#settings-button').click(scrap.hidePersonalizeColumn)



    $('.al-attribution-cell.sharebar-cell').remove()

    css('.esc-separator', 'height',0)



    css('.esc .esc-lead-article-title', 'font-size','14px')
    css('.esc .esc-lead-article-title', 'font-weight','normal')
    css('.titletext', 'font-weight','normal !important')

    window.css('.blended-wrapper','min-height', '25vh')
    /*
     '  .basic-title a, .basic-title a:visited {'
     color: #000;
     text-decoration: none;
     font-style: italic;
     opacity: 0.7;
     font-size: smaller;
     }'*/
    var selector = '.basic-title a, .basic-title a:visited'
    window.css(selector,'font-style', 'italic')
    //window.css(selector,'opacity', '0.7')
    window.css(selector,'font-size', 'smaller')
    window.css(selector, 'color', '#265C83');

    //debugger
    $('.section-name')/*.find('a').find('span')*/.each(
        function removeOddChar() {
            var ui = $(this)
            var text = ui.text()
            text = text.replace('»', '');
            ui.text(text)
            return;
            $(this).attr('href', 'http://www.somesitename.com/filter' + this.href);
        });

    //storeis with no pic, only outer table, no attribution table
    $('.esc-no-thumbnail').find('table.esc-layout-table').css('padding-left', '85px')

    $('.nav-items').css('padding-top', '12.5px');


    window.css('.footer', 'text-align', 'left');
    window.css('.footer', 'margin-left', '200px');
    window.css('.footer-disclaimer', 'padding', '0px');
    window.css('.footer', 'min-width', 'inherit');
    return;

    window.instance = instance;
}
window.scrap()