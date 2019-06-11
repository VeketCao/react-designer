/**
 * author by Laisf on 2016/12/6.
 */
window.NumberInput = React.createClass({
    getInitialState:function () {
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        return {
            fieldValue:'',
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    changeHandle:function (e) {
        var Value = e.target.value.replace(REG_EXES.Simple_number,'');
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        var min = this.props.min == '' ? 0 : this.props.min;
        var max = this.props.max == '' ? 0 : this.props.max;

        this.setState({
            fieldValue: Value,
            validRule: "function(v){var isRequiredFlag=false,minFlag=false, maxFlag=false, min="+min+", max="+max+";if("+isRequired+"){isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}if(v&&min!=0){minFlag=min<=v;}else{minFlag=true;}if(v&&max!=0){maxFlag=v<=max;}else{maxFlag=true;} return isRequiredFlag&&minFlag&&maxFlag;}"
        });
    },
    render:function () {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area el-form-field' : 'el-form-field';
        var _title = this.props.title || '数字';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '数字';
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