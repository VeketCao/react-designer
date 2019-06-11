/**
 * author by Laisf on 2017/1/18.
 */
$(document).ready(function () {

    // 添加选项条目html内容
    var option_template='<div class="options-list">'+
        '<input style="margin-top: 5px; width: 100px;display: inline-block;" name="options" class="input-box" type="text" value=""/>'+
        '<a class="icon-delete" />'+
        '</div>';

    /*
     * @ 对页面一些重要按钮绑定函数
     * */
    var bindEvent = function () {
        var _container = "#edit-area";
        $(".icon-delete",_container).unbind("click").bind("click",function () {
            $(this).parent().remove();
            pushOptionData();
            saveComponentParmFunc.saveChangeButton();
        });
        $(".icon-add",_container).unbind("click").bind("click",function () {
            $(this).parent().after(option_template);
            pushOptionData();
            saveComponentParmFunc.saveChangeButton();
            $(".options-list .input-box").unbind("keyup").bind('keyup',function () {
                pushOptionData();
                saveComponentParmFunc.saveChangeButton();
            });
        });
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
        });
        $('input[type="text"]').unbind("keyup").bind('keyup',function () {
            if ($(this).attr('name') == 'title' || $(this).attr('name') == 'description' || $(this).attr('name') == 'validMsg') {
                pushTextData($(this));
                // 调用全局保存控件编辑属性方法
                saveComponentParmFunc.saveChangeButton();
            } else {
                pushOptionData();
                // 调用全局保存控件编辑属性方法
                saveComponentParmFunc.saveChangeButton();
            }
        })
        /*$(".options-list .input-box").unbind("keyup").bind('keyup',function () {
         pushOptionData();
         });
         $("#input-title").unbind("keyup").bind('keyup',function () {
         pushTextData($(this));
         });
         $("#input-validMsg").unbind("keyup").bind('keyup',function () {
         pushTextData($(this));
         });*/
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
     * @ 将option条目的输入内容传送到zh_前缀的hidden域
     * */
    var pushOptionData = function () {
        var list = $(".options-list .input-box");
        var option_name = list.eq(0).attr('name');
        var zh_input = $('input[name="zh_'+ option_name +'"]');
        var _text = '';
        list.each(function(i) {
            i == list.size() - 1 ? _text += $(this).val() : _text += $(this).val() + ',';
        });
        zh_input.val(_text);
    };

    /*
     * @ 页面加载函数
     * */
    var init = function () {
        var _container = "#edit-area";
        bindEvent();
        pushOptionData();
        $(".add-other",_container).unbind("click").bind("click",function () {
            $('#options-list-box').append(option_template);
            bindEvent();
            saveComponentParmFunc.saveChangeButton();
        });
        //
        $('.international-icon').click(function() {
            //var _id = $(this).attr('id');
            var _input = $(this).prev();
            if (_input.attr('class') == 'input-box') {
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
            } else if (_input.attr('id') == 'options-list-box') {
                // 获取点击按钮的id
                var _id = $(this).attr('id');
                //var data = $(this).attr('data-value');
                var hidden_input = $('input[data-value|="'+ _id +'"]');
                var options_input = $('.options-list').find('input[name="options"]');
                var _text = '';
                options_input.each(function(i) {
                    i == options_input.size() - 1 ? _text += $(this).val() : _text += $(this).val() + '\r';
                })
                var html = '';
                if (hidden_input.size() > 0) {
                    if (hidden_input.size() == 1) {
                        var _label = hidden_input.attr('name').split('_')[0];
                        html += '<div style="height: 200px;">'+LANG_ENVIRONMENT[_label]+'<textarea class="i18n_options" style="width: 100%; height: 150px;">'+ _text +'</textarea></div>';
                    } else {
                        for (var i = 0; i < hidden_input.size(); i++) {
                            var _label = hidden_input.eq(i).attr('name').split('_')[0];
                            if (i == 0) {
                                html += '<p style="border-bottom: 1px solid #ddd; font-size: 12px;">一行代表一个选项</p><div style="height: 200px;"><p style="float: left; width: 100px; padding: 5px;">'+LANG_ENVIRONMENT[_label]+'<textarea class="i18n_options" style="width: 100%; height: 150px;">'+ _text +'</textarea></p>';
                            } else if (i ==  hidden_input.size() - 1) {
                                html += '<p style="float: left; width: 100px; padding: 5px;">'+LANG_ENVIRONMENT[_label]+'<textarea class="i18n_options" style="width: 100%; height: 150px;">'+ _text +'</textarea></p></div>';
                            } else {
                                html += '<p style="float: left; width: 100px; padding: 5px;">'+LANG_ENVIRONMENT[_label]+'<textarea class="i18n_options" style="width: 100%; height: 150px;">'+ _text +'</textarea></p>';
                            }
                        }
                    }
                }
                layer.confirm('', {
                    title: '多语言设置',
                    content: html,
                    btn: ['确定','取消'] //按钮
                }, function() {
                    $('.i18n_options').each(function(i) {
                        if (i == 0) {
                            var newText = $(this).val().replace(/[\r\n]/g, ',');
                            var textArr = newText.split(',');
                            var _html = '';
                            for (var d = 0; d < textArr.length; d++) {
                                if (d == 0) {
                                    _html += '<div class="options-list">' +
                                        '<input style="margin-top: 5px; width: 100px; display: inline-block;" name="options" class="input-box" type="text" value="' + textArr[d] + '"/><a class="icon-add" />' +
                                        '</div>'
                                } else {
                                    _html += '<div class="options-list">' +
                                        '<input style="margin-top: 5px; width: 100px; display: inline-block;" name="options" class="input-box" type="text" value="' + textArr[d] + '"/><a class="icon-add" /><a class="icon-delete" />' +
                                        '</div>'
                                }
                            }
                            $('#options-list-box').html(_html);

                        }

                        // 把上面生成的input的值拿出来，先把换行符用“,”替代，然后在把字符里面的空格去掉
                        var _value = $(this).val().replace(/[\r\n]/g,',').replace(/(\s*)/g,"");
                        // 赋值前先把后面的多余","去掉，防止后面有多余换行符
                        hidden_input.eq(i).val(_value.replace(/[\,]+$/g, ''));
                    })
                    bindEvent();
                    saveComponentParmFunc.saveChangeButton();
                    $(".options-list .input-box").unbind("keyup").bind('keyup',function () {
                        pushOptionData();
                        saveComponentParmFunc.saveChangeButton();
                    });
                    layer.msg('保存成功', {icon: 1, time: 1000});
                }, function() {});
            }

        })
    };

    // 加载
    init();
});