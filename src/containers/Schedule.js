import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import "antd/dist/antd.css";
import { withRouter } from 'react-router-dom';

class Schedule extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return <div>список специалистов</div>
    }

}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(Schedule))
