import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

class MainMenu extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    createMainMenu(){
        let menuList = [];

        for (let i in this.props.mainMenuArray) {
            menuList.push(
                <Menu.Item key={this.props.mainMenuArray[i].id}>
                    <Link to={"/" + this.props.mainMenuArray[i].id} className="column card">
                        {this.props.mainMenuArray[i].name}
                    </Link>
                </Menu.Item>
            )
        }
        return menuList;
    }

    render() {
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
    return {
    };
}

export default connect(mapStateToProps)(MainMenu);
