import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import Box from '../components/box/box.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

import {setPlayer} from '../reducers/mode';

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

import styles from './player.css';
import bindAll from "lodash.bindall";
import $ from "jquery";

class Player extends React.Component{
    constructor(props) {
        super(props);
        bindAll(this, [
            'regKeyEvent',
            'longPress',
            'clickVirtualKey',
            'keyMove'
        ]);
    }
    regKeyEvent(selector, key, keyCode, keyName) {
        const document = this;
        $(selector).on("touchstart", function (event) {
            document.setState({
                [keyName]: true
            }, () => {
                document.longPress(key, keyCode,keyName);
                event.preventDefault();
            })
        });
        $(selector).on("touchend", function () {
            document.keyMove(keyName);
            event.preventDefault();
        });
    }

    longPress(key, keyCode, keyName) {
        if (this.state[keyName]) {
            setTimeout(()=>{
                this.clickVirtualKey(key, keyCode,keyName);
            } , 50);
        }
    }

    keyMove(keyName) {
        this.setState({
            [keyName]: false
        })
    }

    clickVirtualKey(key,keyCode,keyName) {
        this.props.vm.postIOData("keyboard", {
            keyCode: keyCode,
            key: key,
            isDown: true,
        });
        this.longPress(key,keyCode,keyName);
    }

    componentDidMount() {
        // 绑定上下左右空格键
        this.regKeyEvent("#button_space", " ", 32,"space");
        this.regKeyEvent("#button_left", "ArrowLeft", 37,"left");
        //this.regKeyEvent("#button_left", "W", 87,"keyW");
        /*regKeyEvent(".button_down", "ArrowDown", 40)
        regKeyEvent(".button_up", "ArrowUp", 38)
        regKeyEvent(".button_right", "ArrowRight", 39)*/
    }

    render() {
        const {isPlayerOnly, onSeeInside, projectId} = this.props;
        return (
            <div>
                <Box className={classNames(isPlayerOnly ? styles.stageOnly : styles.editor)}>
                {isPlayerOnly && <button onClick={onSeeInside}>{'See inside'}</button>}
                <GUI
                    canEditTitle
                    enableCommunity
                    isPlayerOnly={isPlayerOnly}
                    projectId={projectId}
                />
                </Box>
                <button style={{'width': '200px', 'height': '200px'}} id={'button_left'}>left</button>
                <button style={{'width': '200px', 'height': '200px'}} id={'button_space'}>space</button>
            </div>
        );
    }
}

Player.propTypes = {
    isPlayerOnly: PropTypes.bool,
    onSeeInside: PropTypes.func,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    vm: state.scratchGui.vm,
});

const mapDispatchToProps = dispatch => ({
    onSeeInside: () => dispatch(setPlayer(false))
});

const ConnectedPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedPlayer = compose(
    AppStateHOC,
    HashParserHOC
)(ConnectedPlayer);

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<WrappedPlayer isPlayerOnly />, appTarget);
