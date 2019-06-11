/**
 * author by Laisf on 2016/12/5.
 */
window.RadioBox = React.createClass({
    getInitialState:function () {
        var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        return {
            fieldValue:'',
            name:'',
            isOnchangeEvent:false,
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    getDefaultProps:function(){
      return {
          options:[
              "选项一",
              "选项二"
          ],
          labelName:'单选'
      }
    },
    componentDidMount:function () {
      this.setState({
          name: AppUtil.getUUID(),
      });
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid&&this.state.isOnchangeEvent) validtion($(this.getDOMNode()));
    },
    changeHandle:function(e){
        this.setState({
            isOnchangeEvent:true,
            fieldValue:$(e.target).attr('value')
        });
    },
    render:function() {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area' : null;
        var hoz = {
            display: this.props.titleLayout == 'hoz'? null: 'block'
        };
        var _title = this.props.title || '标题';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        var _options = this.props.options;
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '标题';
            _description = this.props.lang[this.props.language]['description'] || '';
            _validMsg = this.props.lang[this.props.language]['validMsg'] || '校验不通过';
            _options = this.props.lang[this.props.language]['options'];
        }
        return (
            <div>
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
                            <div>
                            {
                                _.map(typeof _options =="string" ? _options.split(','):_options,function (o,index) {
                                    if (o != '') {
                                        return (
                                            <label className="el-component el-radio" style={hoz} key={index}><span className="el-radio-input"><input className="el-radio-original" type="radio" name={this.state.name} onClick={this.changeHandle} value={o} /><i></i></span><span className="el-label">{o}</span></label>
                                        )
                                    } else {
                                        return (
                                            <label className="el-component el-radio" style={hoz} key={index}><span className="el-radio-input"><input className="el-radio-original" type="radio" name={this.state.name} onClick={this.changeHandle} value={'选项'} /><i></i></span><span className="el-label">{'选项'}</span></label>
                                        )
                                    }
                                }.bind(this))
                            }
                            </div>
                            {
                                this.props.isRequired == 'true' && <span className="valid-msg" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});