function forwardArgsTo(fx, args) {
	if (fx == undefined)
		return;
	if (args != null && args.length == null) {
		var args = convertArgumentsToArray(args)
	}
	return fx.apply(null, args)
}

function convertArgumentsToArray(_arguments) {
	var args = Array.prototype.slice.call(_arguments, 0);
	return args
}



function defaultValue(input, ifNullUse) {
	if (input == null) {
		return ifNullUse
	}
	return input;
}
var dv = defaultValue;


function callIfDefined(fx) {
	var args = convertArgumentsToArray(arguments)
	args = args.slice(1, args.length)

	if (fx == undefined)
		return args[0];


	// console.debug('args', tojson(args))
	return fx.apply(null, args)
	//return;
}

function convertArgumentsToArray(_arguments) {
	var args = Array.prototype.slice.call(_arguments, 0);
	return args
}

function throwIfNull(prop, msg) {
	if ( prop == null ) {
		throw new Error(msg)
	}
}

function defineUtils2() {
	$.async = function asyncHelper(items, fx, fxAllDone, delay, playIndex) {
		//var index = 0
		var asyncController = {};
		asyncController.index = 0;
		asyncController.getNext = function getNextItem() {
			var next = items[asyncController.index+1];
			return next;
		}
		if(playIndex>0){
			asyncController.index = playIndex;
		}
		if(playIndex<0){
			asyncController.index = items.length-1+playIndex;
		}

		asyncController.length = items.length;

		if ( delay == null && $.isNumeric(fxAllDone)) {
			delay = fxAllDone;
		}

		function goToNextSpan() {
			var item = items[asyncController.index];
			console.log('playindex', asyncController.index)
			if (asyncController.index > items.length - 1) {
				if ( fxAllDone ) {
					fxAllDone();
				}
				return;
			}
			fx(/*asyncController.index,*/ item, fxCallback, asyncController, asyncController.index)
			asyncController.index++;

			function fxCallback() {
				if (delay) {
					setTimeout(goToNextSpan, delay);
					return;
				}
				goToNextSpan();
			}
		}

		goToNextSpan();
		asyncController.runIteration = function runIteration() {
			goToNextSpan();
		}
		return asyncController;
	}
}
defineUtils2();


var uiUtils = {};
window.uiUtils = uiUtils;

