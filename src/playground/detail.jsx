import React from 'react';
import ReactDOM from 'react-dom';
import activity from './project/css/activity.css';
import style from './project/css/public.css';
import topLogo from './project/images/topLogo.png';
import topSearch from './project/images/topSearch.png';

class Detail extends React.Component {
    render() {
        return (
            <div className={style.header}>
                <div className={style.headerCon}>
                    <div className={style.topLogo}>
                        <img src={topLogo} alt=""/>
                    </div>
                    <ul className={style.tabList}>
                        <li><a href="/index.html">首页</a></li>
                        <li><a href="/work.html">作品集</a></li>
                        <li><a href="/activity.html">活动</a></li>
                        <li>工作室</li>
                        <li><a href="/scratch/">学习区</a></li>
                    </ul>
                    <div className={style.iconList}>
                <span className={style.searchIcon}>
                    <img src={topSearch} alt=""/>
                </span>
                        <span className={style.loginText}>
                    登录
                </span>
                        <span className={style.fgline}>/</span>
                        <span className={style.regText}>
                    注册
                </span>
                    </div>
                </div>
            </div>
        )
    }
}

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<Detail isPlayerOnly/>, appTarget);
