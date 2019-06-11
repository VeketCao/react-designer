/**
 * DropCheck
 *
 * Copyright 2016/07/31, NieFZ, Inc.
 * All rights reserved.
 *
 */
window.DropCheck = React.createClass({
    displayName: "DropCheck",
    getInitialState: function () {
        var isRequired = this.props.isRequired == '' ? false : this.props.isRequired;
        return {
            ids: [],
            values: [],
            fieldValue:'',
            isOnchangeEvent: false,
            validRule: "function(v){var isRequiredFlag=false; if("+isRequired+") {isRequiredFlag=/.+/.test(v);}else{ isRequiredFlag = true;}return isRequiredFlag}"
        }
    },
    filter: function () {
        var element = this.refs.select,
            display = element.style.display;
        var icon = this.refs.single;

        if (display === "none") {
            element.style.display = "block";
            icon.className = 'down';
        } else {
            element.style.display = "none";
            icon.className = '';
        }

        ClickAway.bindClickAway(this.hide, this.refs.filter);
    },
    removeItem: function (key, item) {
        var index = this.state[key].indexOf(item);
        if (index > -1) {
            this.state[key].splice(index, 1);
        }
    },
    select: function (e) {
        var state = _.clone(this.state),
            target = e.currentTarget,
            id = target.getAttribute("id"),
            text = target.innerText;

        if (state["ids"].indexOf(id) > -1) {
            this.removeItem("ids", id);
            this.removeItem("values", text);
        } else {
            state["ids"].push(id);
            state["values"].push(text);
        }
        state.fieldValue = state['ids'].join(',');
        state.isOnchangeEvent = true;
        this.setState(state);
    },
    hide: function () {
        var icon = this.refs.single;
        if (this.refs.select) {
            this.refs.select.style.display = "none";
            icon.className = '';
            ClickAway.unbindClickAway(this.hide, this.refs.filter);
        }
    },
    componentDidUpdate:function(){//完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
        if(this.props.toValid&&this.state.isOnchangeEvent) validtion($(this.getDOMNode()));
    },
    getDropCheck:function (data) {
        var _data = typeof data =="string" ? data.split(',') : data
        return (
            <ul className="checkbox-list">
                {_data ? _data.map(function (item, index) {
                    if (item != '') {
                        return (
                            <li key={index}>
                                <a href="javascript:void(0);" id={'item'+index} onClick={this.select}>
                                    <em style={this.state.ids.indexOf('item'+index) > -1 ? {float: "left", width: "14px", height: "14px", marginTop: "8px", marginRight: "5px", background: "url(" + this.props.publicSrc + "checkBox.png) -16px center no-repeat"} : {float: "left", width: "14px", height: "14px", marginTop: "8px", marginRight: "5px", background: "url(" + this.props.publicSrc + "checkBox.png) -1px center no-repeat"}}>&nbsp;</em>
                                    <span style={{fontSize:'14px'}}>{item}</span>
                                </a>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index}>
                                <a href="javascript:void(0);" id={'item'+index} onClick={this.select}>
                                    <em style={this.state.ids.indexOf('item'+index) > -1 ? {float: "left", width: "14px", height: "14px", marginTop: "8px", marginRight: "5px", background: "url(" + this.props.publicSrc + "checkBox.png) -16px center no-repeat"} : {float: "left", width: "14px", height: "14px", marginTop: "8px", marginRight: "5px", background: "url(" + this.props.publicSrc + "checkBox.png) -1px center no-repeat"}}>&nbsp;</em>
                                    <span style={{fontSize:'14px'}}>{'选项'}</span>
                                </a>
                            </li>
                        )
                    }
                },this) : null}
            </ul>
        );
    },
    render: function () {
        // 如果是必填，输入框样式会带上valid-area，否则就不带
        var fieldClass = this.props.isRequired == 'true' ? 'valid-area' : null;
        /*var data = [
            {id: '16147985', text: '扩音设备'},
            {id: '12458646', text: '内部网络'},
            {id: '12481990', text: '投影仪'},
            {id: '16131161', text: '白板'},
            {id: '1477632296', text: '电话座机'}
        ];*/
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
                    <div className="form-component">
                        <div className="form-component-header">
                            <label className="form-component-title">{_title}{this.props.isRequired == 'true' && <span className="el-require">*</span>}</label>
                        </div>
                        <div className="form-component-group">
                            {
                                _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                            }
                            <div className="drop-down-checkbox" ref="filter" style={{cursor: (this.props.isFilter ? this.props.isFilter : false) ? "pointer" : "not-allowed"}}>
                                <i ref="single" onClick={this.filter}>&nbsp;</i>
                                <span ref="placeholder" style={this.state["values"].length ? {display: "block", width: this.props.width ? this.props.width : "100px", height: "28px", color: "#000", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"} : {display: "block", color: "#aaa"}} onClick={this.filter}>{this.state["values"].length ? this.state["values"].join(",") : (this.props.placeholder ? this.props.placeholder : "请选择")}</span>
                                <div ref="select-wrap" style={{zIndex: "3", position: "absolute", top: "100%", left: "0", width: "100%", backgroundColor: "#fff"}}>
                                    <div ref="select" style={{display: "none", border: "1px solid #e1e1e1", borderRadius: "3px", backgroundColor: "#fff"}}>
                                        {this.getDropCheck(_options)}
                                    </div>
                                </div>
                            </div>
                            {
                                this.props.isRequired == 'true' && <span className="valid-msg" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});