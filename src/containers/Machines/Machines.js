import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-reusable-table';

import axios from '../../axios-machines';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Table from '../../components/UI/Table/Table';
import * as utility from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import labMicroscope from '../../assets/img/lab-microscope.png';
import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';

class Machines extends Component {
    // initiate input field's properties
    state = {
        searchForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please search by status, machine type, floor'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },

        },
        formIsValid: false
    }

    componentDidMount() {
        // initiate data from server
        this.loadData();
    }

    loadData() {
        this.props.onFetchMachines(this.props.location.search);
        this.props.onFetchEvents();
    }

    // filter machines and update url
    filterMachinesHandler = (event) => {
        this.props.onFilterMachines(event.target.value, this.props.history);
    }

    // sort machines in asc order and update url
    sortMachinesHandler = (colName, sortType) => {
        this.props.onSortMachines(colName, sortType, this.props.history);
    }

    detailPageHandler = (id) => {
        this.props.history.push('machines/' + id);
    }

    // to dismiss error popup msg
    errorConfirmedHandler = () => {
        this.setState({ error: null });
    }

    render() {
        // spinner will load while getting
        // response from server
        let machines = <Spinner />;

        // assign table when when got 
        // response from server
        if (!this.props.loading) {
            machines = <Table
                caption=""
                data={this.props.machines}
                detailPage={this.detailPageHandler}
                footerCells={utility.getMachineTableHeaderCells()}
                headerCells={utility.getMachineTableHeaderCells()}
                showFooter={false}
                sortedUporDown={this.sortMachinesHandler}
            />

            // if error occurs load modal
            if (this.props.error) {
                machines = <Modal
                    show={this.props.error}
                    modalClosed={() => this.props.onfetchMachinesFail(null)}>
                    {this.props.error ? this.props.error.message : null}
                </Modal>
            }
        }

        return (
            <div>
                <CommonHeader
                    isLinkAble={false}
                    icon={labMicroscope}
                    title="Machines"
                />
                <Input
                    elementType={this.state.searchForm.name.elementType}
                    touched={this.state.searchForm.name.touched}
                    elementConfig={this.state.searchForm.name.elementConfig}
                    changed={(event) => this.filterMachinesHandler(event)} />

                {machines}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        machines: state.machine.machines,
        loading: state.machine.loading,
        error: state.machine.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMachines: (values) => dispatch(actions.fetchMachines(values)),
        onSortMachines: (colName, sortType, history) => dispatch(actions.sortMachinesUpdateUrl(colName, sortType, history)),
        onFilterMachines: (val, history) => dispatch(actions.filterMachinesUpdateUrl(val, history)),
        onfetchMachinesFail: (error) => dispatch(actions.fetchMachinesFail(error)),
        onFetchEvents: () => dispatch(actions.fetchEvents())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Machines, axios));