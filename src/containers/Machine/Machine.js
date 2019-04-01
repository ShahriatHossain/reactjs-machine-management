import React, { Component } from 'react';
import { connect } from 'react-redux';

import CommonHeader from '../../components/UI/CommonHeader/CommonHeader';
import labMicroscope from '../../assets/img/lab-microscope.png';
import { getMachineTabs } from '../../shared/utility';
import Tab from '../../components/UI/Tab/Tab';
import axios from '../../axios-machines';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

class Machine extends Component {
    state = {
        selectedTab: 'details'
    }

    componentDidMount() {
        // initiate machine from server
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        const event = this.props.liveEvents.find(ev => ev.machine_id === this.props.match.params.id);
        if(event) this.props.onFetchEvents();
    }

    loadData() {
        this.props.onFetchMachine(this.props.match.params.id);
        this.props.onFetchEvents();
    }

    clickTabHandler = (tabName) => {
        this.setState({
            ...this.state,
            selectedTab: tabName
        });
    }

    // to dismiss error popup msg
    errorConfirmedHandler = () => {
        this.setState({ ...this.state, error: null });
    }


    render() {

        // spinner will load while getting
        // response from server
        let machine = <Spinner />;

        // assign table when when got 
        // response from server
        if (!this.props.loading) {
            machine = <Tab
                tabTitle="Machine Details"
                tabDescription=""
                tabLinks={getMachineTabs()}
                selectedTab={this.state.selectedTab}
                clickTab={this.clickTabHandler}
                data={this.props.machine}
                liveEvents={this.props.liveEvents}
            />
        }

        // if error occurs load modal
        if (this.props.error) {
            machine = <Modal
                show={this.props.error}
                modalClosed={() => this.props.onFetchMachineFail(null)}>
                {this.props.error ? this.props.error.message : null}
            </Modal>
        }
        return (
            <div>
                <CommonHeader
                    isLinkAble={true}
                    url="/machines"
                    icon={labMicroscope}
                    title="Machines" />
                {machine}
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        liveEvents: state.machine.events,
        machine: state.machine.machine,
        loading: state.machine.loading,
        error: state.machine.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMachine: (value) => dispatch(actions.fetchMachineDetail(value)),
        onFetchMachineFail: (error) => dispatch(actions.fetchMachineDetailFail(error)),
        onFetchEvents: () => dispatch(actions.fetchEvents())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Machine, axios));