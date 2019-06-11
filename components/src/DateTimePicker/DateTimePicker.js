/**
 * author by Laisf on 2016/12/6.
 */
window.DateTimePicker = React.createClass({
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
            isShowTimeSelect:false,
            isShow: false,
            isCorrect: false,
            date: date,
            param: objectParam,
            h:'00',
            m:'00',
            s:'00',
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
                isCorrect: true,
                param: objectParam,
                h:'00',
                m:'00',
                s:'00'
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
                isCorrect: true,
                param: objectParam,
                h:'00',
                m:'00',
                s:'00'
            });
        } else {
            var objectParam = {};
            this.setState({
                isCorrect: false,
                param: objectParam,
                h:'00',
                m:'00',
                s:'00'
            });
        }
    },
    componentDidUpdate:function(){
        //完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    datePicker: function (data) {
        this.dayChange(data);
    },
    formatDate:function () {
        var format = this.props.format||"";
        var date = this.state.param.beginDate?new Date(this.state.param.beginDate.replace(/-/g,"/")):null;

        //如果时间不为空，则显示格式化时间；如果时间为空，则显示文字提示
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
    showPicker: function () {
        this.setState({
            isShow: true
        });
        ClickAway.bindClickAway(this.hidePicker, this.refs.date);
    },
    dateEmpty:function () {
        // var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        var state = this.state;
        state.date = "";
        var objectParam = {};
        objectParam.beginDate = "";
        objectParam.endDate = "";
        this.setState({
            isCorrect: false,
            param: objectParam,
            h:'00',
            m:'00',
            s:'00',
            // validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        });
    },
    dayChange: function (data) {
        // var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        var state = this.state;
        state.isCorrect = true;
        state.date = new Date(data.selectDate);
        state.param.beginDate = data.selectDate;
        state.param.endDate = data.selectDate;
        state.isShow = false;
        // state.validRule = "function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}";
        this.setState(state);

        ClickAway.unbindClickAway(this.hidePicker, this.refs.date);
    },
    hidePicker: function () {
        this.setState({
            isShow: false
        });
        ClickAway.unbindClickAway(this.hidePicker, this.refs.date);
    },
    getHour:function(e){
        var h = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        this.setState({
            h:h
        });
        this.props.getHour&&this.props.getHour(h);
    },
    getMinute:function(e){
        var m = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        this.setState({
            m:m
        });
        this.props.getMinute&&this.props.getMinute(m);
    },
    getSecond:function(e){
        var s = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        this.setState({
            s:s
        });
        this.props.getSecond&&this.props.getSecond(s);
    },
    openHandle:function () {
        this.setState({
            isShowTimeSelect:true
        });
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
    },
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
        };
        var time_li_style = {
            height:'24px',
        };
        var isCorrect = this.state.isCorrect;
        var dateValue = '';
        if (!!isCorrect) {
            dateValue = this.formatDate();
            dateValue = dateValue+" "+this.state.h+":"+this.state.m+":"+this.state.s || "";
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

        return (
            <div>
                <div data-field-name={this.props.fieldName || ""}
                     data-field-value={dateValue}
                     data-valid-rule={this.state.validRule}
                     data-valid-msg={_validMsg}
                     data-to-valid={this.props.toValid}
                     className="am-form-group">
                    <div className="form-component">
                        <div className="form-component-header">
                            <label className="form-component-title">{_title}{ this.props.isRequired == 'true' && <span className="el-require">*</span>}</label>
                        </div>
                        <div className="form-component-group">
                            {
                                _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                            }
                            <div>
                                <div ref="date" className="data-time-input">
                                    <a style={{display: "block", background: "url(" + this.props.publicSrc + "calendar.png) no-repeat right center", width:"107px", color:'initial'}}
                                       onClick={this.showPicker}>{this.formatDate()}</a>
                                    <DatePicker closeDateBox={this.hidePicker} dateEmpty={this.dateEmpty} isShow={this.state.isShow} notAllowLast={false} ref="datePicker" datePicker={this.datePicker} date={this.state.date}/>
                                </div>
                                <div ref="timeBox" className="time-input unselectable" onClick={this.openHandle}>
                                    <a style={{color:'inherit'}}>{this.state.h}:{this.state.m}:{this.state.s}</a>
                                        <div style={{display:this.state.isShowTimeSelect ? 'block':"none",position:'absolute',border:'1px solid #e1e1e1',padding:'10px',left:'-1px',borderRadius: '3px', background:'#fff',zIndex:100,width:'242px'}}>
                                        <ul ref="hour" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
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
                                        <ul ref="minute" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
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
                                        <ul ref="second" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
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