/**
 * Created by oli on 2017-1-16.
 */
$(document).ready(function(){
    /*
     * @ 对页面一些重要按钮绑定函数
     * */
    var bindEvent = function () {
        $("#input-title").unbind("keyup").bind('keyup',function () {
            pushTextData($(this));
        });
    }

    /*
     * @ 将input输入内容传送到zh_前缀的hidden域
     * */
    var pushTextData = function (Obj) {
        var text_name = Obj.attr('name');
        var zh_input = $('input[name="zh_'+ text_name +'"]');
        zh_input.val(Obj.val());
    };

    /*
     * @ 页面加载函数
     * */
    var init = function () {
        bindEvent();
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
                layer.msg('保存成功', {icon: 1, time: 1000});
            }, function() {});
        })
    }

    // 加载整体函数
    init();
});