function defineUtils() {
	var self = uiUtils;
	var p = uiUtils;
	var u = p;

	u.data = {}

	uiUtils.dictCfg = {};

	$.isString = function isString(objectOrString) {
		//return (objectOrString instanceof String)
		return typeof objectOrString == 'string'
	}


	self.clone = function clone(e) {
		var eee = JSON.stringify(e)
		return JSON.parse(eee)
	}

	uiUtils.makePanel = function makePanel(cfg) {
		throwIfNull(cfg.id, 'need an id')
		u.cfg.fixId(cfg)
		var existingUI = $(cfg.id);

		if ( cfg.clearOld &&  cfg.id ) {
			$( cfg.id).remove();
		}

		if ( existingUI.length > 0 ) {
			if ( existingUI.length > 0) {
				console.warn('you have multiple things')
			}
			if ( cfg.clearIfFound !== true ) {
				//if ( cfg.toggleMode != false ) {
				//		}
				existingUI.show();
				var cfg = uiUtils.dictCfg[cfg.id]
				//debugger;
				return existingUI.cfg;
			} else {
				console.warn('removing existing version')
				existingUI.remove();
			}
		}



		cfg = dv(cfg,{});
		uiUtils.dictCfg[cfg.id] = cfg;

		var panel = $('<div />')//
		// style="position: fixed; bottom: 10px; right: 10px;display: none; color:red; " id="testLogPanel">asdf  </div>')
		panel.attr('id', u.cfg.getId(cfg.id));
		panel.css('position', 'fixed');
		panel.css('bottom', '10px');
		panel.css('left', '10px');
		panel.css('z-index', '1001');
		panel.css('background-color', '#f2f2f2');
		panel.css('padding', '10px');
		panel.css('border', '1px #666666 solid');
		//panel.attr('id', cfg.id);
		//panel.attr('id', cfg.id);


		function onCloseDialog () {
			panel.hide()
			return;
		}

		cfg.fxClose = onCloseDialog;
		//panel.cfg = cfg;
		//panel.html('sdfsdf');
		$('body').append(panel);
		cfg.ui = cfg.panel = panel;
	};

	uiUtils.panel = uiUtils.makePanel;

	uiUtils.panel.tr =function makeBrPanel(cfg) {
		cfg = u.cfg.str(cfg, 'id')
		cfg = p.panel(cfg);
		u.clearPositions(cfg.ui)
		cfg.ui.css('top', '10px');
		cfg.ui.css('right', '10px');
	}

	uiUtils.clearPositions = function clearPositions(ui) {
		ui.css('left', '');
		ui.css('bottom', '');
		ui.css('right', '');
		ui.css('top', '');
	}
	uiUtils.panel.br =function makeBrPanel(cfg) {
		cfg = u.cfg.str(cfg, 'id')
		p.panel(cfg);
		u.clearPositions(cfg.ui)
		cfg.ui.css('bottom', '10px');
		cfg.ui.css('right', '10px');
	}

	uiUtils.panel.bl =function makeBrPanel(cfg) {
		cfg = u.cfg.str(cfg, 'id')
		p.panel(cfg);
		u.clearPositions(cfg.ui)
		cfg.ui.css('bottom', '10px');
		cfg.ui.css('left', '10px');
	}
	uiUtils.makeAbs =function makeAbs(jquery, highPosition) {
		jquery.css('position', 'absolute');
		if ( highPosition ){
			jquery.css('z-index', highPosition+200);
		}
	}

	uiUtils.ifFound = function ifFound(id) {
		if ( id.includes('#') == false ) {
			id = '#'+id;
		}
		var isFound = $(id).length > 0;
		return isFound;
	}

	uiUtils.addDefaultCfg = function addDefaultCfg(cfg) {
		uiUtils.flagCfg = cfg;
	}
	uiUtils.makeCheckbox = function makeCheckbox(cfg, id) {
		cfg = u.cfg.str(cfg, 'text');
		u.cfg.addToCfg(cfg, 'id', id);
		cfg.tag = dv(cfg.tag, 'input');
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var ui = u.tag(cfg.tag)
		ui.attr('type', 'checkbox')
		ui.html(cfg.text)

		if ( cfg.windowProp) {
			var keyVal = 'store.' + cfg.windowProp;
			var previousVal = uiUtils.getVal(keyVal);


			if (previousVal != null) {
			} else {
				if (cfg.defaultValue) {
					previousVal = cfg.defaultValue;
				}
			}

			console.log('keyval', keyVal, previousVal)

			if (previousVal != null) {
				uiUtils.setVal(keyVal, previousVal);
				setTimeout(function onLateR(){
					callIfDefined(cfg.fxChange, previousVal)
				},500)

				window[cfg.windowProp] = previousVal;
				var val = eval('window.' + cfg.windowProp);
				ui.prop('checked', val);
			}
		}



		ui.click(onChangeOptions);
		function onChangeOptions(event) {
			console.log('...', cfg.windowProp);
			var val = ui.is(':checked');
			if ( cfg.windowProp) {
				var val = eval('window.'+cfg.windowProp+'='+val );
				uiUtils.setVal(keyVal, val);
				//ui.prop('checked', val);
			};

			callIfDefined(cfg.fxChange, val)

		}



		//	lbl.css('user-select', 'none');
		u.addUI(cfg, ui);

		if ( cfg.label ) {
			uiUtils.addLabel(cfg.label)
		}

		return cfg;
	}

	uiUtils.addDropdown = function addLabel(cfg) {
		cfg = u.cfg.str(cfg, 'text')
		cfg.tag = dv(cfg.tag, 'select');
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var ui = u.tag(cfg.tag)
		ui.html(cfg.text)

		if ( cfg.options ) {
			$.each(cfg.options, function onAddOtpion(k,v) {


				if ( v.value == null ) {
					v = {value:v, text:v}
				}
				console.log('k', v)
				ui.append($('<option>', /*{
				 value: item.value,
				 text: item.text
				 }*/v ));

			})
		}
		//$('<span/>')
		/*if (cfg.width){
		 if ( $.isNumeric(cfg.width) ) {
		 cfg.width = cfg.width+'px';
		 }
		 lbl.css('width', cfg.width);
		 lbl.css('display', 'inline-block');
		 }
		 lbl.css('user-select', 'none');*/
		u.addUI(cfg, ui);
		return cfg;
	}

	uiUtils.addDD = uiUtils.addDropdown

	uiUtils.addNumber = function addNumber(cfg) {
		cfg = u.cfg.str(cfg, 'text')
		cfg.tag = dv(cfg.tag, 'input');
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var lbl = u.tag(cfg.tag)
		lbl.html(cfg.text)
		//$('<span/>')
		/*if (cfg.width){
		 if ( $.isNumeric(cfg.width) ) {
		 cfg.width = cfg.width+'px';
		 }
		 lbl.css('width', cfg.width);
		 lbl.css('display', 'inline-block');
		 }
		 lbl.css('user-select', 'none');*/
		lbl.attr('type', 'number');

		u.addUI(cfg, lbl);
		return cfg;
	}

	uiUtils.addSection = function addSection(fx) {
		fx();
	}
	uiUtils.addLabel = function addLabel(cfg, id) {
		cfg = u.cfg.str(cfg, 'text');
		u.cfg.addToCfg(cfg, 'id', id);
		cfg.tag = dv(cfg.tag, 'span');
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var lbl = u.tag(cfg.tag)
		lbl.html(cfg.text)
		//$('<span/>')
		if (cfg.width){
			if ( $.isNumeric(cfg.width) ) {
				cfg.width = cfg.width+'px';
			}
			lbl.css('width', cfg.width);
			lbl.css('display', 'inline-block');
		}
		lbl.css('user-select', 'none');
		u.addUI(cfg, lbl);
		return cfg;
	}
	uiUtils.addHeadingLabel = function addLabel(cfg) {
		cfg.tag = 'h3'
		uiUtils.addLabel(cfg)
		return cfg;
	}
	uiUtils.addDiv = function addDiv(cfg) {
		cfg = u.cfg.str(cfg, 'id')
		cfg.tag = dv(cfg.tag, 'div');
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var ui = u.tag(cfg.tag)
		ui.html(cfg.text)
		u.addUI(cfg, ui);
		if ( cfg.newBaseContainer ) {
			cfg.lastAddTo = cfg.addTo
			cfg.addTo = ui;
		}
		return cfg;
	}
	uiUtils.changeContainer = function focusOnContainer() {
		uiUtils.flagCfg.lastAddTo = uiUtils.flagCfg.addTo;
		uiUtils.flagCfg.addTo = uiUtils.lastCfg.ui;
		//console.log('adding to', uiUtils.flagCfg.addTo)
	}
	uiUtils.popContainer = function popContainer() {
		uiUtils.flagCfg.addTo = uiUtils.flagCfg.lastAddTo;
	}

	uiUtils.addRow = function addRow(id, fx) {
		uiUtils.addDiv(
			{id:id,
				//width:170
			})
		//uiUtils.addBorder();
		//uiUtils.makeInline();
		uiUtils.changeContainer();
		callIfDefined(fx)
	}
	uiUtils.leaveRow = function leaveRow() {
		uiUtils.popContainer();
	}

	uiUtils.style = function style(prop, val) {
		uiUtils.flagCfg.addTo.css(prop, val)
	}


	p.addTitle =function addtitle(cfg) {
		cfg = u.cfg.str(cfg, 'text')
		cfg.tag = 'div'
		u.addLabel(cfg)
	}

	p.addIcon = function addIcon(iconName) {
		var cfg = {}; //cfg = u.cfg.str(cfg, 'text')
		cfg.tag = 'span'
		var cfg = u.addLabel(cfg)
		var span = cfg.ui;
		span.addClass('glyphicon')
		span.addClass('glyphicon-'+iconName) //+'-circle')
		return cfg
	}

	uiUtils.fxTest = function fxTest() {
		console.log('hello');
	}
	uiUtils.addBorder = function addBorder() {
		uiUtils.lastCfg.ui.css('border', 'solid 1px #f2f2f2')
	}

	uiUtils.makeInline = function makeInline() {
		uiUtils.lastCfg.ui.css('display', 'inline-block')
	}

	function defineScrollable() {
		uiUtils.scrollToBottom = function scrollToBottom(jq) {

			var ui = $(jq)
			//$("body").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 200);
			$(jq).clearQueue();
			$(jq).stop(true, true);
			$(jq).animate({scrollTop: $(jq).prop("scrollHeight")}, 10);
			console.log('scrollto', ui.prop('scrollHeight'), ui.scrollTop() )
		}

		uiUtils.makeScrollable = function makeScrollaboe(div, height) {
			div.css('overflow', 'auto')
			div.css('max-height', height+'px')
			//debugger
		}
	}
	defineScrollable()

	uiUtils.addBtn = function addBtn(cfg, fxD) {
		cfg = u.cfg.str(cfg, 'text')
		cfg.tag = dv(cfg.tag, 'button');
		cfg.fxDone = dv(cfg.fxDone, fxD);
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var btn = u.tag(cfg.tag)
		btn.html(cfg.text)

		//debugger;
		/*
		 if ( cfg.addTo ) {
		 //debugger;
		 cfg.addTo.append(btn)
		 }
		 */

		u.addUI(cfg, btn)

		btn[0].onclick = cfg.fxDone
		if ( cfg.fxClick ) {
			$(btn).on('click', cfg.fxClick)
		}

		if ( cfg.data ){
			btn[0].data = cfg.data
		}

		if ( cfg.addSpacer ) {
			uiUtils.spacer();
		}

		btn.addClass('btn')
		btn.addClass('btn-primary btn-sm')
		//btn.on('click', cfg.fxDone)
	}
	p.addButton = u.addBtn;


	uiUtils.addTextInput = function addTextInput(cfg, fxD) {
		cfg = u.cfg.str(cfg, 'text')
		cfg.tag = dv(cfg.tag, 'input');
		cfg.fxDone = dv(cfg.fxDone, fxD);
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var ui = u.tag(cfg.tag);
		ui.val(cfg.text)

		if ( cfg.id ) {
			ui.attr('id', cfg.id);
		}

		ui.attr('placeholder',cfg.placeholder);
		if ( cfg.onDebounce ) {
			u.onChangeDebounced(ui, cfg.onDebounce)
		}

		//ui.addClass('form-control')
		ui.addClass('input-sm')
		u.addUI(cfg, ui);
		cfg.ui = ui;
		return cfg;
	}

	uiUtils.addSelect = function addSelect(cfg, fxD) {
		cfg = u.cfg.str(cfg, 'text')
		cfg.tag = dv(cfg.tag, 'select');
		cfg.fxDone = dv(cfg.fxDone, fxD);
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var ui = u.tag(cfg.tag)
		ui.html(cfg.text)

		if ( cfg.id ) {
			ui.attr('id', cfg.id);
		}
		ui.on('change', function onChange() {
			console.error('y',  this.value );
		})
		u.addUI(cfg, ui)
	}


	uiUtils.addImage = function addBtn(cfg, id) {
		cfg = u.cfg.str(cfg, 'src')
		u.cfg.addToCfg(cfg, 'id', id);
		cfg.tag = dv(cfg.tag, 'img');
		//cfg.fxDone = dv(cfg.fxDone, fxD);
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);

		var ui = u.tag(cfg.tag)
		ui.attr('src', cfg.src)

		u.addUI(cfg, ui)

		uiUtils.lastUI = ui;
	}

	uiUtils.addClick = function addClick(fxD) {
		uiUtils.lastUI[0].onclick = fxD;
	}
	uiUtils.addTooltip = function addTooltip(title) {
		uiUtils.lastUI.attr('title', title)
	}




	uiUtils.br = function addBr(cfg, fxD) {
		cfg = dv(cfg, {})
		cfg = u.cfg.str(cfg, 'text')
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
		var btn = u.tag('br')
		u.addUI(cfg, btn)
	}

	uiUtils.ws = function ws(cfg, fxD) {
		cfg = dv(cfg, {})
		cfg = u.cfg.str(cfg, 'text')
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
		var ui = u.tag('span')
		ui.html(' ')
		u.addUI(cfg, ui)
	}

	uiUtils.hr = function addBr(cfg, fxD) {
		cfg = dv(cfg, {})
		cfg = u.cfg.str(cfg, 'text')
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
		var btn = u.tag('hr')
		u.addUI(cfg, btn)
	}

	uiUtils.spacer = function spacer(cfg, fxD) {
		cfg = dv(cfg, {})
		cfg = u.cfg.str(cfg, 'text')
		uiUtils.utils.mergeIn(uiUtils.flagCfg, cfg);
		var btn = u.tag('div')
		btn.css('width', '10px')
		btn.css('display', 'inline-block');
		u.addUI(cfg, btn)
	}
	uiUtils.addSpace = uiUtils.spacer;

	uiUtils.disable = function disable(id, fxD) {
		$(id).css('opacity', 0.3);
	}

	uiUtils.enable = function enable(id, fxD) {
		$(id).css('opacity', 1);
	}

	uiUtils.waitFor = function waitFor(id, fxD, count) {
		var ui = $(id)
		if ( ui.length == 0  ) {
			if ( count > 20 ) {
				console.error('timed out')
				throw new Error('timeoud ')
			}
			count += 1;
			setTimeout(uiUtils.waitFor,  250, id, fxD, count)
			return;
		}

		fxD(ui)
	}


	p.cfg = {};
	p.cfg.str = function ifCfgIsStri(cfg, prop) {
		if ( $.isString(cfg) ){
			var _cfg = {};
			_cfg[prop] = cfg;
			cfg = _cfg;
		}
		return cfg;
	};

	p.cfg.addToCfg = function addToCfg(cfg, prop, val) {
		if ( val != null ){
			cfg[prop] = val;
		};
		return cfg;
	}

	p.cfg.fixId = function fixId(cfg, prop) {
		if ( $.isString(cfg.id) ){

			if ( cfg.id.includes('#') == false ) {
				cfg.id = '#'+cfg.id;
			}

		}
		return cfg;
	}
	p.cfg.getId = function fixId(cfg, propId ) {
		if ( $.isString(cfg.id) ){
			cfg = cfg.id;
		}

		if ( $.isString(cfg) ){
			var baseId = cfg;
			var id = baseId;
			if ( baseId.slice(0,1) == '#') {
				id = baseId.slice(1);
			}
		}

		return id;
	}
	p.cfg.getDiv = function fixId(cfg, propId ) {
		if ( $.isString(cfg.id) ){
			cfg = cfg.id;
		}
		var div = $(cfg);
		return div;
	}


	p.addUI = function addUI(cfg, ui ) {
		if (cfg.addSpacerBefore) {
			u.spacer()
		}
		if (cfg.addTo) {
			cfg.addTo.append(ui)
		}
		if (cfg.addSpacerAfter || cfg.addSpaceAfter) {
			u.spacer()
		}

		if (cfg.defaultValue) {
			ui.val(cfg.defaultValue)
		}

		if (cfg.width) {
			if ($.isNumeric(cfg.width)) {
				cfg.width = cfg.width + 'px';
			}
			ui.css('width', cfg.width);
			//lbl.css('display', 'inline-block');
		}

		if ( cfg.id ) {
			cfg.jid = cfg.id;
			ui.attr('id', cfg.id);
			cfg.id = '#'+cfg.id;
		}
		if ( cfg.tooltip ) {
			ui.attr('title', cfg.tooltip)
		}
		cfg.ui = ui;
		u.lastCfg = cfg;
	}
	p.tag = function createTag(type) {
		return $('<'+type+'/>');
	}


	p.lastId = function lastId(type) {
		return u.lastCfg.id;
	}

	function defineBasicMethods() {
		p.enable = function enabled(id) {
			var ui = $(id)
			ui.prop('disabled', false);
		}

		p.disable = function disable(id) {
			var ui = $(id)
			ui.prop('disabled', true);
		}
		p.ifEmpty =function ifEmpty(id, fx) {
			throwIfNull(fx, 'need a function for ' +  id)
			var ui = $(id)
			console.log('txt', ui.text(), ui.html())
			if ( ui.is('input') && ui.val() == '' ) {
				fx(ui)
			}
			if ( ui.text() == '' ) {
				fx(ui)
			}
		}
		p.getTimestamp = function getTimestamp() {
			var d = new Date();
			d = d.toString()
			d = d.split(' GMT')[0]
			d = d.replace(/ /gi, '_');
			d = d.replace(/:/gi, '-');
			d = '_'+d;
			return d;
		}
	}
	defineBasicMethods();

	function defineSetValues() {
		p.setText = function setText(jq, val) {
			var ui = $(jq)
			//console.log('what is ', jq, ui, val)
			if ( ui.length == 0 ) {
				console.warn('cannot set', jq, 'to', val, 'empty query set')
			}
			ui.val(val)
			if ( ui.is('span')) {
				ui.text(val)
			}
		}

		p.clearText = function clearText(delay, jq) {
			throwIfNull(jq, 'need a jquery for delay');
			delay = dv(3)
			setTimeout(
				function clearText(){
					uiUtils.setText(jq, '')
				}
				, delay * 1000)
		}

		p.setHtml = function setHtml(jq, val) {
			var ui = $(jq)
			//console.log('what is ', jq, ui, val)
			if ( ui.length == 0 ) {
				console.warn('cannot set', jq, 'to', val, 'empty query set')
			}
			ui.html(val)
		}
		p.glyph = function addGlyphIcon(iconName, val) {
			var  iconHTML = '<span class="glyphicon glyphicon-'+iconName+'" aria-hidden="true"></span>'
			var icon = $(iconHTML);
			return icon;
		}

		p.setSelect = function setSelect(jq, vals, keyProp, valProp) {
			var ui = $(jq)

			//debugger

			ui.empty();

			$.each(vals, function addVal(k,v) {
				var option = $("<option />")
				if ( $.isString(v)) {
					var val = v;
					var key = v;
				}
				if ( keyProp) {
					key = v[keyProp]
				}

				if ( valProp) {
					val = v[valProp]
				}

				option.val(val)
				option.text(key);
				ui.append(option)

			});
		}


		uiUtils.updateSelect = function updateSelect(id, newOptions) {
			var ui = id;

			if ( $.isString(id)){
				if ( id.includes('#') == false ) {
					id = '#'+id;
				}

				var ui = $(id)
			}

			ui.empty(); // remove old options
			$.each(newOptions, function(key,value) {

				ui.append($("<option></option>")
					.attr("value", value).text(key));
			});

		}

		uiUtils.getVal2 = function getVal2(id, newOptions) {
			var ui = id;
			if ( $.isString(id)){
				if ( id.includes('#') == false ) {
					id = '#'+id;
				}
				var ui = $(id);
			}
			if ( ui.is('span') || ui.is('div')){
				return ui.html();
			}
			return ui.val()
		}




		uiUtils.later = function later(fx, argumentRest) {
			var args = convertArgumentsToArray(arguments)
			args = args.slice(1)
			function calledLater() {
				fx.apply(fx, args)
			}
			setTimeout(calledLater, 500);
		}
		uiUtils.callMethodRepeat = function callMethodRepeat(
			fx, secs, obj, prop, fxDone

		) {
			var cfg = {};
			cfg.fx = fx;
			cfg.secs = secs;
			cfg.obj = obj;
			cfg.prop = prop;
			cfg.fxDone = fxDone;
			cfg.countRepeat = 0;
			function fxRepeatThing(repeat, fxDone) {
				if (cfg.obj && cfg.prop && cfg.obj[cfg.prop] != true) {
					console.warn('done with this task', cfg.fx.name);
					return;
				}
				cfg.countRepeat++;
				if ( cfg.log != null )
					console.info('fxRepeatThing', cfg.log, cfg.fx.name,  cfg.secs);

				if (repeat) {
					setTimeout(fxRepeatThing, cfg.secs * 1000, true)
				}

				fx() //(function onSaved(){
				//console.log('autosaved...')
				//})
			}

			fxRepeatThing(true)

			return cfg;
		}


	}
	defineSetValues();


	function defineClickHandler() {
		p.setupclickListener = function setupclickListener(jq, val) {
			function onKeyDown(e) {
				if (e.keyCode == 16) {
					//alert(e.which + " or Shift was pressed");
					window.shiftKey = true
					console.log('keydown')
				}
			}
			function onKeyUp(e) {
				if (e.keyCode == 16) {
					//alert(e.which + " or Shift was pressed");
					window.shiftKey = false
					console.log('keyup')
				}
			}

			$(document).off('keydown', onKeyDown);
			$(document).off('keyup', onKeyUp);

			$(document).keydown(onKeyDown);
			window.onKeyDown = onKeyDown;

			$(document).keyup(onKeyUp);
			window.onKeyUp = onKeyUp;

		}
		//	p.setupclickListener()
	}
	defineClickHandler();


	p.utils = {};
	p.utils.mergeIn = function mergeIn(a, b, overwriteVals ) {
		if ( a == null ) { return }
		if ( b == null ) { return }
		//function copyProps(from, to) {
		$.each(a, function(k,v){
			var existingVal  = b[k];
			if ( existingVal && overwriteVals != true ) {
				return;
			}
			b[k]=v;
		});
		//	}
	}


	p.utils.addIfDoesStartWith = function addIfDoesStartWith(u, strStrasWith) {
		var charStr = u.slice(0,1);

		if (charStr == strStrasWith) {
			return u
		}

		return strStrasWith+u;
	}

	p.utils.loadScripts = function loadScripts(listScripts, fxDone) {
		var loadScript2 = function loadScript2(_scripts2, preamble) {
			if ( _scripts2.length == 0 ) {
				console.log('finished');
				callIfDefined(fxDone)
				return;
			}
			var url = _scripts2.shift();
			if ( preamble == null ) {
				preamble = '';
			}
			url = preamble + url;
			jQuery.getScript(url)
				.done(function () {
				})
				.always(function doneLoadingFile () {
					loadScript2(_scripts2);
				})
				.fail(function (a,b,c,d) {
					console.error('failed to load', url, a==null,b,c,d);
					console.error(c.stack)
				});
		}

		if ( $.isString(listScripts)) {
			listScripts = [listScripts]
		}
		loadScript2(listScripts)

	}
	p.utils.loadScript = p.utils.loadScripts;



	p.utils.getParams = function getParams() {
		function getQueryObj() {
			var query_string = {};
			//console.debug('search', window.location.search);
			var query = window.location.search.substring(1);
			if ( query == '' && window.location.hash.indexOf('?') != 0 ) {
				query = window.location.hash.split('?')[1];
			}
			if ( query == null ) {
				return {};
			}
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				// If first entry with this name
				if (typeof query_string[pair[0]] === "undefined") {
					query_string[pair[0]] = decodeURIComponent(pair[1]);
					// If second entry with this name
				} else if (typeof query_string[pair[0]] === "string") {
					var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
					query_string[pair[0]] = arr;
					// If third or later entry with this name
				} else {
					query_string[pair[0]].push(decodeURIComponent(pair[1]));
				}
			}
			return query_string;
		};

		var params = getQueryObj();
		self.utils.params = params;
		return params;
	}


	function defineUrlMethods() {
		p.inUrl = function inUrl(dlg) {
			if ( window.location.search.indexOf(dlg)!= -1 ) {
				return true;
			}
			if ( window.location.hash &&
				window.location.hash.indexOf(dlg)!= -1 ) {
				return true;
			}
			return false;
		}

		p.reload = function reload(dlg) {
			window.location.reload();
		}

		p.addToUrl = function addToUrl(key, val) {
			/*
			 1: hash is present
			 2: ? is present ... so parse vars
			 3: var alreayd exists
			 */

			var params = uiUtils.utils.getParams();

			var dbg = false;
			if ( dbg )
				console.debug('addToUrl','params', window.location.hash,
					window.location.search, params)
			if ( params[key] == val.toString() ) {
				return;
			}
			params[key]=val;
			var str = jQuery.param( params );

			var hash = window.location.hash;
			var urlFinal = '';
			urlFinal = location.href
			if ( urlFinal.includes('?')) {
				urlFinal = urlFinal.split('?')[0];
			}
			if ( urlFinal.includes('#')) {
				urlFinal = urlFinal.split('#')[0];
			}
			if ( dbg )
				console.debug('addToUrl', 'start', urlFinal)
			var isEmptyHash = hash.slice(0,2) == '#?';
			if ( dbg )
				console.debug('addToUrl','hash', hash)
			if ( isEmptyHash ) {
				urlFinal +=  ''
			} else if ( hash != ''  ) {
				var hashOnly = hash;
				if ( hashOnly.includes('?')) {
					hashOnly = hashOnly.split('?')[0];
				}
				urlFinal += hashOnly;
			} else {
				urlFinal += '#'//'empty has to prevent reload
			}
			urlFinal += '?'+str;
			document.location = urlFinal
			console.debug('addToUrl', urlFinal, document.location, window.location.search)
		}


		p.getSearch = function getSearchParam() {
			var urlFinal = location.href;
			if ( urlFinal.includes('?') == false ) {
				return null;
			}
			if ( urlFinal.includes('#')) {
				urlFinal = urlFinal.split('#')[1];
			}
			if ( urlFinal.includes('?')) {
				urlFinal = urlFinal.split('?')[1];
			}
			//console.log('getSearch', urlFinal)
			//if ? is before # warn user ...
			return urlFinal;
		}


		p.getHash = function getHash() {
			//why: get has only, not the search 
			var urlFinal = location.href;
			if ( urlFinal.includes('#') == false ) {
				return null;
			}
			//if ( urlFinal.includes('#')) {
			urlFinal = urlFinal.split('#')[1];
			//	}
			if ( urlFinal.includes('?')) {
				urlFinal = urlFinal.split('?')[0];
			}
			// console.log('getHash', urlFinal)
			return urlFinal;
		}


		p.getUrl = function getUrl() {
			var urlFinal = location.href;
			if ( urlFinal.includes('#')) {
				urlFinal = urlFinal.split('#')[0];
			}
			if ( urlFinal.includes('?')) {
				urlFinal = urlFinal.split('?')[0];
			}
			//console.log('getUrl', urlFinal)
			//if ? is before # warn user ...
			return urlFinal;
		}

		p.setHash = function setHash(hash) {
			var  urlX = window.location.href;
			hash = uiUtils.utils.addIfDoesStartWith(hash, '#')
			var url = self.getUrl()
				+hash;
			var search = self.getSearch();
			var params = uiUtils.utils.getParams();
			var str = jQuery.param( params );
			if ( str ) {
				url += '?'+str
			}
			var debug = false;
			if ( debug ) {
				console.error('starting', urlX);
				console.error('setting hash to', hash, url);
			}
			//debugger
			/*if ( self.getSearch() ) {
			 url += '?'+self.getSearch()
			 }*/

			window.location.href = url;
			if ( debug ) {
				console.error('end', window.location.href);
			}

		}


	}
	defineUrlMethods();


	function defineUI() {
		p.utils.loadPage = function loadPage(cfg) {
			var div = $(cfg.div)
			if ( div && div.empty() && cfg.id ) {
				div = u.cfg.getDiv(cfg.id);
			}
			if ( div.length == 0 ){
				throw new Error('could not find area ' + cfg.div);
			}

			$.ajax({
				url: cfg.url,
				datattype: "html",
				//data: data,
				success: function (data) {

					var output = p.utils.parseBodyHTML(data);

					// debugger;
					div.html(output.body.html());

					output.addStyles();

					cfg.ui = div;

					callIfDefined(cfg.fxDone, data)
				},
				error: function (a,b,c) {
					debugger;
					console.error('cannot get loadPage info');
					gUtils.remoteFailed(a,b,c)
				}
			});
		}


		p.utils.parseBodyHTML = function parseBodyHTML(d) {
			// replace the `HTML` tags with `NOTHTML` tags
			// and the `BODY` tags with `NOTBODY` tags
			d = d.replace(/(<\/?)html( .+?)?>/gi,'$1NOTHTML$2>',d);
			d = d.replace(/(<\/?)body( .+?)?>/gi,'$1NOTBODY$2>',d);
			// select the `notbody` tag and log for testing
			//console.log($(d).find('notbody').html())
			var output = {};

			output.raw = d;
			output.jquery = $(d);
			output.body = $(d).find('notbody');
			output.html = $(d).find('nothml');
			output.style = $(d).find('style')

			output.addStyles = function addHtmlTo(div) {
				$('head').append(output.style)
			}

			return output;
		}
	}
	defineUI()

	p.makeUIDict = function makeUIDict(name, why) {
		function UIDict() {
			//why: stores many ui items for action on later
			var self = this;
			var p = this;

			self.data = {};
			self.data.name = name;
			self.data.why = why;
			self.data.data = {};

			p.addUI = function addUI(why, ui) {
				var uiData = {}
				uiData.why = why;
				uiData.ui = ui;
				if (ui == null) {
					uiData.ui = uiUtils.getLastId()
				}
				dict.data.push(uiData)
			}

			p.addUI2 = function addUI2(why, ui) {
				dict.data
			}

			p.getAllUI = function getAllUI() {
				var results = [];
				$.each(self.data, function onAdd(k,v){
					var ui2 = ui.ui;
					if ( $.isString(ui2)){
						ui2 = $(ui2)
					}
					results.push(ui2)
				})

				return results;
			}
		}

		var dict = new UIDict()
		return dict

	}

	p.t = function setTimeoutShorten(){
		var args = convertArgumentsToArray(arguments);
		if ( args.length == 1 )
			args.push(500);
		//debugger
		setTimeout.apply(null, args)
	}


	function defineComparison() {
		p.utils.copyStyles = function copyStyles(from, to) {
			//console.info('copy the thing', from.text())
			var styleList = ['fontFamily', 'fontSize',
				//	'transform',
				'color', 'fontStyle', 'fontWeight']
			$.each(styleList, function copyProp(k,v){
				var val = from.css(v)
				to.css(v, val);
				//console.info('copy prop', v, val)
			})
			var prop = 'origFont';
			to.attr(prop, from.attr(prop))
		}

		p.utils.stylesDifferent = function stylesDifferent(a ,b, dbg) {
			var styleList = ['fontFamily', 'fontSize',
				//	'transform',
				'color', 'fontStyle', 'fontWeight'];
			var equal = true
			$.each(styleList, function copyProp(k,v){
				var val = a.css(v);
				var valB = b.css(v)
				if ( val != valB ){
					equal = false;
					if ( dbg){
						console.info('failed on', v, val, valB, b.text())
						//debugger;
					}
					return false
				}
			})
			var prop = 'origFont';
			var val  =  a.attr(prop);
			var valB =  b.attr(prop);
			//console.info('origFont', prop, val, valB, val != valB)
			if ( equal == true && val != valB ){
				equal = false;
				if ( dbg){
					console.info('failed on origFont', prop, val, valB, b.text());
				}
			}
			return !equal;
		}
	}
	defineComparison();

	function defineUrl() {


		p.getLocation = function getLocation(path , port) {
			if ( path.startsWith('/') == false ) {
				path = '/'+path;
			}
			if ( port == null ) {
				port = ''
			} else {
				port = ':' + port
			}
			var url = 'http://'+ window.location.hostname + port
				+ path;
			return url;
		}
		p.getUrl = function getUrl(url, data, fxDone, fxError) {
			if ( $.isFunction(data) && $.isPlainObject(fxDone)) {
				//criss cross
				var _fxDone = data;
				data = fxDone;
				fxDone = _fxDone;
			}

			if ( $.isFunction(data)) {
				fxDone = data;
			}

			console.log('data', data)

			$.ajax({
				url: url,
				data: data,
				success: function (data) {
					callIfDefined(fxDone, data)
				},
				error: function (a,b,c) {
					console.error(url,'request failed', a,b,c)
					//gUtils.remoteFailed(a,b,c)
					callIfDefined(fxError, a,b,c, url)
				}
			});
		}

		p.postUrl = function getUrl(url, data, fxDone) {
			if ( $.isFunction(data)) {
				fxDone = data;
			}

			$.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function (data) {
					callIfDefined(fxDone, data)
				},
				error: function (a,b,c) {
					console.error('request failed', a,b,c)
					//gUtils.remoteFailed(a,b,c)
				}
			});
		}

		p.openNewWindow = function openNewWindow(url) {
			window.open(url, 'status', "height=200,width=200");

			return;
			var win = window.open(url, '_blank');
			win.focus();
		}
	}
	defineUrl();

	function defineCookies() {
		p.getVal = function getVal(key) {
			var val = localStorage.getItem(key)
			var json = JSON.parse(val);
			return json
		}

		p.setVal = function setVal(key, val) {
			var json = JSON.stringify(val)
			localStorage.setItem(key, json)
		}
	}
	defineCookies();


	function defineFX() {
		u.onChangeDebounced = function onChangeDebounced(jquery, fx, time) {
			if (time == null) time = 500;

			var ui = $(jquery);
			//console.log('sdf', jquery, ui.length);
			if ( ui.length == 0 ) {
				throw new Error(['not found', jquery].join(' '))
			}


			var d = {}
			d.debounce = function debounce(fx) {
				if (d.waiting) {
					clearTimeout(d.waiting)
				}
				//console.log('waiting', fx.name)
				//d.waiting = true;
				d.waiting = setTimeout(function onDebounced() {
					fx(ui.val(), ui)
				}, time)
			}

			ui.keyup(function onKeyUp (e) {

				//console.log('keyup', e)
				d.debounce(fx, time)
				//startWaiting()

			});
		}


		u.debouncer = function debouncer(fx, name, time) {
			//if ( time )
			var d = {}
			d.debounce = function debounce(fx2) {
				if (d.waiting) {
					clearTimeout(d.waiting)
				}
				//console.log('waiting', fx.name)
				//d.waiting = true;
				d.waiting = setTimeout(function onDebounced() {
					if(fx2) {
						fx2();
						return;
					}
					fx()
				}, time)
			}
			return d;
		}

	}

	defineFX();


	function ifHelpers() {
		u.ifFxReplace = function ifFxReplace(potFx, fxShoudlBeNull) {
			if ( $.isFunction(potFx) && fxShoudlBeNull ) {
				return potFx;
			}
			return fxShoudlBeNull;
		}
	}
	ifHelpers()


	p.fadeInOnHover = function fadeInOnHover(ui) {
		$(ui).css('opacity', 0.0)
		$(ui).hover(
			function onHover() {
				$(ui).animate({
					opacity:1
				}, 300);
				//console.log('fade in')
			},
			function onHoverOut() {
				$(ui).animate({
					opacity: 0.0
				}, 300);
			}
		);
	}
	function defineLookAt() {
		var gUtils = uiUtils
		gUtils.setLocationHash = function setLocationHash(newHashVal) {
			setTimeout(function setLocationLater(){
				//window.location.hash = e;// '#listDialog';
				uiUtils.setHash(newHashVal);
			}, 0);
		}
		gUtils.setFocus = function setFocus(e) {
			setTimeout(function setFocus(){
				$(e).focus();
			}, 0);
		}
		gUtils.hide = function hide(jq) {
			$(jq).hide()
		}
		gUtils.show = function show(jq) {
			$(jq).show()
		}
		gUtils.ifShow = function show(exp, jq) {
			if ( exp ) {
				//console.error('addi', exp, 'show')
				$(jq).show();
			} else {
				//	console.error('addi', exp, 'hide')
				$(jq).hide();
			}
		}
		gUtils.ifHide = function ifExpIsTrueHide(exp, jq) {
			gUtils.ifShow(!exp,jq);
		}
		gUtils.off = function off(jq) {
			$(jq).off()
		}
		gUtils.offChildren = function offChildren(jq) {
			$(jq).off()
			$(jq).find('*').off()
		}

		gUtils.addToken = function addToken(jq) {
			if ( jq == null ){ return }
			var uiHolder = $(jq);
			uiHolder.html('');
			var token = uiUtils.tag('span');
			token.attr('id', uiHolder.attr('id')+'Token');
			uiHolder.append(token);
		}

		gUtils.lorem = function lorem() {
			var times = 150
			var txt = ''
			var things = ['Rock', 'Paper', 'Scissor'];
			for (var i = 0; i < times; i++) {
				var word = things[Math.floor(Math.random() * things.length)];
				txt += word + ' ';
			}
			return txt;
		}


		gUtils.onEnter = function onenter(jquery, fx) {
			$(jquery).keypress(function (e) {
				if (e.which == 13) {//Enter key pressed
					fx();
				}
			});
		}
		gUtils.onClick = function onClick(jquery, fx, gY) {

			throwIfNull(fx, 'need a function for ' +  jquery)
			throwIfNull(jquery, 'need a jquery for ' +  jquery, fx.name)
			$(jquery).click(function onClick(e) {
				fx();
			});
		}
		gUtils.makeBtn = function onClick(jquery, tooltip) {
			$(jquery).attr('title', tooltip);
			$(jquery).css('cursor', 'pointer')
		}
	}
	defineLookAt();



	function defineSockets() {
		uiUtils.socket = {};
		uiUtils.socket.dict = {};
		uiUtils.socket.nextEmit = function nextEmit(t) {
			uiUtils.socket.nextEmitter = t;
		}

		uiUtils.socket.emit = function emit(msg, data, fxDone) {
			self.data.socket.emit(msg, data)
			var key = null;
			if (key == null && uiUtils.socket.nextEmitter != null) {
				key = uiUtils.socket.nextEmitter
			}
			var existingListener = uiUtils.socket.dict[key];
			if (existingListener != null) {
				console.warn('u already set this ...')
				return; //skip ...
			}
			uiUtils.socket.dict[key] = fxDone;
			self.data.socket.on(data.cmd + '_results', function _onResults(msg) {
				console.log('msg', msg);
				fxDone(msg)

			})

		}


		uiUtils.socket.addListener = function addListener(type, fxDone, retryCount) {
			if ( self.data.socket == null ) {
				if ( retryCount == null ) { retryCount = 0; }
				if ( retryCount > 10 ) { console.error('failed to ', this.name, type, fxDone)}
				setTimeout(function onRetry() {
					retryCount++
					addListener(type, fxDone, retryCount)
				}, 500);
				return;
			}
			self.data.socket.on(type, function _onResults(data) {
				//console.log('msg', msg);
				fxDone(data)

			})

		}



		uiUtils.socket.upgradeSocket = function upgradeSocket(socket) {
			socket.emit2 = function emit(msg, data, fxDone) {
				socket.emit(msg, data)
				var key = null;
				if (key == null && uiUtils.socket.nextEmitter != null) {
					key = uiUtils.socket.nextEmitter
				}
				var existingListener = uiUtils.socket.dict[key];
				if (existingListener != null) {
					console.warn('u already set this ...')
					return; //skip ...
				}


				//debugger
				uiUtils.socket.dict[key] = fxDone;
				socket.on(data.cmd + '_results', function _onResults(msg) {
					console.log('msg', msg);
					fxDone(msg)

				})

			}

			socket.addListener2 = function addListener(type, fxDone, retryCount) {
				if ( socket == null ) {
					if ( retryCount == null ) { retryCount = 0; }
					if ( retryCount > 10 ) { console.error('failed to ', this.name, type, fxDone)}
					setTimeout(function onRetry() {
						retryCount++
						addListener(type, fxDone, retryCount)
					}, 500);
					return;
				}
				socket.on(type, function _onResults(data) {
					//console.log('msg', msg);
					fxDone(data)

				})

			}


			uiUtils.waitForComp = function waitForComp(id, fx, args) {
				var args = convertArgumentsToArray(args);
				ui = $(id)
				console.log('waitforcomp')
				if ( ui.length == 0 ) {
					setTimeout(function onRetry() {
						console.log('onRetry')
						//retryCount++
						//addListener(type, fxDone, retryCount)
						forwardArgsTo(fx, args);
					}, 500);
					console.log('ui.length')
					return true
				}
				console.log('waitForComp')
				return false
			}


			socket.listenForStatus = function listenForStatus(divId, fxDone, retryCount, type) {
				var h = {};

				divId = '#'+divId
				var ui = $(divId)

				if ( uiUtils.waitForComp(divId, socket.asdf, arguments) ) {
					console.log('block')
					return;
				}

				console.log('ok.l')
				var msg = u.tag('ui')
				msg.attr('id', 'messages')
				ui.append(msg)

				uiUtils.makeScrollable(ui, 35)


				console.log('listening to', socket)
				socket.on('updateStatus', function onRecieveStatusMsg(data){
					/*if (msg.indexOf('eval-')==0) {
					 msg = msg.replace('eval-', '')
					 eval(msg);
					 }*/

					var scrollContainer = $(divId)
					var ui = scrollContainer.find('#messages')
					var li = $('<li>').text(data.msg)
					ui.append(li);
					console.log('chat', data, li, ui)
					uiUtils.scrollToBottom(scrollContainer);
				});

			}
		}
	}

	defineSockets();

}

defineUtils();


window.restartTest = function restartTest() {
	window.location.href =
		'http://localhost:33031/index.html#?loadTestFramework=true&dialogSearchTests=true&testName=rSmoke&runTest=true'
	setTimeout(function onReload() {
		window.location.reload();
	}, 50);
}