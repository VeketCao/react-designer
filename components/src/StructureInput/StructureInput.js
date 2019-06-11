//filter
window.StructureInput = React.createClass({
    getInitialState: function () {
        var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        return {
            param: this.props.param,
            creator: null,
            fieldValue:'',
            open: '',
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    componentWillMount: function () {
    },
    handleCreatorStructrue: function () {
        if (!this.state.open) {
            this.setState({
                open: true
            });
        } else {
            this.setState({
                open: false
            });
        }
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    render: function () {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area' : null;
        var background = {
            'background': "url(" + this.props.publicSrc + "icon_structure.png) no-repeat 99% center #fff",
        }
        var _title = this.props.title || '选择部门';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '选择部门';
            _description = this.props.lang[this.props.language]['description'] || '';
            _validMsg = this.props.lang[this.props.language]['validMsg'] || '校验不通过';
        }

        return (
            <div ref="DocSearchHeader">
                <div data-field-name={this.props.fieldName || ""}
                     data-field-value={this.state.fieldValue}
                     data-valid-rule={this.state.validRule}
                     data-valid-msg={_validMsg}
                     data-to-valid={this.props.toValid} >
                    <div className="form-component">
                        <div className="form-component-header">
                            <label className="form-component-title">{_title}{this.props.isRequired == 'true' && <span className="el-require">*</span>}</label>
                        </div>
                        <div className="form-component-group">
                            {
                                _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                            }
                            <div className="structure-input">
                                <input style={background} readonly="readonly" onClick={this.handleCreatorStructrue} value={this.state.ncreator||""}/>
                            </div>
                            {
                                this.props.isRequired == 'true' && <span className="valid-msg" />
                            }
                        </div>
                    </div>
                </div>
                {this.state.open ? <Structure dataSource={this.props.dataSource} /> : null}

            </div>
        );
    }
});