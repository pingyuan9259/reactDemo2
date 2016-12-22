const util = require('util');

const WRITE_SCORE_DATA = 'WRITE_SCORE_DATA';
function writeScoreData (data) {
    return {
        type: WRITE_SCORE_DATA,
        data
    }
}

const WRITE_AFMS_DATA = 'WRITE_AFMS_DATA';
function writeAfmsData (data) {
    return {
        type: WRITE_AFMS_DATA,
        data
    }
}

const WRITE_SCORE_QUERY = 'WRITE_SCORE_QUERY';
function writeScoreQuery (data) {
    return {
        type: WRITE_SCORE_QUERY,
        data
    }
}

const WRITE_AFMS_QUERY = 'WRITE_AFMS_QUERY';
function writeAfmsQuery (data) {
    return {
        type: WRITE_AFMS_QUERY,
        data
    }
}

module.exports = {

    WRITE_SCORE_DATA: WRITE_SCORE_DATA,
    achieveScoreData: function (requestData) {
        const url = '/getAfmsCount';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeScoreData(data));
                        }
                    );
                },
                error => {
                    console.log('action "achieveScoreData" fetch is error!');
                }
            );
        }
    },

    WRITE_AFMS_DATA: WRITE_AFMS_DATA,
    achieveAfmsData: function (requestData) {
        const url = '/getAfmsCount';
        return function (dispatch) {
            return util.getRequest(url, requestData).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeAfmsData(data));
                        }
                    );
                },
                error => {
                    console.log('action "achieveAfmsData" fetch is error!');
                }
            );
        }
    },

    WRITE_SCORE_QUERY: WRITE_SCORE_QUERY,
    updateScoreQuery: function (queryInfo) {
        const url = '/getAfmsCompany';
        return function (dispatch) {
            return util.getRequest(url).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeScoreQuery(data, queryInfo));
                        }
                    );
                },
                error => {
                    console.log('action "updateScoreCompany" fetch is error!')
                }
            );
        }
    },

    WRITE_AFMS_QUERY: WRITE_AFMS_QUERY,
    updateAfmsQuery: function (queryInfo) {
        const url = '/getAfmsCompany';
        return function (dispatch) {
            return util.getRequest(url).then(
                data => {
                    data.json().then(
                        json => {
                            let {data} = json;
                            dispatch(writeAfmsQuery(data, queryInfo));
                        }
                    );
                },
                error => {
                    console.log('action "updateAfmsCompany" fetch is error!')
                }
            );
        }
    }

};