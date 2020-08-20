import React from 'react';
import bindAll from "lodash.bindall";
import {closeProductionModal, openProductionModal} from "../reducers/modals";
import {connect} from "react-redux";

const defaultProps = {
    //获取所有的类目列表
    productionList: [],
    //被选中的类目列表
    checkedList: [],
    productionDesc: '',
    operationDesc: '',
    productionName: '',
    categoryKey: []
}
const ProductionModalHoc = (WrappedComponent) => {
    class ProductionModalHocComponent extends React.Component {

        constructor(props) {
            super(props);
            bindAll(this, [
                'loadProductionList',
                'checkedCategory',
                'productionInfoChange',
                'initProductionInfo',
            ]);
            this.state = {
                ...defaultProps
            };
        }

        componentDidMount() {
            this.loadProductionList();
        }

        loadProductionList() {
            fetch(PORTAL_SERVER + '/education/category/list', {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
            })
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        productionList: json.data
                    })
                })
        }

        productionInfoChange(key, value) {
            this.setState({
                [key]: value
            })
        }

        checkedCategory(e) {
            const value = e.target.getAttribute('value') || null;
            const {checkedList} = this.state;
            checkedList.includes(value) ? checkedList.splice(checkedList.findIndex(item => item === value), 1) : checkedList.push(value);

            const list = [];
            list.push(...checkedList);
            this.setState({
                checkedList: list,
                categoryKey: list
            })
        }

        initProductionInfo() {
            this.setState({...defaultProps});
        }

        render() {
            return (
                <WrappedComponent
                    checkedCategory={this.checkedCategory}
                    modalProduction={this.props.modalProduction}
                    closeProductionModal={this.props.closeProductionModal}
                    openProductionModal={this.props.openProductionModal}
                    productionInfoChange={this.productionInfoChange}
                    productionState={this.state}
                    initProductionInfo={this.initProductionInfo}
                    {...this.props}
                />
            )
        }
    }

    const mapStateToProps = state => ({
        modalProduction: state.scratchGui.modals.modalProduction
    });
    const mapDispatchToProps = dispatch => ({
        closeProductionModal: () => dispatch(closeProductionModal()),
        openProductionModal: () => dispatch(openProductionModal()),
    });

    return connect(mapStateToProps, mapDispatchToProps)(ProductionModalHocComponent);

};

export default ProductionModalHoc;
