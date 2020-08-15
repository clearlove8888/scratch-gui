import Modal from '../../containers/modal.jsx';
import styles from './login-modal.css';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import SubmitLoginButton from './submit-login-button.jsx';
import {connect} from "react-redux";
import {closeLoginModal, openLoginModal} from "../../reducers/modals";
import {login} from "../../reducers/user-state";
import Storage from '../../playground/project/utils/Storage';

const storage = new Storage();

const userLogin = (loginName, password, onCancel, userSateLogin, loadProjectList) => {
    //用户登录
    const formdata = new FormData();
    formdata.append("loginName", loginName.value);
    formdata.append("password", password.value)
    fetch(PORTAL_SERVER + "/education/user/login", {
        method: "POST",
        mode: 'cors',
        headers: {
            ContentType: "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: formdata
    }).then(response => response.json()).then(json => {
        const token = new FormData();
        token.append("token", json.data);
        //解析用户数据
        fetch(PORTAL_SERVER + "/education/user/analysis", {
            method: "POST",
            mode: 'cors',
            headers: {
                ContentType: "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: token
        }).then(res => res.json()).then((json) => {
            //设置为登陆状态
            userSateLogin(json.data);
            //保存用户信息到sessionStorage  //设置过期时间为一天
            storage.set("user", json.data, 24 * 60 * 60 * 1000);
            //关闭弹窗
            onCancel();
            //加载 projectList
            loadProjectList && loadProjectList();
        });
    });
}

class LoginModal extends React.Component {

    render() {
        return (
            <Modal
                className={styles.modalContent}
                contentLabel={this.props.title}
                id="loginModal"
                onRequestClose={this.props.onCancel}
            >
                <Box>
                    <input
                        className={styles.minInput}
                        name="account"
                        placeholder="账号"
                        type="text"
                        ref={val => this.loginName = val}
                    /><br/>
                    <input
                        className={styles.minInput}
                        name="password"
                        placeholder="密码"
                        type="password"
                        ref={val => this.password = val}
                    /><br/>
                    <SubmitLoginButton className={styles.btnSubmit} onClick={() => {
                        userLogin(this.loginName, this.password,
                            this.props.onCancel, this.props.userSateLogin, this.props.loadProjectList)
                    }}
                    />
                </Box>
            </Modal>
        )
    }
}

LoginModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeLoginModal()),
    userSateLogin: (data) => dispatch(login(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
