/**
 * TreeTemplate
 *
 * Copyright 2016/08/08, NieFZ, Inc.
 * All rights reserved.
 *
 */

window.TreeTemplate = React.createClass({
    displayName: "TreeTemplate",
    getInitialState: function () {
        return {
            field: {
                id: this.props.field && this.props.field.id ? this.props.field.id : "value",
                text: this.props.field && this.props.field.text ? this.props.field.text : "text"
            },
            style: {
                height: this.props.style && this.props.style.height ? this.props.style.height : "318px"
            }
        }
    },
    category: function (item) {
        return function (e) {
            this.getTemplate(e, item);
        }.bind(this);
    },
    getTemplate: function (e, item) {
        var target = e.currentTarget,
            id = target.getAttribute("id"),
            nextSibling = target.parentNode.nextSibling;

        if (item.category) {
            if (nextSibling.style.display === "block") {
                target.style.background = "url(" + getCurrJsPath('TreeTemplate.js') + "folder.png) 3px 3px no-repeat";
                nextSibling.style.display = "none";
            } else {
                target.style.background = "url(" + getCurrJsPath('TreeTemplate.js') + "unfolders.png) 3px 3px no-repeat";
                nextSibling.style.display = "block";
            }
        } else {
            this.props.event && this.props.event.getTemplate ? this.props.event.getTemplate(target, item) : null;
        }
    },
    change: function (e) {
        var state = this.state,
            target = e.currentTarget;

        state.id = target.getAttribute("id");
        state.value = target.innerText;
        
        this.setState(state);

        this.props.event && this.props.event.change ? this.props.event.change(state) : null;
    },
    render: function () {
        return (
            <div style={{float: "left", width: "100%", height: this.state.style.height}}>
                <ul style={{float: "left", width: "100%", height: "100%", overflow: "auto"}}>
                    {this.props.resultData ? this.props.resultData.map(function (item, index) {
                        return (
                            <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                <a>
                                    <span
                                        id={item[this.state.field.id]}
                                        style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                        onClick={this.category(item)}>
                                        {item[this.state.field.id]}
                                    </span>
                                    <div id={item[this.state.field.id]}
                                         style={{marginRight: "10px", cursor: "pointer"}}
                                         onClick={this.change}>
                                        <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                            {item[this.state.field.text]}
                                        </em>
                                        <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                            {item[this.state.field.text]}
                                        </span>
                                    </div>
                                </a>
                                {item.category ?
                                    <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                        {item.category.map(function (item, index) {
                                            return (
                                                <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                    <a>
                                                        <span
                                                            id={item[this.state.field.id]}
                                                            style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                            onClick={this.category(item)}>
                                                            {item[this.state.field.id]}
                                                        </span>
                                                        <div id={item[this.state.field.id]}
                                                             style={{marginRight: "10px", cursor: "pointer"}}
                                                             onClick={this.change}>
                                                            <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                {item[this.state.field.text]}
                                                            </em>
                                                            <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                {item[this.state.field.text]}
                                                            </span>
                                                        </div>
                                                    </a>
                                                    {item.category ?
                                                        <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                            {item.category.map(function (item, index) {
                                                                return (
                                                                    <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                        <a>
                                                                            <span
                                                                                id={item[this.state.field.id]}
                                                                                style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                onClick={this.category(item)}>
                                                                                {item[this.state.field.id]}
                                                                            </span>
                                                                            <div id={item[this.state.field.id]}
                                                                                 style={{marginRight: "10px", cursor: "pointer"}}
                                                                                 onClick={this.change}>
                                                                                <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                    {item[this.state.field.text]}
                                                                                </em>
                                                                                <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                    {item[this.state.field.text]}
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                        {item.category ?
                                                                            <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                                                {item.category.map(function (item, index) {
                                                                                    return (
                                                                                        <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                                            <a>
                                                                                                <span
                                                                                                    id={item[this.state.field.id]}
                                                                                                    style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                                    onClick={this.category(item)}>
                                                                                                    {item[this.state.field.id]}
                                                                                                </span>
                                                                                                <div id={item[this.state.field.id]}
                                                                                                     style={{marginRight: "10px", cursor: "pointer"}}
                                                                                                     onClick={this.change}>
                                                                                                    <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                                        {item[this.state.field.text]}
                                                                                                    </em>
                                                                                                    <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                                        {item[this.state.field.text]}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </a>
                                                                                            {item.category ?
                                                                                                <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                                                                    {item.category.map(function (item, index) {
                                                                                                        return (
                                                                                                            <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                                                                <a>
                                                                                                                    <span
                                                                                                                        id={item[this.state.field.id]}
                                                                                                                        style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                                                        onClick={this.category(item)}>
                                                                                                                        {item[this.state.field.id]}
                                                                                                                    </span>
                                                                                                                    <div id={item[this.state.field.id]}
                                                                                                                         style={{marginRight: "10px", cursor: "pointer"}}
                                                                                                                         onClick={this.change}>
                                                                                                                        <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                                                            {item[this.state.field.text]}
                                                                                                                        </em>
                                                                                                                        <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                                                            {item[this.state.field.text]}
                                                                                                                        </span>
                                                                                                                    </div>
                                                                                                                </a>
                                                                                                                {item.category ?
                                                                                                                    <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                                                                                        {item.category.map(function (item, index) {
                                                                                                                            return (
                                                                                                                                <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                                                                                    <a>
                                                                                                                                        <span
                                                                                                                                            id={item[this.state.field.id]}
                                                                                                                                            style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                                                                            onClick={this.category(item)}>
                                                                                                                                            {item[this.state.field.id]}
                                                                                                                                        </span>
                                                                                                                                        <div id={item[this.state.field.id]}
                                                                                                                                             style={{marginRight: "10px", cursor: "pointer"}}
                                                                                                                                             onClick={this.change}>
                                                                                                                                            <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                                                                                {item[this.state.field.text]}
                                                                                                                                            </em>
                                                                                                                                                <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                                                                                    {item[this.state.field.text]}
                                                                                                                                                </span>
                                                                                                                                        </div>
                                                                                                                                    </a>
                                                                                                                                    {item.category ?
                                                                                                                                        <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                                                                                                            {item.category.map(function (item, index) {
                                                                                                                                                return (
                                                                                                                                                    <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                                                                                                        <a>
                                                                                                                                                            <span
                                                                                                                                                                id={item[this.state.field.id]}
                                                                                                                                                                style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                                                                                                onClick={this.category(item)}>
                                                                                                                                                                {item[this.state.field.id]}
                                                                                                                                                            </span>
                                                                                                                                                            <div id={item[this.state.field.id]}
                                                                                                                                                                 style={{marginRight: "10px", cursor: "pointer"}}
                                                                                                                                                                 onClick={this.change}>
                                                                                                                                                                <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                                                                                                    {item[this.state.field.text]}
                                                                                                                                                                </em>
                                                                                                                                                                <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                                                                                                    {item[this.state.field.text]}
                                                                                                                                                                </span>
                                                                                                                                                            </div>
                                                                                                                                                        </a>
                                                                                                                                                        {item.category ?
                                                                                                                                                            <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                                                                                                                                {item.category.map(function (item, index) {
                                                                                                                                                                    return (
                                                                                                                                                                        <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                                                                                                                            <a>
                                                                                                                                                                                <span
                                                                                                                                                                                    id={item[this.state.field.id]}
                                                                                                                                                                                    style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                                                                                                                    onClick={this.category(item)}>
                                                                                                                                                                                    {item[this.state.field.id]}
                                                                                                                                                                                </span>
                                                                                                                                                                                <div id={item[this.state.field.id]}
                                                                                                                                                                                     style={{marginRight: "10px", cursor: "pointer"}}
                                                                                                                                                                                     onClick={this.change}>
                                                                                                                                                                                    <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                                                                                                                        {item[this.state.field.text]}
                                                                                                                                                                                    </em>
                                                                                                                                                                                    <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                                                                                                                        {item[this.state.field.text]}
                                                                                                                                                                                    </span>
                                                                                                                                                                                </div>
                                                                                                                                                                            </a>
                                                                                                                                                                            {item.category ?
                                                                                                                                                                                <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                                                                                                                                                    {item.category.map(function (item, index) {
                                                                                                                                                                                        return (
                                                                                                                                                                                            <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                                                                                                                                                <a>
                                                                                                                                                                                                    <span
                                                                                                                                                                                                        id={item[this.state.field.id]}
                                                                                                                                                                                                        style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                                                                                                                                        onClick={this.category(item)}>
                                                                                                                                                                                                        {item[this.state.field.id]}
                                                                                                                                                                                                    </span>
                                                                                                                                                                                                    <div id={item[this.state.field.id]}
                                                                                                                                                                                                         style={{marginRight: "10px", cursor: "pointer"}}
                                                                                                                                                                                                         onClick={this.change}>
                                                                                                                                                                                                        <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                                                                                                                                            {item[this.state.field.text]}
                                                                                                                                                                                                        </em>
                                                                                                                                                                                                        <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                                                                                                                                            {item[this.state.field.text]}
                                                                                                                                                                                                        </span>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </a>
                                                                                                                                                                                                {item.category ?
                                                                                                                                                                                                    <ul style={{display: "block", height: "100%", paddingLeft: "14px"}}>
                                                                                                                                                                                                        {item.category.map(function (item, index) {
                                                                                                                                                                                                            return (
                                                                                                                                                                                                                <li key={index} style={{float: "left", width: "100%", lineHeight: "30px"}}>
                                                                                                                                                                                                                    <a>
                                                                                                                                                                                                                        <span
                                                                                                                                                                                                                            id={item[this.state.field.id]}
                                                                                                                                                                                                                            style={{float: "left", width: "10px", height: "10px", padding: "3px", margin: "7px 8px 7px 0", background: "url(" + getCurrJsPath('TreeTemplate.js') + (item.category ? "unfolders.png" : "folder.png") + ") 3px 3px no-repeat", textIndent: "-999em"}}
                                                                                                                                                                                                                            onClick={this.category(item)}>
                                                                                                                                                                                                                            {item[this.state.field.id]}
                                                                                                                                                                                                                        </span>
                                                                                                                                                                                                                        <div id={item[this.state.field.id]}
                                                                                                                                                                                                                             style={{marginRight: "10px", cursor: "pointer"}}
                                                                                                                                                                                                                             onClick={this.change}>
                                                                                                                                                                                                                            <em style={{position: "relative", float: "left", width: "10px", height: "10px", marginTop: "10px", background: "url(" + getCurrJsPath('TreeTemplate.js')  + "radio.png) " + (item[this.state.field.id] === this.props.id ? "-10px 0" : "0 0") + " no-repeat", textIndent: "-999em"}}>
                                                                                                                                                                                                                                {item[this.state.field.text]}
                                                                                                                                                                                                                            </em>
                                                                                                                                                                                                                            <span style={{marginLeft: "5px", cursor: "pointer"}}>
                                                                                                                                                                                                                                {item[this.state.field.text]}
                                                                                                                                                                                                                            </span>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                    </a>
                                                                                                                                                                                                                </li>
                                                                                                                                                                                                            )
                                                                                                                                                                                                        }, this)}
                                                                                                                                                                                                    </ul> : null
                                                                                                                                                                                                }
                                                                                                                                                                                            </li>
                                                                                                                                                                                        )
                                                                                                                                                                                    }, this)}
                                                                                                                                                                                </ul> : null
                                                                                                                                                                            }
                                                                                                                                                                        </li>
                                                                                                                                                                    )
                                                                                                                                                                }, this)}
                                                                                                                                                            </ul> : null
                                                                                                                                                        }
                                                                                                                                                    </li>
                                                                                                                                                )
                                                                                                                                            }, this)}
                                                                                                                                        </ul> : null
                                                                                                                                    }
                                                                                                                                </li>
                                                                                                                            )
                                                                                                                        }, this)}
                                                                                                                    </ul> : null
                                                                                                                }
                                                                                                            </li>
                                                                                                        )
                                                                                                    }, this)}
                                                                                                </ul> : null
                                                                                            }
                                                                                        </li>
                                                                                    )
                                                                                }, this)}
                                                                            </ul> : null
                                                                        }
                                                                    </li>
                                                                )
                                                            }, this)}
                                                        </ul> : null
                                                    }
                                                </li>
                                            )
                                        }, this)}
                                    </ul> : null
                                }
                            </li>
                        )
                    }, this) : null}
                </ul>
            </div>
        )
    }
});