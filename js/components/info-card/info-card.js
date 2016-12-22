/**
 * Created by ping on 16/7/20.
 */

require('info-card.scss');
const util = require('util');
const React = require('react');
const render = require('react-dom').render;

let socket = io('http://172.16.7.30:10003');
socket.on('connect', function(event){
    socket.emit('message', 'getCount');
});
let timer = null;

export class InfoCard extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            count: 0
        }
    }

    render() {
        let {title} = this.props
        return (
            <div className="module-info-card">
                <div className="title">{title}</div>
                <div className="content">
                    <span className="count">{this.state.count}</span>
                    <span className="desc">
                        <p>数据总消耗</p>
                    </span>
                </div>
            </div>
        );
    }

    componentDidMount () {
        let {type} = this.props;
        socket.on('message', event => {
            clearTimeout(timer);
            timer = null;
            let count = 0;
            if (type === 'score') {
                count = event.scoreCount;
            } else {
                count = event.afmsCount;
            }
            this.setState({
                count: count
            });
            timer = setTimeout(function(){
                socket.emit('message', 'getCount');
            }, 3000);
        });
    }
}