window.PhoneInput=React.createClass({

    getInitialState:function(){
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        return {
            fieldValue:"",
            validRule:"function(v){var isRequiredFlag=false,isPhoneFlag=false;if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&v.length>0){isPhoneFlag="+/^1[34578]\d{9}$/.toString().replace(/[\\]/g,"\\")+".test(v);}else{isPhoneFlag=true;} return isRequiredFlag&&isPhoneFlag;}"
        }
    },
    changeHandle:function(e){
        var value = e.target.value.replace(/[^0-9]/g,'')
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        this.setState({
            fieldValue:value,
            validRule:"function(v){var isRequiredFlag=false,isPhoneFlag=false;if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&v.length>0){isPhoneFlag="+/^1[34578]\d{9}$/.toString().replace(/[\\]/g,"\\")+".test(v);}else{isPhoneFlag=true;} return isRequiredFlag&&isPhoneFlag;}"
        });
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    render:function(){
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area el-form-field' : 'el-form-field';
        var _title = this.props.title || '手机';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '手机';
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
                    <div className="form-component-group">
                        {
                            _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                        }
                        <input className={fieldClass} type="text" ref="field" label={_title} value={this.state.fieldValue} onChange={this.changeHandle} />
                        {
                            this.props.isRequired == 'true' && <span className="valid-msg" />
                        }
                    </div>
                </div>
            </div>
        </div>);
    }
});