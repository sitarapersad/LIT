/*
jQWidgets v4.5.2 (2017-May)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
!function(a){a.jqx.jqxWidget("jqxTreeGrid","jqxDataTable",{}),a.extend(a.jqx._jqxTreeGrid.prototype,{defineInstance:function(){this.base&&(this.base.treeGrid=this,this.base.exportSettings={recordsInView:!1,columnsHeader:!0,hiddenColumns:!1,serverURL:null,characterSet:null,collapsedRecords:!1,fileName:"jqxTreeGrid"});var b={pageSizeMode:"default",checkboxes:!1,hierarchicalCheckboxes:!1,icons:!1,showSubAggregates:!1,rowDetailsRenderer:null,virtualModeCreateRecords:null,virtualModeRecordCreating:null,loadingFailed:!1};return this===a.jqx._jqxTreeGrid.prototype?b:(a.extend(!0,this,b),b)},createInstance:function(a){this.theme=this.base.theme},deleteRow:function(a){var b=this.base;b.deleterowbykey(a)},updateRow:function(a,b){var c=this.base;c.updaterowbykey(a,b)},setCellValue:function(a,b,c){var d=this.base;d.setCellValueByKey(a,b,c)},getCellValue:function(a,b){var c=this.base;return c.getCellValueByKey(a,b)},lockRow:function(a){var b=this.base;b.lockrowbykey(a)},unlockRow:function(a){var b=this.base;b.unlockrowbykey(a)},selectRow:function(a){var b=this.base;b.selectrowbykey(a)},unselectRow:function(a){var b=this.base;b.unselectrowbykey(a)},ensureRowVisible:function(a){var b=this.base;b.ensurerowvisiblebykey(a)},beginCellEdit:function(a,b){var c=this.base,d=c.getColumn(b);c.beginroweditbykey(a,d)},beginRowEdit:function(a){var b=this.base;b.beginroweditbykey(a)},endCellEdit:function(a,b,c){var d=this.base;d.endroweditbykey(a,c)},endRowEdit:function(a,b){var c=this.base;c.endroweditbykey(a,b)},_showLoadElement:function(){var b=this.base;"block"==b.host.css("display")&&b.autoShowLoadElement&&(a(b.dataloadelement).css("visibility","visible"),a(b.dataloadelement).css("display","block"),b.dataloadelement.width(b.host.width()),b.dataloadelement.height(b.host.height()))},_hideLoadElement:function(){var b=this.base;"block"==b.host.css("display")&&b.autoShowLoadElement&&(a(b.dataloadelement).css("visibility","hidden"),a(b.dataloadelement).css("display","none"),b.dataloadelement.width(b.host.width()),b.dataloadelement.height(b.host.height()))},getKey:function(a){if(a)return a.uid},getRows:function(){var a=this.base;return a.source.hierarchy&&0!=a.source.hierarchy.length?a.source.hierarchy:a.source.records},getCheckedRows:function(){var b=this.base,c=b._names(),d=new Array,e=function(f,g){if(g)for(var h=0;h<g.length;h++)if(g[h]){var i=a.extend({},g[h]),j=b.rowinfo[g[h].uid];j&&j[c.checked]?f.push(i):i[c.checked]&&f.push(i),e(d,g[h].records)}};return e(d,b.dataViewRecords),d},getRow:function(a){var b=this.base,c=b.source.records;if(b.source.hierarchy){var d=function(b){for(var c=0;c<b.length;c++)if(b[c]){if(b[c].uid==a)return b[c];if(b[c].records){var e=d(b[c].records);if(e)return e}}},e=d(b.source.hierarchy);return e}for(var f=0;f<c.length;f++)if(c[f]&&c[f].uid==a)return c[f]},_renderrows:function(){var b=this.base,c=this;if(!b._loading&&!b._updating){var d=b._names();if(0===b.source.hierarchy.length&&!b.loadingFailed&&this.virtualModeCreateRecords){var e=function(a){if(a===!1||a&&0==a.length)return b._loading=!1,b.loadingFailed=!0,b.source.hierarchy=new Array,c._hideLoadElement(),b._renderrows(),b._updateScrollbars(),void b._arrange();for(var d=0;d<a.length;d++)a[d].level=0,c.virtualModeRecordCreating(a[d]),b.rowsByKey[a[d].uid]=a[d];b.source.hierarchy=a,b.source._source.hierarchy||(b.source._source.hierarchy={}),b._loading=!1,c._hideLoadElement(),b._renderrows(),b._updateScrollbars(),b._arrange()};b._loading=!0,this.virtualModeCreateRecords(null,e),this._showLoadElement()}b.rendering&&b.rendering();var f=0;b.table[0].rows=new Array;var g=b.toTP("jqx-cell")+" "+b.toTP("jqx-widget-content")+" "+b.toTP("jqx-item");b.rtl&&(g+=" "+b.toTP("jqx-cell-rtl"));var h=b.columns.records.length,i=a.jqx.browser.msie&&a.jqx.browser.version<8;i&&b.host.attr("hideFocus","true");var j=new Array,k=function(a,c){for(var e=0;e<a.length;e++){var f=a[e];if(f){var g=b.rowinfo[f.uid]?b.rowinfo[f.uid].expanded:f.expanded;if(0==b.dataview.filters.length&&(f._visible=!0),f._visible!==!1)if(g||f[d.leaf]){if(c.push(f),f.records&&f.records.length>0)for(var h=k(f.records,new Array),i=0;i<h.length;i++)c.push(h[i])}else c.push(f)}}return c},l=0===b.source.hierarchy.length?b.source.records:b.source.hierarchy;if(l=b.dataview.evaluate(l),b.dataViewRecords=l,this.showSubAggregates){var m=function(b,c){0!=b&&c.length>0&&(c[c.length-1]?c[c.length-1].aggregate||c.push({_visible:!0,level:b,siblings:c,aggregate:!0,leaf:!0}):a.jqx.browser.msie&&a.jqx.browser.version<9&&c[c.length-2]&&(c[c.length-2].aggregate||c.push({_visible:!0,level:b,siblings:c,aggregate:!0,leaf:!0})));for(var d=0;d<c.length;d++)c[d]&&c[d].records&&m(b+1,c[d].records)};m(0,l)}var n=function(a){for(var c=0,e=new Array,f=0;f<a.length;f++){var g=a[f];if(0==g[d.level]&&c++,c>b.dataview.pagesize*b.dataview.pagenum&&c<=b.dataview.pagesize*b.dataview.pagenum+b.dataview.pagesize&&e.push(g),c>b.dataview.pagesize*b.dataview.pagenum+b.dataview.pagesize)break}return e};if(0===b.source.hierarchy.length){if("all"==b.dataview.pagesize||!b.pageable||b.serverProcessing){var o=l;if(b.pageable&&b.serverProcessing&&l.length>b.dataview.pagesize)var o=l.slice(b.dataview.pagesize*b.dataview.pagenum,b.dataview.pagesize*b.dataview.pagenum+b.dataview.pagesize)}else var o=l.slice(b.dataview.pagesize*b.dataview.pagenum,b.dataview.pagesize*b.dataview.pagenum+b.dataview.pagesize);var j=o}else{var l=k.call(b,l,new Array);if("all"!=b.dataview.pagesize&&b.pageable){var o=l.slice(b.dataview.pagesize*b.dataview.pagenum,b.dataview.pagesize*b.dataview.pagenum+b.dataview.pagesize);"root"==this.pageSizeMode&&(o=n(l))}else var o=l;var j=o,p=b.dataview.pagenum;if(b.updatepagerdetails(),b.dataview.pagenum!=p){if("all"!=b.dataview.pagesize&&b.pageable){var o=l.slice(b.dataview.pagesize*b.dataview.pagenum,b.dataview.pagesize*b.dataview.pagenum+b.dataview.pagesize);"root"==this.pageSizeMode&&(o=n(l))}else var o=l;var j=o}}b.renderedRecords=j;var q=j.length,r=b.tableZIndex,s=0,t=0;if(i)for(var u=0;u<h;u++){var v=b.columns.records[u],w=v.width;w<v.minwidth&&(w=v.minwidth),w>v.maxwidth&&(w=v.maxwidth);var x=a('<table><tr><td role="gridcell" style="max-width: '+w+"px; width:"+w+'px;" class="'+g+'"></td></tr></table>');a(document.body).append(x);var y=x.find("td");s=1+parseInt(y.css("padding-left"))+parseInt(y.css("padding-right")),x.remove();break}for(var z=b.rtl?" "+b.toTP("jqx-grid-table-rtl"):"",A="<table cellspacing='0' class='"+b.toTP("jqx-grid-table")+z+"' id='table"+b.element.id+"'><colgroup>",B="<table cellspacing='0' class='"+b.toTP("jqx-grid-table")+z+"' id='pinnedtable"+b.element.id+"'><colgroup>",C=null,u=0;u<h;u++){var v=b.columns.records[u];if(!v.hidden){C=v;var w=v.width;if(w<v.minwidth&&(w=v.minwidth),w>v.maxwidth&&(w=v.maxwidth),w-=s,w<0&&(w=0),i){var D=w;0==u&&D++,B+="<col style='max-width: "+w+"px; width: "+D+"px;'>",A+="<col style='max-width: "+w+"px; width: "+D+"px;'>"}else B+="<col style='max-width: "+w+"px; width: "+w+"px;'>",A+="<col style='max-width: "+w+"px; width: "+w+"px;'>";t+=w}}A+="</colgroup>",B+="</colgroup>",b._hiddencolumns=!1;var E=!1;if(0===q){var F='<tr role="row">',G=b.host.height();if(b.pageable&&(G-=b.pagerHeight,"both"===b.pagerPosition&&(G-=b.pagerHeight)),G-=b.columnsHeight,b.filterable){var H=b.filter.find(".filterrow"),I=b.filter.find(".filterrow-hidden"),J=1;I.length>0&&(J=0),G-=b.filterHeight+b.filterHeight*H.length*J}b.showstatusbar&&(G-=b.statusBarHeight),b.showAggregates&&(G-=b.aggregatesHeight),G<25&&(G=25),"hidden"!=b.hScrollBar[0].style.visibility&&(G-=b.hScrollBar.outerHeight()),("auto"===b.height||null===b.height||b.autoheight)&&(G=100);var w=b.host.width()+2,x='<td colspan="'+b.columns.records.length+'" role="gridcell" style="border-right-color: transparent; min-height: '+G+"px; height: "+G+"px;  min-width:"+t+"px; max-width:"+t+"px; width:"+t+"px;",g=b.toTP("jqx-cell")+" "+b.toTP("jqx-grid-cell")+" "+b.toTP("jqx-item");g+=" "+b.toTP("jqx-center-align"),x+='" class="'+g+'">',b._loading||(x+=b.gridlocalization.emptydatastring),x+="</td>",F+=x,A+=F,B+=F,b.table[0].style.width=t+2+"px",f=t}for(var K=b.source._source.hierarchy&&b.source._source.hierarchy.groupingDataFields?b.source._source.hierarchy.groupingDataFields.length:0,L=0;L<j.length;L++){var M=j[L],N=M.uid;K>0&&M[d.level]<K&&(N=M.uid),void 0===M.uid&&(M.uid=b.dataview.generatekey());var F='<tr data-key="'+N+'" role="row" id="row'+L+b.element.id+'">',O='<tr data-key="'+N+'" role="row" id="row'+L+b.element.id+'">';if(M.aggregate)var F='<tr data-role="summaryrow" role="row" id="row'+L+b.element.id+'">',O='<tr data-role="summaryrow" role="row" id="row'+L+b.element.id+'">';var P=0;if(b.rowinfo[N])void 0===b.rowinfo[N].checked&&(b.rowinfo[N].checked=M[d.checked]),void 0===b.rowinfo[N].icon&&(b.rowinfo[N].icon=M[d.icon]),void 0===b.rowinfo[N].aggregate&&(b.rowinfo[N].aggregate=M[d.aggregate]),void 0===b.rowinfo[N].row&&(b.rowinfo[N].row=M),void 0===b.rowinfo[N].leaf&&(b.rowinfo[N].leaf=M[d.leaf]),void 0===b.rowinfo[N].expanded&&(b.rowinfo[N].expanded=M[d.expanded]);else{var Q=M[d.checked];void 0===Q&&(Q=!1),b.rowinfo[N]={selected:M[d.selected],checked:Q,icon:M[d.icon],aggregate:M.aggregate,row:M,leaf:M[d.leaf],expanded:M[d.expanded]}}var R=b.rowinfo[N];R.row=M,M.originalRecord&&(R.originalRecord=M.originalRecord);for(var S=0,u=0;u<h;u++){var T=b.columns.records[u];(T.pinned||b.rtl&&b.columns.records[h-1].pinned)&&(E=!0);var w=T.width;w<T.minwidth&&(w=T.minwidth),w>T.maxwidth&&(w=T.maxwidth),w-=s,w<0&&(w=0);var g=b.toTP("jqx-cell")+" "+b.toTP("jqx-grid-cell")+" "+b.toTP("jqx-item");T.pinned&&(g+=" "+b.toTP("jqx-grid-cell-pinned")),b.sortcolumn===T.displayfield&&(g+=" "+b.toTP("jqx-grid-cell-sort")),b.altRows&&L%2!=0&&(g+=" "+b.toTP("jqx-grid-cell-alt")),b.rtl&&(g+=" "+b.toTP("jqx-cell-rtl"));var U="";if(K>0&&!i&&!M.aggregate&&M[d.level]<K){U+=' colspan="'+h+'"';for(var D=0,V=0;V<h;V++){var W=b.columns.records[V];if(!W.hidden){var X=W.width;X<W.minwidth&&(w=W.minwidth),X>W.maxwidth&&(w=W.maxwidth),X-=s,X<0&&(X=0),D+=X}}w=D}var x='<td role="gridcell"'+U+' style="max-width:'+w+"px; width:"+w+"px;",Y='<td role="gridcell"'+U+' style="pointer-events: none; visibility: hidden; border-color: transparent; max-width:'+w+"px; width:"+w+"px;";u==h-1&&1==h&&(x+="border-right-color: transparent;",Y+="border-right-color: transparent;"),K>0&&M[d.level]<K&&!M.aggregate?b.rtl&&(g+=" "+b.toTP("jqx-right-align")):"left"!=T.cellsalign&&(g+="right"===T.cellsalign?" "+b.toTP("jqx-right-align"):" "+b.toTP("jqx-center-align")),R&&(R.selected&&b.editKey!==N&&"none"!==b.selectionMode&&(g+=" "+b.toTP("jqx-grid-cell-selected"),g+=" "+b.toTP("jqx-fill-state-pressed")),R.locked&&(g+=" "+b.toTP("jqx-grid-cell-locked")),R.aggregate&&(g+=" "+b.toTP("jqx-grid-cell-pinned"))),T.hidden?(x+="display: none;",Y+="display: none;",b._hiddencolumns=!0):(0!=S||b.rtl?(x+="border-right-width: 0px;",Y+="border-right-width: 0px;"):(x+="border-left-width: 0px;",Y+="border-left-width: 0px;"),S++,P+=s+w),T.pinned&&(x+="pointer-events: auto;",Y+="pointer-events: auto;");var Z="";if(0!=b.source.hierarchy.length&&M.records&&(!M.records||0!==M.records.length)||this.virtualModeCreateRecords||(R.leaf=!0),M.records&&M.records.length>0&&(R.leaf=!1),b.dataview.filters.length>0&&M.records&&M.records.length>0){for(var $=!1,_=0;_<M.records.length;_++)if(M.records[_]._visible!==!1&&void 0==M.records[_].aggregate){$=!0;break}$?R.leaf=!1:R.leaf=!0}R&&!R.leaf&&(R.expanded?(Z+=b.toTP("jqx-tree-grid-expand-button")+" ",Z+=b.rtl?b.toTP("jqx-grid-group-expand-rtl"):b.toTP("jqx-grid-group-expand"),Z+=" "+b.toTP("jqx-icon-arrow-down")):(Z+=b.toTP("jqx-tree-grid-collapse-button")+" ",b.rtl?(Z+=b.toTP("jqx-grid-group-collapse-rtl"),Z+=" "+b.toTP("jqx-icon-arrow-left")):(Z+=b.toTP("jqx-grid-group-collapse"),Z+=" "+b.toTP("jqx-icon-arrow-right")))),(!b.autoRowHeight||1===S||b.autoRowHeight&&!T.autoCellHeight)&&(g+=" "+b.toTP("jqx-grid-cell-nowrap"));var aa=b._getcellvalue(T,R.row);if(K>0&&!M.aggregate&&M[d.level]<K&&(aa=M.label),""!=T.cellsFormat&&a.jqx.dataFormat&&(a.jqx.dataFormat.isDate(aa)?aa=a.jqx.dataFormat.formatdate(aa,T.cellsFormat,b.gridlocalization):(a.jqx.dataFormat.isNumber(aa)||!isNaN(parseFloat(aa))&&isFinite(aa))&&(aa=a.jqx.dataFormat.formatnumber(aa,T.cellsFormat,b.gridlocalization))),""!=T.cellclassname&&T.cellclassname)if("string"==typeof T.cellclassname)g+=" "+T.cellclassname;else{var ba=T.cellclassname(L,T.datafield,b._getcellvalue(T,R.row),R.row,aa);ba&&(g+=" "+ba)}if(""!=T.cellsRenderer&&T.cellsRenderer){var ca=T.cellsRenderer(N,T.datafield,b._getcellvalue(T,R.row),R.row,aa);void 0!==ca&&(aa=ca)}if(R.aggregate&&T.aggregates){var da=M.siblings.slice(0,M.siblings.length-1),ea=b._calculateaggregate(T,null,!0,da);if(M[T.displayfield]="",ea)if(T.aggregatesRenderer){if(ea){var fa=T.aggregatesRenderer(ea[T.datafield],T,null,b.getcolumnaggregateddata(T.datafield,T.aggregates,!1,da),"subAggregates");aa=fa,M[T.displayfield]+=name+":"+ea[T.datafield]+"\n"}}else aa="",M[T.displayfield]="",a.each(ea,function(){var a=this;for(obj in a){var c=obj;c=b._getaggregatename(c);var d='<div style="position: relative; margin: 0px; overflow: hidden;">'+c+":"+a[obj]+"</div>";aa+=d,M[T.displayfield]+=c+":"+a[obj]+"\n"}});else aa=""}if(1===S&&!b.rtl||T==C&&b.rtl||K>0&&M[d.level]<K){for(var ga="",ha=b.toThemeProperty("jqx-tree-grid-indent"),ia=R.leaf?1:0,ja=0;ja<M[d.level]+ia;ja++)ga+="<span class='"+ha+"'></span>";var ka="<span class='"+Z+"'></span>",la="",ma="";if(this.checkboxes&&!M.aggregate){var na=b.toThemeProperty("jqx-tree-grid-checkbox")+" "+ha+" "+b.toThemeProperty("jqx-checkbox-default")+" "+b.toThemeProperty("jqx-fill-state-normal")+" "+b.toThemeProperty("jqx-rc-all"),oa=!0;if(a.isFunction(this.checkboxes)&&(oa=this.checkboxes(N,M),void 0==oa&&(oa=!1)),oa)if(R){var pa=R.checked;0==this.hierarchicalCheckboxes&&null===pa&&(pa=!1),la+=pa?"<span class='"+na+"'><div class='"+b.toThemeProperty("jqx-tree-grid-checkbox-tick")+" "+b.toThemeProperty("jqx-checkbox-check-checked")+"'></div></span>":pa===!1?"<span class='"+na+"'></span>":"<span class='"+na+"'><div class='"+b.toThemeProperty("jqx-tree-grid-checkbox-tick")+" "+b.toThemeProperty("jqx-checkbox-check-indeterminate")+"'></div></span>"}else la+="<span class='"+na+"'></span>"}if(this.icons&&!M.aggregate){var qa=b.toThemeProperty("jqx-tree-grid-icon")+" "+ha;if(b.rtl)var qa=b.toThemeProperty("jqx-tree-grid-icon")+" "+b.toThemeProperty("jqx-tree-grid-icon-rtl")+" "+ha;var ra=b.toThemeProperty("jqx-tree-grid-icon-size")+" "+ha,sa=R.icon;a.isFunction(this.icons)&&(R.icon=this.icons(N,M),R.icon&&(sa=!0)),sa&&(ma+=R.icon?"<span class='"+qa+"'><img class='"+ra+"' src='"+R.icon+"'/></span>":"<span class='"+qa+"'></span>")}var ta=b.autoRowHeight&&1===S&&T.autoCellHeight?" "+b.toTP("jqx-grid-cell-wrap"):"",ua=ga+ka+la+ma+"<span class='"+b.toThemeProperty("jqx-tree-grid-title")+ta+"'>"+aa+"</span>";aa=b.rtl?"<span class='"+b.toThemeProperty("jqx-tree-grid-title")+ta+"'>"+aa+"</span>"+ma+la+ka+ga:ua}if(K>0&&i&&u>=K&&M[d.level]<K&&(x+="padding-left: 5px; border-left-width: 0px;",Y+="padding-left: 5px; border-left-width: 0px;",aa="<span style='visibility: hidden;'>-</span>"),x+='" class="'+g+'">',x+=aa,x+="</td>",Y+='" class="'+g+'">',Y+=aa,Y+="</td>",T.pinned?(O+=x,F+=x):(F+=x,E&&(O+=Y)),K>0&&!i&&M[d.level]<K&&!M.aggregate)break}if(0==f&&(b.table[0].style.width=P+2+"px",f=P),F+="</tr>",O+="</tr>",A+=F,B+=O,b.rowDetails&&!M.aggregate&&this.rowDetailsRenderer){var va='<tr data-role="row-details"><td valign="top" align="left" style="pointer-events: auto; max-width:'+w+"px; width:"+w+'px; overflow: hidden; border-left: none; border-right: none;" colspan="'+b.columns.records.length+'" role="gridcell"',g=b.toTP("jqx-cell")+" "+b.toTP("jqx-grid-cell")+" "+b.toTP("jqx-item");g+=" "+b.toTP("jqx-details"),g+=" "+b.toTP("jqx-reset");var wa=this.rowDetailsRenderer(N,M);wa&&(va+='" class="'+g+'"><div style="pointer-events: auto; overflow: hidden;"><div data-role="details">'+wa+"</div></div></td></tr>",A+=va,B+=va)}}if(A+="</table>",B+="</table>",E){b.WinJS?MSApp.execUnsafeLocalFunction(function(){b.table.html(B+A)}):b.table[0].innerHTML=B+A;var xa=b.table.find("#table"+b.element.id),ya=b.table.find("#pinnedtable"+b.element.id);ya.css("float","left"),ya.css("pointer-events","none"),xa.css("float","left"),ya[0].style.position="absolute",xa[0].style.position="relative",xa[0].style.zIndex=r-10,ya[0].style.zIndex=r+10,b._table=xa,b._table[0].style.left="0px",b._pinnedTable=ya,i&&(ya[0].style.left="0px"),b._table[0].style.width=f+"px",b._pinnedTable[0].style.width=f+"px",b.rtl&&b._haspinned&&(b._pinnedTable[0].style.left=3-f+parseInt(b.element.style.width)+"px")}else{b.WinJS?MSApp.execUnsafeLocalFunction(function(){b.table.html(A)}):b.table[0].innerHTML=A;var V=b.table.find("#table"+b.element.id);b._table=V,a.jqx.browser.msie&&a.jqx.browser.version<10&&(b._table[0].style.width=f+"px"),0===q&&(b._table[0].style.width=2+f+"px")}0===q&&(b._table[0].style.tableLayout="auto",b._pinnedTable&&(b._pinnedTable[0].style.tableLayout="auto")),b.showAggregates&&b._updatecolumnsaggregates(),b._loading&&0==q&&(b._arrange(),this._showLoadElement()),b.rendered&&b.rendered()}},propertyChangedHandler:function(b,c,d,e){if(void 0!=b.isInitialized&&0!=b.isInitialized){var f=b.base;if("pageSizeMode"==c||"hierarchicalCheckboxes"==c)b._renderrows();else if("filterable"==c)f._render();else if("height"===c)f.host.height(b.height),f.host.width(b.width),f._updatesize(!1,!0);else if("width"===c)f.host.height(b.height),f.host.width(b.width),f._updatesize(!0,!1);else if("source"===c)f.updateBoundData();else if("columns"===c||"columnGroups"===c)f._columns=null,f._render();else if("rtl"===c)f.content.css("left",""),b.columns=b._columns,f.vScrollBar.jqxScrollBar({rtl:e}),f.hScrollBar.jqxScrollBar({rtl:e}),f._render();else if("pagerMode"===c)b.pagerMode=e,f._initpager();else if("pageSizeOptions"==c){f._initpager();for(var g=!1,h=0;h<e.length;h++)if(parseInt(e[h])==b.pageSize){g=!0;break}g||a.jqx.set(b,[{pageSize:e[0]}])}else if("pageSize"==c){var i=f.dataview.pagenum*f.dataview.pagesize;f.dataview.pagesize=f.pageSize;var j=Math.floor(i/f.dataview.pagesize);if(j!==f.dataview.pagenum||parseInt(e)!==parseInt(d)){b._raiseEvent("pageSizeChanged",{pagenum:e,oldpageSize:d,pageSize:f.dataview.pagesize});var k=b.goToPage(j);k||f.refresh()}}else if("pagerPosition"===c)f.refresh();else if("selectionMode"===c)f.selectionMode=e.toLowerCase();else if("touchmode"==c)f.touchDevice=null,f._removeHandlers(),f.touchDevice=null,f.vScrollBar.jqxScrollBar({touchMode:e}),f.hScrollBar.jqxScrollBar({touchMode:e}),f._updateTouchScrolling(),f._arrange(),f._updatecolumnwidths(),f._renderrows(),f._addHandlers();else{if("enableHover"==c)return;if("disabled"==c)e?f.base.host.addClass(this.toThemeProperty("jqx-fill-state-disabled")):f.base.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled")),f.pageable&&(f.pagernexttop&&(f.pagernexttop.jqxButton({disabled:e}),f.pagerprevioustop.jqxButton({disabled:e}),f.pagernextbottom.jqxButton({disabled:e}),f.pagerpreviousbottom.jqxButton({disabled:e}),f.pagerfirsttop.jqxButton({disabled:e}),f.pagerfirstbottom.jqxButton({disabled:e}),f.pagerlasttop.jqxButton({disabled:e}),f.pagerlastbottom.jqxButton({disabled:e}),f.pagershowrowscombotop.jqxDropDownList&&"advanced"==f.pagerMode&&(f.pagershowrowscombotop.jqxDropDownList({disabled:!1}),f.pagershowrowscombobottom.jqxDropDownList({disabled:!1}))),f.base.host.find(".jqx-grid-pager-number").css("cursor",e?"default":"pointer")),f.base.host.find(".jqx-grid-group-collapse").css("cursor",e?"default":"pointer"),f.base.host.find(".jqx-grid-group-expand").css("cursor",e?"default":"pointer");else if("columnsHeight"==c)f._render();else if("theme"==c){if(a.jqx.utilities.setTheme(d,e,f.base.host),f.vScrollBar.jqxScrollBar({theme:f.theme}),f.hScrollBar.jqxScrollBar({theme:f.theme}),f.pageable&&f.pagernexttop&&(f.pagernexttop.jqxButton({theme:f.theme}),f.pagerprevioustop.jqxButton({theme:f.theme}),f.pagernextbottom.jqxButton({theme:f.theme}),f.pagerpreviousbottom.jqxButton({theme:f.theme}),f.pagerfirsttop.jqxButton({theme:f.theme}),f.pagerfirstbottom.jqxButton({theme:f.theme}),f.pagerlasttop.jqxButton({theme:f.theme}),f.pagerlastbottom.jqxButton({theme:f.theme}),f.pagershowrowscombotop.jqxDropDownList&&"advanced"==f.pagerMode&&(f.pagershowrowscombotop.jqxDropDownList({theme:f.theme}),f.pagershowrowscombobottom.jqxDropDownList({theme:f.theme}))),f.filterable){var l=a(".filterconditions");l.length>0&&l.jqxDropDownList({theme:f.theme}),f.filtercolumnsList&&f.filtercolumnsList.jqxDropDownList({theme:f.theme})}f.refresh()}else f.refresh()}}},checkRow:function(a,b,c){var d=this.base,e=d._names();if(!d._loading){var f=d.rowinfo[a];if(f)f.checked=!0,f.row[e.checked]=!0,f.originalRecord&&(f.originalRecord[e.checked]=!0),void 0==c&&this.hierarchicalCheckboxes&&this.checkRows(f.row,f.row),b!==!1&&d._renderrows(),d._raiseEvent("rowCheck",{key:a,row:f.row});else{var g=this.getRow(a);g&&(d.rowinfo[a]={row:g,checked:!0},d.rowinfo[a].row[e.checked]=!0,g.originalRecord&&(d.rowinfo[a].originalRecord=g.originalRecord),d._raiseEvent("rowCheck",{key:a,row:g}),void 0==c&&this.hierarchicalCheckboxes&&this.checkRows(g,g),b!==!1&&d._renderrows())}}},checkRows:function(b,c){var d=this.base,e=this,f=d._names(),g=function(a){var b=new Array,c=function(a){for(var d=0;d<a.length;d++)b.push(a[d]),a[d]&&a[d].records&&c(a[d].records)};return a.records&&c(a.records),b};if(null!=b){var h=0,i=!1,j=0,k=function(a){for(var b=0;b<a.length;b++)if(a[b]){var c=a[b][f.checked];void 0===c&&(c=!1),0!=c&&(null==a[b][f.checked]&&(i=!0),a[b].records&&k(a[b].records),h++),j++}};if(b.records&&k(b.records),b!=c)h==j?this.checkRow(b.uid,!1,"tree"):h>0?this.indeterminateRow(b.uid,!1,"tree"):this.uncheckRow(b.uid,!1,"tree");else{var l=c[f.checked],m=g(c);a.each(m,function(){l===!0?e.checkRow(this.uid,!1,"tree"):l===!1?e.uncheckRow(this.uid,!1,"tree"):e.indeterminateRow(this.uid,!1,"tree")})}var n=b[f.parent]?b[f.parent]:null;this.checkRows(n,c)}else{var l=c[f.checked],m=g(c);a.each(m,function(){l===!0?e.checkRow(this.uid,!1,"tree"):l===!1?e.uncheckRow(this.uid,!1,"tree"):e.indeterminateRow(this.uid,!1,"tree")})}},indeterminateRow:function(a,b,c){var d=this.base,e=d._names();if(!d._loading){var f=d.rowinfo[a];if(f)f.checked=null,f.row[e.checked]=null,f.originalRecord&&(f.originalRecord[e.checked]=null),void 0==c&&this.hierarchicalCheckboxes&&this.checkRows(f.row,f.row),b!==!1&&d._renderrows();else{var g=this.getRow(a);g&&(d.rowinfo[a]={row:g,checked:null},d.rowinfo[a].row[e.checked]=null,g.originalRecord&&(d.rowinfo[a].originalRecord=g.originalRecord),void 0==c&&this.hierarchicalCheckboxes&&this.checkRows(g,g),b!==!1&&d._renderrows())}}},uncheckRow:function(a,b,c){var d=this.base,e=d._names();if(!d._loading){var f=d.rowinfo[a];if(f)f.checked=!1,f.row[e.checked]=!1,f.originalRecord&&(f.originalRecord[e.checked]=!1),void 0==c&&this.hierarchicalCheckboxes&&this.checkRows(f.row,f.row),b!==!1&&d._renderrows(),d._raiseEvent("rowUncheck",{key:a,row:f.row});else{var g=this.getRow(a);g&&(d.rowinfo[a]={row:g,checked:!1},d.rowinfo[a].row[e.checked]=!1,g.originalRecord&&(d.rowinfo[a].originalRecord=g.originalRecord),d._raiseEvent("rowUncheck",{key:a,row:g}),void 0==c&&this.hierarchicalCheckboxes&&this.checkRows(g,g),b!==!1&&d._renderrows())}}},expandRows:function(b){var c=this;if(b)if(c.virtualModeCreateRecords)a.each(b,function(){var a=this,b=function(){c.base._loading=!1,c.expandRows(a.records)};c.base._loading=!1,c.expandRow(a.uid,b)});else for(var d=0;d<b.length;d++){var e=b[d];c.expandRow(e.uid),c.expandRows(e.records)}},collapseRows:function(a){if(a)for(var b=0;b<a.length;b++)this.collapseRow(a[b].uid),this.collapseRows(a[b].records)},expandAll:function(){var a=this.base;a.beginUpdate(),this.expandRows(this.getRows()),a.endUpdate()},collapseAll:function(){var a=this.base;a.beginUpdate(),this.collapseRows(this.getRows()),a.endUpdate()},expandRow:function(a,b){var c=this.base;if(!c._loading){var d=c._names(),e=this,f=c.rowinfo[a];if(!f){var g=this.getRow(a);g&&(c.rowinfo[a]={row:g},g.originalRecord&&(c.rowinfo[a].originalRecord=g.originalRecord),f=c.rowinfo[a])}if(f){if(f.expanded)return void(f.row[d.expanded]=!0);if(f.expanded=!0,f.row[d.expanded]=!0,f.originalRecord&&(f.originalRecord[d.expanded]=!0),this.virtualModeCreateRecords&&!f.row._loadedOnDemand){var h=function(a){if(f.row._loadedOnDemand=!0,a===!1)return c._loading=!1,e._hideLoadElement(),f.leaf=!0,f.row[d.leaf]=!0,c._renderrows(),void(b&&b());for(var g=0;g<a.length;g++){if(a[g][d.level]=f.row[d.level]+1,a[g][d.parent]=f.row,c.rowsByKey[a[g].uid])throw c._loading=!1,e._hideLoadElement(),f.leaf=!0,f.row[d.leaf]=!0,c._renderrows(),b&&b(),new Error("Please, check whether you Add Records with unique ID/Key. ");c.rowsByKey[a[g].uid]=a[g],e.virtualModeRecordCreating(a[g])}f.row.records?f.row.records=f.row.records.concat(a):f.row.records=a,(!a||a&&0==a.length)&&(f.leaf=!0,f.row[d.leaf]=!0),f.originalRecord&&(f.originalRecord.records=a,f.originalRecord[d.expanded]=!0,0==a.length&&(f.originalRecord[d.leaf]=!0)),c._loading=!1,e._hideLoadElement();var h=c.vScrollBar.css("visibility");c._renderrows(),c._updateScrollbars();var i=h!=c.vScrollBar.css("visibility");("auto"===c.height||null===c.height||c.autoheight||i)&&c._arrange(),c._renderhorizontalscroll(),b&&b()};if(!f.row[d.leaf])return c._loading=!0,this._showLoadElement(),void this.virtualModeCreateRecords(f.row,h)}if(!c.updating()){var i=c.vScrollBar.css("visibility");c._renderrows(),c._updateScrollbars();var j=i!=c.vScrollBar.css("visibility");("auto"===c.height||null===c.height||c.autoheight||j)&&c._arrange(),c._renderhorizontalscroll(),c._raiseEvent("rowExpand",{row:f.row,key:a})}}}},collapseRow:function(a){var b=this.base,c=b._names();if(!b._loading){var d=b.rowinfo[a];if(!d){var e=this.getRow(a);e&&(b.rowinfo[a]={row:e},e.originalRecord&&(b.rowinfo[a].originalRecord=e.originalRecord),d=b.rowinfo[a])}if(d){if(!d.expanded)return void(d.row[c.expanded]=!1);if(d.expanded=!1,d.row[c.expanded]=!1,d.originalRecord&&(d.originalRecord[c.expanded]=!1),!b.updating()){var f=b.vScrollBar.css("visibility");b._renderrows(),b._updateScrollbars();var g=f!=b.vScrollBar.css("visibility");("auto"===b.height||null===b.height||b.autoheight||g)&&b._arrange(),b._renderhorizontalscroll(),b._raiseEvent("rowCollapse",{row:d.row,key:a})}}}}})}(jqxBaseFramework);
