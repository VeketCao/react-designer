/**
 * author by Laisf on 2016/12/5.
 */
window.DropDownBox = React.createClass({
    getInitialState:function () {
        var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        return {
            fieldValue:'',
            name:'',
            isOnchangeEvent:false,
            isShow:false,
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    getDefaultProps:function(){
      return {
          radioLabels:[
              "只能选我",
              "或者选我",
              "再或者我"
          ],
          labelName:'下拉选择'
      }
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid&&this.state.isOnchangeEvent) validtion($(this.getDOMNode()));
    },
    changeHandle:function(e){
        this.setState({
            isOnchangeEvent:true,
            fieldValue:$(e.target.getDOMNode()).val()
        });
    },
    showOpenSelect:function () {
        this.setState({
            isShow:true
        });
        ClickAway.bindClickAway(this.showCloseSelect, this.refs.select);
    },
    showCloseSelect:function () {
        this.setState({
            isShow:false
        });
        ClickAway.unbindClickAway(this.showCloseSelect, this.refs.select);
    },
    doSelectItem:function (e) {
        var value = e.target.getAttribute('value');
        var text = e.target.innerText;
        //console.log(value)
        this.setState({
            isOnchangeEvent: true,
            isShow: false,
            fieldValue: value
        },function () {
            this.refs.select.getDOMNode().innerText = text;
        });

    },
    render:function() {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area unselectable' : 'unselectable';
        var selectStyle = {
            display:this.state.isShow ? 'block' : 'none',
        };
        var _title = this.props.title || '下拉多选框';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        var _options = this.props.options;
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '下拉多选框';
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
                    <div className="form-component" ref='selectContainer'>
                        <div className="form-component-header">
                            <label className="form-component-title">{_title}{this.props.isRequired == 'true' && <span style={{color: 'red'}}>*</span>}</label>
                        </div>
                        <div className="form-component-group">
                            {
                                _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                            }
                            <div className="drop-down-radio">
                                <span className="selected" onClick={this.showOpenSelect} ref="select">请选择</span>
                                <ul className="radio-list" ref="selectBox" style={selectStyle}>
                                    {
                                        _.map(typeof _options =="string" ? _options.split(','):_options,function (o,index) {
                                            if (o != '') {
                                                return (
                                                    <li key={index}><a href="javascript:void(0);" onClick={this.doSelectItem} value={o}>{o}</a></li>
                                                )
                                            } else {
                                                return (
                                                    <li key={index}><a href="javascript:void(0);" onClick={this.doSelectItem} value={'选项'}>{'选项'}</a></li>
                                                )
                                            }

                                        }.bind(this))
                                    }
                                </ul>
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