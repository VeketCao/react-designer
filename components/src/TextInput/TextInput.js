/**
 * Created by Veket on 2016/7/28.
 *  fieldName：字段名称
 *  fieldValue：字段值
 *  toValid：改字段是否需要校验
 *  validMsg：校验失败提示信息
 *  validRule：正则表达式或者function(v){}
 *  className="valid-area" :字段校验失败标红区域，红框
 *  componentDidUpdate：控件在这个方法去执行校验
 */
window.TextInput = React.createClass({
    getInitialState: function() {
        var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        return {
            fieldValue: "",
            validRule: "function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    changeHandle: function(e) {
        var _format = this.props.format || 'text';
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        var _rule = '', _value = '';
        if (_format == 'text') {
            var min = this.props.min == '' ? 0 : this.props.min;
            var max = this.props.max == '' ? 0 :  this.props.max;
            _value = e.target.value;
            _rule = "function(v){var isRequiredFlag=false,minFlag=false, maxFlag=false, min="+min+", max="+max+";if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&min!=0){minFlag=min<=v.length;}else{minFlag=true;}if(v&&max!=0){maxFlag=v.length<=max;}else{maxFlag=true;} return isRequiredFlag&&minFlag&&maxFlag;}";
        } else if (_format == 'number') {
            var min = this.props.min == '' ? 0 : this.props.min;
            var max = this.props.max == '' ? 0 :  this.props.max;
            _value = e.target.value.replace(REG_EXES.Simple_number,'');
            _rule = "function(v){var isRequiredFlag=false,minFlag=false, maxFlag=false, min="+min+", max="+max+";if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&min!=0){minFlag=min<=v;}else{minFlag=true;}if(v&&max!=0){maxFlag=v<=max;}else{maxFlag=true;} return isRequiredFlag&&minFlag&&maxFlag;}";
        } else if (_format == 'mobile') {
            _value = e.target.value.replace(REG_EXES.Simple_number,'');
            _rule = "function(v){var isRequiredFlag=false,isPhoneFlag=false;if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&v.length>0){isPhoneFlag="+REG_EXES.Mobile_number.toString().replace(/[\\]/g,"\\")+".test(v);}else{isPhoneFlag=true;} return isRequiredFlag&&isPhoneFlag;}";
        } else if (_format == 'fixed') {
            _value = e.target.value;
            _rule = "function(v){var isRequiredFlag=false,isPhoneFlag=false;if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&v.length>0){isPhoneFlag="+REG_EXES.Fixed_number.toString().replace(/[\\]/g,"\\")+".test(v);}else{isPhoneFlag=true;} return isRequiredFlag&&isPhoneFlag;}";
        } else if (_format == 'email') {
            _value = (e.target.value || "").replace(/\s/g,"");
            _rule = "function(v){ var isRequiredFlag = false, isEmailFlag = false; if("+isRequired+"){  isRequiredFlag = /.+/.test(v); } else{ isRequiredFlag = true;} isEmailFlag = !/.+/.test(v)&&!"+isRequired+"?true:"+ REG_EXES.Email.toString().replace(/[\\]/g,"\\")+".test(v);return isRequiredFlag&&isEmailFlag;}";
        }
        // var min = this.props.min == '' ? 0 : this.props.min;
        // var max = this.props.max == '' ? 0 :  this.props.max;

        this.setState({
            fieldValue: _value,
            validRule: _rule
        });
    },
    componentDidUpdate: function() {//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    render: function() {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area el-form-field' : 'el-form-field';
        var _title = this.props.title || '标题';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        var _format = this.props.format;
        var _row = (!this.props.row && 1) || (this.props.row == 0 && 1) || this.props.row;
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '标题';
            _description = this.props.lang[this.props.language]['description'] || '';
            _validMsg = this.props.lang[this.props.language]['validMsg'] || '校验不通过';
        }

        return (<div>
            <div data-field-name={this.props.fieldName || ""}
                 data-field-value={this.state.fieldValue}
                 data-valid-rule={this.state.validRule}
                 data-valid-msg={_validMsg}
                 data-to-valid={this.props.toValid}>
                <div className="form-component">
                    <div className="form-component-header">
                        <label className="form-component-title">{_title}{this.props.isRequired == 'true' && <span className="el-require">*</span>}</label>
                    </div>
                    {
                        ((_format == 'text' && _row == 1) || _format == 'number' || _format == 'mobile' || _format == 'fixed' || _format == 'email') &&
                        <div className="form-component-group">
                            {
                                _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                            }
                            <input className={fieldClass} type="text" ref="field" label={_title} value={this.state.fieldValue} onChange={this.changeHandle} />
                        </div>
                    }
                    {
                        (_format == 'text' && _row > 1) &&
                        <div className="form-component-group">
                            {
                                _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                            }
                            <textarea className={fieldClass} type="textarea" ref="field" rows={this.props.row} label={_title} onChange={this.changeHandle}>{this.state.fieldValue}</textarea>
                        </div>
                    }
                    {
                        this.props.isRequired == 'true' && <span className="valid-msg" />
                    }
                </div>
            </div>
        </div>);
    }
});