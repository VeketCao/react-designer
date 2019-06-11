/**
 * author by Laisf on 2016/12/6.
 */
window.DateTimeBetweenPicker = React.createClass({
    getInitialState: function () {
        var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        var date = new Date(),
            //year = date.getFullYear(),
            //month = date.getMonth() + 1,
            //day = date.getDate(),
            //currentDate = year + '-' + month + '-' + day,
            objectParam = {};
        //objectParam.beginDate = currentDate;
        //objectParam.endDate = currentDate;
        return {
            isShowS: false,
            isShowE: false,
            isShowTimeSelect:false,
            isShowTimeSelect1:false,
            isCorrectS: false,
            isCorrectE: false,
            date: date,
            param: objectParam,
            h:'00',
            m:'00',
            s:'00',
            h1:'00',
            m1:'00',
            s1:'00',
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    componentWillMount: function(){
        var isLoadTime = this.props.locationTime;
        if(isLoadTime == 'true') {
            var date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                currentDate = year + '-' + month + '-' + day,
                objectParam = {};
            objectParam.beginDate = currentDate;
            objectParam.endDate = currentDate;
            this.setState({
                isCorrectS: true,
                isCorrectE: true,
                param: objectParam,
                h:'00',
                m:'00',
                s:'00',
                h1:'00',
                m1:'00',
                s1:'00'
            });
        }
    },
    componentWillReceiveProps: function(nextProps) {
        //如果加载当前时间的参数改变，则判断是输出格式化时间还是输出空白
        var isLoadTime = nextProps.locationTime;
        if(isLoadTime == 'true') {
            var date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                currentDate = year + '-' + month + '-' + day,
                objectParam = {};
            objectParam.beginDate = currentDate;
            objectParam.endDate = currentDate;
            this.setState({
                isCorrectS: true,
                isCorrectE: true,
                param: objectParam,
                h:'00',
                m:'00',
                s:'00',
                h1:'00',
                m1:'00',
                s1:'00'
            });
        } else {
            var objectParam = {};
            this.setState({
                isCorrectS: false,
                isCorrectE: false,
                param: objectParam,
                h:'00',
                m:'00',
                s:'00',
                h1:'00',
                m1:'00',
                s1:'00'
            });
        }
    },
    componentDidUpdate:function(){
        //完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    formatDate:function (type) {
        var format = this.props.format||"";
        var date = '';
        if (type == 'S') {
            date = this.state.param.beginDate?new Date(this.state.param.beginDate.replace(/-/g,"/")):null;
        } else if(type == 'E') {
            date = this.state.param.endDate?new Date(this.state.param.endDate.replace(/-/g,"/")):null;
        }
        //var date = this.state.param.beginDate?new Date(this.state.param.beginDate):null;
        if(date instanceof Date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            var day = date.getDate();
            day = day < 10 ? "0" + day : day;
            // var hour = date.getHours();
            // hour = hour < 10 ? "0" + hour : hour;
            // var minute = date.getMinutes();
            // minute = minute < 10 ? "0" + minute : minute;
            // var second = date.getSeconds();
            // second = second < 10 ? "0" + second : second;
            switch (format.toUpperCase()) {
                case "Y-M-D":
                    return year+"-"+month+"-"+day;
                case "M-D-Y":
                    return month+"-"+day+"-"+year;
                case "D-M-Y":
                    return day+"-"+month+"-"+year;
                default:
                    return year+"-"+month+"-"+day;
            }
        } else {
            switch (format.toUpperCase()) {
                case "Y-M-D":
                    return "年-月-日";
                case "M-D-Y":
                    return "月-日-年";
                case "D-M-Y":
                    return "日-月-年";
                default:
                    return "年-月-日";
            }
        }
    },
    datePickerStart: function (data) {
        this.dayChange(data,0);
    },
    datePickerEnd: function (data) {
        this.dayChange(data,1);
    },
    showPickerS: function () {
        this.setState({
            isShowS: true
        });
        ClickAway.bindClickAway(this.hidePickerS, this.refs.dateS);
    },
    showPickerE: function () {
        this.setState({
            isShowE: true
        });
        ClickAway.bindClickAway(this.hidePickerE, this.refs.dateE);
    },
    dateEmpty:function (i) {
        // var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        var state = this.state;
        state.date = "";
        //var objectParam = {};
        if (i == 0) {
            state.isCorrectS = false;
            state.param.beginDate = '';
            state.h = '00';
            state.m = '00';
            state.s = '00';
        } else if (i == 1) {
            state.isCorrectE = false;
            state.param.endDate = "";
            state.h1 = '00';
            state.m1 = '00';
            state.s1 = '00';
        }
        // state.validRule = "function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}";
        this.setState(state);
        // objectParam.beginDate = "";
        // objectParam.endDate = "";
        // this.setState({
        //     isCorrect: false,
        //     param: objectParam,
        //     h:'00',
        //     m:'00',
        //     s:'00',
        //     validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        // });
    },
    dayChange: function (data,i) {
        // var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        var state = this.state;
        var dataDate = new Date(data.selectDate),
            start = new Date(this.state.param.beginDate.replace(/-/g,"/")),
            end = new Date(this.state.param.endDate.replace(/-/g,"/"));

        if(i == 0){
            if (state.isCorrectS == false && state.isCorrectE == false) {
                state.isCorrectS = true;
                state.dateS = dataDate;
                state.param.beginDate = data.selectDate;
                ClickAway.unbindClickAway(this.hidePickerS, this.refs.dateS);
                state.isShowS = false;
            } else {
                if(dataDate.getTime()<=end.getTime()){
                    state.isCorrectS = true;
                    state.dateS = dataDate;
                    state.param.beginDate = data.selectDate;
                    ClickAway.unbindClickAway(this.hidePickerS, this.refs.dateS);
                    state.isShowS = false;
                }
            }
            //state.validRule = "function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}";
        }else if(i == 1) {
            if (state.isCorrectS == false && state.isCorrectE == false) {
                state.isCorrectE = true;
                state.dateE = dataDate;
                state.param.endDate = data.selectDate
                ClickAway.unbindClickAway(this.hidePickerE, this.refs.dateE);
                state.isShowE = false;
            } else {
                if(dataDate.getTime()>=start.getTime()) {
                    state.isCorrectE = true;
                    state.dateE = dataDate;
                    state.param.endDate = data.selectDate
                    ClickAway.unbindClickAway(this.hidePickerE, this.refs.dateE);
                    state.isShowE = false;
                }
            }
            // state.validRule = "function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}";
        }

        this.setState(state);
        // ClickAway.unbindClickAway(this.hidePicker, this.refs.date);
    },
    hidePickerS: function () {
        this.setState({
            isShowS: false
        });
        ClickAway.unbindClickAway(this.hidePickerS, this.refs.dateS);
    },
    hidePickerE: function () {
        this.setState({
            isShowE: false
        });
        ClickAway.unbindClickAway(this.hidePickerE, this.refs.dateE);
    },
    getHour:function(e){
        var type = e.target.parentNode.getAttribute("data-type");
        var h = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        if(type==0){
            this.setState({
                h:h
            });
        }else{
            this.setState({
                h1:h
            });
        }
    },
    getMinute:function(e){
        var type = e.target.parentNode.getAttribute("data-type");
        var m = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        if(type==0){
            this.setState({
                m:m
            });
        }else{
            this.setState({
                m1:m
            });
        }
    },
    getSecond:function(e){
        var type = e.target.parentNode.getAttribute("data-type");
        var s = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        if(type==0){
            this.setState({
                s:s
            });
        }else{
            this.setState({
                s1:s
            });
        }
    },
    openHandle1:function () {
        this.setState({
            isShowTimeSelect1:true
        });
        ClickAway.bindClickAway(this.closeHandle1, this.refs.timeBox1);
    },
    closeHandle1:function () {
        this.setState({
            isShowTimeSelect1:false
        });
        ClickAway.unbindClickAway(this.closeHandle1, this.refs.timeBox1);
    },
    openHandle:function () {
        this.setState({
            isShowTimeSelect:true
        },function () {
            this.scrollRoll(0,this.state);
        }.bind(this));
        ClickAway.bindClickAway(this.closeHandle, this.refs.timeBox);
    },
    closeHandle:function () {
        this.setState({
            isShowTimeSelect:false
        });
        ClickAway.unbindClickAway(this.closeHandle, this.refs.timeBox);
    },
    liMouseOver:function (e) {
        if(e.target.className.indexOf("curr") == -1){
            $(e.target).siblings("li").not(".curr").css("background","#fff");
            e.target.style.background="#c1c1c1";
        }
    },
    liMouseLeave:function (e) {
        if(e.target.className.indexOf("curr") == -1){
            e.target.style.background="#fff";
        }
    },
    liClickHandle:function (e) {
        $(e.target).addClass("curr").siblings("li").removeClass("curr");
        e.target.style.background="#c1c1c1";
    },
    componentWillUpdate: function(props,state){
        if(state.isShowTimeSelect){
            $(this.refs.hour).stop().animate({scrollTop:state.h>$(this.refs.hour).height()*1.5?state.h*24:state.h*24-$(this.refs.hour).height()*0.4});
            $(this.refs.minute).stop().animate({scrollTop:state.m>$(this.refs.minute).height()*1.5?state.m*24:state.m*24-$(this.refs.minute).height()*0.4});
            $(this.refs.second).stop().animate({scrollTop:state.s>$(this.refs.second).height()*1.5?state.s*24:state.s*24-$(this.refs.second).height()*0.4});
        }
        if(state.isShowTimeSelect1){
            $(this.refs.hour1).stop().animate({scrollTop:state.h1>$(this.refs.hour1).height()*1.5?state.h1*24:state.h1*24-$(this.refs.hour1).height()*0.4});
            $(this.refs.minute1).stop().animate({scrollTop:state.m1>$(this.refs.minute1).height()*1.5?state.m1*24:state.m1*24-$(this.refs.minute1).height()*0.4});
            $(this.refs.second1).stop().animate({scrollTop:state.s1>$(this.refs.second1).height()*1.5?state.s1*24:state.s1*24-$(this.refs.second1).height()*0.4});
        }
    },
    // scrollRoll:function(type,state){
    //     if(type==0) {
    //         $(this.refs.hour).stop().animate({scrollTop: state.h > $(this.refs.hour).height() * 1.5 ? state.h * 24 : state.h * 24 - $(this.refs.hour).height() * 0.4});
    //         $(this.refs.minute).stop().animate({scrollTop: state.m > $(this.refs.minute).height() * 1.5 ? state.m * 24 : state.m * 24 - $(this.refs.minute).height() * 0.4});
    //         $(this.refs.second).stop().animate({scrollTop: state.s > $(this.refs.second).height() * 1.5 ? state.s * 24 : state.s * 24 - $(this.refs.second).height() * 0.4});
    //     }
    //     if(type==1){
    //         $(this.refs.hour1).stop().animate({scrollTop:state.h1>$(this.refs.hour1).height()*1.5?state.h1*24:state.h1*24-$(this.refs.hour1).height()*0.4});
    //         $(this.refs.minute1).stop().animate({scrollTop:state.m1>$(this.refs.minute1).height()*1.5?state.m1*24:state.m1*24-$(this.refs.minute1).height()*0.4});
    //         $(this.refs.second1).stop().animate({scrollTop:state.s1>$(this.refs.second1).height()*1.5?state.s1*24:state.s1*24-$(this.refs.second1).height()*0.4});
    //     }
    // },
    render:function () {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area' : null;
        var containerStyle = {
          fontSize:'12px',
            color:"#333"
        };
        var containerStyle_box = {
            position:'relative',
            display:'inline-block',
            width:'80px',
            padding: '0 8px',
            border: '1px solid #e1e1e1',
            borderRadius: '3px',
            background:'#fff',
            verticalAlign: 'middle',
            cursor: 'pointer',
            height:'28px',
            lineHeight:'28px',
        }
        var time_li_style = {
            height:'24px',
        }
        // var dateValue = this.formatDate();
        // dateValue = dateValue || "";
        var isCorrectS = this.state.isCorrectS;
        var isCorrectE = this.state.isCorrectE;
        var dateValue;
        if (isCorrectS && isCorrectE) {
            var dateValueS = this.formatDate('S');
            var dateValueE = this.formatDate('E');
            dateValue = (dateValueS+" "+this.state.h+":"+this.state.m+":"+this.state.s || "") + "~" + (dateValueE+" "+this.state.h1+":"+this.state.m1+":"+this.state.s1 || "");
        } else {
            dateValue = "";
        }
        var _title = this.props.title || '标题';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '标题';
            _description = this.props.lang[this.props.language]['description'] || '';
            _validMsg = this.props.lang[this.props.language]['validMsg'] || '校验不通过';
        }
        //console.log(dateValue);
        return (
            <div>
                <div data-field-name={this.props.fieldName || ""}
                     data-field-value={dateValue}
                     data-valid-rule={this.state.validRule}
                     data-valid-msg={_validMsg}
                     data-to-valid={this.props.toValid}>
                    <div className="form-component">
                        <div className="form-component-header">
                            <label className="form-component-title">{_title}{this.props.isRequired == 'true' && <span className="el-require">*</span>}</label>
                        </div>
                        <div className="form-component-group">
                            {
                                _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                            }
                            <div>
                                <div ref="dateS" className="data-time-input">
                                    <a style={{display: "block", width: '107px', background: "url(" + this.props.publicSrc + "calendar.png) no-repeat right center", color:'initial'}}
                                       onClick={this.showPickerS}>{this.formatDate('S')}</a>
                                    <DatePicker closeDateBox={this.hidePickerS} dateEmpty={this.dateEmpty.bind(this,0)} isShow={this.state.isShowS} notAllowLast={false} ref="datePickerS" datePicker={this.datePickerStart} date={this.state.date} />
                                </div>
                                <div ref="timeBox" className="time-input unselectable" onClick={this.openHandle}>
                                    <a style={{color:'inherit'}}>{this.state.h}:{this.state.m}:{this.state.s}</a>
                                    <div style={{display:this.state.isShowTimeSelect ? 'block':"none",position:'absolute',border:'1px solid #e1e1e1',padding:'10px',left:'-1px',borderRadius: '3px', background:'#fff',zIndex:100,width:'242px'}}>
                                        <ul ref="hour" data-type="0" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                                            {
                                                _.map(new Array(24),function (item,i) {
                                                    var value = (i+"").length>1?i:("0"+i);
                                                    return (
                                                        <li onClick={this.getHour} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.h == value ? "curr" : null} key={i} style={_.extend({background:this.state.h == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                                    )
                                                }.bind(this))
                                            }
                                        </ul>
                                        <span style={{float:'left',height:'120px',lineHeight:'130px',display:'inline-block',padding:'0 5px'}}>:</span>
                                        <ul ref="minute" data-type="0" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                                            {
                                                _.map(new Array(60),function (item,i) {
                                                    var value = (i+"").length>1?i:("0"+i);
                                                    return (
                                                        <li onClick={this.getMinute} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.m == value ? "curr" : null} key={i} style={_.extend({background:this.state.m == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                                    )
                                                }.bind(this))
                                            }
                                        </ul>
                                        <span style={{float:'left',height:'120px',lineHeight:'130px',display:'inline-block',padding:'0 5px'}}>:</span>
                                        <ul ref="second" data-type="0" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                                            {
                                                _.map(new Array(60),function (item,i) {
                                                    var value = (i+"").length>1?i:("0"+i);
                                                    return (
                                                        <li onClick={this.getSecond} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.s == value ? "curr" : null} key={i} style={_.extend({background:this.state.s == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                                    )
                                                }.bind(this))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                ~
                                <div ref="dateE" className="data-time-input">
                                    <a style={{display: "block", width: '107px', background: "url(" + this.props.publicSrc + "calendar.png) no-repeat right center", color:'initial'}}
                                       onClick={this.showPickerE}>{this.formatDate('E')}</a>
                                    <DatePicker closeDateBox={this.hidePickerE} dateEmpty={this.dateEmpty.bind(this,1)} isShow={this.state.isShowE} notAllowLast={false} ref="datePickerE" datePicker={this.datePickerEnd} date={this.state.date}/>
                                </div>
                                <div ref="timeBox1" className="time-input unselectable" onClick={this.openHandle1}>
                                    <a style={{color:'inherit'}}>{this.state.h1}:{this.state.m1}:{this.state.s1}</a>
                                    <div style={{display:this.state.isShowTimeSelect1 ? 'block':"none",position:'absolute',border:'1px solid #e1e1e1',padding:'10px',left:'-1px',borderRadius: '3px', background:'#fff',zIndex:100,width:'242px'}}>
                                        <ul ref="hour1" data-type="1" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                                            {
                                                _.map(new Array(24),function (item,i) {
                                                    var value = (i+"").length>1?i:("0"+i);
                                                    return (
                                                        <li onClick={this.getHour} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.h1 == value ? "curr" : null} key={i} style={_.extend({background:this.state.h1 == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                                    )
                                                }.bind(this))
                                            }
                                        </ul>
                                        <span style={{float:'left',height:'120px',lineHeight:'130px',display:'inline-block',padding:'0 5px'}}>:</span>
                                        <ul ref="minute1" data-type="1" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                                            {
                                                _.map(new Array(60),function (item,i) {
                                                    var value = (i+"").length>1?i:("0"+i);
                                                    return (
                                                        <li onClick={this.getMinute} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.m1 == value ? "curr" : null} key={i} style={_.extend({background:this.state.m1 == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                                    )
                                                }.bind(this))
                                            }
                                        </ul>
                                        <span style={{float:'left',height:'120px',lineHeight:'130px',display:'inline-block',padding:'0 5px'}}>:</span>
                                        <ul ref="second1" data-type="1" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                                            {
                                                _.map(new Array(60),function (item,i) {
                                                    var value = (i+"").length>1?i:("0"+i);
                                                    return (
                                                        <li onClick={this.getSecond} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.s1 == value ? "curr" : null} key={i} style={_.extend({background:this.state.s1 == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                                    )
                                                }.bind(this))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {
                                this.props.isRequired == 'true' && <span className="valid-msg" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});