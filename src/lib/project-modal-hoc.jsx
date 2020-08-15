import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import bindAll from "lodash.bindall";
import classNames from "classnames";
import styles from '../components/project-modal/project-modal.css';
import {closeProjectListModal, openProjectListModal} from "../reducers/modals";

const ProjectModalHoc = (WrappedComponent) => {
    class ProjectModalHocComponent extends React.Component {
        constructor(props) {
            super(props);
            bindAll(this, [
                'loadProjectList',
                'renderProjectList',
                'clickProject'
            ]);
            this.state = {
                //设置默认项目id为当前项目id
                selectId: this.props.projectId,
                selectProjectName: this.props.projectTitle,
                projectList: []
            };
        }

        componentDidMount() {
            this.loadProjectList();
        }

        loadProjectList(){//拉取当前用户的项目列表
            this.props.userId && fetch(PORTAL_SERVER + '/education/project/list/' + this.props.userId, {
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

        clickProject(e) {
            console.log(e.target.getAttribute('name'));
            this.setState({
                selectId: e.target.id || '',
                selectProjectName: e.target.getAttribute('name') || ''
            })
        }

        renderProjectList() {
            const {selectId, projectList} = this.state;
            return (
                <React.Fragment>
                    {
                        projectList.map(item => (
                            <li className={classNames(styles.projectListLi, selectId === item.projectId ? styles.projectLiActive : '')}
                                key={item.projectId}
                                id={item.projectId}
                                name={item.projectName}
                                onClick={
                                    (e) => {
                                        this.clickProject(e)
                                    }}
                            >{item.projectName}</li>
                        ))
                    }
                </React.Fragment>
            );

        }

        render() {
            return (
                <WrappedComponent
                    projectList={this.renderProjectList()}
                    openProjectListModal={this.props.openProjectListModal}
                    closeProjectListModal={this.props.closeProjectListModal}
                    selectId={this.state.selectId}
                    selectProjectName={this.state.selectProjectName}
                    loadProjectList={this.loadProjectList}
                    {...this.props}
                />
            )
        }
    }

    ProjectModalHocComponent.propTypes = {
        projectId: PropTypes.string.isRequired
    };
    const mapStateToProps = state => {
        const userId = state.scratchGui.userState &&
        state.scratchGui.userState.userData &&
        state.scratchGui.userState.userData.id ?
            state.scratchGui.userState.userData.id : '';

        return {
            projectId: state.scratchGui.projectState.projectId || '',
            userId: userId,
            projectTitle: state.scratchGui.projectTitle
        }
    };
    const mapDispatchToProps = dispatch => ({
        openProjectListModal: () => dispatch(openProjectListModal()),
        closeProjectListModal: () => dispatch(closeProjectListModal()),
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProjectModalHocComponent);
}


export default ProjectModalHoc;
