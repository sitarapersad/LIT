/*
jQWidgets v4.5.2 (2017-May)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(a){"use strict";a.jqx.jqxWidget("jqxTextArea","",{}),a.extend(a.jqx._jqxTextArea.prototype,{defineInstance:function(){var b=this,c={disabled:!1,filter:b._filter,sort:b._sort,highlight:b._highlight,dropDownWidth:null,renderer:b._renderer,opened:!1,$popup:document.createElement("ul"),source:[],roundedCorners:!0,searchMode:"default",placeHolder:"",width:null,height:null,rtl:!1,displayMember:"",valueMember:"",popupZIndex:2e4,items:8,minLength:1,maxLength:null,scrollBarSize:a.jqx.utilities.scrollBarSize,query:"",changeType:null,events:["change","select","open","close"]};return this===a.jqx._jqxTextArea.prototype?c:(a.extend(!0,b,c),c)},createInstance:function(){var b=this;b._textareaWidthFix=0,a.jqx.browser.chrome?b._textareaWidthFix=6:a.jqx.browser.msie&&(b._textareaWidthFix=3),document.body.contains(b.element)===!1&&(b._notInDOM=!0),b._popupHelper=a(b.$popup),b.render(),b.isInitialized=!0},render:function(){var b=this;if(b.isInitialized===!0)return void b.refresh();15!==a.jqx.utilities.scrollBarSize&&(b.scrollBarSize=a.jqx.utilities.scrollBarSize);var c=document.createElement("div");c.style.overflow="hidden",c.style.width="100%",c.style.height="100%",c.style.backgroundColor="transparent",c.style["-webkit-appearance"]="none",c.style.outline="none",c.style.align="left",c.style.border="0px",c.style.padding="0px",c.style.margin="0px",c.style.left="0px",c.style.top="0px",c.style.valign="top",c.style.position="relative";var d=document.createElement("div");if(d.style.align="left",d.style.valign="top",d.style.left="0px",d.style.top="0px",d.style.position="absolute",b._baseHost=b.host,a.jqx.utilities.resize(b._baseHost,function(){return b._notInDOM?(b._notInDOM=!1,void("textarea"===b.element.nodeName.toLowerCase()&&(b.isInitialized=!1,b.render()))):void(b._ttimer=setTimeout(function(){b.textarea.style.width="",b._arrange()},100))},!1,!0),"div"===b.element.tagName.toLowerCase()){b.element.appendChild(c);var e=document.createElement("textarea");e.className=b.toThemeProperty("jqx-text-area-element"),b.textarea=e,c.appendChild(e),c.appendChild(d),b.wrapper=b.element}else if("textarea"===b.element.tagName.toLowerCase()){if(b._notInDOM)return;b.textarea=b.element;var f=document.createElement("div");b.element.parentNode.insertBefore(f,b.element),f.appendChild(c),c.appendChild(b.element),c.appendChild(d);var g=b.host.data();b.host=a(f),b.host.data(g),f.style.cssText=b.element.style.cssText,b.element.style.cssText="",b.element.className=b.toThemeProperty("jqx-text-area-element"),b.wrapper=f,f.setAttribute("id",b.element.id),b.element=f,b.textarea.setAttribute("id",b.element.id+"TextArea")}var h=b.host;if(b._addClasses(),!h.jqxButton)throw new Error("jqxTextArea: Missing reference to jqxbuttons.js.");if(!h.jqxScrollBar)throw new Error("jqxTextArea: Missing reference to jqxscrollbar.js.");null===b.width&&b.element.style&&null!==b.element.style.width&&(b.width=b.element.style.width),null===b.height&&b.element.style&&null!==b.element.style.height&&(b.height=b.element.style.height),b._setSize(),b.vScrollBar=a(d),b.vScrollBar.jqxScrollBar({vertical:!0,width:15,height:"100%",max:b.height,theme:b.theme}),""===a.trim(b.textarea.value)&&(b.textarea.value=""),b.textarea.setAttribute("placeholder",b.placeHolder),null!==b.maxLength&&b.textarea.setAttribute("maxlength",b.maxLength),a.jqx.browser.msie&&a.jqx.browser.version<10&&""===b.textarea.value&&(b.textarea.value=b.placeHolder),(b.source instanceof Array&&b.source.length||b.source._source||a.isFunction(b.source))&&(b._oldsource=b.source,b._updateSource(),b._addPopupClasses(),a.jqx.aria(b,"aria-haspopup",!0)),b._arrange(),b._addHandlers()},refresh:function(a){if(a!==!0){var b=this;b._setSize(),b._arrange(),b._removeHandlers(),b._addHandlers(),b.opened===!0&&b.open()}},_arrange:function(){var a=this,b=a.textarea,c=b.scrollHeight-a._height(b),d=Math.max(0,c);a.vScrollBar.jqxScrollBar({max:d,value:b.scrollTop}),c<5?(b.style.width=this._toPx(a._width(a.element)),a.vScrollBar[0].style.visibility="hidden"):(b.style.width=this._toPx(a._width(a.element)-a.scrollBarSize-a._textareaWidthFix),a.vScrollBar[0].style.visibility="visible",a._arrangeScrollbars(a.scrollBarSize))},val:function(b){var c,d=this,e=d.textarea,f=e.value;if(a.jqx.browser.msie&&a.jqx.browser.version<10&&f===d.placeHolder&&(f=""),0===arguments.length||"object"==typeof b&&a.isEmptyObject(b)===!0)return""!==d.displayMember&&""!==d.valueMember&&d.selectedItem?""===f?"":d.selectedItem:f;if(b&&b.label){if(d.selectedItem&&b.label===d.selectedItem.label&&b.value===d.selectedItem.value)return b.label;d.selectedItem={label:b.label,value:b.value},d.element.setAttribute("data-value",b.value),d.element.setAttribute("data-label",b.label),e.value=b.label,c=b.label}else{if(f===b)return b;e.value=b,d.element.setAttribute("data-value",b),d.element.setAttribute("data-label",b),c=b}return d._arrange(),d._raiseEvent("0"),c},focus:function(){this.textarea.focus()},selectAll:function(){var a=this.textarea;setTimeout(function(){if("selectionStart"in a)a.focus(),a.setSelectionRange(0,a.value.length);else{var b=a.createTextRange();b.collapse(!0),b.moveEnd("character",a.value.length),b.moveStart("character",0),b.select()}},10)},_arrangeScrollbars:function(a){var b=this,c=b._width(b.element),d=b._height(b.element),e=b.vScrollBar,f=e[0],g="hidden"!==f.style.visibility,h=2,i=2;e.jqxScrollBar({width:a,height:parseInt(d,10)-h}),f.style.left=c-a-h-i+"px",f.style.top="0px";var j=b._width(b.element)-b.vScrollBar.outerWidth();if(b.rtl){f.style.left="0px";var k=g?parseInt(a,10)+3+"px":0;b.textarea.style.paddingLeft=b._toPx(k),b.textarea.style.width=b._toPx(j-4)}else"hidden"!==e.css("visibility")&&(b.textarea.style.width=this._toPx(j-b._textareaWidthFix));e.jqxScrollBar("refresh")},destroy:function(){var a=this;a._popupHelper.remove(),a.vScrollBar.jqxScrollBar("destroy"),a._removeHandlers(),a.host.remove()},propertiesChangedHandler:function(a,b,c){c&&c.width&&c.height&&2==Object.keys(c).length&&(a.element.style.width=a._toPx(a.width),a.element.style.height=a._toPx(a.height),a._arrange())},propertyChangedHandler:function(b,c,d,e){if(void 0!==b.isInitialized&&b.isInitialized!==!1&&!(b.batchUpdate&&b.batchUpdate.width&&b.batchUpdate.height&&2==Object.keys(b.batchUpdate).length)&&e!==d)switch(c){case"theme":b.vScrollBar.jqxScrollBar({theme:b.theme});break;case"width":case"height":b.element.style[c]=b._toPx(e),b._arrange();break;case"source":b._oldsource=e,b._updateSource();break;case"displayMember":case"valueMember":b.source=b._oldsource,b._updateSource();break;case"opened":e===!0?b.open():b.close();break;case"maxLength":b.textarea.setAttribute("maxlength",e);break;case"placeHolder":b.textarea.setAttribute("placeholder",e),a.jqx.browser.msie&&a.jqx.browser.version<10&&b.textarea.value===d&&(b.textarea.value=e);break;case"scrollBarSize":b._arrange();break;case"dropDownWidth":b.$popup.style.width=b._toPx(e);break;case"roundedCorners":e===!0?(b.element.className+=" "+b.toThemeProperty("jqx-rc-all"),b.$popup.className+=" "+b.toThemeProperty("jqx-rc-all")):(b.host.removeClass(b.toThemeProperty("jqx-rc-all")),b._popupHelper.removeClass(b.toThemeProperty("jqx-rc-all")));break;case"disabled":b.vScrollBar.jqxScrollBar({disabled:e}),e===!0?(b.element.className+=" "+b.toThemeProperty("jqx-fill-state-disabled"),b.textarea.setAttribute("disabled","disabled")):(b.host.removeClass(b.toThemeProperty("jqx-fill-state-disabled")),b.textarea.removeAttribute("disabled")),a.jqx.aria(b,"aria-disabled",e);break;case"rtl":e===!0?b.textarea.className+=" "+b.toThemeProperty("jqx-text-area-element-rtl"):a(b.textarea).removeClass(b.toThemeProperty("jqx-text-area-element-rtl")),b._arrange();break;default:b.refresh()}},_raiseEvent:function(b,c){var d=this;void 0===c&&(c={owner:null});var e=d.events[b];c.owner=d;var f=new a.Event(e);f.owner=d,0===b&&(c.type=this.changeType,this.changeType=null),f.args=c,f.preventDefault&&f.preventDefault();var g;g="change"===e||"div"===d._baseHost[0].tagName.toLowerCase()?d.host:d._baseHost;var h=g.trigger(f);return h},_addHandlers:function(){var b=this,c=b.element.id,d=b.host,e=b.textarea,f=a.jqx.browser.mozilla?"wheel":"mousewheel";b.addHandler(d,f+".jqxTextArea"+c,function(a){b.wheel(a,b)}),b.addHandler(d,"mouseenter.jqxTextArea"+c,function(){b.focused=!0}),b.addHandler(d,"mouseleave.jqxTextArea"+c,function(){b.focused=!1}),b.addHandler(d,"focus.jqxTextArea"+c,function(){b.focused=!0}),b.addHandler(d,"blur.jqxTextArea"+c,function(){b.focused=!1}),b.addHandler(b.wrapper,"scroll.jqxTextArea"+c,function(){0!==b.wrapper.scrollTop&&(b.wrapper.scrollTop=0),0!==b.wrapper.scrollLeft&&(b.wrapper.scrollLeft=0)}),b.addHandler(e,"change.jqxTextArea"+c,function(a){a.stopPropagation(),a.preventDefault(),b._arrange(),b._raiseEvent("0")}),b.addHandler(e,"select.jqxTextArea"+c,function(a){a.stopPropagation(),a.preventDefault()}),b.addHandler(e,"scroll.jqxTextArea"+c,function(){var a=Math.max(0,e.scrollHeight-b._height(e));b.vScrollBar.jqxScrollBar({max:a,value:e.scrollTop})}),b.addHandler(e,"focus.jqxTextArea"+c,function(){b.element.className+=" "+b.toThemeProperty("jqx-fill-state-focus"),a.jqx.browser.msie&&a.jqx.browser.version<10&&e.value===b.placeHolder&&(e.value="")}),b.addHandler(e,"blur.jqxTextArea"+c,function(){if(b.host.removeClass(b.toThemeProperty("jqx-fill-state-focus")),a.jqx.browser.msie&&a.jqx.browser.version<10){var c=b.textarea.value;""===c?b.textarea.value=b.placeHolder:null!==b.maxLength&&c.length>b.maxLength&&(b.textarea.value=c.substr(0,b.maxLength))}}),b.addHandler(e,"keydown.jqxTextArea"+c,function(c){b._suppressKeyPressRepeat=~a.inArray(c.keyCode,[40,38,9,13,27]),b.changeType="keyboard",b._move(c)}),b.addHandler(e,"keypress.jqxTextArea"+c,function(c){return!(null!==b.maxLength&&a.jqx.browser.msie&&a.jqx.browser.version<10&&e.value.length>b.maxLength)&&void(b._suppressKeyPressRepeat||b._move(c))}),b.addHandler(e,"keyup.jqxTextArea"+c,function(a){switch(a.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!b.opened)return;b._select();break;case 27:if(!b.opened)return;b.close();break;default:b.timer&&clearTimeout(b.timer),b.timer=setTimeout(function(){b._suggest()},300)}a.preventDefault(),b._arrange()}),b.addHandler(b.vScrollBar,"valueChanged.jqxTextArea"+c,function(a){e.scrollTop=a.currentValue}),b.addHandler(b.$popup,"mousedown.jqxTextArea"+c,function(a){a.stopPropagation(),a.preventDefault(),b.changeType="mouse",b._select()})},_removeHandlers:function(){var b=this,c=b.element.id,d=b.host,e=b.textarea;a.jqx.utilities.resize(b._baseHost,null,!0),b.removeHandler(d,"mousewheel.jqxTextArea"+c),b.removeHandler(d,"mouseenter.jqxTextArea"+c),b.removeHandler(d,"mouseleave.jqxTextArea"+c),b.removeHandler(d,"focus.jqxTextArea"+c),b.removeHandler(d,"blur.jqxTextArea"+c),b.removeHandler(b.wrapper,"scroll.jqxTextArea"+c),b.removeHandler(e,"change.jqxTextArea"+c),b.removeHandler(e,"select.jqxTextArea"+c),b.removeHandler(e,"scroll.jqxTextArea"+c),b.removeHandler(e,"focus.jqxTextArea"+c),b.removeHandler(e,"blur.jqxTextArea"+c),b.removeHandler(e,"keydown.jqxTextArea"+c),b.removeHandler(e,"keypress.jqxTextArea"+c),b.removeHandler(e,"keyup.jqxTextArea"+c),b.removeHandler(b.vScrollBar,"valueChanged.jqxTextArea"+c),b.removeHandler(b.$popup,"mousedown.jqxTextArea"+c)},_itemHandler:function(b){a(this._find("jqx-fill-state-pressed",this._popupHelper)).removeClass(this.toThemeProperty("jqx-fill-state-pressed")),b.currentTarget.className+=" "+this.toThemeProperty("jqx-fill-state-pressed")},wheel:function(b,c){var d=0;if(b.originalEvent&&a.jqx.browser.msie&&b.originalEvent.wheelDelta&&(d=b.originalEvent.wheelDelta/120),b||(b=window.event),b.wheelDelta?d=b.wheelDelta/120:b.detail?d=-b.detail/3:b.originalEvent.wheelDelta?d=b.originalEvent.wheelDelta/120:b.originalEvent.detail?d=-b.originalEvent.detail/3:b.originalEvent.deltaY&&(d=-b.originalEvent.deltaY/3),d){var e=c._handleDelta(d);return e||b.preventDefault&&b.preventDefault(),!e&&e}b.preventDefault&&b.preventDefault(),b.returnValue=!1},_handleDelta:function(a){var b=this,c=b.vScrollBar.jqxScrollBar("getInstance");if(b.focused){var d=c.value;a<0?b.scrollDown():b.scrollUp();var e=c.value;if(d!==e)return!1}return!0},scrollDown:function(){var a=this;if("hidden"===a.vScrollBar.css("visibility"))return!1;var b=a.vScrollBar.jqxScrollBar("getInstance"),c=Math.min(b.value+b.largestep,b.max);return b.setPosition(c),a._arrange(),!0},scrollUp:function(){var a=this;if("hidden"===a.vScrollBar.css("visibility"))return!1;var b=a.vScrollBar.jqxScrollBar("getInstance"),c=Math.max(b.value-b.largestep,b.min);return b.setPosition(c),a._arrange(),!0},_setSize:function(){var a=this;a.element.style.width=a._toPx(a.width),a.element.style.height=a._toPx(a.height)},_addClasses:function(){var b=this,c="jqx-panel jqx-widget jqx-widget-content jqx-text-area";b.textarea.className+=" "+b.toThemeProperty("jqx-widget jqx-widget-content"),b.roundedCorners===!0&&(c+=" jqx-rc-all"),b.disabled===!0?(c+=" jqx-fill-state-disabled",b.textarea.setAttribute("disabled","disabled"),a.jqx.aria(b,"aria-disabled",!0)):a.jqx.aria(b,"aria-disabled",!1),b.rtl===!0&&(b.textarea.className+=" "+b.toThemeProperty("jqx-text-area-element-rtl")),b.element.className+=" "+b.toThemeProperty(c)},_addPopupClasses:function(){var b=this,c="jqx-popup jqx-input-popup jqx-menu jqx-menu-vertical jqx-menu-dropdown jqx-widget jqx-widget-content";a.jqx.browser.msie&&(c+=" jqx-noshadow"),b.roundedCorners&&(c+=" jqx-rc-all"),b.$popup.className+=" "+b.toThemeProperty(c)},_updateSource:function(){var b=this,c=function(a){if(void 0===a)return null;if("string"==typeof a||a instanceof String)return{label:a,value:a};if("string"!=typeof a&&a instanceof String==!1){var c="",d="";return""!==b.displayMember&&void 0!==b.displayMember&&a[b.displayMember]&&(c=a[b.displayMember]),""!==b.valueMember&&void 0!==b.valueMember&&(d=a[b.valueMember]),""===c&&(c=a.label),""===d&&(d=a.value),{label:c,value:d}}return a},d=function(a){for(var b=[],d=0;d<a.length;d++)b[d]=c(a[d]);return b};if(this.source&&this.source._source){if(this.adapter=this.source,null!=this.adapter._source.localdata)this.adapter.unbindBindingUpdate(this.element.id),this.adapter.bindBindingUpdate(this.element.id,function(){b.source=d(b.adapter.records)});else{var e={};this.adapter._options.data?a.extend(b.adapter._options.data,e):(this.source._source.data&&a.extend(e,this.source._source.data),this.adapter._options.data=e),this.adapter.unbindDownloadComplete(this.element.id),this.adapter.bindDownloadComplete(this.element.id,function(){b.source=d(b.adapter.records)})}return void this.source.dataBind()}a.isFunction(this.source)||(this.source=d(this.source))},open:function(){if(!a.jqx.isHidden(this.host)){var b=a.extend({},this.host.coord(!0),{height:this.element.offsetHeight});if(this.$popup.parentNode!==document.body){var c=this.element.id+"_popup";this.$popup.id=c,a.jqx.aria(this,"aria-owns",c),document.body.appendChild(this.$popup)}this.$popup.style.position="absolute",this.$popup.style.zIndex=this.popupZIndex,this.$popup.style.top=this._toPx(b.top+b.height),this.$popup.style.left=this._toPx(b.left),this.$popup.style.display="block";var d=0,e=this._popupHelper.children();return a.each(e,function(){d+=a(this).outerHeight()+1}),this.$popup.style.height=this._toPx(d),this.opened=!0,this._raiseEvent("2",{popup:this.$popup}),a.jqx.aria(this,"aria-expanded",!0),this}},close:function(){return this.$popup.style.display="none",this.opened=!1,this._raiseEvent("3",{popup:this.$popup}),a.jqx.aria(this,"aria-expanded",!1),this},_suggest:function(){var b,c=this;return c.query=c.textarea.value,!c.query||c.query.length<c.minLength?c.opened?c.close():c:(b=a.isFunction(c.source)?c.source(c.query,a.proxy(c._load,this)):c.source,b?c._load(b):c)},_load:function(b){var c=this;return b=a.grep(b,function(a){return c.filter(a)}),b=c.sort(b),b.length?c._render(b.slice(0,c.items)).open():c.opened?c.close():c},_filter:function(b){var c=this,d=c.query,e=b;switch(void 0!==b.label?e=b.label:c.displayMember&&(e=b[c.displayMember]),c.searchMode){case"none":break;case"contains":return a.jqx.string.contains(e,d);case"equals":return a.jqx.string.equals(e,d);case"equalsignorecase":return a.jqx.string.equalsIgnoreCase(e,d);case"startswith":return a.jqx.string.startsWith(e,d);case"startswithignorecase":return a.jqx.string.startsWithIgnoreCase(e,d);case"endswith":return a.jqx.string.endsWith(e,d);case"endswithignorecase":return a.jqx.string.endsWithIgnoreCase(e,d);default:return a.jqx.string.containsIgnoreCase(e,d)}},_sort:function(a){for(var b=this,c=[],d=[],e=[],f=0;f<a.length;f++){var g=a[f],h=g;g.label?h=g.label:b.displayMember&&(h=g[b.displayMember]),0===h.toString().toLowerCase().indexOf(b.query.toString().toLowerCase())?c.push(g):h.toString().indexOf(b.query)>=0?d.push(g):h.toString().toLowerCase().indexOf(b.query.toString().toLowerCase())>=0&&e.push(g)}return c.concat(d,e)},_render:function(b){var c=this,d=c._popupHelper.children();if(d.length>0)for(var e=0;e<d.length;e++)a(d[e]).remove();var f=function(a,b){var d,e,f=a,g=document.createElement("li"),h=document.createElement("a");h.setAttribute("href","#"),g.appendChild(h),void 0!==a.value&&null!==a.value?void 0!==a.label&&null!==a.label?(d=a.label,e=a.value):(d=a.value,e=a.value):void 0!==a.label&&null!==a.label?(d=a.label,e=a.label):void 0!==c.displayMember&&""!==c.displayMember?(d=a[c.displayMember],e=a[c.valueMember]):(d=a,e=a),g.setAttribute("data-value",e),g.setAttribute("data-name",d),a.label?f=a.label:c.displayMember&&(f=a[c.displayMember]),h.innerHTML=c.highlight(f);var i="";c.rtl&&(i=" jqx-rtl"),0===b&&(i+=" jqx-fill-state-pressed"),g.className=c.toThemeProperty("jqx-item jqx-menu-item jqx-rc-all"+i),c.$popup.appendChild(g),c.addHandler(g,"mouseenter",function(a){c._itemHandler(a)})},g=function(a){for(var b=0;b<a.length;b++)f(a[b],b)};return g(b),this.dropDownWidth?this.$popup.style.width=c._toPx(c.dropDownWidth):this.$popup.style.width=c._toPx(c.element.offsetWidth-6),this},_highlight:function(a){var b=this.query;b=b.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var c=new RegExp("("+b+")","ig");return a.replace(c,function(a,b){return"<b>"+b+"</b>"})},_select:function(){var a=this._find("jqx-fill-state-pressed",this._popupHelper),b=a.getAttribute("data-value"),c=a.getAttribute("data-name");return this.textarea.value=this.renderer(c,this.textarea.value),this.selectedItem={label:c,value:b},this.element.setAttribute("data-value",b),this.element.setAttribute("data-label",c),this._raiseEvent("1",{item:{label:c,value:b}}),this._arrange(),this.textarea.scrollTop=this.textarea.scrollHeight,this._raiseEvent("0"),this.close()},_renderer:function(a){return a},_move:function(a){var b=this;if(b.opened){switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.shiftKey||(a.preventDefault(),b._prev());break;case 40:a.shiftKey||(a.preventDefault(),b._next())}a.stopPropagation()}},_next:function(){var b=this._find("jqx-fill-state-pressed",this._popupHelper),c=b.nextSibling;a(b).removeClass(this.toThemeProperty("jqx-fill-state-pressed")),c||(c=this.$popup.firstChild),c.className+=" "+this.toThemeProperty("jqx-fill-state-pressed")},_prev:function(){var b=this._find("jqx-fill-state-pressed",this._popupHelper),c=b.previousSibling;a(b).removeClass(this.toThemeProperty("jqx-fill-state-pressed")),c||(c=this.$popup.lastChild),c.className+=" "+this.toThemeProperty("jqx-fill-state-pressed")},_toPx:function(a){return"number"==typeof a?a+"px":a},_find:function(a,b){for(var c=b.children(),d=0;d<c.length;d++){var e=c[d];if(e.className.indexOf(a)!==-1)return e}},_width:function(b){var c=a(b),d=c.css("border-left-width"),e=c.css("border-right-width"),f=parseInt(c.css("padding-left"),10),g=parseInt(c.css("padding-right"),10);d=d.indexOf("px")===-1?1:parseInt(d,10),e=e.indexOf("px")===-1?1:parseInt(e,10);var h=b.offsetWidth-(d+e+f+g);return h>0?h:""},_height:function(b){var c=a(b),d=c.css("border-top-width"),e=c.css("border-bottom-width"),f=parseInt(c.css("padding-top"),10),g=parseInt(c.css("padding-bottom"),10);d=d.indexOf("px")===-1?1:parseInt(d,10),e=e.indexOf("px")===-1?1:parseInt(e,10);var h=b.offsetHeight-(d+e+f+g);return h>0?h:""}})}(jqxBaseFramework);

