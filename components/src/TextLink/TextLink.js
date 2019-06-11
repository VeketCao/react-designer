/**
 * Created by Oli on 2017/1/10.
 */
window.TextLink=React.createClass({
    getInitialState:function(){
        return {
            fieldValue:"请输入文字链接",
            fieldValueForLink:"",
            validRule:"function(v){if(v&&v.length>=1) return true;else return false;}",
            validRuleForLink:"function(v){if(v&&v.length>=1) return true;else return false;}"
        }
    },

    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },

    /*
     * @用正则匹配超链接是否通过
     * */
    legalLinkValidate:function(value){
        return "function(v){ var isRequiredFlag = false, isLinkFlag = false; if("+this.props.isRequired+"){  isRequiredFlag = /.+/.test('"+value+"'); } else{ isRequiredFlag = true;} isLinkFlag = !/.+/.test('"+value+"')&&!"+this.props.isRequired+"?true:"+ /(http|ftp|https):\/\/[\w]+(.[\w]+)([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])+$/.toString().replace(/[\\]/g,"\\")+".test('"+value+"');return isRequiredFlag&&isLinkFlag;}";
    },

    /*
     * @输入链接的时候检测格式
     * */
    changeHandle:function(e){
        var val = (e.target.value||"").replace(/\s/g,"");
        this.setState({
            fieldValue:val,
            validRule:"function(v){var isRequiredFlag=false,minLengthFlag=false, maxLengthFlag=false, minLength="+this.props.minLength+" ||0, maxLength="+this.props.maxLength+" || 0;if("+this.props.isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&minLength!=0){minLengthFlag=minLength<=v.length;}else{minLengthFlag=true;}if(v&&maxLength!=0){maxLengthFlag=v.length<=maxLength;}else{maxLengthFlag=true;} return isRequiredFlag&&minLengthFlag&&maxLengthFlag;}"
        });
    },

    /*
     * @输入链接的时候检测格式
     * */
    changeHandleForLink:function(e){
        var val = (e.target.value||"").replace(/\s/g,"");
        this.setState({
            fieldValueForLink: val,
            validRuleForLink: this.legalLinkValidate(val)
        });
    },
    render:function(){
        //获取链接内容
        var hrefLink = this.props.linkTitle;
        //链接样式对象
        var linkStyle={
            'color': '#5a5955',
            'fontSize':'14px'
        };
        var _title = this.props.title || '链接标题';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '链接标题';
        }

        return (
            <div>
                <div style={linkStyle}>
                    <a href={hrefLink} target="_blank" style={{marginRight: '10px;'}}>{_title}</a>
                </div>
            </div>
        );
    }
});