/**
 * Created by Veket on 2016/7/30.
 */
window.SubmitButton=React.createClass({
    submitHandle:function(){
        if(validtion()){
            var keys=[],values=[];
            $('div[data-field-name]').each(function(i,dom){
                var k=$(dom).attr('data-field-name');
                var v=$(dom).attr('data-field-value');
                if(!_.isEmpty(k)){
                    keys.push(k);
                    values.push(v);
                }
            });
            console.log(_.object(keys,values));
        }
    },
    render:function(){
        var _title = this.props.title || '标题';
        if (this.props.lang) {
            _title = this.props.lang[this.props.language]['title'];
        }

        return (<div>
            <button type="submit" className="btn btn-blue" onClick={this.submitHandle}>{_title}</button>
        </div>)
    }
});