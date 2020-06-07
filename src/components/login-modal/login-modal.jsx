import Modal from '../../containers/modal.jsx';
import styles from './login-modal.css';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import SubmitLoginButton from './submit-login-button.jsx';
import {connect} from "react-redux";
import {closeLoginModal} from "../../reducers/modals";

const LoginModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.title}
        id="loginModal"
        onRequestClose={props.onCancel}
    >
        <Box>
            <input
                className={styles.minInput}
                name="account"
                placeholder="账号"
                type="text"
            /><br />
            <input
                className={styles.minInput}
                name="password"
                placeholder="密码"
                type="password"
            /><br />
            <SubmitLoginButton className={styles.btnSubmit} onClick={()=>{}}/>
        </Box>
    </Modal>
);
LoginModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}
const mapStateToProps =state=>({
})

const mapDispatchToProps =dispatch=>({
    onCancel: ()=>dispatch(closeLoginModal())
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginModal);
