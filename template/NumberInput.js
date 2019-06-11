/**
 * Created by oli on 2017-1-16.
 */
$(document).ready(function(){
    /*
     * @ 对页面一些重要按钮绑定函数
     * */
    var bindEvent = function () {
        $('input[name="type"]').click(function() {
            if ($(this).val() == 'true') {
                $('#control-input').css('display','block');
                $('#control-output').css('display','none');
            } else {
                $('#control-input').css('display','none');
                $('#control-output').css('display','block');
            }
            saveComponentParmFunc.saveChangeButton();
        })
        $('#lenthLimitClick').change(function() {
            if ($(this).is(':checked')) {
                $(this).parent().siblings('.add-box').css('display','block');
            } else {
                $(this).parent().siblings('.add-box').css('display','none');
            }
            saveComponentParmFunc.saveChangeButton();
        })
        $('#requiredClick').change(function() {
            var _attr = $(this).attr('id') + 'Box';
            var obj = $('div[data-attr|="'+_attr+'"');
            if ($(this).is(':checked')) {
                obj.css('display','block');
            } else {
                obj.find('input[type=text]').val('');
                obj.css('display','none');
            }
            saveComponentParmFunc.saveChangeButton();
        })
        $('input[type="text"]').unbind("keyup").bind('keyup',function () {
            if ($(this).attr('name') == 'title' || $(this).attr('name') == 'description' || $(this).attr('name') == 'validMsg') {
                pushTextData($(this));
                // 调用全局保存控件编辑属性方法
                saveComponentParmFunc.saveChangeButton();
            } else if ($(this).attr('name') == 'min' || $(this).attr('name') == 'max') {
                isValidate($(this));
                // 调用全局保存控件编辑属性方法
                saveComponentParmFunc.saveChangeButton();
            }
        });
        /*$("#input-title").unbind("keyup").bind('keyup',function () {
            pushTextData($(this));
        });
        $("#input-validMsg").unbind("keyup").bind('keyup',function () {
            pushTextData($(this));
        });*/
    }

    /*
     * @ 对字数限制输入框的一些输入值判断
     * */
    var isValidate = function (obj) {
        var isOK = gloableRegExes.Natural_number.test(obj.val());
        if (isOK) {
            if ((obj.attr('name') == 'max' && parseInt(obj.val()) <= parseInt($('input[name="min"]').val())) || (obj.attr('name') == 'min' && parseInt(obj.val()) >= parseInt($('input[name="max"]').val()))) {
                $('input[name="min"]').val(0);
            }
        } else {
            obj.val(0);
        }
    };

    /*
     * @ 将input输入内容传送到zh_前缀的hidden域
     * */
    var pushTextData = function (Obj) {
        var text_name = Obj.attr('name');
        var hidden_input = $('input[data-value|="i18n_'+ text_name +'"]');
        hidden_input.eq(0).val(Obj.val());
        //var zh_input = $('input[name="zh_'+ text_name +'"]');
        //zh_input.val(Obj.val());
    };

    /*
     * @ 页面加载函数
     * */
    var init = function () {
        //
        bindEvent();
        //
        $('.international-icon').bind('click', function() {
            // 获取按钮前面的那个input
            var _input = $(this).prev();
            // 获取点击按钮的id
            var _id = $(this).attr('id');
            var _input_val = _input.val();
            // 获取input的name值，拿来判断对应的修改字段
            var _input_name = _input.attr('name');
            // 获取属性data-value的值，用来获取含有这个字段的hidden的值
            //var data = $(this).attr('data-value');
            var hidden_input = $('input[data-value|="'+ _id +'"]');
            // 用来初始化中文hidden的值
            hidden_input.each(function () {
                if($(this).attr('name') == ('zh_' + _input_name)) {
                    $(this).val(_input_val);
                }
            })
            // 用来拼接出弹出框的内容
            var html = '';
            for (var i = 0; i < hidden_input.size(); i++) {
                var _label = hidden_input.eq(i).attr('name').split('_')[0];
                html += '<p style="margin: 5px 0;">'+LANG_ENVIRONMENT[_label]+' <input type="text" class="'+ _id +'" value="'+ hidden_input.eq(i).val() +'" style="height: 25px; padding: 2px; border: 1px solid #ccc; font-size: 12px;"><\/input></p>';
            }
            layer.confirm('', {
                title: '多语言设置',
                content: html,
                btn: ['确定','取消'] //按钮
            }, function() {
                // 点击确定后赋值给编辑面板上对应的input
                $('.'+ _id).each(function(i) {
                    hidden_input.eq(i).val($(this).val().replace(/[\r\n]/g, ','));
                })
                _input.val($('.'+ _id).eq(0).val());
                saveComponentParmFunc.saveChangeButton();
                layer.msg('保存成功', {icon: 1, time: 1000});
            }, function() {});
        })
    }

    // 加载整体函数
    init();
});