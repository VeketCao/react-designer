/**
 * DatePicker v0.14.0
 *
 * Copyright 2016/07/28, NieFZ, Inc.
 * All rights reserved.
 *
 */
window.DatePicker = React.createClass({
    displayName: "DatePicker",
    getInitialState: function () {
        return {
            option: {
                lang: {
                    ch: {
                        months: [
                            "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
                        ],
                        dayOfWeekShort: [
                            "日", "一", "二", "三", "四", "五", "六"
                        ],
                        dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                        currentDayText: "今"
                    },
                    en: {
                        months: [
                            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                        ],
                        dayOfWeekShort: [
                            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
                        ],
                        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        currentDayText: "Now"
                    }
                },
                format: this.props.format || "yy-mm-dd",
                maxDate: this.props.maxDate,
                isPrevMonthDay: true,
                isNextMonthDay: true
            },
            date: new Date()
        }
    },
    componentWillMount: function () {
        var state = this.state;
        state.year = state.date.getFullYear();
        state.month = state.date.getMonth() + 1;
        state.day = state.date.getDate();
        state.nowDate = state.year + "-" + (state.month < 10 ? ("0" + state.month) : state.month) + "-" + (state.day < 10 ? "0" + state.day : state.day);
        state.option.minDate = this.props.minDate || state.nowDate;

        this.datePicker();
    },
    componentWillReceiveProps:function(props){
        if(props.minDate){
            var state = this.state;
            state.option.minDate=props.minDate;
            state.picker = this.getDate(this.state.year, this.state.month);
            this.setState(state);
        }

    },
    datePicker: function (e) {
        var state = this.state;

        if (e && e.currentTarget.getAttribute("id")) {
            state.month = parseInt(e.currentTarget.getAttribute("id"));
        }

        state.picker = this.getDate(state.year, state.month);

        window.setTimeout(function () {
            this.setState(state);
        }.bind(this), 0);
    },
    prevYear: function () {
        var state = this.state;

        state.year--;
        state.picker = this.getMonth();

        this.setState(state);
    },
    nextYear: function () {
        var state = this.state;

        state.year++;
        state.picker = this.getMonth();

        this.setState(state);
    },
    prevMonth: function () {
        var state = this.state;

        state.month--;

        if (state.month === 0) {
            state.year--;
            state.month = 12;
        }

        state.picker = this.getDate(this.state.year, this.state.month);

        this.setState(state);
    },
    nextMonth: function () {
        var state = this.state;

        state.month++;

        if (state.month === 13) {
            state.year++;
            state.month = 1;
        }

        state.picker = this.getDate(this.state.year, this.state.month);

        this.setState(state);
    },
    getMonth: function () {
        var monthList = [];
        for (var l = 0, len = this.state.option.lang[this.props.lang || "ch"].months.length; l < len; l += 4) {
            monthList.push(this.state.option.lang[this.props.lang || "ch"].months.slice(l, l + 4));
        }
        return (
            <table cellSpacing="0" cellPadding="0" style={{borderCollapse: "collapse"}}>
                <thead>
                <tr>
                    <th style={{height: "28px", lineHeight: "28px", cursor: "pointer"}} onClick={this.prevYear}>&lt;</th>
                    <th colSpan="2" style={{height: "28px", lineHeight: "28px", fontWeight: "normal"}}>{this.state.year}</th>
                    <th style={{height: "28px", lineHeight: "28px", cursor: "pointer"}} onClick={this.nextYear}>&gt;</th>
                </tr>
                </thead>
                <tbody>
                {monthList.map(function (item, index) {
                    return (
                        <tr key={index}>
                            {item.map(function (_item, _index) {
                                return (
                                    <td key={_index} style={{width: "93px", height: "67px", textAlign: "center"}}>
                                        <span id={(_index + 1) + (index * 4)} style={{display: "block", width: "63px", height: "37px", lineHeight: "37px", margin: "0 auto", cursor: "default"}} onClick={this.datePicker} onMouseOver={this.hover} onMouseOut={this.out}>{_item}</span>
                                    </td>
                                )
                            },this)}
                        </tr>
                    )
                },this)}
                </tbody>
            </table>
        )
    },
    getDate: function (year, month) {
        var currentMonthDay = this.getDays(year, month),
            currentFirstDay = new Date(year + "/" + month + "/1").getDay(),
            prevMonthDay = this.getDays(year, month - 1),
            prevMonth = "",
            nextMonth = "",
            prevYear = "",
            nextYear = "",
            tempDate = [],
            dateList = [];

        if (this.state.option.isPrevMonthDay) {
            if (month === 1) {
                prevYear = year - 1;
                prevMonth = 12;
            } else {
                prevYear = year;
                prevMonth = month - 1;
            }
            for (var i = 0; i < currentFirstDay; i++) {
                tempDate.unshift({
                    year: prevYear,
                    month: prevMonth,
                    date: prevYear + "-" + (prevMonth < 10 ? ("0" + prevMonth) : prevMonth) + "-" + prevMonthDay,
                    day: prevMonthDay--
                });
            }
        }

        //currentMonthDay
        for (var j = 0; j < currentMonthDay; j++) {
            tempDate.push({
                year: year,
                month: month,
                day: j + 1,
                date: year + "-" + (month < 10 ? ("0" + month) : month) + "-" + ((j + 1) < 10 ? ("0" + (j + 1)) : (j + 1))
            });
        }

        //nextMonthDay
        if (this.state.option.isPrevMonthDay) {
            if (month === 12) {
                nextYear = year + 1;
                nextMonth = 1;
            } else {
                nextYear = year;
                nextMonth = month + 1;
            }
            for (var k = 1, length = tempDate.length; k <= 42 - length; k++) {
                tempDate.push({
                    year: nextYear,
                    month: nextMonth,
                    day: k,
                    date: nextYear + "-" + (nextMonth < 10 ? ("0" + nextMonth) : nextMonth) + "-" + (k < 10 ? ("0" + k) : k)
                });
            }
        }
        for (var l = 0, len = tempDate.length; l < len; l += 7) {
            dateList.push(tempDate.slice(l, l + 7));
        }
        return (
            <table cellSpacing="0" cellPadding="0" style={{borderCollapse: "collapse"}}>
                <thead>
                <tr>
                    <th style={{height: "28px", lineHeight: "28px", cursor: "pointer",textAlign:"left"}} onClick={this.prevMonth}>&lt;</th>
                    <th colSpan="5" style={{height: "28px", lineHeight: "28px", fontWeight: "normal",textAlign:"center"}} onClick={this.monthPicker}>{year + "-" + month}</th>
                    <th style={{height: "28px", lineHeight: "28px", cursor: "pointer",textAlign:"right"}} onClick={this.nextMonth}>&gt;</th>
                </tr>
                <tr>
                    {this.state.option.lang[this.props.lang || "ch"].dayOfWeekShort.map(function (item, index) {
                        return (
                            <th key={index} style={{width: "52px", height: "25px", lineHeight: "25px", fontWeight: "normal", color: "#8d8d8d",textAlign:"center"}}>{item}</th>
                        )
                    },this)}
                </tr>
                </thead>
                <tbody>
                {dateList.map(function (item, index) {
                    return (
                        <tr key={index}>
                            {item.map(function (item, index) {
                                if (this.timeStamp(item.date) < this.timeStamp(this.state.option.minDate) || this.timeStamp(item.date) > this.timeStamp(this.state.option.maxDate)) {
                                    return (
                                        React.createElement(
                                            "td", {
                                                key: index,
                                                style: {
                                                    width: "52px",
                                                    height: "28px",
                                                    lineHeight: "28px",
                                                    border: "1px solid #c9c9c9",
                                                    background: "#f2f2f2",
                                                    color: "#8d8d8d",
                                                    textAlign: "center",
                                                    cursor: this.props.notAllowLast ? "not-allowed" :"cursor"
                                                },
                                                "data-year": item.year,
                                                "data-month": item.month,
                                                "data-day": item.day,
                                                "data-date": item.date,
                                                "data-font-color":"#8d8d8d",
                                                "data-color":"#f2f2f2",
                                                onClick: this.props.notAllowLast ? null : this.dayPicker,
                                                onMouseOver: this.props.notAllowLast ? null : this.prevHover,
                                                onMouseOut: this.props.notAllowLast ? null : this.prevOut
                                            }, item.day
                                        )
                                    )
                                } else if (item.month < month) {
                                    return (
                                        React.createElement(
                                            "td", {
                                                key: index,
                                                style: {
                                                    width: "52px",
                                                    height: "28px",
                                                    lineHeight: "28px",
                                                    border: "1px solid #c9c9c9",
                                                    color: "#d3d3d3",
                                                    textAlign: "center",
                                                    cursor: "pointer"
                                                },
                                                "data-year": item.year,
                                                "data-month": item.month,
                                                "data-day": item.day,
                                                "data-date": item.date,
                                                "data-font-color":"#d3d3d3",
                                                "data-color":"#fff",
                                                onClick: this.dayPicker,
                                                onMouseOver: this.prevHover,
                                                onMouseOut: this.prevOut
                                            }, item.day
                                        )
                                    )
                                } else if (item.month === month) {
                                    if (this.timeStamp(item.date) === this.timeStamp(this.state.nowDate)) {
                                        return (
                                            React.createElement(
                                                "td", {
                                                    key: index,
                                                    style: {
                                                        width: "52px",
                                                        height: "28px",
                                                        lineHeight: "28px",
                                                        border: "1px solid #c9c9c9",
                                                        backgroundColor: "#00a1e7",
                                                        color: "#fff",
                                                        textAlign: "center",
                                                        cursor: "pointer"
                                                    },
                                                    "data-year": item.year,
                                                    "data-month": item.month,
                                                    "data-day": item.day,
                                                    "data-date": item.date,
                                                    onClick: this.dayPicker,
                                                    onMouseOver: this.hover,
                                                    onMouseOut: this.prevOut
                                                }, this.state.option.lang[this.props.lang || "ch"].currentDayText
                                            )
                                        )
                                    } else {
                                        return (
                                            React.createElement(
                                                "td", {
                                                    key: index,
                                                    style: {
                                                        width: "52px",
                                                        height: "28px",
                                                        lineHeight: "28px",
                                                        border: "1px solid #c9c9c9",
                                                        textAlign: "center",
                                                        cursor: "pointer"
                                                    },
                                                    "data-year": item.year,
                                                    "data-month": item.month,
                                                    "data-day": item.day,
                                                    "data-date": item.date,
                                                    onClick: this.dayPicker,
                                                    onMouseOver: this.hover,
                                                    onMouseOut: this.out
                                                }, item.day
                                            )
                                        )
                                    }
                                } else if (item.month > month) {
                                    return (
                                        React.createElement(
                                            "td", {
                                                key: index,
                                                style: {
                                                    width: "52px",
                                                    height: "28px",
                                                    lineHeight: "28px",
                                                    border: "1px solid #c9c9c9",
                                                    color: "#d3d3d3",
                                                    textAlign: "center",
                                                    cursor: "pointer"
                                                },
                                                "data-year": item.year,
                                                "data-month": item.month,
                                                "data-day": item.day,
                                                "data-date": item.date,
                                                onClick: this.dayPicker,
                                                onMouseOver: this.nextHover,
                                                onMouseOut: this.nextOut
                                            }, item.day
                                        )
                                    )
                                }
                            },this)}
                        </tr>
                    )
                },this)}
                </tbody>
            </table>
        )
    },
    getDays: function (year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        return d.getDate();
    },
    timeStamp: function (date) {
        return new Date(date).getTime();
    },
    monthPicker: function () {
        this.setState({
            picker: this.getMonth()
        });
    },
    dayPicker: function (e) {
        var state = this.state,
            target = e.currentTarget;

        state.selectDate = target.getAttribute("data-date");

        this.setState(state);

        this.props.datePicker(this.state);
    },
    prevHover: function (e) {
        e.currentTarget.style.backgroundColor = "#00a1e7";
        e.currentTarget.style.color = "#fff";
    },
    prevOut: function (e) {
        // e.currentTarget.style.backgroundColor = "#fff";
        e.target.getAttribute("data-color")? e.currentTarget.style.backgroundColor = e.target.getAttribute("data-color"):null;
        // e.currentTarget.style.color = "#d3d3d3";
        e.target.getAttribute("data-font-color") ? e.currentTarget.style.color = e.target.getAttribute("data-font-color"):null;
    },
    hover: function (e) {
        e.currentTarget.style.backgroundColor = "#00a1e7";
        e.currentTarget.style.color = "#fff";
    },
    out: function (e) {
        e.currentTarget.style.backgroundColor = "#fff";
        e.currentTarget.style.color = "#000";
    },
    nextHover: function (e) {
        e.currentTarget.style.backgroundColor = "#00a1e7";
        e.currentTarget.style.color = "#fff";
    },
    nextOut: function (e) {
        e.currentTarget.style.backgroundColor = "#fff";
        e.currentTarget.style.color = "#d3d3d3";
    },
    render: function () {
        var btn_clean_style = {
            height: '22px',
            background: '#0090ff',
            lineHeight: '22px',
            color: '#fff',
            border: 'none'
        };
        return (
            <div ref="datePicker">
                {
                    this.props.isShow ?
                    <div style={{display: "block", zIndex: "101", position: "absolute", top: "29px", left: "0", width: "323px", padding: "10px", border: "1px solid #e5e5e5", backgroundColor: "#fff", borderRadius: "3px"}}>
                        {this.state.picker}
                        <div style={{textAlign:"right"}}>
                            <button style={btn_clean_style} onClick={this.props.dateEmpty||null}>清空</button>
                            <button style={_.extend({marginLeft:'10px'},btn_clean_style)} onClick={this.props.closeDateBox||null}>取消</button>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
});