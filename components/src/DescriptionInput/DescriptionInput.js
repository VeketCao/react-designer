/**
 * Created by Oli on 2017/2/7.
 *  fieldName：字段名称
 *  fieldValue：字段值
 *  toValid：改字段是否需要校验
 *  validMsg：校验失败提示信息
 *  validRule：正则表达式或者function(v){}
 *  className="valid-area" :字段校验失败标红区域，红框
 *  componentDidUpdate：控件在这个方法去执行校验
 */
window.DescriptionInput=React.createClass({
    getInitialState:function(){
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        return {
            fieldValue:"",
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    changeHandle:function(e){
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        this.setState({
            fieldValue:e.target.value,
            validRule:"function(v){var isRequiredFlag=false,minLengthFlag=false, maxLengthFlag=false, minLength="+minLength+", maxLength="+maxLength+";if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&minLength!=0){minLengthFlag=minLength<=v.length;}else{minLengthFlag=true;}if(v&&maxLength!=0){maxLengthFlag=v.length<=maxLength;}else{maxLengthFlag=true;} return isRequiredFlag&&minLengthFlag&&maxLengthFlag;}"
        });
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    render:function(){
        var _content = this.props.content || '描述说明';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _content = this.props.lang[this.props.language]['content'] || '描述说明';
            _validMsg = this.props.lang[this.props.language]['validMsg'] || '校验不通过';
        }
        return (<div>
            <div data-field-name={this.props.fieldName || ""}
                 data-field-value={this.state.fieldValue}
                 data-valid-rule={this.state.validRule}
                 data-valid-msg={_validMsg}
                 data-to-valid={this.props.toValid}>
                <div className="form-component">
                    <div className="form-component-header">&nbsp;</div>
                    <div className="form-component-group"><p style={{fontSize: '14px'}}>{_content}</p></div>
                </div>
            </div>
        </div>);
    }
});