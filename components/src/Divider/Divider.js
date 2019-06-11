/**
 * author by Laisf on 2016/12/9.
 */
window.Divider = React.createClass({
    theme:['default', 'dotted', 'dashed'],
    render:function () {
        var Color = this.props.color == '' ? '#cccccc' : this.props.color;
        var dividerStyle = {
            display: 'block',
            height: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '10px',
            marginBottom: '10px',
            overflow: 'hidden',
            clear: 'both',
            borderTopColor: Color,
            borderTopWidth: this.props.width,
            borderTopStyle: this.theme[this.props.theme]
        };

        return (
            <hr style={dividerStyle} />
        );
    }
});