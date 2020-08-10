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

import bindAll from "lodash.bindall";


class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
        }
        bindAll(this, [
            'getProjectList',
        ]);
        this.getProjectList();
    }

    getProjectList() {
        fetch(PORTAL_SERVER + '/education/project/list/' + this.props.userData.id, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    projectList: json.data
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.projectList.map((item)=>{
                        const src= OSS_SERVER+item.imageAddress;
                        return <img src={src} onClick={()=>{window.location.href="player.html#"+item.projectId}} key={item.projectId}/>
                    })
                }
            </div>
        )
    }
}

Project.propTypes = {
    isPlayerOnly: PropTypes.bool,
    onSeeInside: PropTypes.func,
    projectId: PropTypes.string
};
Project.defaultProps = {
    userData: {}
}
const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    userData: state.scratchGui.userState.userData,
    vm: state.scratchGui.vm,
});

const mapDispatchToProps = dispatch => ({
    onSeeInside: () => dispatch(setPlayer(false))
});

const ConnectedProject = connect(
    mapStateToProps,
    mapDispatchToProps
)(Project);

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedProject = compose(
    AppStateHOC,
    HashParserHOC
)(ConnectedProject);

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<WrappedProject isPlayerOnly/>, appTarget);
