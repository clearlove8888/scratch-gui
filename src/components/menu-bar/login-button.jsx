import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';
import styles from './login-button.css';

const LoginButton = ({ className,onClick }) => (
    <Button className={styles.loginButton} children={'请先登录，否则无法保存作品!'} onClick={onClick}/>
);

LoginButton.propTypes = {

    className: PropTypes.string,

    onClick: PropTypes.func

};

LoginButton.defaultProps = {
    onClick: () => {}
};

export default LoginButton;
