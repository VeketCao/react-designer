/**
 * author by Laisf on 2016/12/28.
 * editer by ouli on 2017/3/8
 */
window.DepartmentMember = React.createClass({
    displayName: "DepartmentMember",
    getDefaultProps: function () {
        var ul_style = {
            position: 'relative',
            top:'12px'
        }
        var ico_style = {
            width: '16px',
            height: '16px',
            display: 'inline-block',
            zIndex:1,
            cursor:'pointer'
        }
        var category_ico_style = _.extend({
            background: 'url(' + getCurrJsPath('DepartmentMember.js') + 'tree-open-close.png) no-repeat -6px -4px',
            marginLeft: '10px',
            marginRight: '5px',
            backgroundSize:'50px'
        }, ico_style);
        var template_ico_style = _.extend({
            background: 'url(' + getCurrJsPath('DepartmentMember.js') + 'file_ico.png) no-repeat -5px -2px',
            marginLeft: '10px',
            marginRight: '5px',
            backgroundSize:'26px'
        }, ico_style);
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
        return {
            ul_style: ul_style,
            category_ico_style: category_ico_style,
            template_ico_style: template_ico_style,
            li_style: li_style
        }
    },
    getInitialState: function () {
        return {
            /*items: [
                {
                    id:1,
                    nodeType:"Folder",
                    text:"123 Folder",
                    children:[
                        {
                            id:5,
                            nodeType:"Folder",
                            text:"123",
                            children:[
                                {
                                    id:25,
                                    nodeType:"TEMPLATE",
                                    text:"123",
                                },
                                {
                                    id:26,
                                    nodeType:"TEMPLATE",
                                    text:"123",
                                },
                                {
                                    id:27,
                                    nodeType:"TEMPLATE",
                                    text:"123",
                                },
                                {
                                    id:28,
                                    nodeType:"TEMPLATE",
                                    text:"123",
                                },
                                {
                                    id:29,
                                    nodeType:"TEMPLATE",
                                    text:"123",
                                },

                            ]
                        },
                        {
                            id:6,
                            nodeType:"Folder",
                            text:"123",
                            children:[
                                {
                                    id:30,
                                    nodeType:"Folder",
                                    text:"123",
                                },
                                {
                                    id:31,
                                    nodeType:"Folder",
                                    text:"123",
                                },
                                {
                                    id:32,
                                    nodeType:"Folder",
                                    text:"123",
                                },
                                {
                                    id:33,
                                    nodeType:"Folder",
                                    text:"123",
                                },
                                {
                                    id:34,
                                    nodeType:"Folder",
                                    text:"123",
                                },

                            ]
                        },
                        {
                            id:7,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:8,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:9,
                            nodeType:"Folder",
                            text:"123",
                        },

                    ]
                },
                {
                    id:2,
                    nodeType:"Folder",
                    text:"123 Folder",
                    children:[
                        {
                            id:10,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:11,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:12,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:13,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:14,
                            nodeType:"Folder",
                            text:"123",
                        },

                    ]
                },
                {
                    id:3,
                    nodeType:"Folder",
                    text:"123 Folder",
                    children:[
                        {
                            id:15,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:16,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:17,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:18,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:19,
                            nodeType:"Folder",
                            text:"123",
                        },

                    ]
                },
                {
                    id:4,
                    nodeType:"Folder",
                    text:"123 Folder",
                    children:[
                        {
                            id:20,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:21,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:22,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:23,
                            nodeType:"Folder",
                            text:"123",
                        },
                        {
                            id:24,
                            nodeType:"Folder",
                            text:"123",
                        },

                    ]
                }
            ],*/
            items: [],
            memberList: [],
            /*data: Immutable.Map({
                memberList:[]
            }),*/
            filterMemberList: [],
            selectedItem:[],
            selectedMember:[],
            exactSearch: false
        }
    },
    /*memberList:[
        {
            id:1,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:2,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:3,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id: 4,
            nodeType: "Folder",
            text: "123 Folder",
        },
        {
            id:5,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:6,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:7,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:8,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:9,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:10,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:11,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:12,
            nodeType:"Folder",
            text:"123 Folder",
        },
        {
            id:22,
            nodeType:"Folder",
            text:"123 Folder",
        },
    ],*/
    /**
     *xml对象转json对象
     *xmlObj:xml对象
     *nodename:节点路径('ROOT/ITEM')
     *isarray:true,强制返回数组对象
     **/
    /*xmltojson:function(xmlObj,nodename,isarray){
        var obj=$(xmlObj);
        var itemobj={};
        var nodenames="";
        var getAllAttrs=function(node){//递归解析xml 转换成json对象
            var _itemobj={};
            var nodechilds=node.childNodes;
            var childlenght=nodechilds.length;
            var _attrs=node.attributes;
            var firstnodeName="#text";
            try{
                firstnodeName=nodechilds[0].nodeName;
            }catch(e){}
            if((childlenght>0&&firstnodeName!="#text")||_attrs.length>0){
                var _childs=nodechilds;
                var _childslength=nodechilds.length;
                if(undefined!=_attrs){
                    var _attrslength=_attrs.length;
                    for(var i=0; i<_attrslength; i++){//解析xml节点属性
                        var attrname=_attrs[i].nodeName;
                        var attrvalue=_attrs[i].nodeValue;
                        _itemobj[attrname]=attrvalue;
                    }
                }
                for (var j = 0; j < _childslength; j++) {//解析xml子节点
                    var _node = _childs[j];
                    var _fildName = _node.nodeName;
                    if("#text"==_fildName){break;};
                    if(_itemobj[_fildName]!=undefined){//如果有重复的节点需要转为数组格式
                        if(!(_itemobj[_fildName] instanceof Array)){
                            var a=_itemobj[_fildName];
                            _itemobj[_fildName]=[a];//如果该节点出现大于一个的情况 把第一个的值存放到数组中
                        }
                    }
                    var _fildValue=getAllAttrs(_node);
                    try{
                        _itemobj[_fildName].push(_fildValue);
                    }catch(e){
                        _itemobj[_fildName]=_fildValue;
                        _itemobj["length"]=1;
                    }
                }
            }else{
                _itemobj=(node.textContent==undefined)?node.text:node.textContent;
            }
            return _itemobj;
        };
        if(nodename){
            nodenames=nodename.split("/")
        }
        for(var i=0;i<nodenames.length;i++){
            obj=obj.find(nodenames[i]);
        }
        $(obj).each(function(key,item){
            if(itemobj[item.nodeName]!=undefined){
                if(!(itemobj[item.nodeName] instanceof Array)){
                    var a=itemobj[item.nodeName];
                    itemobj[item.nodeName]=[a];
                }
                itemobj[item.nodeName].push(getAllAttrs(item));
            }else{
                if(nodenames.length>0){
                    itemobj[item.nodeName]=getAllAttrs(item);
                }else{
                    itemobj[item.firstChild.nodeName]=getAllAttrs(item.firstChild);
                }
            }
        });
        if(nodenames.length>1){
            itemobj=itemobj[nodenames[nodenames.length-1]];
        }
        if(isarray&&!(itemobj instanceof Array)&&itemobj!=undefined){
            itemobj=[itemobj];
        }
        return itemobj;
    },*/
    componentDidMount:function () {
        // this.setState({
        //     memberList:this.memberList
        // });
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

    },

    /**
     *  异步获取对应数据
     * @param item
     */
    dataAjax: function (item) {
        if (item.type == 'parent') {
            var This = this;
            http(this.props.dataSource[0].value, {
                'id': item.param.id
            }, {
                type: 'POST'
            }).done(function (rtn) {


            }).fail(function (rtn) {

            });
        } else if(item.type == 'child') {
            var This = this;
            http(this.props.dataSource[1].value, {
                'parentId': item.param.id,
                'selectType': item.param.type
            }, {
                type: 'POST'
            }).done(function (rtn) {

            }).fail(function (rtn) {

            });
        }
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
                    //data: This.state.data.set('memberList', newItems),
                    memberList: newItems
                });
            }
        }).fail(function (rtn) {
            This.setState({
                //data: This.state.data.set('memberList', []),
                memberList: []
            });
        });
    },

    /**
     * 精确查找
     * @param e
     */
    changeCheckBoxHandle:function(e){
        this.setState({
            exactSearch:!this.state.exactSearch
        });
    },

    /**
     * 根据精确查找、输入的关键字条件过滤
     * @param e
     */
    filterMember: function (e) {
        var _word = e.target.value.replace(/(^\s+)|(\s+$)/g,'') || '';
        if(_word) {
            var filterMembers = _.filter(this.state.memberList, function (item) {
                //console.log(this.state.exactSearch ? item.name ==_word: _.indexOf(item.name + "",_word),_word+"===" + item.name)
                return this.state.exactSearch ? item.name == _word : (item.name.indexOf(_word)!=-1 || item.name ==_word);
            }.bind(this));

            this.setState({
                filterMemberList: filterMembers
                //data: this.state.data.set('memberList',filterMembers),
                //memberList: filterMembers
            });
        } else {
            this.setState({
                filterMemberList: []
                //data: this.state.data.get('memberList'),
                //memberList: filterMembers
            });
        }

    },
    /**
     * 当前选择的人是否已选
     * @param id
     * @param items
     */
    getCheckMember: function (id, items) {
        for(var i = 0; i < items.length; i++) {
            var item = items[i];
            console.log(item.id);
            if(item.id == id){
                this.setState({
                    selectedMember: item ? this.state.selectedItem.concat(item) :this.state.selectedItem
                });
                return ;
            }else{
                if(item.children&&item.children.length>0){
                    this.getCheckMember(id,item.children);
                }
            }
        }
    },

    /**
     * 增加选择的人员
     * @param e
     */
    addSelectMember: function (e) {
        e.preventDefault();
        var _id = e.currentTarget.getAttribute('data-id');
        //console.log(_id);
        //console.log(this.state.selectedMember);
        //var selectedMember = _.findWhere(this.state.selectedItem, {id: parseInt(_id)});
        var selectedMember = _.findWhere(this.state.selectedMember, {id: _id});
        var This = this;
        if(_.isEmpty(selectedMember)) {
            //console.log('需要添加！');
            //this.getCheckMember(_id,this.state.items);
            //this.getCheckMember(_id, this.state.selectedMember);
            var itemName = '';
            var _list = _.map(This.state.memberList, function (item) {
                if (item.id == _id) {
                    item.selected = true;
                    itemName = item.name;
                }
                return item;
            });
            // var sel = _.filter(This.state.data.get('memberList'),function (item) {
            //     return item.id == _id;
            // });
            var arr = this.state.selectedMember;
            arr.push({
                id: _id,
                name: itemName
            })
            this.setState({
                //data: This.state.data.set('memberList', _list),
                memberList: _list,
                selectedMember: arr
            })
        }
    },

    /**
     * 增加列表当中的所有成员
     * @param e
     */
    addAllSelectMember: function () {
        //e.preventDefault();
        var _list = _.map(this.state.memberList, function (item) {
            item.selected = true;
            return item;
        });

        var arr = [];
        _.map(this.state.memberList, function (item) {
            arr.push({
                id: item.id,
                name: item.name
            })
        });

        this.setState({
            //data: this.state.data.set('memberList', _list),
            memberList: _list,
            selectedMember: arr
        })
    },

    /**
     * 展示已选择人员列表
     */
    showSelectMember: function () {
        _.map(this.state.memberList, function (item) {
            if (item.selected) {
                return (
                    <span>
                       <span style={{color:"#666"}}>{m.name}</span>
                       <span style={{color:"#999"}}>&lt;{m.job}&gt;</span>
                       <i data-value={m.id} onClick={this.deleteSelectMember} style={{cursor:'pointer',position:'relative',left:'-5px',top:'2px',background:'url(' + getCurrJsPath('DepartmentMember.js') + 'delete.png) no-repeat center center',width:'24px',height:'18px',display:'inline-block'}} />
                       <span style={{position:'relative',left:'-3px'}}>;</span>
                    </span>
                )
            } else {
                return null;
            }
        });
    },

    /**
     * 删除已选择的人员
     * @param e
     */
    deleteSelectMember:function (e) {
        e.preventDefault();
        var _id = e.currentTarget.getAttribute('data-id');
        var _new = _.filter(this.state.selectedMember, function (item) {
            return item.id != _id;
        });
        var _list = _.map(this.state.memberList,function (item) {
            if (item.id == _id) {
                item.selected = false;
            }
            return item;
        });

        this.setState({
            //data: this.state.data.set('memberList', _list),
            memberList: _list,
            selectedMember: _new
        });
    },

    /**
     * 清空已选
     */
    emptySelectMember:function () {
        var _list = _.map(this.state.memberList, function (item) {
            item.selected = false;
            return item
        });
        this.setState({
            //data: this.state.data.set('memberList', _list),
            memberList: _list,
            selectedMember: []
        });
    },

    /**
     * 确定按钮获取选择的全部人员对象
     */
    getMembers:function () {
        var nameArr = _.pluck(this.state.selectedMember, 'name');
        this.props.getValues && this.props.getValues(nameArr, this.props.closeWindow);
    },

    render:function () {
       var memberList = this.state.filterMemberList.length > 0 ? this.state.filterMemberList : this.state.memberList;
       return (
           <div className="department-list">
               <div style={{zIndex: "200", position: "fixed", _position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "#000", opacity: ".5", filter: "alpha(opacity=50)"}}></div>
               <div style={{zIndex: "201",position: "fixed", top: "50%", left: "50%", width: "820px", height: "605px", marginTop: "-325px", marginLeft: "-410px", backgroundColor: "#fff"}}>
                   <div style={{height:'45px',background:'#0091d2',color:'#fff',lineHeight:'45px'}}>
                       <h3 style={{margin:'0 30px',padding:0}}>{this.props.title||'部门人员选择'}</h3>
                       <a style={{position:'absolute',right:'20px',top:'0px',color:"#fff",fontSize:"22px"}} onClick={this.props.closeWindow}>×</a>
                   </div>
                   <div style={{height: "560px",backgroundColor: "#fff"}}>
                       <div style={{
                           position:'relative',
                           backgroundColor: '#f6f6f6',
                           height:'560px',
                           width:'30%',
                           margin:0,
                           padding:'15px 0 10px 0',
                           boxSizing:'border-box',
                           display:'inline-block'
                       }}>
                           <div className="department-title">组织架构</div>
                           <div className="user-defind-scrollbar" style={{overflow:'auto'}}>
                               <DepartmentList
                                   items={this.state.items}
                                   options={{isTopParent: true, open: true}}
                                   dataSource={this.props.dataSource}
                                   handleGetMember={this.showMemberList.bind(this)}
                               >
                               </DepartmentList>
                           </div>
                       </div>
                       <div style={{
                           display:'inline-block',
                           position: 'relative',
                           top: 0,
                           float: 'right',
                           width: '70%',
                           height: '560px',
                           padding: '15px 40px 10px 40px',
                           boxSizing: 'border-box'
                       }}>
                           <div style={{height: '30px'}}>
                               <input type="text" style={{
                                   display: 'inline-block',
                                   width: '200px',
                                   height: '30px',
                                   border: '1px solid #ccc',
                                   lineHeight:'1.2',
                                   padding:'0 10px',
                                   verticalAlign: 'middle',
                                   fontSize:'14px'
                               }} placeholder="请输入人员姓名"
                               onKeyUp={this.filterMember}/>
                               <abbr style={{padding:'0 37px',fontSize:'14px'}}>
                                   <label className="el-component el-checkbox"><span className="el-checkbox-input"><input className="el-checkbox-original" type="checkbox" value="精确搜索" label="精确搜索" onClick={this.changeCheckBoxHandle} checked={this.state.exactSearch} /><i></i></span><span className="el-label">{'精确搜索'}</span></label>
                               </abbr>
                               <button type="button" style={{float: 'right'}} className="btn btn-blue" onClick={this.addAllSelectMember}>全部添加</button>
                           </div>
                           <div className="user-defind-scrollbar" style={{fontSize:'14px',height:'282px',marginTop:'20px',overflowX:'hidden',overflowY:'auto',borderTop:'1px solid #ccc',borderBottom:'1px solid #ccc'}}>
                               {
                                   _.map(memberList.length < 7 ? new Array(7) : new Array(memberList.length),function(m,idx) {
                                       //var length = this.state.data.get('memberList').length <8 ? 8 : this.state.data.get('memberList').length;
                                       m = memberList[idx];
                                       return (
                                           _.isEmpty(m)
                                           ? <div className="person-item" />
                                           : <div className={m.selected ? 'person-item selectable' : 'person-item unselectable'} data-id={m.id} onDoubleClick={this.addSelectMember}>
                                               <span style={{float:'left',padding:'0 10px'}}>{m.name}</span>
                                               <span style={{float:'right',padding:'0 20px'}}>{m.job}</span>
                                           </div>
                                       );
                                   }.bind(this))
                               }
                           </div>
                           <div style={{clear:'both',padding:'20px 0'}}>
                               <p>
                                   <span style={{float:'left',fontSize:'14px'}}>已选<b style={{color:'#3aa2eb',padding:'0 5px'}}>{this.state.selectedMember.length}</b>项</span>
                                   <button type="button"  style={{float:'right',fontSize:'14px'}} className={memberList.length > 0 ? 'btn btn-blue' : 'btn' } onClick={this.emptySelectMember}>一键删除</button>
                               </p>
                               <div className="user-defind-scrollbar" style={{height:'100px',display:'block',clear:'both',fontSize:'14px',width:'100%',marginTop:'50px',padding:'0 10px',border:'1px solid #ccc',overflowY:'auto',wordBreak:'break-all'}}>
                                   {
                                       this.state.selectedMember.length == 0 && <span style={{color:'#999'}}>请选择部门成员</span>
                                   }
                                   {
                                       _.map(memberList, function(m,idx) {
                                           //var length = this.state.data.get('memberList').length <8 ? 8 : this.state.data.get('memberList').length;
                                           return (
                                               !m.selected ? null :
                                                   <span className="selected-member">
                                                       <span style={{color:"#666"}}>{m.name}</span>
                                                       <span style={{color:"#999"}}>&lt;{m.job}&gt;</span>
                                                       <i data-id={m.id} onClick={this.deleteSelectMember} style={{cursor:'pointer',position:'relative',left:'-5px',top:'2px',background:'url(' + getCurrJsPath('DepartmentMember.js') + 'delete.png) no-repeat center center',width:'24px',height:'18px',display:'inline-block'}} />
                                                       <span style={{position:'relative',left:'-3px'}}>;</span>
                                                   </span>
                                           );
                                       }.bind(this))
                                   }
                               </div>
                               <p style={{textAlign:'right'}}>
                                   <button type="button" style={{marginTop:'5px'}} className="btn btn-green" onClick={this.getMembers}>确定</button>
                                   <button type="button" style={{margin:'5px 0 0 15px'}} className="btn btn-gray" onClick={this.props.closeWindow}>取消</button>
                               </p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       );
   }
});

var DepartmentList = React.createClass({
    getDefaultProps: function () {
        return {}
    },
    getInitialState: function () {
        return {}
    },

    render: function () {
        var { items, options, dataSource } = this.props;
        var topParentStyle = {
            padding: '10px',
            margin:'0',
            minHeight:'500px',
            maxHeight:'500px'
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
                //console.log(newItems);
                data.switch = !data.switch;
                This.setState({items: newItems})
            }
        }).fail(function (rtn) {

        });
    },

    render: function () {
        var { data, isTopParent, dataSource, handleGetMember } = this.props;
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
            background: data.switch ? 'url(' + getCurrJsPath('DepartmentMember.js') + 'tree-open-close.png) no-repeat -17px 0' : 'url(' + getCurrJsPath('DepartmentMember.js') + 'tree-open-close.png) no-repeat 0 0',
            cursor:'pointer'
        },ico_style);
        var template_ico = _.extend({
            background: 'url(' + getCurrJsPath('DepartmentMember.js') + 'file_ico.png) no-repeat 0 0'
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