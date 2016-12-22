/**
 * Created by ping on 16/3/24.
 */

require('base');
require('normalize');
require('index.scss');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;
const moment = require('moment')

const { QueryBox } = require('query-box');
const { ChartLine } = require('chart-line');
const { InfoCard } = require('info-card');

const {createStore, applyMiddleware} = require('redux');
const {Provider, connect} = require('react-redux');
const {scorewebStore} = require('reducers');
const thunk = require('redux-thunk').default;
const {achieveScoreData, achieveAfmsData, updateScoreQuery, updateAfmsQuery} = require('actions');

let store = createStore(scorewebStore, applyMiddleware(thunk));

class component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {chartData, queryText} = this.props;
        return(
            <div onClick={(e) => util.events.emit('bodyClick', e)} onKeyDown={(e) => util.events.emit('bodyKeyDown', e)}>
                <div className="container">
                    <div className="line">
                        <div className="chart-card">
                            <div className="query-box">
                                <QueryBox 
                                    queryText={queryText.score}
                                    listReturn={submitList => this.listReturnScore(submitList)} />
                            </div>
                            <ChartLine
                                chartId="scoreChart"
                                lineData={chartData.score} />
                        </div>
                        <div className="info-card">
                            <InfoCard title="风控平台" type="score"/>
                        </div>
                    </div>
                    <div className="line">
                        <div className="chart-card">
                            <div className="query-box">
                                <QueryBox 
                                    queryText={queryText.afms}
                                    listReturn={submitList => this.listReturnAfms(submitList)} />
                            </div>
                            <ChartLine
                                chartId="afmsChart"
                                lineData={chartData.afms} />
                        </div>
                        <div className="info-card">
                            <InfoCard title="反欺诈平台" type="afms"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  
    componentDidMount () {
        const {dispatch} = this.props;
        let request = {
            score: {
                clientId: 1600330,
                startDate: '2016-01-01',
                endDate: '2016-06-30'
            },
            afms: {
                clientId: 1600330,
                startDate: '2016-01-01',
                endDate: '2016-06-30'
            }
        };
        dispatch(updateScoreQuery());
        dispatch(updateAfmsQuery());
        dispatch(achieveScoreData(request.score));
        dispatch(achieveAfmsData(request.afms));
    }

    listReturnScore (submitList) {
        const {dispatch} = this.props;
        let range = util.getRange(submitList[2].startValue, submitList[3].endValue, submitList[1].id);
        let requestData = {
            clientId: submitList[0].id,
            startDate: range.start,
            endDate: range.end
        }
        let queryInfo = {
            defaultSelect: submitList[0].company,
            radioCount: submitList[1].id
        }
        dispatch(updateScoreQuery(queryInfo));
        dispatch(achieveScoreData(requestData));
    }

    listReturnAfms(submitList) {
        const {dispatch} = this.props;
        let range = util.getRange(submitList[2].startValue, submitList[3].endValue, submitList[1].id);
        let requestData = {
            clientId: submitList[0].id,
            startDate: range.start,
            endDate: range.end
        }
        let queryInfo = {
            defaultSelect: submitList[0].company,
            radioCount: submitList[1].id
        }
        dispatch(updateScoreQuery(queryInfo));
        dispatch(achieveAfmseData(requestData));
    }
}

function select(state) {
    // console.log(state);
    return {
        chartData: state.writeChartData,
        queryText: state.writeQueryText,
    }
}

let Main = connect(select)(component);

render (
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("main")
);