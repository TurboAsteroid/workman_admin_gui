import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as authActions from '../store/auth/actions';
import * as authSelectors from '../store/auth/reducer';
import { Redirect } from 'react-router'
import {
    Form, Input, Button
} from 'antd'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/wysiwyg.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authObject: undefined,
        };

        autoBind(this);
    }
    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err);
                return;
            }
            this.props.dispatch(authActions.authorization(values))
        });
    }
    showAlert(){
        if (this.props.authObject) {
            if (this.props.authObject.data && this.props.authObject.status !== 'error') {
                return (
                    <Redirect to={"/"}/>
                )
            }
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                <h1>Авторизация</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Form.Item
                        label={(
                            <span>
                                Логин
                            </span>
                        )}
                    >
                        {getFieldDecorator('user', {
                            rules: [{ required: true, message: 'Введите ваш логин' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Пароль
                            </span>
                        )}
                    >
                        {getFieldDecorator('pass', {
                            rules: [{ required: true, message: 'Введите ваш пароль' }],
                        })(
                            <Input
                                type="password"
                            />
                        )}
                    </Form.Item>

                    {this.showAlert()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Войти</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const authObject = authSelectors.getAuthObject(state);
    return {
        authObject
    };
}

export default Form.create({ name: 'moduleEdit' })(connect(mapStateToProps)(LoginPage))
