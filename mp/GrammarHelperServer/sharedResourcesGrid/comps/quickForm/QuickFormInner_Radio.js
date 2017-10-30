/**
 * Created by user1 on 10/2/2017.
 */

if ( window.reloader)  {
    window.reloader.reloadBlockFx(document.currentScript, function on(){
        QuickForm.comps.reload()
    })
}

function QuickFormInner_Radio() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg)
        self.settings = cfg;
        self.data.ui = new UIComp();

        var cfg2 = UIComp.copyCfg(  cfg)
        cfg2.fileName = 'quickForm/quickFormInner_Radio.html'
        //self.settings.fxPostRender = p.postRender;

        self.data.ui.init(cfg2)

        //debugger
         //cfg2.fxRender = self.postRender;
        cfg2.fxPostRender = p.postRender;
        if ( self.settings.preload ) {
            self.data.ui.preloadTemplateContent();
        } else {
            self.render()
        }



        // debugger
    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
       // console.error('boo')

    };

    p.postRender = function postRender(a,b,c) {
        self.data.ui.data.ui
        //console.error('...8888',a,b,c)
        var ui = self.data.ui.data.ui;
        var itemData = self.settings.itemData
        var val = itemData.defaultValue;
        if ( itemData.value ) {
            val = itemData.value;
        }

        ui.find('#holder')

        sh.each(self.settings.options, function createEachOPtion(k,v) {
            if ( v.name ) {

            } else {
                v = {name:v, value:v}
            }
            var radio = u.tag('input')
            u.type('radio');
            u.value(v.value);
            u.name(self.settings.name);


            /*console.log('bood', self.data, self.settings)
            console.log('--', self.settings.defaultValue, v.value)*/
            if ( self.settings.defaultValue==v.value) {
                u.lastUI.attr('selected', '')
            }
            //radio.text(v)
            // debugger


            ui.append(radio);

            var lbl = u.tag('span')
            lbl.text(v.name)
            ui.append(lbl);

            ui.append(u.tag('br'))
           // ui.append('ddddddddddd');
        })


        if ( self.settings.defaultValue) {
            //$("input[name="+self.settings.name+"]").val([self.settings.defaultValue]);
            var value = self.settings.defaultValue;
            var name = self.settings.name;
            function setRadio(name, value, checked) {
                checked = sh.dv(checked, true)
                $("input[name=" + name + "]" + "[value=" + value + "]").prop('checked', checked);
            }
            setTimeout(setRadio, 250, name, value, true)
            console.log("input[name="+self.settings.name+"]")
            console.log("input[name="+name+"]"+"[value=" + value + "]")
        }

        var jName = "input[name="+name+"]";



        setTimeout(function createListener() {
            //$(jName).change(radioValueChanged)
            self.data.ui.copyValToData({id:jName,key:'data'})
            self.data.ui.pushVal({id:'#labelNameEcho',key:'data'})
            self.data.ui.calcBindings(true);
          //  debugger
        }, 250, name, value, true)


        function radioValueChanged()
        {
            radioValue = $(this).val();

            console.log('radiovalue', radioValue)
            //alert(radioValue);

            if($(this).is(":checked") && radioValue == "0")
            {
                $('#Question2Wrapper').hide();
            }
            else
            {
                $('#Question2Wrapper').show();
            }
        }
        return;
        // debugger;
        ui.find('#labelName').text(val)
        ui.find('#txtInput').val(val)

        //self.data.ui.bind('#txtInput')

        self.data.ui.bind({id:'#txtInput',key:'txtVal'})
        self.data.ui.bind({id:'#txtInput',key:'data'})
        self.data.ui.pushVal({id:'#labelNameEcho',key:'txtVal'})



    }

/*    p.postRender = function postRender(query) {

        var listContents = self.data.ui.data.ui.find('#listContents')
        $.each(self.settings.list, function on(k,v){

            console.error('ok', v)
            var i = new self.settings.comp;
            var cfg = {};
            i.init(cfg)
        })
    };*/

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

