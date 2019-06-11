/*
 * @ 配置应用所要调用的api接口
 * */
var LANG_ENVIRONMENT = {
    zh: '中文',
    en: '英语',
    jp: '日语'
};

var REG_EXES = {
    Natural_number: /^[\+\-]?(([1-9]\d*)|\d)$/,
    Positive_integer : /^[1-9]\d*$/,
    Non_null : /^[^\s]*$/g,
    Email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    Simple_number: /[^0-9]/g,
    Mobile_number: /^1[34578]\d{9}$/,
    Fixed_number: /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/
};

/*
* @ 配置应用所要调用的api接口
* */
var FORM_ENGINE_API = {
    load_form_content: '/mipFormEngine/form/getByFdId/', //根据相关参数获取表单内容
    load_template_content: '/mipFormEngine/formTemplate/getByFdId/', //根据相关参数获取模板内容
    load_components: '/mipFormEngine/component/list', //获取控件列表
    get_component_config: '/mipFormEngine/component/getJsonByFdId', //获取对应控件配置
    get_creater: '/mipFormEngine/user/getCurUser', //获取当前操作用户信息
    search_single_form: '/mipFormEngine/form/getByFdId', //查询单个表单
    search_form: '/mipFormEngine/form/search', //查询表单列表
    save_form: '/mipFormEngine/form/save', //保存表单和权限信息
    save_template: '/mipFormEngine/formTemplate/save' //保存模板
};