/**
 * Created by Administrator on 2017-2-13.
 */

/*
 * @ 全局渲染表单方法
 * */
var renderFrom = function (data) {
    var data = data || '';
    if (data instanceof String == true) {
        AppUtil.parseConfigToHtml(JSON.parse(data)).appendTo($(".page-view"));
    } else {
        AppUtil.parseConfigToHtml(data).appendTo($(".page-view"));
    }
};

/*
 * @ 全局保存表单方法
 * */
var saveFrom = function (data) {
    var pageConfig = data || {};
    pageConfig.items = AppUtil.parseHtmlToConfig($("#widget-control"),pageConfig.items);
    console.log(JSON.stringify(pageConfig));
    var $page = $('<div></div>');
    AppUtil.parseConfigToHtml(pageConfig).appendTo($page);
};

/**
 * 全局校验方法
 * @param $form
 **/
var validateForm = function ($form) {
    var validResult = true;
    $form = $form || $('body');
    $form.find('div[data-to-valid="true"]').each(function(i,dom){
        var reg = $(dom).attr('data-valid-rule');
        var v = $(dom).attr('data-field-value')||'';
        var msg = $(dom).attr('data-valid-msg');
        if(!reg) return;
        //执行校验规则
        if(reg.indexOf('function(v)')!=-1){
            var temp = reg.split('function(v)');
            var exp = '(function(){var v="'+v+'";'+temp[1].substring(1,temp[1].length-1)+'}())';
            validResult = eval(exp);
        }else {
            validResult = eval(reg).test(v);
        }
        //根据校验结果渲染dom
        if(validResult){
            $(dom).find('.valid-area').removeClass('valid-area-error');
            $(dom).find('.valid-msg').removeClass('valid-msg-error').addClass('valid-msg-right').text('').show();
        }else{
            $(dom).find('.valid-area').addClass('valid-area-error');
            $(dom).find('.valid-msg').removeClass('valid-msg-right').addClass('valid-msg-error').text(msg).show();
        }
    });
    return validResult;
}