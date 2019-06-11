/**
 * author by Laisf on 2016/12/30.
 */
window.DepartmentMemberInput = React.createClass({
    getInitialState:function () {
        var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        return {
            showDialog:false,
            fieldValue:"",
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
   showDepartmentDialog:function () {
        var inp_value = this.refs.departmentInput.value;
        this.setState({
            showDialog:true
        });
   },
    closeDepartmentDialog:function () {
        this.setState({
            showDialog:false
        });
    },
    getValues:function (values,cb) {
        console.log(values);
        this.setState({
            fieldValue:values
        },function () {
            cb();//关闭窗口
        });
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    render: function () {

       // 如果是必填，输入框样式会带上valid-area，否则就不带
       var fieldClass = this.props.isRequired == 'true' ? 'valid-area' : null;
       var background = {
           'background': "url(" + this.props.publicSrc + "icon_person.png) no-repeat 99% center #fff",
       }
       var _title = this.props.title || '人员选择';
       var _description = this.props.description || '';
       var _validMsg = this.props.validMsg || '校验不通过';
       if (this.props.lang) {
           _title = this.props.lang[this.props.language]['title'] || '人员选择';
           _description = this.props.lang[this.props.language]['description'] || '';
           _validMsg = this.props.lang[this.props.language]['validMsg'] || '校验不通过';
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
                           <div className="structure-input">
                               <input ref="departmentInput" style={background} readonly="readonly" onChange={this.changeHandle} onClick={this.showDepartmentDialog} value={this.state.fieldValue}/>
                           </div>
                           {
                               this.props.isRequired == 'true' && <span className="valid-msg" />
                           }
                       </div>
                   </div>
               </div>
               {this.state.showDialog ? <DepartmentMember dataSource={this.props.dataSource} closeWindow={this.closeDepartmentDialog} getValues={this.getValues} /> : null }
           </div>
       );
    }
});