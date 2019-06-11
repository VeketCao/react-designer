/**
 * author by Laisf on 2016/12/14.
 */
window.EmailInput = React.createClass({
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
    spellValidate:function(value){
        var isRequired = this.props.isRequired == '' ? false : true;
    	return "function(v){ var isRequiredFlag = false, isEmailFlag = false; if("+isRequired+"){  isRequiredFlag = /.+/.test('"+value+"'); } else{ isRequiredFlag = true;} isEmailFlag = !/.+/.test('"+value+"')&&!"+isRequired+"?true:"+ /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.toString().replace(/[\\]/g,"\\")+".test('"+value+"');return isRequiredFlag&&isEmailFlag;}";
    },
    changeHandle:function (e) {
        var value = (e.target.value||"").replace(/\s/g,"");
        this.setState({
            fieldValue:value,
            validRule:this.spellValidate(value)
        });
    },
    render:function () {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area el-form-field' : 'el-form-field';
        var _title = this.props.title || '邮箱';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '邮箱';
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