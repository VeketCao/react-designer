/**
 * 布局
 * Created by Veket on 2016/5/10.
 */
window.ColumnPanel=React.createClass({displayName: "ColumnPanel",
    render:function(){
        var column_style={'display':'table','width':'100%','tableLayout':'fixed'  };
        var cell_style={'display':'table-cell','verticalAlign':'top','height':'51px','width':'100%'};
        var width_50={'width':'50%'};
        var width_25={'width':'25%'};
        var width_33={'width':'33.33%'};
        var getResult=function(type){
            if(type==2){//1:1
                return React.createElement("div", {className: "column-layout column_js", style: column_style},
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_50,cell_style), value: "0,0"}),
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_50,cell_style), value: "0,1"})
                );
            }if(type==3){//1:1:1
                return React.createElement("div", {className: "column-layout column_js", style: column_style}, 
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_33,cell_style), value: "0,0"}), 
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_33,cell_style), value: "0,1"}), 
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_33,cell_style), value: "0,2"})
                );
            }if(type==4){//1:2:1
                return React.createElement("div", {className: "column-layout column_js", style: column_style}, 
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_25,cell_style), value: "0,0"}), 
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_50,cell_style), value: "0,1"}), 
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: _.defaults(width_25,cell_style), value: "0,2"})
                );
            }else{
                return React.createElement("div", {className: "column-layout column_js", style: column_style}, 
                    React.createElement("div", {className: "cell cell_js ui-sortable", style: cell_style, value: "0,0"})
                );
            }
        };
        return getResult(this.props.type);
    }
});