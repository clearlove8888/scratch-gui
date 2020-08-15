import Modal from '../../containers/modal.jsx';
import styles from './project-modal.css';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {closeLoginModal, openLoginModal} from "../../reducers/modals";
import {login} from "../../reducers/user-state";
import {setProjectId} from "../../reducers/project-state";
import {setProjectTitle} from "../../reducers/project-title";

const ProjectModal = (props) => {

    const {projectList, title, closeProjectListModal, setProjectId, selectId ,selectProjectName , setProjectTitle} = props;
    return (
        <Modal
            className={styles.modalContent}
            contentLabel={title}
            id="projectListModal"
            onRequestClose={closeProjectListModal}
            headerClassName={styles.headerClassName}
        >
            <div style={{textAlign: 'center', padding: '1rem 2.25rem'}}>
                <span>请选择加载的作品</span>
                <ul className={styles.projectListUl}>
                    {
                        projectList
                    }
                </ul>
            </div>
            <div className={styles.projectAction}>
                <button className={styles.projectBut} style={{color: 'white'}} onClick={(e) => {
                    setProjectId(selectId);
                    closeProjectListModal();
                    setProjectTitle(selectProjectName);
                }}>加载
                </button>
                <button className={styles.projectBut}
                        style={{backgroundColor: '#FFBF00', border: '1px solid #FFBF00'}}
                        onClick={closeProjectListModal}>取消
                </button>
            </div>
        </Modal>
    )
};

ProjectModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeLoginModal()),
    userSateLogin: (data) => dispatch(login(data)),
    setProjectId: projectId => dispatch(setProjectId(projectId)),
    setProjectTitle: title => dispatch(setProjectTitle(title)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectModal);
