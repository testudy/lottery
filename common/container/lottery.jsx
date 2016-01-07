import React, {
    Component,
    PropTypes,
} from 'react';

import {
    connect,
} from 'react-redux';

import Background from '../component/background.jsx';
import Copyleft from '../component/copyleft.jsx';
import Board from '../component/board.jsx';
import Flicker from '../component/Flicker.jsx';


class Lottery extends Component {

    componentDidMount() {

        config.init();

        this.lock = true;
        this.boot = Lucky();

        $(document).on('keydown.lottery', (e) => {
            //空格，回车，上方向键，下方向键
            if ([32, 13, 38, 40].indexOf(e.keyCode) >= 0) {
                e.preventDefault();
                if (this.lock) {
                    this.lock = this.boot.start();
                } else {
                    this.lock = this.boot.lottery();
                }
            }
        });

        /*
         *更换壁纸、设置全局抽奖奖项
         *键盘操作[1: 一等奖, 2: 二等奖, 3: 三等奖, 4: 感恩奖，0: 全显]
         *CTRL + DEL 重置
         */
        $(document).on('keydown.lottery', function( e ) {
            var k = config.keycode[e.keyCode];
            if(!!k) {
                e.preventDefault();
                config.awards = k.class;
    
                $('.' + config.awards).addClass('active').siblings().removeClass('active')
    
                //background
    
            } else if (e.keyCode == 48){
                e.preventDefault();
                config.awards = 'grateful';
    
                $('.board > div').addClass('active');
            } else if (e.ctrlKey && e.keyCode == 192) {
                // 192 = 反单引号(1左侧)
    
                config.clear();
    
                window.location.reload()
            }
        })

    }

    componentWillUnmount() {

        $(document).off('keydown.lottery');

    }

    render() {

        return (
            <div>
                <link rel="stylesheet" href="less/lottery.css" />
                <Background />
                <Copyleft />
                <Board />
                <Flicker user={this.props.user} />
            </div>
        );

    }

}

Lottery.propTypes = {
    user: PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

function select(state) {
    return state;
}

export default connect(select)(Lottery);
