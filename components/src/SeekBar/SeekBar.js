/**
 * author by Laisf on 2016/12/12.
 */
window.SeekBar = React.createClass({
    getDefaultProps:function () {
      return {
          width:225,
          percent:100,
      }
    },
    componentDidMount:function () {
        var that = this;
        var percent = this.props.percent / 100;
        $(document).ready(function() {
            $(that.refs.bar.getDOMNode())
                .delegate(that.refs.bar.getDOMNode(),'mousemove',function (e) {
                    var $mouse = e.pageX - $(e.currentTarget).offset().left;
                    var $span = Math.ceil($mouse*100/$(that.refs.bar).width())*percent;
                    if(isNaN($span)){
                        $span=0;
                    }
                    // $span = $span>100?100:$span;
                    $(e.currentTarget).find('h4').stop().animate({width:$span/percent+'%'},50);
                    $($(e.currentTarget).nextAll("span")[1]).text(parseInt($span));
                })
                .delegate(that.refs.bar.getDOMNode(),'mouseleave',function(e){
                    $(e.currentTarget).find('h4').stop().animate({width:'0%'},50);
                    var $mousex = $(e.currentTarget).find('h3').width();
                    var $spanx = Math.ceil($mousex*100/$(that.refs.bar).width())*percent;
                    if(isNaN($spanx)){
                        $spanx=0;
                    }
                    $spanx = $spanx>100?100:$spanx;
                    $($(e.currentTarget).nextAll("span")[1]).text(parseInt($spanx));
                    // if($spanx==100){
                    //     $($(e.currentTarget).nextAll("span")[1]).text('完成')
                    // }else{
                    //     $($(e.currentTarget).nextAll("span")[1]).text(parseInt($spanx));
                    // }
                })
                .delegate(that.refs.bar.getDOMNode(),'click',function(e){
                    var $mouse = e.pageX - $(e.currentTarget).offset().left;
                    var $span = Math.ceil($mouse*100/$(that.refs.bar).width())*percent;
                    if(isNaN($span)){
                        $span=0;
                    }
                    $span = $span>100?100:$span;
                    that.props.getValue&&that.props.getValue(Math.ceil($span)===0 ? Math.ceil($span) : Math.ceil($span)-1);
                    $(e.currentTarget).find('h3').stop().animate({width:$span/percent+'%'},100);
                    // if($span==100){
                    //     $($(e.currentTarget).nextAll("span")[1]).text('完成')
                    // }
                });
        });
    },
    render:function () {
        var containerStyle = {
            // width:(this.props.width+15)||'260'+'px',
            color:'#666'
        }
        var lineStyle = {
            float:'left',
            width:this.props.width||'225'+'px',
            height:'7px',
            fontSize:'0',
            lineHeight:'0',
            background:'#f2f2f2',
            border:'1px solid #dedede',
            borderRadius:'6px',
            position:'relative',
            marginTop:'8px',
            marginRight:'10px',
            cursor:'pointer'
        }
        var h3Style = {
            position:'absolute',
            left:'-1px',
            top:'-1px',
            height:'7px',
            fontSize:'0',
            lineHeight:'0',
            background:'#a3d9f4',
            border:'1px solid #187aab',
            borderRadius:'6px',
            margin:0,
            padding:0
        }
        return (
            <div style={containerStyle} ref="barBox">
                <div style={lineStyle} ref="bar">
                    <h3 style={_.extend({width:this.props.value ? (this.props.value/(this.props.percent/ 100))+"%" :'0%',zIndex:'99'},h3Style)} />
                    <h4 style={_.extend({border:'1px solid #91cdea', background:'#f5fafc', zIndex:'88'},h3Style)} />
                </div>
                <span>{this.props.labelName}</span>
                <span>{this.props.value ? this.props.value: 0}</span>
                {this.props.children}
            </div>
        )
    }
})