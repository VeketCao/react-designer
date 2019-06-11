/**
 * author by Laisf on 2016/12/15.
 */
window.FileInput = React.createClass({
    getDefaultProps: function () {
        return {
            multiple: true,
            className: 'upload-button',
        }
    },
    getInitialState:function () {
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        return {
            fieldValue:"",
            files: [],
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=v.length>=1;}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },
    _onChange: function (event) {
        event.preventDefault()
        var target = event.target;
        var files = target.files;
        var count = this.props.multiple ? files.length : 1;
        var i;
        if(URL){
            for (i = 0; i < count; i++) {
                files[i].thumb = URL.createObjectURL(files[i])
            }
        }
        // convert to array
        files = Array.prototype.slice.call(files, 0);
        // files = files.filter(function (file) {
        //     return /image/i.test(file.type);
        // })
        for (i = 0; i < count; i++) {
            if (files[i].size <= this.props.size*1024*1024) {
                this.setState({
                    fieldValue:this.state.files.concat(files),
                    files:this.state.files.concat(files)
                });
            }
        }

    },
    deleteMouseOver:function (e) {
        e.currentTarget.style.color='red';
    },
    deleteMouseLeave:function (e) {
        e.currentTarget.style.color='initial';
    },
    deleteFile:function (e) {
        var idx = e.target.getAttribute("data-index");
        this.setState({
            fieldValue:_.filter(this.state.files,function (file,i) {
                return i!=idx;
            }),
            files:_.filter(this.state.files,function (file,i) {
                return i!=idx;
            })
        });
    },
    getSize: function(size){
        if(size>=1024){
            var kbSize = Math.round(size*10/1024)/10;
            if(kbSize>=1024){
                var mbSize = Math.round(kbSize*10/1024)/10;
                if(mbSize>=1024){
                    var gbSize = Math.round(mbSize*10/1024)/10;
                    if(gbSize>=1024){
                        var tbSize = Math.round(gbSize*10/1024)/10;
                        return tbSize+"tb";
                    }else{
                        return gbSize+"gb";
                    }
                }else{
                    return mbSize+"mb";
                }

            }else{
                return kbSize+"kb";
            }
        }else{
            return size+"b";
        }
    },
    render: function () {
        //console.log(this.state.files);
        var className = this.props.className;
        var file_style = {
            fontSize:'12px',
            color:'#e1e1e1',
            marginTop:'8px'
        }
        var file_span_style = {
            margin:"0 8px",
            height:'14px',
        }
        var selectedText = '已选择'+ this.state.files.length + '个文件';
        var _title = this.props.title || '上传文件';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '上传文件';
            _description = this.props.lang[this.props.language]['description'] || '';
            _validMsg = this.props.lang[this.props.language]['validMsg'] || '校验不通过';
        }

        return ( <div>
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
                                <div style={{position:'relative',display:'block'}}>
                                    <span className="btn btn-blue">{'点击上传'}</span>
                                    <span style={{display: 'inline-block',marginLeft: '5px',fontSize: '12px'}}>{ (this.state.files && this.state.files.length > 0) && selectedText}</span>
                                    <input type="file" multiple={this.props.multiple} ref="fileInput" style={{fontSize:0,opacity: 0,width:'100%',filter: "alpha(opacity=0)",position:'absolute',height:'30px',right:0,top:'1px',cursor:'pointer'}} onChange={this._onChange} />
                                    {this.state.files.length ?
                                        <div>
                                            {
                                                _.map(this.state.files,function (file,index) {
                                                    return (
                                                        <div style={file_style}>
                                                            <a style={{color:'initial',height:'20px',position:'relative'}} onMouseOver={this.deleteMouseOver} onMouseLeave={this.deleteMouseLeave}>
                                                                <span style={{color:'inherit',fontSize:'inherit',width:'120px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',display:'inline-block',height:'14px',lineHeight:'12px'}}>{file.name}</span>
                                                                <span style={_.extend({color:'inherit',fontSize:'inherit',width: '60px',display: 'inline-block'},file_span_style)}>{this.getSize(file.size)}</span>
                                                                <span style={_.extend({fontSize:'14px',position:'absolute',top:'0'},file_span_style)} onClick={this.deleteFile} data-index={index} >×</span>
                                                            </a>
                                                        </div>
                                                    )
                                                }.bind(this))
                                            }
                                        </div> : null}
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
})