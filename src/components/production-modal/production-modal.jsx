import Modal from '../../containers/modal.jsx';
import styles from './production-modal.css';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {closeLoginModal} from "../../reducers/modals";
import {login} from "../../reducers/user-state";
import {setProjectId} from "../../reducers/project-state";
import {setProjectTitle} from "../../reducers/project-title";

const ProductionModal = (props) => {

    const {
        title, closeProductionModal, checkedCategory, shareProduction,
        productionInfoChange,
        productionState,
    } = props;
    const {productionDesc, productionName, operationDesc, productionList, checkedList} = productionState;

    return (
        <Modal
            className={styles.modalContent}
            contentLabel={title}
            id="productionModal"
            onRequestClose={closeProductionModal}
            headerClassName={styles.headerClassName}
        >
            <div style={{textAlign: 'center', padding: '1rem 2.25rem'}}>
                <div className={styles.productionBox}>
                    <p>作品名称</p>
                    <input type="text" value={productionName} onChange={(e) => {
                        productionInfoChange('productionName', e.target.value)
                    }}/>
                </div>
                <div className={styles.productionBox}>
                    <p>作品简介</p>
                    <textarea rows="4" maxLength="500" placeholder="不超过500个字" value={productionDesc}
                              onChange={e => {
                                  productionInfoChange('productionDesc', e.target.value)
                              }}
                    ></textarea>
                </div>
                <div className={styles.productionBox}>
                    <p>操作说明</p>
                    <textarea rows="4" maxLength="500" placeholder="不超过500个字"
                              value={operationDesc}
                              onChange={e => {
                                  productionInfoChange('operationDesc', e.target.value)
                              }}
                    ></textarea>
                </div>
                <div className={styles.productionBox}>
                    <p>分类标签<em>（请选择作品分类标签）</em></p>
                    {
                        productionList && productionList.map(item => (
                            <span
                                className={(checkedList.includes(item.categoryKey.toString())) ? styles.productionChecked : ''}
                                onClick={(e) => checkedCategory(e)}
                                value={item.categoryKey}
                                key={item.categoryKey}
                            >{item.categoryValue}
                            </span>
                        ))
                    }
                </div>

                <div className={styles.productionAction}>
                    <button className={styles.productionBtn}
                            style={{background: 'hsla(215, 100%, 65%, 1)', color: 'white'}}
                            onClick={() => {
                                shareProduction();
                                closeProductionModal();
                            }}>保存
                    </button>
                    <button className={styles.productionBtn}
                            style={{
                                backgroundColor: 'hsla(300, 48%, 50%, 1)',
                                border: '1px solid rgb(189, 66, 189)',
                                color: 'white'
                            }}
                            onClick={closeProductionModal}>取消
                    </button>
                </div>
            </div>
        </Modal>
    )
};

ProductionModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeLoginModal()),
    userSateLogin: (data) => dispatch(login(data)),
    setProjectId: projectId => dispatch(setProjectId(projectId)),
    setProjectTitle: title => dispatch(setProjectTitle(title)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionModal);
