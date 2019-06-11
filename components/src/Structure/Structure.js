/**
 * Structure
 *
 * Copyright 2016/08/27, NieFZ, Inc.
 * All rights reserved.
 *
 */

window.Structure = React.createClass({
    displayName: "Structure",
    getInitialState: function () {
        var param = this.props.dataSource[1].param.split("&"),
            objectParam = {};

        for(var i = 0; i < param.length; i++) {
            objectParam[param[i].split("=")[0]] = param[i].split("=")[1];
        }

        return {
            param: objectParam,
            memberList: [],
            items: [],
            describe: '',
            selects: this.props.selects ? this.props.selects : null,
            deleteSelect:[]
        }
    },
    componentWillMount: function () {
        var state = this.state;
        state.index = 4;
        state.selects = [];
        //console.log(WD_API.getDataSourceApi + this.props.dataSource[0].value);
        /*getDataSourceApi(this.props.dataSource[0].value, function (data) {
            console.log(data);
            if (data && data.result) {
                state.fdHierarchyId = JSON.parse(data.data)[0].fdHierarchyId.split("x");
                state.param.parent = state.fdHierarchyId[state.fdHierarchyId.length - this.state.index];
                this.dataAjax();
            }
        }.bind(this));*/
    },
    componentDidMount: function () {
        var This = this;
        http(this.props.dataSource[0].value + '?'+ this.props.dataSource[0].param, {}, {
            type: 'POST'
        }).done(function (rtn) {
            if (rtn) {
                var obj = typeof(rtn) == 'string' ? JSON.parse(rtn) : rtn;
                var newItems = _.map(obj, function (r) {
                    if (r.isParent == 'true') {
                        return _.extend(r, {'children': [], 'switch': false});
                    } else {
                        return _.extend(r, {'switch': false});
                    }
                })
                //console.log(newItems);
                This.setState({items: newItems})

            }

        }).fail(function (rtn) {
            return ;
        });

        /*if (this.props.selects) {
            var state = this.state;
            state.selects = this.props.selects;
            this.setState(state);
        }*/
    },

    /**
     *  点击部门列表结点触发
     * @param e
     */
    showChildren: function (e) {
        var param = {}, url = '';
        if (e.currentTarget.getAttribute('data-type') == 'department') {
            url = this.props.dataSource[0].value;
            param.id = e.currentTarget.getAttribute('data-id');
        } else if (e.currentTarget.getAttribute('data-type') == 'person') {
            url = this.props.dataSource[1].value;
            param.pid = e.currentTarget.getAttribute('data-id');
            param.selectType = '2';
        }
        var This = this;
        http(url, param, {
            type: 'POST'
        }).done(function (rtn) {
            if (rtn) {
                var obj = typeof (rtn) == 'string' ? JSON.parse(rtn) : rtn;
                var newItems = _.map(obj, function (r) {
                    if (r.isParent == 'true') {
                        return _.extend(r, {'children': [],'switch': false});
                    } else {
                        return _.extend(r, {'switch': false});
                    }
                })
                //console.log(newItems);
                var list = _.map(This.state.items,function (item) {
                    if (item.id == Id) {
                        item.switch = !item.switch;
                        item.children = newItems;
                    }
                    return item;
                });

                This.setState({items: list})
            }
        }).fail(function (rtn) {

        });
    },

    /**
     *  点击部门子结点获取部门成员列表
     * @param e
     */
    showMemberList: function (e) {
        var param = {};
        var url = this.props.dataSource[1].value;
        param.pid = e.currentTarget.getAttribute('data-id');
        param.selectType = '2';
        var This = this;
        http(url, param, {
            type: 'POST'
        }).done(function (rtn) {
            if (rtn) {
                var obj = typeof (rtn) == 'string' ? JSON.parse(rtn) : rtn;
                var newItems = _.map(obj, function (r) {
                    return _.extend(r, {'selected': false});
                })
                This.setState({
                    memberList: newItems
                });
            }
        }).fail(function (rtn) {
            This.setState({
                memberList: []
            });
        });
    },

    grade: function () {
        var state = this.state;
        
        if(state.param.parent) {
            state.index += 1;
            state.param.parent = state.fdHierarchyId[state.fdHierarchyId.length - state.index];
            state.param.orgType = "3";
            
            this.dataAjax();
        }
    },
    getTemplate: function (target, item) {
        var state = this.state;

        state.param.s_bean = "organizationDialogList";
        state.param.orgType = "3";
        state.param.parent = target.getAttribute("id");

        this.dataAjax(item);
    },
    search: function () {
        var state = this.state,
            key = this.refs.key.value;

        if (key) {
            state.param.s_bean = "organizationDialogSearch";
            state.param.orgType = "8";
            state.param.key = key;

            this.dataAjax("category");
        }
    },
    enterEvent:function(e) {
        var event = e || window.event;
        if (event.keyCode == "13") {
            this.search();
        }
    },
    clear: function () {
        this.setState({
            category: []
        });
    },
    ensureSearch: function () {
        var state = this.state;

        state.param.matchSearch === "true" ? state.param.matchSearch = "false" : state.param.matchSearch = "true";

        this.setState(state);
    },
    change: function (data) {
        var state = this.state;

        state.param.s_bean = "organizationDialogList";
        state.param.orgType = "8";
        state.param.parent = data.id;
        state.id = data.id;
        state.value = data.value;
        
        this.dataAjax("category");
    },
    dataAjax: function (item) {
        var state = this.state,
            category = state.resultData ? state.resultData.slice(0, state.resultData.length) : null,
            stringParam = "";

        for(var name in state.param) {
            stringParam += name + "=" + state.param[name] + "&";
        }

        var dataSource = {
            value: this.props.dataSource[1].value,
            param: stringParam
        };
        // getDataSourceApi(dataSource, function (json) {
        //     if(json.result) {
        //         var data = JSON.parse(json.data);
        //
        //         if (item === "category") {
        //             state.category = data;
        //         } else if (item) {
        //             item.category = data;
        //         } else {
        //             var array = category ? category[0].key3.split("x") : null,
        //                 key = array ? array[array.length - 3] : null;
        //
        //             for (var i = 0; i < data.length; i++) {
        //                 if (key === data[i].key0) {
        //                     data[i].category = category;
        //                 }
        //             }
        //
        //             state.resultData = data;
        //             state.organize = data[0].key2.split("-")[0].trim();
        //         }
        //
        //         if (state.param.parent === "") {
        //             state.organize = "组织架构与账号管理";
        //         }
        //
        //         this.setState(state);
        //     }
        // }.bind(this));
    },
    mouseOver: function (e) {
        e.currentTarget.style.background = "#fdebab";
    },
    mouseOut: function (e) {
        e.currentTarget.style.background = "#fff";
    },
    selected: function (e) {
        this.addItem();
    },
    select: function (e) {
        var state = this.state,
            target = e.currentTarget;

        for(var i = 0; i < state.memberList.length; i++) {
            if (state.memberList[i].id === target.getAttribute("id")) {
                state.describe = state.memberList[i];
            }
        }

        this.setState(state);
    },
    deleteSelect: function (e) {
        var state = this.state,
            target = e.currentTarget;

        for(var i = 0; i < state.selects.length; i++) {
            if (state.selects[i].id == target.getAttribute("id")) {
                state.describe = state.selects[i];
                state.deleteSelect = state.selects[i];
            }
        }

        this.setState(state);
    },
    addItem: function () {
        var state = this.state,
            selects = [];

        if (state.selects.length) {
            for (var i = 0; i < state.selects.length; i++) {
                selects.push(state.selects[i].id)
            }
        }

        if (selects.indexOf(state.describe.id) === -1) {
            state.selects.push(state.describe);
        }

        this.setState(state);
    },
    deleteItem: function () {
        var state = this.state;

        state.selects.splice(state.selects.indexOf(state.deleteSelect), 1);
        delete state.deleteSelect;
        
        this.setState(state);
    },
    addAll: function () {
        var state = this.state;

        state.selects = state.category.slice(0, state.category.length);
        delete state.deleteSelect;

        this.setState(state);
    },
    deleteAll: function () {
        var state = this.state;

        state.selects = [];
        delete state.deleteSelect;

        this.setState(state);
    },
    moveUp: function () {
        var state = this.state,
            index = state.selects.indexOf(state.deleteSelect);

        if(index === 0) {
            return false;
        } else {
            state.selects.splice(index, 1);
            index -= 1;
            state.selects.splice(index, 0, state.deleteSelect);
        }
        
        this.setState(state);
    },
    moveDown: function () {
        var state = this.state,
            index = state.selects.indexOf(state.deleteSelect);

        if(index === state.selects.length - 1) {
            return false;
        } else {
            state.selects.splice(index, 1);
            index += 1;
            state.selects.splice(index, 0, state.deleteSelect);
        }

        this.setState(state);
    },
    buttonOver: function (e) {
        e.currentTarget.style.background = "#33a6dc";
    },
    buttonOut: function (e) {
        e.currentTarget.style.background = "#c5c7c6";
    },
    ensure: function () {
        this.props.handleClick ? this.props.handleClick(this.state) : null;
        this.props.node ? this.props.node.parentNode.style.zIndex -= 1 : null;
    },
    cancel: function () {
        this.refs.template.style.display = "none";
        this.props.node ? this.props.node.parentNode.style.zIndex -= 1 : null;
        this.refs.describe.value = "";
    },
    render: function () {

        return (
            <div ref="template" style={{fontSize: "12px", fontFamily: "Microsoft YaHei"}}>
                <div style={{zIndex: "200", position: "fixed", _position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "#000", opacity: ".5", filter: "alpha(opacity=50)"}}></div>
                <div style={{zIndex: "201", position: "fixed", top: "50%", left: "50%", width: "820px", height: "530px", marginTop: "-265px", marginLeft: "-410px", backgroundColor: "#fff"}}>
                    <div style={{position: "relative", height: "42px", lineHeight: "42px", paddingLeft: "15px", backgroundColor: "#3ca0eb", fontSize: "16px", color: "#fff"}}>
                        组织架构
                        <i style={{position: "absolute", top: "12px", right: "10px", width: "16px", height: "16px", lineHeight: "16px", color: "#fff", textAlign: "center", cursor: "pointer"}} onClick={this.cancel}>x</i>
                    </div>
                    <div style={{height: "398px", margin: "20px", whiteSpace: "nowrap"}}>
                        <div style={{float: "left", width: "230px", height: "100%"}}>
                            <div style={{width: "100%", height: "30px", lineHeight: "30px"}}>
                                <p>
                                    <span id={this.state.param.parent} style={{float: "left", width: "16px", height: "16px", margin: "7px 8px 7px 0", background: "url(" + this.props.publicSrc + "grade.png) no-repeat", textIndent: "-999em"}} onClick={this.grade}>上一级</span>
                                    <span id={this.state.param.parent} style={{marginRight: "10px", cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis"}}>
                                        <span style={{cursor: "pointer"}} title="组织架构">组织架构</span>
                                    </span>
                                </p>
                            </div>
                            <div className="user-defind-scrollbar" style={{overflow:'auto'}}>
                                <Department
                                    items={this.state.items}
                                    options={{isTopParent: true, open: true}}
                                    dataSource={this.props.dataSource}
                                    handleGetMember={this.showMemberList.bind(this)}
                                >
                                </Department>
                            </div>
                        </div>
                        <div style={{float: "left", width: "530px", height: "100%", marginLeft: "20px"}}>
                            <div style={{height: "30px"}}>
                                <input ref="key" style={{float: "left", width: "232px", height: "28px", lineHeight: "23px", padding: "0 10px 0 25px", border: "1px #e1e1e1 solid", borderRadius: "3px", background: "url(" + this.props.publicSrc + "search.png) no-repeat 6px center #fff", fontSize: "12px", fontFamily: "Microsoft YaHei"}} type="text" placeholder="输入部门或人名" onKeyDown={function(e){this.enterEvent(e)}.bind(this)} />
                                <button type="button" className="btn btn-gray" style={{float: "left", marginLeft: "10px", border: "1px #e8e8e8 solid", background: "#efefef", color: "#717179"}} onClick={this.search}>搜索</button>
                                <button type="button" className="btn btn-gray" style={{float: "left", marginLeft: "10px", border: "1px #e8e8e8 solid", background: "#efefef", color: "#717179"}} onClick={this.clear}>清空待选</button>
                                <div style={{float: "left", marginLeft: "10px", marginTop: "5px"}}>
                                    <label className="el-component el-checkbox"><span className="el-checkbox-input"><input className="el-checkbox-original" type="checkbox" value="精确搜索" label="精确搜索" onClick={this.ensureSearch} /><i></i></span><span className="el-label">精确搜索</span></label>
                                </div>
                             </div>
                            <div style={{height: "271px", marginTop: "5px"}}>
                                <div style={{float: "left", width: "210px"}}>
                                    <div style={{height: "30px", lineHeight: "30px", fontSize: "13px", fontFamily: "Microsoft YaHei"}}>待选列表</div>
                                    <ul style={{height: "239px", border: "1px #e1e1e1 solid", overflowY: "scroll",margin:0}}>
                                        {this.state.memberList ? this.state.memberList.map(function (m, index) {
                                            return (
                                                <li key={index} id={m.id} style={(this.state.describe && this.state.describe.id === m.id) ? {lineHeight: "30px", padding: "0 10px", background: "#33a6dc", color: "#fff", cursor: "pointer"} : {lineHeight: "30px", padding: "0 10px", cursor: "pointer"}} onDoubleClick={this.selected} onClick={this.select} onMouseOver={(this.state.describe && this.state.describe.id === m.id) ? null : this.mouseOver} onMouseOut={(this.state.describe && this.state.describe.id === m.id) ? null : this.mouseOut}>
                                                    {m.name}
                                                </li>
                                            )
                                        },this) : null}
                                    </ul>
                                </div>
                                <div style={{float: "left", width: "55px", margin: "40px 20px 0 20px"}}>
                                    <a style={{display: "block", width: "100%", height: "25px", lineHeight: "25px", marginTop: "10px", borderRadius: "3px", background: "#c5c7c6", color: "#fff", fontSize: "12px", textAlign: "center", cursor: "pointer"}} onMouseOver={this.buttonOver} onMouseOut={this.buttonOut} onClick={this.state.describe ? this.addItem : null}>添加</a>
                                    <a style={{display: "block", width: "100%", height: "25px", lineHeight: "25px", marginTop: "10px", borderRadius: "3px", background: "#c5c7c6", color: "#fff", fontSize: "12px", textAlign: "center", cursor: "pointer"}} onMouseOver={this.buttonOver} onMouseOut={this.buttonOut} onClick={this.state.deleteSelect ? this.deleteItem : null}>删除</a>
                                    <a style={{display: "block", width: "100%", height: "25px", lineHeight: "25px", marginTop: "10px", borderRadius: "3px", background: "#c5c7c6", color: "#fff", fontSize: "12px", textAlign: "center", cursor: "pointer"}} onMouseOver={this.buttonOver} onMouseOut={this.buttonOut} onClick={this.state.category ? this.addAll : null}>全部添加</a>
                                    <a style={{display: "block", width: "100%", height: "25px", lineHeight: "25px", marginTop: "10px", borderRadius: "3px", background: "#c5c7c6", color: "#fff", fontSize: "12px", textAlign: "center", cursor: "pointer"}} onMouseOver={this.buttonOver} onMouseOut={this.buttonOut} onClick={this.state.selects ? this.deleteAll : null}>全部删除</a>
                                    <a style={{display: "block", width: "100%", height: "25px", lineHeight: "25px", marginTop: "10px", borderRadius: "3px", background: "#c5c7c6", color: "#fff", fontSize: "12px", textAlign: "center", cursor: "pointer"}} onMouseOver={this.buttonOver} onMouseOut={this.buttonOut} onClick={this.state.deleteSelect ? this.moveUp : null}>上移</a>
                                    <a style={{display: "block", width: "100%", height: "25px", lineHeight: "25px", marginTop: "10px", borderRadius: "3px", background: "#c5c7c6", color: "#fff", fontSize: "12px", textAlign: "center", cursor: "pointer"}} onMouseOver={this.buttonOver} onMouseOut={this.buttonOut} onClick={this.state.deleteSelect ? this.moveDown : null}>下移</a>
                                </div>
                                <div style={{float: "left", width: "210px"}}>
                                    <div style={{height: "30px", lineHeight: "30px", fontSize: "13px", fontFamily: "Microsoft YaHei"}}>已选列表</div>
                                    <ul style={{height: "239px", border: "1px #e1e1e1 solid", overflowY: "scroll",margin:0}}>
                                        {this.state.selects ? this.state.selects.map(function (m, index) {
                                            return (
                                                <li key={index} id={m.id} style={(this.state.deleteSelect && this.state.deleteSelect.id === m.id) ? {lineHeight: "30px", padding: "0 10px", background: "#33a6dc", color: "#fff", cursor: "pointer"} : {lineHeight: "30px", padding: "0 10px", cursor: "pointer"}} onClick={this.deleteSelect} onDoubleClick={this.deleteItem}>
                                                    {m.name}
                                                </li>
                                            )
                                        },this) : null}
                                    </ul>
                                </div>
                            </div>
                            <textarea ref="describe" style={{width: "515px", height: "60px", lineHeight: "18px", marginTop: "20px", padding: "5px 10px", border: "1px #dddddd solid", fontSize: "12px", fontFamily: "Microsoft YaHei", resize: "none"}} placeholder="组织或部门描述" value={this.state.describe ? this.state.describe.key2 : null}>
                                
                            </textarea>
                        </div>
                    </div>
                    <div style={{height: "50px", background: "#f8f9fd"}}>
                        <div style={{float: "right"}}>
                            <button type="button" className="btn btn-blue" style={{float: "left", marginTop: "13px", marginRight: "10px", marginBottom: "13px", color: "#fff"}} onClick={this.ensure}>确定</button>
                            <button type="button" className="btn btn-gray" style={{float: "left", marginTop: "13px", marginRight: "20px", marginBottom: "13px", color: "#fff"}} onClick={this.cancel}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var Department = React.createClass({
    getDefaultProps: function () {
        return {}
    },
    getInitialState: function () {
        return {
            list:[],
            selectedItem:[]
        }
    },

    render: function () {
        var { items, options, dataSource } = this.props;
        var topParentStyle = {
            margin:'0',
            minHeight:'370px',
            maxHeight:'370px'
        };
        var otherStyle = {
            margin: '0px 0 0 20px',
        };
        var ul_style = {
            position: 'relative',
            top:'12px'
        };

        return (
            <ul style={_.extend(options.isTopParent ? topParentStyle : otherStyle, { display: options.open ? 'block' : 'none' }, _.defaults({ top:options.isTopParent ? '0' : '10px'},ul_style))}>
                {
                    _.map(items, function (item, i) {
                        return (
                            <DepartmentItem key={item.id} data={item} dataSource={dataSource} isTopParent={options.isTopParent} handleGetMember={this.props.handleGetMember}></DepartmentItem>
                        )
                    }.bind(this))
                }
            </ul>
        );
    }
});

var DepartmentItem = React.createClass({
    getDefaultProps: function () {
        return {}
    },
    getInitialState: function () {
        return {
            items: []
        }
    },

    /**
     *  点击结点触发
     * @param e
     */
    /*showChildren: function (e) {
     e.preventDefault();
     var { data, isTopParent, onShowChildren } = this.props;
     onShowChildren(data.id);
     },*/

    showChildren: function () {
        var { data, dataSource } = this.props;
        var param = {}, url = '';
        //console.log(arguments);
        if (arguments[0] == 'department') {
            url = dataSource[0].value;
            param.id = arguments[1];

        } else if (arguments[0] == 'person') {
            url = dataSource[1].value;
            param.parentId = arguments[1];
            param.selectType = arguments[2];
        }
        var This = this;

        http(url, param, {
            type: 'POST'
        }).done(function (rtn) {
            if (rtn) {
                var obj = typeof (rtn) == 'string' ? JSON.parse(rtn) : rtn;
                var newItems = _.map(obj, function (r) {
                    if (r.isParent == 'true') {
                        return _.extend(r, {'children': [],'switch': false});
                    } else {
                        return _.extend(r, {'switch': false});
                    }
                })
                console.log(newItems);
                data.switch = !data.switch;
                This.setState({items: newItems})
            }
        }).fail(function (rtn) {

        });
        /*this.setState({
         items: list
         })*/
    },

    render: function () {
        var { data, isTopParent, dataSource } = this.props;
        var { items } = this.state;
        var li_style = {
            lineHeight: '30px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            position: 'relative',
            top: '12px',
            height:'26px',
            zIndex:'1'

        }
        var liStyle = {
            borderLeft: isTopParent ? null : '1px dashed #ccc',
            marginLeft:'0px',
            position: 'relative',
            top: '-10px',
        }
        var is_p_style = {
            width:'20px',
            height:'1px',
            position:'absolute',
            top:'26px',
            display:'inline-block',
            borderBottom:'1px dashed #ccc'
        }
        var ico_style = {
            width: '11px',
            height: '11px',
            marginLeft: '10px',
            marginRight: '5px',
            display: 'inline-block',
            zIndex:1
        };
        var category_ico = _.extend({
            background: data.switch ? 'url(' + this.props.publicSrc + 'tree-open-close.png) no-repeat -17px 0' : 'url(' + getCurrJsPath('DepartmentMember.js') + 'tree-open-close.png) no-repeat 0 0',
            cursor:'pointer'
        },ico_style);
        var template_ico = _.extend({
            background: 'url(' + this.props.publicSrc + 'file_ico.png) no-repeat 0 0'
        }, ico_style);

        return (
            <li style={liStyle}>
                <span style={is_p_style}/>
                <div data-type={data.isParent == 'true' ? 'department': 'person'} data-id={data.id} onClick={data.isParent == 'true' ? this.showChildren.bind(this,'department',data.id) : this.props.handleGetMember} style={isTopParent ? _.defaults(li_style,{top:'13px'}):li_style}>
                    <i className="file-ico" style={data.isParent == 'true' ? category_ico : template_ico } />
                    <a href="javascript:void(0);" style={{width:'80%',display:'inline-block',color:'#6a707d'}}>{data.name}</a>
                </div>
                {items && data.isParent == 'true' ? <DepartmentList items={items} options={{isTopParent: false, open: data.switch}} dataSource={dataSource} handleGetMember={this.props.handleGetMember}></DepartmentList> : null}
            </li>
        );
    }
});