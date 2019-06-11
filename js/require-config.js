/**
 * Created by Veket on 2015/9/28.
 */
var JR_CONFIG={
    REQUIRE:{
        'paths':{
            'jquery':'lib/jquery/jquery.min',
            'jquery.cookie':'lib/jquery/jquery.cookie.min',
            'jquery.page':'lib/jquery/jquery.page',
            'text':'lib/require/text.min',
            'css':'lib/require/css.min',
            'domReady':'lib/require/domReady.min',
            'underscore':'lib/underscore/underscore-min',
            'underscore.string':'lib/underscore/underscore.string.min',
            'router':'lib/router/kendo.router.min',
            'layer':'lib/layer/layer',
            'laydate':'lib/laydate/laydate',
            'valid':'lib/valid/validform.min',
            'chart':'lib/chart/chart.min',
            'owl':'lib/owl/owl.carousel.min',
            'jcrop':'lib/jcrop/scripts/jQueryRotate',
            'imgareaselect':'lib/jcrop/scripts/jquery.imgareaselect.pack',
            'base64':'lib/cryptojs/base64.min',
            'calendar':'lib/calendar/LunarCalendar',
            'jquery.browser':'lib/jquery-browser/jquery.browser.min',
            'jquery.ui.widget':'lib/jquery-file-upload/js/vendor/jquery.ui.widget.min',
            'fileupload':'lib/jquery-file-upload/js',
            'slimscroll':'lib/jquery/jquery.slimscroll',
            'app':'js/app-util'
        },
        'shim':{
            'jquery':{'exports':'$'},
            'underscore': {'exports': '_'},
            'underscore.string': {'exports': '_.str','deps':['underscore']},
            'layer':{'deps':['jquery']},
            'owl':{'deps':['jquery']},
            'fileupload/jquery.fileupload.min':['fileupload/jquery.iframe-transport.min'],
            'valid':{'deps':['jquery']}
        },
        'urlArgs':'v=1.0.0'
    },
    SERVER:{
        T_TOKEN_NAME:"mideatest_sso_token",
        N_TOKEN_NAME:"midea_sso_token",
        D_API_URL:'http://10.16.69.202:10002/mfp/',
        T_SIT_API_URL:'https://jrsit.midea.com/mfp/',
        T_UAT_API_URL:'https://jruat.midea.com/mfp/',
        N_API_URL:'https://jrportal.midea.com/mfp/',
        T_EDIT_PASSWORD_URL:'http://10.16.15.54:8087/mideaidm-ess/security/passwordUpdate',
        N_EDIT_PASSWORD_URL:'http://idmess.midea.com/ess/security/passwordexpired',
        D_LOGOUT_URL:"main.html",
        T_SIT_LOGOUT_URL:'http://oamsit.midea.com/sso-service/CleanupCookie?app=https://jrsit.midea.com/jrPortal/main.html',
        T_UAT_LOGOUT_URL:'http://oamuat.midea.com/sso-service/CleanupCookie?app=https://jruat.midea.com/jrPortal/main.html',
        N_LOGOUT_URL:'http://idmws.midea.com/sso-service/CleanupCookie?app=https://jrportal.midea.com/jrPortal/main.html',
        T_SIT_BASIC_P_URL:'http://10.16.24.188:9080/ifsp_portal/login/login_door.jsp',
        T_UAT_BASIC_P_URL:"http://10.16.25.87:9080/ifsp_portal/login/login_door.jsp",
        N_BASIC_P_URL:'https://jr.midea.com/ifsp_portal/login/login_door.jsp',
        N_REPORT_URL:"https://rp.midea.com/FineReport/ReportServer?reportlet=fbap/",
        IS_D_ENV:true,
        IS_S_ENV:false,
        IS_U_ENV:false,
        IS_N_ENV:false
    }
};
require.config(JR_CONFIG.REQUIRE);

var LOGIN_USER="midea_usr_data";
var TOKEN_NAME=JR_CONFIG.SERVER.T_TOKEN_NAME;
var EDIT_PASSWORD_URL=JR_CONFIG.SERVER.T_EDIT_PASSWORD_URL;
var LOGOUT_URL=JR_CONFIG.SERVER.D_LOGOUT_URL;
var BASIC_P_URL="";
var TEMP_URL=JR_CONFIG.SERVER.D_API_URL;
var __initEnvParam=function(){
    if(JR_CONFIG.SERVER.IS_S_ENV){
        LOGOUT_URL=JR_CONFIG.SERVER.T_SIT_LOGOUT_URL;
        BASIC_P_URL=JR_CONFIG.SERVER.T_SIT_BASIC_P_URL;
        TEMP_URL=JR_CONFIG.SERVER.T_SIT_API_URL;
    }
    if(JR_CONFIG.SERVER.IS_U_ENV){
        LOGOUT_URL=JR_CONFIG.SERVER.T_UAT_LOGOUT_URL;
        BASIC_P_URL=JR_CONFIG.SERVER.T_UAT_BASIC_P_URL;
        TEMP_URL=JR_CONFIG.SERVER.T_UAT_API_URL;
    }
    if(JR_CONFIG.SERVER.IS_N_ENV){
        TOKEN_NAME=JR_CONFIG.SERVER.N_TOKEN_NAME;
        EDIT_PASSWORD_URL=JR_CONFIG.SERVER.N_EDIT_PASSWORD_URL;
        LOGOUT_URL=JR_CONFIG.SERVER.N_LOGOUT_URL;
        BASIC_P_URL=JR_CONFIG.SERVER.N_BASIC_P_URL;
        TEMP_URL=JR_CONFIG.SERVER.N_API_URL;
    }
};
__initEnvParam();

