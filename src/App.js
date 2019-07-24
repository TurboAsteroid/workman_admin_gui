import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Layout} from 'antd';
import MainMenu from './containers/MainMenu';
import MainRouterContent from './containers/MainRouterContent';
import { BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";


import autoBind from 'react-autobind';
import * as mainMenuActions from './store/mainMenu/actions';
import * as mainMenuSelectors from './store/mainMenu/reducer';

const { Header, Content, Sider } = Layout;


class App extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        this.props.dispatch(mainMenuActions.fetchMenuItems());
    }

    renderLoading() {
        return (
            <p>Loading...</p>
        );
    }

    render() {
        if (!this.props.mainMenuArray) return this.renderLoading();
        return (<Router>
            <Layout className="App">
                <Header className="header" style={{
                    background: '#fff', borderBottom: '1px solid #ecedf1', height: '123px', padding: '14px 20px'
                }}>
                    <div className="logo">
                        <img src="http://www.elem.ru/logo.png" alt="Уралэлектромедь" />
                    </div>
                </Header>
                <Layout>
                    <Sider style={{
                        overflow: 'auto', height: '100%', position: 'fixed', left: 0,
                        borderRight: '2px solid #ccc', width: '200px'
                    }}>
                        <MainMenu mainMenuArray={this.props.mainMenuArray} />
                    </Sider>
                    <Layout style={{ marginLeft: 200, padding: '24px' }}>
                         <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 300,
                        }}
                        >
                            <MainRouterContent mainMenuArray={this.props.mainMenuArray} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            </Router>
        );
    }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
    const [mainMenuArray] = mainMenuSelectors.getMainMenu(state);
    return {
        mainMenuArray
    };
}

export default connect(mapStateToProps)(App);
