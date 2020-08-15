import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import activity from './project/css/activity.css';
import style from './project/css/public.css';
import GUI from '../containers/gui.jsx';
import Box from '../components/box/box.jsx';
import PropTypes from "prop-types";
import {setPlayer} from "..";
import {connect} from "react-redux";
import {compose} from "redux";
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

const requireContext = require.context("./project/images", true, /^\.\/.*\.png$/);
const images = {};
requireContext.keys().map(key => {
    const name = key.replace("./", "").replace(".png", "");
    images[name] = requireContext(key);
});

class Detail extends React.Component {

    render() {
        console.log(images);

        const {isPlayerOnly, onSeeInside, projectId} = this.props;
        return (
            <div style={{backgroundColor: '#EFF3F5'}}>
                <div className={style.header}>
                    <div className={style.headerCon}>
                        <div className={style.topLogo}>
                            <img src={images.topLogo} alt=""/>
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
                    <img src={images.topSearch} alt=""/>
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

                <div className={activity.activityMain}>

                    <div className={activity.mainTop}>
                        <input type="text" className={activity.searchCon} placeholder="搜索项目、活动、素材"/>
                        <div className={activity.searchBtn}>
                            <img src={images.bigSearch} alt=""/>
                        </div>
                    </div>
                    <div className={activity.mainBot} style={{margin: '30px auto',borderRadius: '6px',padding: '30px'}}>
                        <div className={activity.activityWork}>
                            <div className={activity.activityWorkL}>
                                <div className={activity.acttitle}>
                                    五一劳动节主题作品征集
                                </div>
                                <div className={activity.actIcon}>
                                    <span className={classNames(activity.eyes, activity.iconF)}>
                                        <img src={images.eyes} alt=""/>
                                        <span>238</span>
                                    </span>
                                                <span className={classNames(activity.zan, activity.iconF)}>
                                        <img src={images.zan} alt=""/>
                                        <span>238</span>
                                    </span>
                                                <span className={classNames(activity.shouc, activity.iconF)}>
                                        <img src={images.shouc} alt=""/>
                                        <span>238</span>
                                    </span>
                                                <span className={classNames(activity.time, activity.iconF)}>
                                        <img src={images.time} alt=""/>
                                        <span>2020-04-26 至 2020-05-15</span>
                                    </span>
                                </div>
                                <div id={'root'}>
                                    <Box>
                                        <GUI
                                            canEditTitle
                                            enableCommunity
                                            isPlayerOnly={isPlayerOnly}
                                            projectId={projectId}
                                            isDetail={true}
                                        />
                                    </Box>
                                </div>
                            </div>
                            <div className={activity.activityWorkR}>
                                <div className={activity.userInfo}>
                                    <div className={activity.userCon}>
                                        <img src={images.toux} alt="" style={{float: ' left'}}/>
                                        <div className={activity.userDel}>
                                            <span className={activity.username}>一只大鱼</span>
                                            <div className={activity.zhiwei}>
                                                实习工程师
                                            </div>
                                        </div>
                                    </div>
                                    <div className={activity.focusBtn}>
                            <span className={activity.plusIcon}>
                                +
                            </span>
                                        <span className={activity.focusT}>
                                关注
                            </span>
                                    </div>
                                </div>
                                <div className={activity.userIntroduce}>
                                    <div className={activity.workIntroduce}>
                                        <span className={activity.zpTitle}>作品介绍：</span>
                                        <p className={activity.textContent}>
                                            这个游戏还未完成，目前只有训练场模式。还未支持切换模式。验证码我
                                            会在后面的福利中发放，也有可能在Google工作室浏览量到2000时发放。由
                                            于现在时间比较少所以可能不会做的那么快。还请见谅，可加入Google进行创
                                            作，但要求是加入这个项目不可以加入其他工作室，项目做完后可以，并且在
                                            项目制作期间不可以将源代码向外工作室宣传及发布违者一律举报，并将其提
                                            出工作室。
                                        </p>
                                    </div>
                                    <div className={activity.workIntroduce} style={{marginTop: '23px'}}>
                                        <span className={activity.zpTitle}>操作说明:</span>
                                        <p className={activity.textContent}>
                                            这个游戏还未完成，目前只有训练场模式。还未支持切换模式。验证码我
                                            会在后面的福利中发放，也有可能在Google工作室浏览量到2000时发放。且
                                            在项目制作期间不可以将源代码向外工作室宣传及发布违者一律举报，并将其
                                            提出工作室。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className={activity.subWork}>
                            <div className={activity.subWorkCon}>
                                <div className={activity.subText}>
                                    <div>
                            <span>
                                <img src={images.pltx} alt="" style={{marginBottom: '40px'}}/>
                            </span>
                                        <span>
                                <textarea className={activity.inputBox} placeholder="快来说说你的看法吧"></textarea>
                            </span>
                                    </div>
                                    <div className={activity.subBtn}>
                                        发表
                                    </div>
                                </div>
                                <div className={activity.plListCon}>
                                    <span className={activity.qbpl}>全部评论</span>
                                    <ul className={activity.plList}>
                                        <li>
                                            <img src={images.pltx} alt="" style={{float: ' left'}}/>
                                            <div className={activity.plListUser}>
                                                <div>
                                                    <span className={activity.userName}>用户56841</span>
                                                    <span className={activity.userTime}>2020-04-26 至 2020-05-15</span>
                                                </div>
                                                <div className={activity.plContent}>
                                                    这个立绘真好看，我还想在传一个。
                                                </div>
                                                <div className={activity.zsCount}>
                                        <span className={classNames(activity.plzan, activity.pliconF)}>
                                            <img src={images.zan} alt=""/>
                                            <span>238</span>
                                        </span>
                                                    <span className={classNames(activity.huifu, activity.pliconF)}>
                                            <img src={images.huifu} alt=""/>
                                        </span>

                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <img src={images.pltx} alt="" style={{float: ' left'}}/>
                                            <div className={activity.plListUser}>
                                                <div>
                                                    <span className={activity.userName}>用户56841</span>
                                                    <span className={activity.userTime}>2020-04-26 至 2020-05-15</span>
                                                </div>
                                                <div className={activity.plContent}>
                                                    这个立绘真好看，我还想在传一个。
                                                </div>
                                                <div className={activity.zsCount}>
                                        <span className={classNames(activity.plzan, activity.pliconF)}>
                                            <img src={images.zan} alt=""/>
                                            <span>238</span>
                                        </span>
                                                    <span className={classNames(activity.huifu, activity.pliconF)}>
                                            <img src={images.huifu} alt=""/>
                                        </span>

                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <img src={images.pltx} alt="" style={{float: ' left'}}/>
                                            <div className={activity.plListUser}>
                                                <div>
                                                    <span className={activity.userName}>用户56841</span>
                                                    <span className={activity.userTime}>2020-04-26 至 2020-05-15</span>
                                                </div>
                                                <div className={activity.plContent}>
                                                    这个立绘真好看，我还想在传一个。
                                                </div>
                                                <div className={activity.zsCount}>
                                        <span className={classNames(activity.plzan, activity.pliconF)}>
                                            <img src={images.zan} alt=""/>
                                            <span>238</span>
                                        </span>
                                                    <span className={classNames(activity.huifu, activity.pliconF)}>
                                            <img src={images.huifu} alt=""/>
                                        </span>

                                                </div>
                                            </div>

                                        </li>
                                        <li>
                                            <img src={images.pltx} alt="" style={{float: ' left'}}/>
                                            <div className={activity.plListUser}>
                                                <div>
                                                    <span className={activity.userName}>用户56841</span>
                                                    <span className={activity.userTime}>2020-04-26 至 2020-05-15</span>
                                                </div>
                                                <div className={activity.plContent}>
                                                    这个立绘真好看，我还想在传一个。
                                                </div>
                                                <div className={activity.zsCount}>
                                                        <span className={classNames(activity.plzan, activity.pliconF)}>
                                                            <img src={images.zan} alt=""/>
                                                            <span>238</span>
                                                        </span>
                                                    <span className={classNames(activity.huifu, activity.pliconF)}>
                                                            <img src={images.huifu} alt=""/>
                                                        </span>
                                                </div>
                                            </div>

                                        </li>
                                    </ul>
                                    <div>
                                        <div>
                                <span>
                                    <textarea className={activity.PLinputBox} placeholder="请输入您回复的内容！"></textarea>
                                </span>
                                        </div>
                                        <div className={activity.PLsubBtn}>
                                            发表评论
                                        </div>
                                    </div>
                                </div>
                                <div className={activity.moreLook}>
                                    查看更多
                                </div>
                            </div>
                            <div className={activity.rmwork}>
                                <div className={activity.listItem}>
                                    <span className={activity.listItemTitle}>热门作品</span>
                                    <span>
                                    <img src={images.remen} alt=""/>
                                    </span>
                                    <span>
                                    <img src={images.remen2} alt=""/>
                                    </span>
                                    <ul className={activity.imgList}>
                                        <li>
                                            <img src={images.honeimg1} alt=""/>
                                            <div className={activity.moduletwotext1}>
                                                交互式红绿灯
                                            </div>
                                            <div className={activity.moduletwotext2}>
                                    <span>
                                        声乐
                                    </span>
                                                <span>
                                        运算
                                    </span>
                                                <div className={activity.moduletwotext3}>
                                                    <div className={activity.eyes}>
                                                        <img src={images.eyes} alt=""/>
                                                    </div>
                                                    <div>
                                                        169
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activity.module3Line}></div>
                                            <div className={activity.moduletwotext4}>
                                                <div className={activity.total}>
                                                    <img src={images.toux} alt=""/>
                                                </div>
                                                <div className={activity.nametea}>
                                                    <div className={activity.nameteaT1}>
                                                        二十四节气
                                                    </div>
                                                    <div className={activity.nameteaT2}>
                                                        跟老师一起...
                                                    </div>
                                                </div>
                                            </div>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>

                <div className={style.footer}>

                    <div className={style.footerCon}>
                        <div className={style.left}>
                            <div className={style.footerLogo}>
                                <img src={images.botLogo} alt=""/>
                            </div>
                            <div className={style.scratch}>
                                scratchCN中国爱好者社区
                            </div>
                            <div className={style.text2}>
                                创建故事，游戏和动画与其他人分享你的作品。
                            </div>
                            <div className={style.text3}>
                                赶紧加入我们吧！记得拉上好友一起来呀 o(*￣▽￣*)ブ 墙裂建议使用浏览器： Chrome（点击可下载）
                            </div>
                        </div>
                        <ul className={style.middle}>
                            <li>联系我们</li>
                            <li>
                                服务热线：400-562-3000
                            </li>
                            <li>
                                商务合作：1395004803@qq.com
                            </li>
                            <li className={style.lxfs}>
                        <span>
                            <img src={images.qq} alt=""/>
                        </span>
                                <span>
                            <img src={images.phone} alt=""/>
                        </span>
                                <span>
                            <img src={images.weixin} alt=""/>
                        </span>
                            </li>
                        </ul>
                        <div className={style.right}>
                            <ul className={style.rightList}>
                                <li>
                                    <span>产品</span>
                                    <span>智能分析</span>
                                    <span>智能画像</span>
                                    <span>数据平台</span>
                                    <span>数据采集</span>
                                </li>
                                <li>
                                    <span>资源中心</span>
                                    <span>智能分析</span>
                                    <span>智能画像</span>
                                    <span>数据平台</span>
                                    <span>数据采集</span>
                                </li>
                                <li>
                                    <span>关于我们</span>
                                    <span>关于scratchCN</span>
                                    <span>媒体报道</span>
                                    <span>服务条款</span>
                                    <span>隐私协议</span>

                                </li>
                            </ul>
                        </div>

                        {/*<div className={style.footerBot}>
                            Copyright © 2020 scratchCN版权所有 京ICP备150215619号 京公网安备110105022365号
                        </div>*/}
                    </div>


                </div>
            </div>
        )
    }
}

Detail.propTypes = {
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

const DetailPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedPlayer = compose(
    AppStateHOC,
    HashParserHOC
)(DetailPlayer);

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<WrappedPlayer isPlayerOnly/>, appTarget);

