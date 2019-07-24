import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import StructureModuleEditor from './StructureModuleEditor'
import AddUserModule from './AddUserModule'
import "antd/dist/antd.css";
import Error404 from "./Error404";
import { withRouter } from 'react-router-dom';

class chooseMainModule extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        if  (this.props.match.params.mainMenuId === "1") return <StructureModuleEditor />;
        if  (this.props.match.params.mainMenuId === "2") return <AddUserModule />;
        else return <Error404/>;
    }

}

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(chooseMainModule))
