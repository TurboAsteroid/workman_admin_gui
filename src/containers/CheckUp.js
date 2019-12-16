import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Error404 from "./Error404";
import * as checkUpActions from './../store/checkUp/actions';
import { Redirect } from 'react-router'
import * as checkUpSelectors from './../store/checkUp/reducer';
import moment from 'moment';
import 'moment/locale/ru'
import {
    Form, Alert, List, InputNumber, DatePicker, Button
} from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU';
import { withRouter } from 'react-router-dom';
import Input from "antd/es/input/Input";

class CheckUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(checkUpActions.getCheckUpArray(this.props.match.params.moduleId));
    }
    showAlert() {
        if (this.props.gallerySaveResult) {
            let message = this.props.gallerySaveResult.message;
            let status = this.props.gallerySaveResult.status;
            // this.props.dispatch(galleryActions.cleanSaveState())
            return (
                <React.Fragment>
                    <Alert
                        message={message}
                        type={status === "ok" ? "success" : "error"}
                        closable
                    />
                </React.Fragment>
            )
        }
    }
    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err);
                return;
            }
            values.moduleId = this.props.match.params.moduleId;

            this.props.dispatch(checkUpActions.saveCheckUp(values))
        });
    }
    render() {
        if (this.props.departmentsList === undefined)  return <div>Загрузка...</div>;
        if (!this.props.match.params.moduleId)
            return <Error404/>;

        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <h1>Редактирование новости</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.departmentsList}
                        renderItem={item => (
                            <List.Item key={item.code}>
                                <div style={{textTransform: "capitalize", marginRight: "20px", width: "300px"}}>
                                    {item.name}
                                </div>
                                <Form.Item style={{marginRight: "20px"}}
                                    label={(
                                        <span>
                                            Процент завершения
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator(`departments.${item.code.toString()}id.percent`, {
                                        initialValue: item.percent || 0,
                                        min: 0,
                                        max: 100,

                                    })(
                                        <InputNumber
                                            // defaultValue={0}
                                            formatter={value => `${value}%`}
                                            parser={value => value.replace('%', '')}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item style={{marginRight: "20px"}}
                                    label={(
                                        <span>
                                                    Дата начала
                                                </span>
                                    )}
                                >
                                    {getFieldDecorator(`departments.${item.code.toString()}id.start`, {
                                        initialValue: moment(item.start || new Date()),

                                    })(
                                        <DatePicker format={'DD-MM-YYYY'} locale={locale} />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label={(
                                        <span>
                                                    Дата окончания
                                                </span>
                                    )}
                                >
                                    {getFieldDecorator(`departments.${item.code.toString()}id.end`, {
                                        initialValue: moment(item.end || new Date() ),

                                    })(
                                        <DatePicker format={'DD-MM-YYYY'} locale={locale} />
                                    )}
                                </Form.Item>

                                <Form.Item style={{display: 'none'}}>
                                    {getFieldDecorator(`departments.${item.code.toString()}id.code`, {
                                        initialValue: parseInt(item.code),
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </List.Item>
                        )}
                    />
                    {this.showAlert()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const departmentsList = Object.values(checkUpSelectors.getCheckUpArray(state) || {});
    console.log(departmentsList)
    return {
        departmentsList
    };
}
export default Form.create({ name: 'moduleEdit' })(withRouter(connect(mapStateToProps)(CheckUp)))