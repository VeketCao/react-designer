/**
 * Created by Veket on 2016/7/28.
 */
(function(){
    var s=window.AppUtil={};
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    /**
     * UUID生成器
     * @param len
     * @param radix
     * @returns {string}
     */
    s.getUUID=function(len,radix){
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };

    /**
     * 组件左侧图标集合
     */
    s.componentIco = {
        TextInput:"./img/components/TextInput.png",
        DateTimePicker:"./img/components/DateTimePicker.png",
        RadioBox:"./img/components/RadioBox.png",
        CheckBox:"./img/components/CheckBox.png",
        DropCheck:"./img/components/DropCheck.png",
        DropDownBox:"./img/components/DropCheck.png",
        NumberInput:"./img/components/NumberInput.png",
        FileInput:"./img/components/FileInput.png",
        ReferenceFileInput:"./img/components/ReferenceFileInput.png",
        Divider:"./img/components/Divider.png",
        CitySelect:"./img/components/CitySelect.png",
        StructureInput:"./img/components/StructureInput.png",
        SeekBar:"./img/components/SeekBar.png",
        TimePicker:"./img/components/TimePicker.png",
        EmailInput:"./img/components/EmailInput.png",
        PhoneInput:"./img/components/PhoneInput.png",
        DateTimeBetweenPicker:"./img/components/DateTimeBetweenPicker.png",
        DepartmentMemberInput:"./img/components/DepartmentMemberInput.png",
        DescriptionInput:"./img/components/DescriptionInput.png",
        TextLink:"./img/components/TextLink.png",
        SubmitButton:"./img/components/SubmitButton.png",
        DetailList:"./img/components/DetailList.png",
    }

    /**
     * 加载组件
     * @param urls
     * @param cb
     */
    s.loadComponentJs = function(urls,cb) {
        var Head = $('head');
        urls = _.isArray(urls) ? urls : [urls];
        var exec = _.after(urls.length, function() {
            if(cb&&typeof(cb) == "function")cb();
        });

        _.each(urls, function(url) {
            var panel = $('<script></script>').attr('scr',url);
            panel.appendTo($('head')).load(url,exec);
            //$(document.createElement("script")).attr({src:url, type: 'text/javascript'}).appendTo(Head).load(url,exec); //ie11不兼容
        });
    };

    /**
     * 获取url参数，可以带参数或者不带参数
     */
    s.getArgsFromHref = function() {
        var sArgName = '';
        if(arguments.length > 0) {
            sArgName = arguments[0];
        }
        var sHref = window.location.href;
        var args = sHref.split("?");
        if(!args[1]) return '';
        var str = args[1];
        args = str.split("&");
        if(sArgName != '') {
            var retval = "";
            for(var i = 0; i < args.length; i++ ) {
                str = args[i];
                var arg = str.split("=");
                if(arg.length <= 1) continue;
                if(arg[0] == sArgName) retval = arg[1];
            }
            return retval;
        } else {
            var retval = {};
            for(var i = 0; i < args.length; i++ ) {
                var arg = args[i].split("=");
                retval[arg[0]] = arg[1];
            }
            return retval;
        }
    };

    /**
     * 初始化页面配置
     * @param formId 表单id
     * @param formName 表单名称
     * @param status 表单状态 edit readonly
     * @param formDesc 表单描述
     */
    s.getInitPageConfig = function(formId,items) {
        return{
            formId: formId, //表单Id
            formName: '', //表单名字
            formModelName: '', //表单所属模板名称
            formCategoryName: '', //表单所属分类名字
            formCategoryId: '', //表单所属分类Id
            status: '',
            description: '',
            createdBy: '',
            createdDate: '',
            items: items,
            addItem: function(newItem) {
                var temp = _.find(this.items, function(it) {
                    return it.instid == newItem.instid
                });
                if(_.isEmpty(temp)) {
                    this.items.push(newItem);
                }
            },
            removeItem: function(instid) {
                this.items = _.filter(this.items, function(it){
                    return it.instid!= instid
                });
            },
            auth: {
                availableType : 'allUser', //可使用者 - 所有人allUser 或 特定人special
                availableUser: '',
                maintainType: 'allUser', //可维护者 - 所有人allUser 或 特定人special
                maintainUser: '',
                // reader : 'all', //默认阅读者
                // readerEdit : 'yes', //起草人可以修改可阅读者
                // effectiveTime : 'before', //权限生效时间
                // fileOpen : 'all', //附件打开
                // fileOpenEdit : 'yes', //可修改附件权限
                // fileDownload : 'all', //附件下载
                // fileDownloadEdit : 'yes' //可修改附件权限
            }
        };
    };


    /**
     * 解析控件位置,过滤掉无用控件
     */
    s.parseHtmlToConfig = function($c,items) {
        var results = [];
        $c.children().each(function(i,domDiv) {
            var $this = $(domDiv);
            var _instid = $this.attr("instid");
            var item = _.find(items,function(it) {
                return it.instid==_instid
            });
            if(!_.isEmpty(item)) {
                item.row=i;
                item.col=0;
                item.pinstid="";
                results.push(item);
            }
            if($this.attr("component") == "ColumnPanel") {//布局组件
                $this.find(".cell_js").each(function(j,cDiv) {
                    var $field = $(cDiv).find(".field");
                    if($field.length == 1) {
                        var childinstid=$field.attr("instid");
                        var p= $(cDiv).attr("value").split(",");
                        var childItem=_.find(items,function(it) {
                            return it.instid == childinstid
                        });
                        if(!_.isEmpty(childItem)) {
                            childItem.pinstid=_instid;
                            childItem.row=parseInt(p[0],0);
                            childItem.col=parseInt(p[1],0);
                            results.push(childItem);
                        }
                    }
                });
            }
        });
        return results;
    };


    /**
     * 根据配置生成预览html
     */
    s.parseConfigToHtml = function(cfg){
        // var $c=$('<div class="page-preview page-view"></div>');
        // console.log(cfg);
        var $c = $('<div></div>');
        var items = cfg.items;
        if (cfg.formName == '' && _.isEmpty(items)) return $c;
        var $head = $("<div></div>");
        var tit = React.createElement('h2', { className: 'form-title' }, cfg.formName || '表单标题');
        var desc = React.createElement('p', { className: 'form-description' }, cfg.description);
        ReactDOM.render(React.createElement('div', { className: 'page-info' }, [tit,desc]), $head.get(0));
        $head.appendTo($c);
        //if(_.isEmpty(items)) return $c;
        var outLevelList = _.filter(items,function(it){ return it.pinstid==""});
        var inLevelList = _.filter(items,function(it){ return it.pinstid!=""});

        for(var i = 0; i < outLevelList.length; i++){
            var item = _.find(outLevelList,function(it){return it.row==i});
            if (!_.isEmpty(item)) {
                var $it = $("<div></div>");
                $it.attr({instid:item.instid,component:item.component});
                if(item.component == "ColumnPanel") {
                    $it.addClass('form-layout');
                } else {
                    $it.addClass('field');
                }
                ReactDOM.render(React.createElement(eval(item.component),item.attr, null),$it.get(0));
                $it.appendTo($c);
            }
        }

        _.each(inLevelList,function(item){
            var $ly = $c.find("div[instid='"+item.pinstid+"']");
            if($ly.length == 1){
                var $cell = $ly.find(".cell");
                var p = 0;
                $cell.each(function(i,cellDiv) {
                    if($(cellDiv).attr("value") == (item.row+","+item.col)) p = i;
                });
                var $it = $("<div></div>");
                $it.attr({instid:item.instid,component:item.component});
                $it.addClass('field');
                ReactDOM.render(React.createElement(eval(item.component),item.attr, null),$it.get(0));
                $it.appendTo($cell.get(p));
            }
        });
        return $c;
    };

    /**
     * 全局渲染表单方法
     * @obj
     */
    s.renderFrom = function (obj) {
        var data = obj || '';
        if (data instanceof String == true) {
            AppUtil.parseConfigToHtml(JSON.parse(data)).appendTo($(".page-view"));
        } else {
            AppUtil.parseConfigToHtml(data).appendTo($(".page-view"));
        }
    };

    /**
     * 全局保存表单方法
     * @obj
     */
    s.saveFrom = function (obj) {
        var pageConfig = obj || {};
        pageConfig.items = AppUtil.parseHtmlToConfig($("#widget-control"),pageConfig.items);
        console.log(JSON.stringify(pageConfig));
        var $page = $('<div></div>');
        AppUtil.parseConfigToHtml(pageConfig).appendTo($page);
    };

    /**
     * 全局校验方法
     * @param $form
     */
    s.validateForm = function ($form) {
        var validResult = true;
        $form = $form || $('body');
        $form.find('div[data-to-valid="true"]').each(function(i,dom){
            var reg = $(dom).attr('data-valid-rule');
            var v = $(dom).attr('data-field-value')||'';
            var msg = $(dom).attr('data-valid-msg');
            if(!reg) return;
            //执行校验规则
            if(reg.indexOf('function(v)')!=-1) {
                var temp = reg.split('function(v)');
                var exp = '(function(){var v="'+v+'";'+temp[1].substring(1,temp[1].length-1)+'}())';
                validResult = eval(exp);
            } else {
                validResult = eval(reg).test(v);
            }
            //根据校验结果渲染dom
            if(validResult) {
                $(dom).find('.valid-area').removeClass('valid-area-error');
                $(dom).find('.valid-msg').removeClass('valid-msg-error').addClass('valid-msg-right').text('').show();
            } else {
                $(dom).find('.valid-area').addClass('valid-area-error');
                $(dom).find('.valid-msg').removeClass('valid-msg-right').addClass('valid-msg-error').text(msg).show();
            }
        });
        return validResult;
    }
})();