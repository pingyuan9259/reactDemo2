const eventEmitter = require('event-emitter');

module.exports = {

    events: eventEmitter({}),

    objToUrlString: function(url, obj) {
        if(typeof obj === 'object' || !obj) {
            let string = '?';
            if (url.indexOf('&') !== -1) {
                string = '&';
            }
            for (let props in obj) {
                let params = props + '=' + obj[props] + '&';
                string += params;
            }
            string = string.substring(0, string.length-1);
            return url + string;
        } else {
            console.log("util.objToUrlString需要传入对象(一维)类型参数");
        }
    },

    getLocalTime: function(time, type) {
        let date = new Date(parseInt(time));
        let Y = date.getFullYear() + '-';
        let M = ((date.getMonth() + 1) < 10) ? ('0' + (date.getMonth() + 1) + '-') : ((date.getMonth() + 1) + '-');
        let D = (date.getDate() < 10) ? ('0' + date.getDate()) : (date.getDate());
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds(); 
        switch (type) {
            case 'MD':
                return M + D;
            case 'YMD':
                return Y + M + D;
            case 'dateTime':
                return Y + M + D + ' ' + ' ' + h + m + s;
        }
    },

    getRequest: function (url, data) {
        var fullUrl = this.objToUrlString(url, data);
        return fetch(fullUrl, {
            headers: {
                // "x-csrf-token": scoreweb.token
            }
        });
    },
    
    contains: function ( a, b ) { //from jquery.contains
        if ( b ) {
            while ( (b = b.parentNode) ) {
                if ( b === a ) {
                    return true;
                }
            }
        }
        return false;
    },

    getRange: function (start, end, days) { //将时间戳格式化，注：如果没有开始时间则将开始时间默认为七天前
        let today = Date.parse(new Date());
        if (!start) {
            if (!end) {
                end = today;
            }
            start = this.getLocalTime((end - 24*60*60*1000*days), 'YMD');
            end = this.getLocalTime(today, 'YMD');
        } else {
            start = this.getLocalTime(start * 1000, 'YMD');
            end = this.getLocalTime(end * 1000, 'YMD');
        }
        return {
            start: start, 
            end: end
        }
    }
};