var JR_API={
    login_info:TEMP_URL+'anonymous/reception.do?method=midea.mfp.user.getLogInfo&callback=null',
    info_get:TEMP_URL+'anonymous/reception.do?method=midea.mfp.info.search&callback=null',//首页资讯中心
    product_get:TEMP_URL+'/anonymous/reception.do?method=midea.mfp.product.recommend.listByTypeId',//首页推荐产品
    type_search:TEMP_URL+'commonInfo.do?method=midea.mfp.type.search&callback=null',
    type_get:TEMP_URL+'anonymous/reception.do?method=midea.mfp.type.get&callback=null',
    recommend_search:TEMP_URL+'anonymous/reception.do?method=midea.mfp.info.recommend.search&callback=null',
    info_list:TEMP_URL+'anonymous/reception.do?method=midea.mfp.info.search&callback=null',
    info_detail:TEMP_URL+'anonymous/reception.do?method=midea.mfp.info.get&callback=null',
    search_list:TEMP_URL+'anonymous/reception.do?method=midea.mfp.info.search&callback=null',
    product_listtype:TEMP_URL+'anonymous/reception.do?method=midea.mfp.product.list',//美易贷等产品列表数据查询，匿名
    user_signin:TEMP_URL+'anonymous/reception.do?method=midea.mfp.user.add&callback=null',//注册
    phone_send:TEMP_URL+'anonymous/reception.do?method=midea.mfp.user.getIdentifyingCode',//发短信
    get_basicInfo:TEMP_URL+'user.do?method=midea.mfp.user.getBasicInformation&callback=null',
    user_checkname:TEMP_URL+'anonymous/reception.do?method=midea.mfp.user.info.valid&callback=null',//用户名查重
    user_info:TEMP_URL+'user.do?method=midea.mfp.user.getBasicInformation&callback=null',
    user_subInfo:TEMP_URL+'user.do?method=midea.mfp.user.updateBasicInformation&callback=null',
    category:TEMP_URL+'anonymous/reception.do?method=midea.mfp.product.list&isProdut=0',
    upload:TEMP_URL+'attach.do?method=midea.mfp.attach.add',
    product_flow:TEMP_URL +'anonymous/reception.do?method=midea.mfp.product.worksheet.get&callback=null',//流程节点查询，匿名
    user_loanList:TEMP_URL+'loan.do?method=midea.mfp.user.loan.list',//贷款意向查询,我的金融表格数据查询
    workbench_search_list:TEMP_URL+'loan.do?method=midea.mfp.loanapp.workbench.list',//工作台查询集合
    product_find:TEMP_URL+'anonymous/reception.do?method=midea.mfp.product.find',//查找产品详情信息，匿名
    user_avatar_get:TEMP_URL+'attach.do?method=midea.mfp.attach.headpic',//获取头像
    user_info_get:TEMP_URL+'user.do?method=midea.mfp.user.get&callback=null',//获取用户信息，加载我的金融额度
    loan_add:TEMP_URL+'loan.do?method=midea.mfp.loanapp.add',//添加意向申请表单提交
    user_logout:TEMP_URL+'user.do?method=midea.mfp.user.logout&callback=null',//登出
    user_avatar_setting:TEMP_URL+"attach.do?method=midea.mfp.attach.add&isAddHeader=1",
    custclass_get:TEMP_URL+'anonymous/reception.do?method=midea.mfp.user.cust.class.listbyproduct',//企业中心，根据身份查找对应产品，匿名
    code_check_get:TEMP_URL+'anonymous/reception.do?method=midea.mfp.user.checkcode&callback=null',
    loanapp_find:TEMP_URL+'loan.do?method=midea.mfp.loanapp.workbench.find',//可视化接口,获取金融工作台意向申请
    approve_loanapp_auditHandle:TEMP_URL+'loan.do?method=midea.mfp.loanapp.auditHandle',//审批意向申请
    agency_check:TEMP_URL+'anonymous/reception.do?method=midea.mfp.user.checkAgency&callback=null',//组织机构代码唯一性
    info_inline:TEMP_URL+'info.do?method=midea.mfp.info.listByMideaPerson',//最新资讯登陆列表
    info_inlineDetail:TEMP_URL+'info.do?method=midea.mfp.info.detailForMideaPerson',
    product_listtype_login:TEMP_URL+'product.do?method=midea.mfp.product.listByUserId',//美易贷等产品列表数据查询，登陆后
    category_in:TEMP_URL+"product.do?method=midea.mfp.product.listByCustomerClass&isProdut=0",
    forward:TEMP_URL+"anonymous/reception.do?method=midea.mfp.user.forward&forward=",
    workbench_authentication:TEMP_URL+"authentication.do?method=mfp.authentication.refresh.my",
    recommend_list:TEMP_URL+'anonymous/reception.do?method=midea.mfp.adv.recommend.listAll&callback=null',
    company_filePath_get:TEMP_URL+'attach.do?method=midea.mfp.attach.path.get',
    file_download:TEMP_URL+"attach.do?method=midea.mfp.attach.download",
    workbench_read_list:TEMP_URL+"messageCenter.do?method=midea.mfp.messageCenter.getInfo",
    checkphone_get:TEMP_URL+"anonymous/reception.do?method=midea.mfp.user.findphone",
    get_repayment_info:TEMP_URL+"/loan.do?method=midea.mfp.user.loan.getRepaymentInfo",//还款记录及计划
    get_yanzhengma_info:TEMP_URL+"anonymous/reception.do?method=midea.mfp.createuser.code",//验证码获取图片
    get_yanzhengmajiaoyan_info:TEMP_URL+"anonymous/reception.do?method=midea.mfp.user.validCaptcha",//验证码获取图片
};