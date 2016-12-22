const {combineReducers} = require('redux');
const {WRITE_SCORE_DATA, WRITE_AFMS_DATA, WRITE_SCORE_QUERY, WRITE_AFMS_QUERY} = require('actions');

function writeChartData (
    state = {
        score: {xAxis: [], yAxis: []},
        afms: {xAxis: [], yAxis: []}
    }, 
    action
) {
    let {data} = action;
    let axisLabel = {x: 'createTime', y: 'totalCount'};
    let chartData = {xAxis: [], yAxis: []};
    switch (action.type) {
        case WRITE_SCORE_DATA:
            for (let i = 0, len = data.length; i < len; i++) {
                chartData.xAxis.push(data[i][axisLabel.x]);
                chartData.yAxis.push(data[i][axisLabel.y]);
            }
            return Object.assign({}, state, {score: chartData});
        case WRITE_AFMS_DATA:
            for (let i = 0, len = data.length; i < len; i++) {
                chartData.xAxis.push(data[i][axisLabel.x]);
                chartData.yAxis.push(data[i][axisLabel.y]);
            }
            return Object.assign({}, state, {afms: chartData});
        default:
            return state;
    }
}


function writeQueryText(
    state = {
        score: [{
            dataType: "select",
            dropdownList: [],
            defaultSelect: []
        }, {
            dataType: "radio",
            text: "近7天",
            pickOn: true,
            id:"7"
        }, {
            dataType: "radio",
            text: "近14天",
            pickOn: false,
            id:"14"
        }, {
            dataType: "range",
            name:"结束时间",
            id:"timeEnd"
        }],
        afms: [{
            dataType: "select",
            dropdownList: [],
            defaultSelect: []
        }, {
            dataType: "radio",
            text: "近7天",
            pickOn: true,
            id:"7"
        }, {
            dataType: "radio",
            text: "近14天",
            pickOn: false,
            id:"14"
        }, {
            dataType: "range",
            name:"结束时间",
            id:"timeEnd"
        }]
    }, 
    action
) {
    let {data, queryInfo} = action;
    let queryText = [{
        dataType: "select",
        dropdownList: [],
        defaultSelect: []
    }, {
        dataType: "radio",
        text: "近7天",
        pickOn: true,
        id:"7"
    }, {
        dataType: "radio",
        text: "近14天",
        pickOn: false,
        id:"14"
    }, {
        dataType: "range",
        name:"结束时间",
        id:"timeEnd"
    }];
    if (data) {
        for (let i = 0, len = data.length; i < len; i ++) {
            let dropdownData = {};
            if (i === 0) {
                queryText[0].defaultSelect = data[i].company;
            }
            dropdownData.id = data[i].client_id;
            dropdownData.desc = data[i].company;
            queryText[0].dropdownList.push(dropdownData);
        }
    }
    if (queryInfo) {
        queryText[0].defaultSelect = queryInfo.defaultSelect;
        if (queryInfo.radioCount === 7) {
            queryText[1].pickOn = true;
            queryText[2].pickOn = false;
        } else {
            queryText[1].pickOn = false;
            queryText[2].pickOn = true;
        }
    }
    switch (action.type) {
        case WRITE_SCORE_QUERY:
            return Object.assign({}, state, {score: queryText});
        case WRITE_AFMS_QUERY:
            return Object.assign({}, state, {afms: queryText});
        default:
            return state;
    }
}

export const scorewebStore = combineReducers({
    writeChartData,
    writeQueryText
});