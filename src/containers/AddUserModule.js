import React, { Component } from 'react';
import * as usersActions from '../store/users/actions';
import * as usersSelectors from '../store/users/reducer';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Form, Input, Button, Alert
} from 'antd'
import "antd/dist/antd.css";

class AddUserModule extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    handleSubmit (e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err);
                return;
            }
            this.props.dispatch(usersActions.postUserData(values));
        });
    }

    showAlert(){
        if (this.props.userAddResult)
            return (
                <Alert
                    message={`${this.props.userAddResult.message} (временный пароль ${this.props.userAddResult.tmpPassword})`}
                    type={this.props.userAddResult.status === "OK" ? "success" : "error"}
                    closable
                />
            )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
                    label={(
                        <span>
                            Номер телефона
                        </span>
                    )}
                >
                    {getFieldDecorator('user', {
                        rules: [{ required: true, message: 'Введите номер телефона', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label={(
                        <span>
                                Номер карты
                            </span>
                    )}
                >
                    {getFieldDecorator('card', {
                        rules: [{ required: true, message: 'Введите номер карты', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Form.Item>


                <Form.Item
                    wrapperCol={{ span: 12, offset: 4 }}
                >
                    <Button type="primary" htmlType="submit">Получить пароль</Button>
                </Form.Item>

                {this.showAlert()}
            </Form>
        );
    }

}

function mapStateToProps(state) {
    const userAddResult = usersSelectors.getUserAddResult(state);
    console.log(userAddResult);
    return {
        userAddResult
    };
}

export default Form.create({ name: 'moduleEdit' })(withRouter(connect(mapStateToProps)(AddUserModule)))