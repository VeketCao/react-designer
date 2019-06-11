/**
 * Created by Veket on 2016/7/28.
 */
(function(){
    var componentList=[],pageConfig={},currentEditObj={};
    // URL参数对象
    var urlObj = {};
    // 保存控件参数方法
    var sCpFunc = window.saveComponentParmFunc = {};
    //
    window.gloableRegExes = REG_EXES;

    var newItemObj = function(instid,component,attr) {
        if (component == 'ColumnPanel') {
            return { instid:instid, component:component, pinstid:'', row:0, col:0, attr:attr || {}}
        } else {
            return { instid:instid, component:component, pinstid:'', row:0, col:0, attr: _.extend(attr.attr,{fieldName: attr.attr.fieldName + '-' + instid.slice(0,8)}) || {}, i18nProps: attr.i18nProps, children: attr.children}
        }
        //return{ instid:instid, component:component, pinstid:'', row:0, col:0, attr:attr||{}}
    };

    /**根据组件名称获取默认配置**/
    var getAttrConfig = function(name,type) {
        if(name == 'ColumnPanel') {
            return { type: type }
        } else {
            var temp = _.find(componentList,function(it){ return it.name==name});
            //console.log(temp);
            return {
                attr: _.extend(temp.attr, { publicSrc: temp.publicSrc }),
                i18nProps: temp.i18nProps,
                children: temp.children || []
            } || {};
            //return temp.attr||{};
        }
    };

    /**插入布局toolbar**/
    /**
     *
     * @param $it 组件对象
     */
    var appendLayoutToolbar = function($it){
        var getLayoutToolbarDom=function(){
            return '<div class="layout-toolbar"><i class="i-del"></i></div>'
        };
        var $temp=$(getLayoutToolbarDom());
        $temp.appendTo($it);
        $('.i-del',$temp).bind("click",function(e){
            var $this=$(this);
            layer.confirm('确定删除？',{ title:"提示",btn: ['确定','取消'] },
                function(){
                    var $c= $this.parent().parent();
                    var instid=$c.attr("instid");
                    pageConfig.removeItem(instid);
                    $c.remove();
                    layer.closeAll();
                    $("#edit-area").empty();
                    $("#edit-component").find('.alert-danger').css('display','block');
                    $("#edit-area-submit").css('display','none');
                },function(){
                    layer.closeAll();
                });
        });
    };

    /**
     *
     * @param $it 组件对象
     */
    var appendFieldToolbar = function($it){
        var getFieldToolbarDom=function(){
            return '<div class="drag-bar"></div><div class="field-toolbar"><i class="i-delete"></i></div>'
        };
        var $temp=$(getFieldToolbarDom());
        $temp.appendTo($it);

        $('.i-delete',$temp).bind("click",function(e){
            var $this=$(this);
            layer.confirm('确定删除？',{ title:"提示",btn: ['确定','取消'] },
                function(){
                    var $c= $this.parent().parent();
                    pageConfig.removeItem($c.attr("instid"));
                    $c.remove();
                    layer.closeAll();
                    $("#edit-area").empty();
                    $("#edit-component").find('.alert-danger').css('display','block');
                    $("#edit-area-submit").css('display','none');
                },function(){
                    layer.closeAll();
                });
        });
    };

    /****************************************拖拽*****************************/
    var sortableProcess = function($it){
        var componentKey=$it.attr("component");
        if(null!=$it && null!=pageConfig.currentDrag){
            var uuid=AppUtil.getUUID();
            $it.attr("instid",uuid);
            var attrCfg=deepClone(getAttrConfig(componentKey,$it.attr("type")));
            //console.log(attrCfg.attr);
            if(componentKey=='ColumnPanel'){
                $it.removeClass('widget-item').removeClass('layout_js').addClass('form-layout').addClass('form-layout_js').removeAttr('title');
                ReactDOM.render(React.createElement(eval(componentKey), attrCfg, null), $it.get(0));
                appendLayoutToolbar($it);
            } else {
                $it.removeClass('widget-item').removeClass('component_js').addClass('field').addClass('field_js').removeAttr('title');
                ReactDOM.render(React.createElement(eval(componentKey), attrCfg.attr, null),$it.get(0));
                appendFieldToolbar($it);
                $it.removeAttr("style");
                // 控件绑定编辑事件
                bindEditEvent();
            }

            pageConfig.addItem(newItemObj(uuid,componentKey,attrCfg));
        }
        if($it.parent().hasClass("cell_js")&&1<=$it.siblings().length){
            if(null!=pageConfig.currentDrag) {
                $it.remove();
                pageConfig.removeItem($it.attr("instid"));
            } else return false;
        }
        if (null != $it && $it.hasClass("form-layout_js") || $it.hasClass("subform_js")) {
            if ($it.parent().hasClass("cell_js"))
                if (null != pageConfig.currentDrag) {
                    $it.remove();
                    pageConfig.removeItem($it.attr("instid"));
                }
                else return !1
        } else {
            null != $it && $it.hasClass("field_js") ? $it.click() : null != $it && $it.hasClass("subtd_js") && $it.find(".field_js").click();
        }
        null != $it && $it.hasClass("form-layout_js") &&  pageAndColumnPanelSortable();
        pageConfig.currentDrag=null;
    };

    var pageAndColumnPanelSortable = function(){
        var $cell = $("#widget-control,.cell_js"), $wc = $("#widget-control");
        $wc.sortable({
            handle: ".drag-bar,.column-layout",
            connectWith: $cell,
            placeholder: "form-placeholder-filed",
            cancel: ".j_cancel-drag",
            stop: function (a, b) {
                return sortableProcess(b.item);
            }, over: function (a, c) {
                $(this).find(".form-placeholder-filed").show();
            }, out: function (a, c) {}
        }).disableSelection();

        $wc.find(".cell_js").sortable({
            connectWith: $cell,
            placeholder: "form-placeholder-filed",
            cancel: ".j_cancel-drag",
            stop: function (a, b) {
                return sortableProcess(b.item)
            }, over: function (a, c) {
                if (1 <= $(this).find(".field").length) $(this).find(".form-placeholder-filed").hide();
                else {
                    var e = c.item.attr("component");
                    if("ColumnPanel" == e || "DataTable" == e ){
                        $(this).find(".form-placeholder-filed").hide();
                    }
                }
            }, out: function (a, c) {
                $(this).find(".form-placeholder-filed").show()
            }
        }).disableSelection();
    };

    var componentDraggableEvents = function(){
        pageAndColumnPanelSortable();
        $("#component-list .widget-item").draggable({
            connectToSortable: "#widget-control,.subtr_js td",
            helper: "clone",
            opacity: .8,
            appendTo: "body",
            start: function (a, b) {
                pageConfig.currentDrag = $(this);
                $(".ui-draggable-dragging").css({ margin:"-50px 0",width: "170px"})
            }
        });

        $("#layout-list .widget-item").draggable({
            connectToSortable: "#widget-control",
            helper: "clone",
            appendTo: "body",
            start: function (a, b) {
                pageConfig.currentDrag = $(this);
                $(".ui-draggable-dragging").css({margin:"-50px 0",width: "170px"})
            }, stop: function (a, c) {}
        });
    };

    /**
     * 渲染左侧栏字段组件
     */
    var renderLeftBar = function(cb){
        var listItemHtml = "",
            layoutItemHtml = "";
        // 构建表单控件列表html
        var getComponentItem = function(it){
            return '<div class="widget-item component_js ui-draggable" title="拖拽至页面中间区域" component="'+it.name+'"> <span style="padding-left: 26px;overflow: hidden;text-overflow: ellipsis;height: 18px;width: 80px;white-space: nowrap;text-align:left;display: inline-block;line-height: 24px;background: url('+(AppUtil.componentIco[it.name]||"")+') no-repeat">'+it.description+'</span></div>';
        };
        // 构建布局控件列表html
        var getLayoutItem = function(it){
            var html = '';
            for (var i = 0; i < it.attr.options.length; i++) {
                html += '<div class="widget-item layout_js ui-draggable" title="拖拽至页面中间区域" component="'+it.name+'" type="'+it.attr.options[i][0]+'"> <span>'+it.attr.options[i][1]+'</span></div>';
            }
            return html;
        };

        var renderComponentList= _.filter(componentList,function(it){return it.type=="form"}),
            renderLayoutList = _.filter(componentList,function(it){return it.type=="layout"});

        _.each(renderComponentList,function(it){ listItemHtml += getComponentItem(it) });
        _.each(renderLayoutList,function(it){ layoutItemHtml += getLayoutItem(it) });

        var cl = $("#component-list"),
            ll = $("#layout-list");
        cl.empty();
        ll.empty();
        $(listItemHtml).appendTo(cl);
        $(layoutItemHtml).appendTo(ll);
        cb();
    };

    /**
     * 加载组件
     */
    var loadInitComponents = function(cb) {
        http(WD_API.getDataSourceApi + FORM_ENGINE_API.load_components,{
            'componentType': '0',
        },{
            type: 'POST',
            dataType: "jsonp"
        }).done(function(msg) {
            $('#nav-list-init').css('display','none');
            if(msg.success == true) {
                if(_.isEmpty(msg.data)) return;
                var nameArr = [];
                _.each(msg.data,function (d) {
                    nameArr.push(d.fdName);
                });
                http(WD_API.getDataSourceApi + FORM_ENGINE_API.load_components,{
                    'componentType': '1',
                },{
                    type: 'POST',
                    dataType: "jsonp"
                }).done(function(msg) {
                    if(msg.success == true) {
                        if(_.isEmpty(msg.data)) return;
                        _.each(msg.data,function (d) {
                            nameArr.push(d.fdName);
                        });
                        loadInitComponentsFormUrl(nameArr,0,cb);
                    } else {
                        layer.msg('获取控件信息失败', { offset: 't', anim: 2 });
                    }
                }).fail(function(msg) {
                    layer.msg('获取控件信息失败', { offset: 't', anim: 2 });
                });

            } else {
                layer.msg('获取控件信息失败', { offset: 't', anim: 2 });
            }
        }).fail(function() {
            layer.msg('获取控件信息失败', { offset: 't', anim: 2 });
        });

        /*http('components/cfg.json').done(function(rtn){
            if(_.isEmpty(rtn.data)) return;
            componentList = _.filter(rtn.data,function(it){return it.type !=""});
            renderLeftBar(componentDraggableEvents);
            AppUtil.loadComponentJs(_.pluck(rtn.data,'url'),cb);
            var WH = $(document).height();
            var mH = WH - $('.header').outerHeight() - $('.page-info').outerHeight();
            $('#widget-control').css('minHeight',mH);
            // 加载配置权限页面所需要的控件
            initAthConfigPage();
        });*/
    };

    /**
     * 加载组件
     */
    var loadInitComponentsFormUrl = function(arr,index,cb) {
        http(WD_API.getDataSourceApi + FORM_ENGINE_API.get_component_config, {
            'fdName': arr[index],
        },{
            type: 'POST',
            dataType: "jsonp"
        }).done(function(msg) {
            if(msg.success == true) {
                if(_.isEmpty(msg.data)) return;
                var o = msg.data;
                var dt = new Date();
                dt.setMinutes(0, 0, 0);
                var timestamp = Date.parse(dt);
                o.url = o.publicSrc + o.name + '.js?_t=' + timestamp;
                componentList.push(o);
            }
            index++;
            if (index < arr.length) {
                loadInitComponentsFormUrl(arr,index,cb)
            }
            if (index == arr.length) {
                $('#nav-list-init').css('display','block');
                $('#loading-data').css('display','none');
                AppUtil.loadComponentJs(_.pluck(componentList,'url'), cb);
                // renderLeftBar(componentDraggableEvents);
                var WH = $(document).height();
                var mH = WH - $('.header').outerHeight() - $('.page-info').outerHeight();
                $('#widget-control').css('minHeight', mH);
            }
        }).fail(function() {
            layer.msg('获取控件信息失败',{ offset: 't', anim: 2 });
        })
    }

    /**
     * 顶部导航栏点击
     */
    var headerNavClick = function(e){
        var sectionForm = $(".section-form");
        sectionForm.hide();
        var index = $(this).attr('data-for-index');
        try {
            index = parseInt(index);
        } catch (e){
            index = 0;
        }
        $(this).siblings().removeClass("curr") && $(this).addClass("curr");
        sectionForm && $(sectionForm.get(index)).show();

    };

    /**
     * 左侧菜单栏点击
     */
    var leftNavClick = function(e){
        var navList = $(".nav-list");
        navList.hide();
        var index = $(this).attr('data-for-index');
        try{
            index = parseInt(index);
        }catch (e){
            index = 0;
        }
        var length = (index*130)+30;
        $(this).siblings(".tabs-bottom-bar").length>0&&$($(this).siblings(".tabs-bottom-bar")[0]).css("left",length+"px");
        $(this).siblings().removeClass("curr")&&$(this).addClass("curr");
        navList&&$(navList.get(index)).show();
        // $(this).next().show();
    };

    /**
     * 保存表单权限配置参数
     */
    var saveAthConfig = function () {
        var o = {};
        var aForm = $("#ath-edit-form");
        var tempData = aForm.serializeArray();
        //console.log(tempData);
        //以下是把form提交出来的数组转化为一个o对象
        $.each(tempData, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        //如果表单里面含有radio、checkbox，再未被选中的状态下，都会被赋值为空
        var $radio = aForm.find('input[type=radio],input[type=checkbox]');
        $.each($radio,function(){
            if(!o.hasOwnProperty(this.name)){
                o[this.name] = '';
            }
        });
        //console.log(o);
        var AthObj = pageConfig.auth;

        for (var p in o) {
            if (o.hasOwnProperty(p)) {
                AthObj[p] = o[p] || "";
            }
        }
    }

    /**
     * 控件的编辑窗口的提交按钮点击函数
     */
    sCpFunc.saveChangeButton = function () {
        var o = {};
        var eForm = $("#edit-area-form");
        var tempData = eForm.serializeArray();
        //console.log(tempData);
        //以下是把form提交出来的数组转化为一个o对象
        $.each(tempData, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        //如果表单里面含有radio、checkbox，再未被选中的状态下，都会被赋值为空
        var $radio = eForm.find('input[type=radio],input[type=checkbox]');
        $.each($radio,function(){
            if(!o.hasOwnProperty(this.name)){
                o[this.name] = '';
            }
        });
        //console.log(o);
        if (o.hasOwnProperty('instid')) {
            sCpFunc.dynamicChangeWidget(o);
        } else {
            sCpFunc.formChangeWidget(o);
        }
    }

    /**
     * 根据编辑窗口保存的数据改变表单标题，重新渲染表单标题备注
     */
    sCpFunc.formChangeWidget = function (obj) {
        var currentFormObj = pageConfig;
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                if (!_.contains(p,'_')) {
                    currentFormObj[p] = obj[p] || "";
                } else {
                    _.forEach(langs, function (lang) {
                        if (lang + '_formName' == p) {
                            currentFormObj.lang[lang]['formName'] = obj[p] || "表单标题";
                        }
                        if (lang + '_description' == p) {
                            currentFormObj.lang[lang]['description'] = obj[p] || "";
                        }
                    });
                }
            }
        }
        var formWidget = $('#form-page-info');
        // console.log(currentFormObj);
        var tit = React.createElement('h2', { className: 'form-title' }, currentFormObj.formName || '表单标题');
        var desc = React.createElement('p', { className: 'form-description' }, currentFormObj.description);
        ReactDOM.render(React.createElement('div', null, [tit,desc]),formWidget.get(0));
        $('#ath-form-name').html(currentFormObj.formName);
    }

    /**
     * 根据编辑窗口保存的数据改变控件配置文件，重新渲染控件内容
     */
    sCpFunc.dynamicChangeWidget = function (obj) {
        var currentEditObj = _.find(pageConfig.items,function (_item) {
            return _item.instid === obj.instid;
        });
        var i18nProps = currentEditObj.i18nProps || '';
        //console.log(obj);

        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                if (typeof(langs) != 'undefined') {
                    // 增加国际化字段标识，里面包含对应语言所包含的属性字段
                    if (_.contains(i18nProps.split(','),p)) {
                        currentEditObj.attr = currentEditObj.attr || {};
                        currentEditObj.attr.lang = currentEditObj.attr.lang || {};
                        _.forEach(langs, function (lang) {
                            currentEditObj.attr.lang[lang] = currentEditObj.attr.lang[lang] || {}
                            currentEditObj.attr.lang[lang][p] = obj[lang+"_"+p] || "";
                        });
                    }
                    //else {
                    //console.log(p);
                    if (!_.contains(p,'_') && p != 'instid') {
                        currentEditObj.attr[p] = obj[p] || "";
                    }
                    //}
                } else {
                    currentEditObj.attr[p] = obj[p] || "";
                }
            }
        }
        var editWidget = $('#widget-control .field-active[instid="'+currentEditObj['instid']+'"]');
        ReactDOM.render(React.createElement(eval(currentEditObj.component),currentEditObj.attr, null),editWidget.get(0));
        //parseConfigToDesigner();
    }

    /**
     * 控件编辑函数
     */
    var editComponentCfg = function () {
        var componentName = $(this).attr("component")||"";
        var $instid = $(this).attr("instid");
        currentEditObj = _.find(pageConfig.items, function (_item) {
            return _item.instid === $instid;
        });
        console.log(pageConfig)
        $('.field').each(function() {
            $(this).removeClass('field-active');
        });
        $(this).addClass('field-active');
        var dt = new Date();
        dt.setMinutes(0, 0, 0);
        var timestamp = Date.parse(dt);
        $("#template-html").load("template/"+componentName+".html?_t=" + timestamp,function () {
            $("#edit-area-form .edit-area-body").css("display","block");
            //针对对应的控件加载相对应的静态模板
            currentEditObj.langs = typeof(langs) == 'undefined' ? '' : langs;
            // 增加一个当前语言环境标识，默认选取多语言数组的第一个（未确定）
            currentEditObj.attr.language = typeof(langs) == 'undefined' ? 'zh' : langs[0];
            $("#edit-area").html(template("template-"+componentName,currentEditObj));
            //针对对应的控件引入对应的JS文件
            var url = "template/"+componentName+".js";
            $('script[data-js|="template"]').remove();
            $(document.createElement("script")).attr({src:url,'data-js':'template','data-id': currentEditObj.instid}).appendTo($('body'));
            //右边编辑模块情况，如果没有选择任何控件进行编辑就会有警示
            $("#edit-component").find('.alert-danger').css('display','none');
            $("#edit-area-submit").css('display','');
        });
        // $("#edit-container").html(JSON.stringify(currentEditObj));
    };

    /**
     * 编辑表单标题和描述函数
     */
    var editFormCfg = function () {
        //console.log(pageConfig);
        $("#template-html").load("template/FormEdit.html",function () {
            pageConfig.lang = '';
            if (typeof(langs) != 'undefined') {
                pageConfig.lang = {};
                var fName = pageConfig.formName;
                var desc = pageConfig.description;
                pageConfig.lang.langs = pageConfig.lang.langs || '';
                pageConfig.lang.langs = langs;
                _.forEach(langs, function (lang) {
                    pageConfig.lang[lang] =  pageConfig.lang[lang] || {};
                    lang == 'zh' ? pageConfig.lang[lang]['formName'] = fName : pageConfig.lang[lang]['formName'] = '';
                    lang == 'zh' ? pageConfig.lang[lang]['description'] = desc : pageConfig.lang[lang]['description'] = '';
                });
            }
            $("#edit-area-form .edit-area-body").css("display","block");
            //针对对应的控件加载相对应的静态模板
            $("#edit-area").html(template("template-FormEdit",pageConfig));
            //针对对应的控件引入对应的JS文件
            var url = "template/FormEdit.js";
            $('script[data-js|="template"]').remove();
            $(document.createElement("script")).attr({src:url,'data-js':'template'}).appendTo($('body'));
            //右边编辑模块情况，如果没有选择任何控件进行编辑就会有警示
            $("#edit-component").find('.alert-danger').css('display','none');
            $("#edit-area-submit").css('display','');
        });
        // $("#edit-container").html(JSON.stringify(currentEditObj));
    };

    /**
     * 权限配置面板控制函数
     */
    var authFormCfg = function () {
        $('input[name="availableType"]').click(function() {
            if ($(this).val() == 'allUser') {
                $('#available-control').css('display','none');
            } else {
                $('#available-control').css('display','block');
            }
        })
        $('input[name="maintainType"]').click(function() {
            if ($(this).val() == 'allUser') {
                $('#maintain-control').css('display','none');
            } else {
                $('#maintain-control').css('display','block');
            }
        })
    }

    /**
     * 配置权限部门加载人员选择器控件
     */
    var getDepartmentMemberInput = function () {
        var attrCfg = _.clone(getAttrConfig('DepartmentMemberInput','form'));
        ReactDOM.render(React.createElement(eval('DepartmentMemberInput'), attrCfg.attr, null), document.getElementById('available-control'));
    }

    /**
     * 绑定事件函数，里面包括了为多个组件绑定相关函数
     */
    var bindEvent = function() {
        // 权限表单操作函数
        authFormCfg();
        // 表单标题编辑绑定函数
        $("#form-page-info").bind("click",editFormCfg);
        // 控件提交按钮绑定函数
        $("#edit-area-submit").bind("click",sCpFunc.saveChangeButton);
        // 顶部切换导航栏绑定函数
        $(".header-tabs-li").bind("click",headerNavClick);
        // 左侧切换导航栏绑定函数
        $(".header-tab").bind("click",leftNavClick);
        // 表单预览按钮绑定函数
        $(".preview-ico").bind("click",previewHandle);
        // 表单保存绑定函数
        $("#save_btn").bind("click",saveHandle);
        //
        //$('#available-control input[name="availableUser"]').bind("click",getDepartmentMemberInput);
        //$('#maintain-control input[name="availableUser"]').bind("click",getDepartmentMemberInput);
    };

    /**
     * 为编辑面板内的每个控件绑定编辑控件函数
     */
    var bindEditEvent = function () {
        $(".field").unbind("click").bind("click",editComponentCfg);
    };

    /**根据配置把页面渲染到设计器**/
    var parseConfigToDesigner = function(){
        var items = pageConfig.items;
        if (_.isEmpty(items)) return;
        var outLevelList = _.filter(items, function(it) { return it.pinstid == "" });
        var inLevelList = _.filter(items, function(it) { return it.pinstid != "" });
        //console.log(outLevelList);
        for(var i = 0; i < outLevelList.length; i++) {
            var item = _.find(outLevelList, function(it) { return it.row == i });
            if (!_.isEmpty(item)) {
                if(item.component == "ColumnPanel") {
                    var $it = $('<div class="ui-draggable form-layout form-layout_js"></div>');
                    $it.attr({ instid: item.instid, component: item.component, type: item.attr.type });
                    ReactDOM.render(React.createElement(eval(item.component), item.attr, null),$it.get(0));
                    appendLayoutToolbar($it);
                    $it.appendTo($("#widget-control"));
                    null != $it && $it.hasClass("form-layout_js") &&  pageAndColumnPanelSortable();
                } else {
                    var $it = $('<div class="ui-draggable field field_js field-active"></div>');
                    $it.attr({ instid: item.instid, component: item.component });
                    ReactDOM.render(React.createElement(eval(item.component), item.attr, null),$it.get(0));
                    appendFieldToolbar($it);
                    $it.removeAttr("style");
                    $it.appendTo($("#widget-control"));
                    // 控件绑定编辑事件
                    bindEditEvent();
                }
            }
        }

        _.each(inLevelList, function(item) {
            var $ly = $("#widget-control").find("div[instid='"+item.pinstid+"']");
            if($ly.length == 1){
                var $cell = $ly.find(".cell");
                var p = 0;
                $cell.each(function(i,cellDiv){ if($(cellDiv).attr("value") == (item.row+","+item.col)) p = i;});
                var $it = $('<div class="ui-draggable field field_js field-active" title="拖拽至页面中间区域"></div>');
                $it.attr({instid: item.instid, component: item.component});
                ReactDOM.render(React.createElement(eval(item.component), item.attr, null),$it.get(0));
                appendFieldToolbar($it);
                $it.appendTo($cell.get(p));
                // 控件绑定编辑事件
                bindEditEvent();
            }
        });
    };

    /**
     * 预览
     */
    var previewHandle = function() {
        pageConfig.items = AppUtil.parseHtmlToConfig($("#widget-control"),pageConfig.items);
        localStorage.setItem("cfg",JSON.stringify(pageConfig));
        window.open("preview.html","_blank");
    };

    /**
     * 保存表单
     */
    var saveHandle = function() {
        //需要校验字段名称不能为空，字段名称不能重复
        // 判断提交的组件ID是否有重复
        var isDuplicate = false;
        // 获取最新表单配置信息
        pageConfig.items = AppUtil.parseHtmlToConfig($("#widget-control"), pageConfig.items);
        // 获取一个不包括布局控件的控件数组
        var componentArr = _.filter(pageConfig.items, function (item) {
            return item.component != 'ColumnPanel';
        });

        // 筛选出一个只含有ID的数组
        var fieldNameArr = _.map(componentArr, function (i) {
            return i.attr.fieldName;
        });

        // 对ID的数组排序，然后获取一个数组里面有重复值的新数组
        var newArr = fieldNameArr.sort();
        var compareArr = [];
        for(var i = 0; i < newArr.length; i++) {
            if (newArr[i] == newArr[i+1]) {
                isDuplicate = true;
                compareArr.push(newArr[i],newArr[i+1]);
            }
        }

        // 从过滤的含有重复值的新数组拿出值，然后根据这个值从控件数组中萃取出重复值的控件的title
        var fileterArr = [];
        for (var i = 0; i <_.uniq(compareArr).length; i++) {
            var F = _.filter(componentArr, function (item) {
                return item.attr.fieldName == _.uniq(compareArr)[i];
            })
            var f = _.map(F,function (node) {
                return node.attr.title;
            })
            fileterArr.push(f);
        }

        // 整合含有重复ID的提示语句
        var tipsMsg = '';
        for (var i = 0; i < fileterArr.length; i++) {
            tipsMsg += fileterArr[i].join(',') + '的ID值重复了<br \/>';
        }
        if (isDuplicate) {
            layer.msg(tipsMsg, { offset: 't', anim: 2 });
        } else {
            // 判断是进行表单操作还是模板操作，调取不一样的接口地址
            var saveUrl = '';
            // 维护者和操作者的uid
            var reader = 'allUser', editor = 'allUser';
            if (urlObj.formType && urlObj.formType == '1') {
                // 保存表单权限配置
                saveAthConfig();
                saveUrl = WD_API.getDataSourceApi + FORM_ENGINE_API.save_form;
                // 获取配置信息中的权限信息，包括维护者和操作者的uid
                reader = (pageConfig.auth.availableType == 'allUser' && pageConfig.auth.availableType) || (pageConfig.auth.availableType == 'special' && '"' + pageConfig.auth.availableUser + '"');
                editor = (pageConfig.auth.maintainType == 'allUser' && pageConfig.auth.maintainType) || (pageConfig.auth.maintainType == 'special' && '"' + pageConfig.auth.maintainUser + '"');
            } else if(urlObj.formType && urlObj.formType == '2') {
                saveUrl = WD_API.getDataSourceApi + FORM_ENGINE_API.save_template;
            } else {
                // 保存表单权限配置
                saveAthConfig();
                saveUrl = WD_API.getDataSourceApi + FORM_ENGINE_API.save_form;
            }
            // 请求参数对象
            var param = {
                'fdId': pageConfig.formId,
                'fdCategoryId': pageConfig.formCategoryId != '' ? pageConfig.formCategoryId : 1,
                'fdName': pageConfig.formName != '' ? pageConfig.formName : '表单',
                'fdDesc': pageConfig.description != '' ? pageConfig.description : '',
                'fdContent': encodeURI(JSON.stringify(pageConfig.items)),
                'fdOrder': 1,
                'fdStatus': '10',
                'isActiveVersion': 1,
                'isStandard': 1,
                'editorUids': reader, //"lich6,lich7"
                'readerUids': editor
            }

            http(saveUrl, param , {
                type: 'POST',
                //dataType: "jsonp"
            }).done(function(msg){
                if(msg.success == true) {
                    layer.msg(msg.data.message, { offset: 't', anim: 2 });
                } else {
                    layer.msg('保存失败', { offset: 't', anim: 2 });
                }
            }).fail(function() {
                layer.msg('保存失败', { offset: 't', anim: 2 });
            });
            var $page = $('<div></div>');
            AppUtil.parseConfigToHtml(pageConfig).appendTo($page);
        }
    };

    /*
    * @ 初始化权限配置里面的react控件
    * */
    var initAthConfigPage = function () {
        http(WD_API.getDataSourceApi + FORM_ENGINE_API.get_creater, {},{
            type: 'POST',
            dataType: "jsonp"
        }).done(function(msg){
            if(msg.success == true) {
                $('#available-control input[name="availableUserName"]').val(msg.data.cn);
                $('#availableUser-hidden').val(msg.data.uid);
                $('#maintain-control input[name="maintainUserName"]').val(msg.data.cn);
                $('#maintainUser-hidden').val(msg.data.uid);
            } else {
                return
            }
        }).fail(function() {
            return;
        });
    };

    /**
     * 初始化页面
     */
    var loadPage = function() {
        var formId = urlObj.fdId;
        var formType = urlObj.formType;
        var loadUrl = '' , copyUrl = '';

        if (_.isEmpty(formId)) {
            pageConfig = AppUtil.getInitPageConfig('', []);
            pageConfig.formName = '表单标题';
            $('#form-page-info .form-title').html(pageConfig.formName);
        } else {
            if (formType == '1') {
                loadUrl = WD_API.getDataSourceApi + FORM_ENGINE_API.load_form_content + formId;
            } else if (formType == '2') {
                loadUrl = WD_API.getDataSourceApi + FORM_ENGINE_API.load_template_content + formId;
            }

            http(loadUrl, {}, {
                type:"POST"
            }).done(function(rtn) {
                //console.log(rtn);
                if (rtn.success && !_.isEmpty(rtn.data)) {
                    if (!_.isEmpty(rtn.data.fdContent) && rtn.data.fdContent != '') {
                        pageConfig = AppUtil.getInitPageConfig(formId, JSON.parse(decodeURIComponent(rtn.data.fdContent)));
                        //setTimeout(function () {
                            parseConfigToDesigner();
                        //},500);
                    } else {
                        // 如果从formId调用接口获取不到相关信息，就继续尝试读取其它Id值接口获取的数据
                        if (_.isEmpty(urlObj.copyFormId) && _.isEmpty(urlObj.copyTemplateId)) {
                            pageConfig = AppUtil.getInitPageConfig(formId, []);
                        } else {
                            if (!_.isEmpty(urlObj.copyFormId)) {
                                copyUrl = WD_API.getDataSourceApi + FORM_ENGINE_API.load_form_content + urlObj.copyFormId;
                            } else if (!_.isEmpty(urlObj.copyTemplateId)) {
                                copyUrl = WD_API.getDataSourceApi + FORM_ENGINE_API.load_template_content + urlObj.copyTemplateId;
                            }
                            http(copyUrl, {}, {
                                type:"POST"
                            }).done(function(rtn) {
                                //console.log(rtn);
                                if (rtn.success && !_.isEmpty(rtn.data)) {
                                    if (!_.isEmpty(rtn.data.fdContent) && rtn.data.fdContent != '') {
                                        pageConfig = AppUtil.getInitPageConfig(formId, JSON.parse(decodeURIComponent(rtn.data.fdContent)));
                                        //setTimeout(function () {
                                            parseConfigToDesigner();
                                        //},500);
                                    } else {
                                        pageConfig = AppUtil.getInitPageConfig(formId, []);
                                    }
                                } else {
                                    return;
                                }
                            }).fail(function () {
                                return;
                            })
                        }
                    }
                    pageConfig.formName = rtn.data.fdName != '' ? rtn.data.fdName : '表单标题';
                    pageConfig.description = rtn.data.fdDesc != '' ? rtn.data.fdDesc : '';
                    pageConfig.formCategoryId = rtn.data.fdCategoryId != '' ? rtn.data.fdCategoryId : 1;
                } else {
                    pageConfig = AppUtil.getInitPageConfig(formId,[]);
                    pageConfig.formName = '表单标题';
                    pageConfig.description = '';
                    pageConfig.formCategoryId = 1;
                }
                $('#form-page-info .form-title').html(pageConfig.formName);
                $('#form-page-info .form-description').html(pageConfig.description);
            }).fail(function () {
                pageConfig = AppUtil.getInitPageConfig(formId,[]);
                pageConfig.formName = '表单标题';
                pageConfig.description = '';
                pageConfig.formCategoryId = 1;
                $('#form-page-info .form-title').html(pageConfig.formName);
            });
        }
        //pageConfig = AppUtil.getInitPageConfig("",[]);
        //urlObj = AppUtil.getArgsFromHref(); //URL地址中获得参数对象
        // 加载完所有控件js后再渲染左侧菜单
        renderLeftBar(componentDraggableEvents);
        initAthConfigPage();
    };

    /**
     * 初始化加载函数
     */
    var initApp = function() {
        urlObj = AppUtil.getArgsFromHref(); //URL地址中获得参数对象
        if (urlObj.formType == '2') {
            $('.header-tabs-li').eq(1).css('display','none');
        }
        loadInitComponents(loadPage);
        layer.config({ path: 'lib/layer/' });
        bindEvent();
    };

    $(document).ready(function(){ initApp(); });

})();
