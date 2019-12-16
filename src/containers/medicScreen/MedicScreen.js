import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Menu, Form } from 'antd';
import { Link } from 'react-router-dom';
import * as medicActions from '../../store/medic/actions';
import * as medicSelectors from '../../store/medic/reducer';
import { withRouter } from 'react-router-dom';

class MedicScreen extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(medicActions.getMedicSubMenu(this.props.match.params.moduleId));
    }
    createMainMenu(){
        let menuList = [];

        for (let i in this.props.medicArray) {
            menuList.push(
                <Menu.Item key={this.props.medicArray[i].id}>
                    <Link to={`/${this.props.medicArray[i].type}/${this.props.medicArray[i].id}`} className="column card">
                        {this.props.medicArray[i].name}
                    </Link>
                </Menu.Item>
            )
        }
        return menuList;
    }
    render() {
        if (!this.props.medicArray) return <div>Загрузка...</div>
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                {this.createMainMenu()}
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    const medicArray = medicSelectors.getMedicSubMenu(state);
    return {
        medicArray
    };
}

export default Form.create({ name: 'moduleEdit' })(withRouter(connect(mapStateToProps)(MedicScreen)))