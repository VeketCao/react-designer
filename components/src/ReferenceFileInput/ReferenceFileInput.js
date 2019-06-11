/**
 * author by Ouli on 2017/1/9.
 */
window.ReferenceFileInput = React.createClass({
    getDefaultProps: function () {
        return {
            multiple: true,
            className: 'upload-button',
        }
    },
    getInitialState:function () {
        var isRequired = this.props.isRequired === '' ? false : this.props.isRequired;
        return {
            fieldValue:'',
            files: [],
            validRule:"function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=v.length>=1;}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid) validtion($(this.getDOMNode()));
    },

    _onChange: function (event) {
        event.preventDefault();
        var target = event.target;
        var files = target.files;
        var count = this.props.multiple ? files.length : 1;
        //var i;
        //var blob = new Blob([files]);
        if(URL){
            for (var i = 0; i < count; i++) {
                files[i].thumb = URL.createObjectURL(files[i]);
                files[i].isChecked = false; //为每个files对象添加是否checked属性
            }
        }
        // convert to array
        files = Array.prototype.slice.call(files, 0);
        // files = files.filter(function (file) {
        //     return /image/i.test(file.type);
        // })
        this.setState({
            fieldValue:this.state.files.concat(files),
            files:this.state.files.concat(files)
        });
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
    //点击选中附件
    changeHandle: function(index){
        this.setState({
            files: _.map(this.state.files,function (element,idx) {
                if(index == idx) element.isChecked = !element.isChecked;
                return element;
            }),
            fieldValue:_.map(this.state.files,function (element) {
                if (element.isChecked) {
                    return element.name;
                }
            })
        });
    },
    //全选附件
    _selectAllFile: function() {
        "use strict";
        this.setState({
            files: _.map(this.state.files,function(element) {
                element.isChecked = true;
                return element
            }),
            fieldValue: _.map(this.state.files,function (element) {
                if (element.isChecked) {
                    return element.name;
                }
            })
        });
    },
    render: function () {
        //console.log(this.state.files);
        var file_style = {
            fontSize:'12px',
            color:'#e1e1e1',
            padding: '5px 0'
        }
        var file_span_style = {
            margin:"0 8px"
        }
        var _title = this.props.title || '参考附件';
        var _description = this.props.description || '';
        var _validMsg = this.props.validMsg || '校验不通过';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'] || '参考附件';
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
                                <div>
                                    <span className="btn btn-blue">{'点击添加附件'}</span>
                                    <input type="file" multiple={this.props.multiple} ref="fileInput" style={{fontSize:0,opacity: 0,width:'100%',filter: "alpha(opacity=0)",position:'absolute',height:'30px',right:0,top:'1px',cursor:'pointer'}} onChange={this._onChange} />
                                    {this.state.files.length ?
                                        <div style={{position: 'relative', paddingTop: '20px'}}>
                                            {
                                                (this.state.files&&this.state.files.length>0) &&
                                                <div style={{position:'absolute', left: '180px;', top: '0', display:'inline-block',color:'#999',fontSize:'12px',zoom: 1}}><span style={{marginRight: '20px', cursor: 'pointer'}} onClick={this._selectAllFile}>{'全选'}</span><span style={{cursor: 'pointer'}}>{'批量下载'}</span></div>
                                            }
                                            {
                                                _.map(this.state.files,function (file,index) {
                                                    return (
                                                        <div style={file_style}>
                                                            <label className="el-component el-checkbox">
                                                                <span className="el-checkbox-input" style={{verticalAlign: 'top'}} onClick={this.changeHandle.bind(this,index)}><input className="el-checkbox-original" type="checkbox" name={this.state.fieldName} value={file.name} checked={file.isChecked} /><i onClick={this.changeHandle.bind(this,index)}></i></span>
                                                                <span className="el-label">
                                                                    <a style={{display:'inline-block',height:'20px',position:'relative'}} onMouseOver={this.deleteMouseOver} onMouseLeave={this.deleteMouseLeave}>
                                                                        <span style={{width:'120px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',display:'inline-block',height: '14px',lineHeight: '12px'}}>{file.name}</span>
                                                                        <span style={_.extend({width: '60px',display: 'inline-block'},file_span_style)}>{this.getSize(file.size)}</span>
                                                                        <button className="btn btn-blue" style={{height: '20px', lineHeight: '20px', fontSize: '12px'}}>{'下载'}</button>
                                                                    </a>
                                                                </span>
                                                            </label>
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