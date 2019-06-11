/**
 * author by Laisf on 2016/12/13.
 */
window.TimePicker = React.createClass({
    getInitialState:function () {
        return {
            isShowTimeSelect:false,
            h:'00',
            m:'00',
            s:'00'
        }
    },
    getHour:function(e){
        var h = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        this.setState({
            h:h
        });
    },
    getMinute:function(e){
        var m = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        this.setState({
            m:m
        });
    },
    getSecond:function(e){
        var s = e.target.getAttribute("data-value");
        this.liClickHandle(e);
        this.setState({
            s:s
        });
    },
    openHandle:function () {
        this.setState({
            isShowTimeSelect:true
        });
        ClickAway.bindClickAway(this.closeHandle, this.refs.timeBox);
    },
    closeHandle:function () {
        this.setState({
            isShowTimeSelect:false
        });
        ClickAway.unbindClickAway(this.closeHandle, this.refs.timeBox);
    },
    liMouseOver:function (e) {
        if(e.target.className.indexOf("curr") == -1){
            $(e.target).siblings("li").not(".curr").css("background","#fff");
            e.target.style.background="#c1c1c1";
        }
    },
    liMouseLeave:function (e) {
        if(e.target.className.indexOf("curr") == -1){
            e.target.style.background="#fff";
        }
    },
    liClickHandle:function (e) {
        $(e.target).addClass("curr").siblings("li").removeClass("curr");
        e.target.style.background="#c1c1c1";
    },
    componentWillUpdate: function(props,state){
        if(state.isShowTimeSelect){
            $(this.refs.hour).stop().animate({scrollTop:state.h>$(this.refs.hour).height()*1.5?state.h*24:state.h*24-$(this.refs.hour).height()*0.4});
            $(this.refs.minute).stop().animate({scrollTop:state.m>$(this.refs.minute).height()*1.5?state.m*24:state.m*24-$(this.refs.minute).height()*0.4});
            $(this.refs.second).stop().animate({scrollTop:state.s>$(this.refs.second).height()*1.5?state.s*24:state.s*24-$(this.refs.second).height()*0.4});
        }
    },
    render:function () {
        var containerStyle = {
            fontSize:'12px',
            color:"#333"
        }
        var time_li_style = {
            height:'24px',
        }
        var _title = this.props.title || '时间选择';
        var _description = this.props.description || '';
        if (this.props.lang) {
           _title = this.props.lang[this.props.language]['title'] || '时间选择';
           _description = this.props.lang[this.props.language]['description'] || '';
        }

        return (
           <div className="form-component">
               <div className="form-component-header">
                   <label className="form-component-title">{_title}</label>
               </div>
               <div className="form-component-group">
                   {
                       _description != '' && <p className="form-component-desc">{`(` + _description + `)`}</p>
                   }
                   <div ref="timeBox" className="time-input unselectable" onClick={this.openHandle}>
                       <a style={{color:'inherit'}}>{this.state.h}:{this.state.m}:{this.state.s}</a>
                       <div style={{display:this.state.isShowTimeSelect ? 'block':"none",position:'absolute',border:'1px solid #e1e1e1',padding:'10px',left:'-1px',borderRadius: '3px', background:'#fff',zIndex:100,width:'242px'}}>
                           <ul ref="hour" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                               {
                                   _.map(new Array(24),function (item,i) {
                                       var value = (i+"").length>1?i:("0"+i);
                                       return (
                                           <li onClick={this.getHour} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.h == value ? "curr" : null} key={i} style={_.extend({background:this.state.h == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                       )
                                   }.bind(this))
                               }
                           </ul>
                           <span style={{float:'left',height:'120px',lineHeight:'130px',display:'inline-block',padding:'0 5px'}}>:</span>
                           <ul ref="minute" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                               {
                                   _.map(new Array(60),function (item,i) {
                                       var value = (i+"").length>1?i:("0"+i);
                                       return (
                                           <li onClick={this.getMinute} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.m == value ? "curr" : null} key={i} style={_.extend({background:this.state.m == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                       )
                                   }.bind(this))
                               }
                           </ul>
                           <span style={{float:'left',height:'120px',lineHeight:'130px',display:'inline-block',padding:'0 5px'}}>:</span>
                           <ul ref="second" className="user-defind-scrollbar" style={{float:'left',width:'60px',height:'140px',overflow:'auto',position:'relative',border:'1px solid #e1e1e1',display:'inline-block',padding:0,textAlign:'center',margin:"0"}}>
                               {
                                   _.map(new Array(60),function (item,i) {
                                       var value = (i+"").length>1?i:("0"+i);
                                       return (
                                           <li onClick={this.getSecond} data-value={value} onMouseOver={this.liMouseOver} onMouseLeave={this.liMouseLeave} className={this.state.s == value ? "curr" : null} key={i} style={_.extend({background:this.state.s == value ?'#c1c1c1':"#fff"},time_li_style)}>{value}</li>
                                       )
                                   }.bind(this))
                               }
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
        )
   }
});