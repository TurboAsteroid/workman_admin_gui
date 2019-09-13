import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Error404 from "./Error404";
import * as scheduleActions from '../store/schedule/actions';
import * as scheduleSelectors from '../store/schedule/reducer';
import { Redirect } from 'react-router'
import {
    Form, Input, Button, Alert
} from 'antd'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/wysiwyg.css';

class EditSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleObject: undefined
        };

        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(scheduleActions.getSchedule(this.props.match.params.scheduleId));
    }
    showAlert(){
        if (this.props.scheduleSaveResult) {
            let message = this.props.scheduleSaveResult.message;
            let status = this.props.scheduleSaveResult.status;
            this.props.dispatch(scheduleActions.cleanSaveState())
            return (
                <React.Fragment>
                    <Alert
                        message={message}
                        type={status === "ok" ? "success" : "error"}
                        closable
                    />
                    <Redirect to={"/1/6/" + this.props.match.params.moduleId }/>
                </React.Fragment>
            )
        } else if (this.props.scheduleDeleteResult) {
            let message = this.props.scheduleDeleteResult.message;
            let status = this.props.scheduleDeleteResult.status;
            return (
                <React.Fragment>
                    <Alert
                        message={message}
                        type={status === "ok" ? "success" : "error"}
                        closable
                    />
                    <Redirect to={"/1/6/" + this.props.match.params.moduleId }/>
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
            values.module_id = this.props.match.params.moduleId;
            values.scheduleId = this.props.match.params.scheduleId || '';
            this.props.dispatch(scheduleActions.saveSchedule(values))
        });
    }
    delete() {
        this.props.dispatch(scheduleActions.deleteSchedule(this.props.match.params.scheduleId))
    }
    createSchedule(getFieldDecorator) {
        let options = []
        // if (!this.state.scheduleObject) return "";

        let points = this.props.scheduleObject ? this.props.scheduleObject.schedule : []
        console.log(points)

        for (let i in points) {
            options.push(<Form.Item key={i}>
                <span style={{ width: 200, display: 'inline-block' }}>
                    {points[i].full_name}
                </span>
                {getFieldDecorator(`schedule[${points[i].id}]`, {
                    initialValue: points[i] ? points[i].title || "" : ""
                })(
                    <Input placeholder="Введите время работы" style={{ width: 200 }} />
                )}
            </Form.Item>)
        }
        return options;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        let scheduleObject = this.props.scheduleObject;

        if (!this.props.match.params.moduleId)
            return <Error404/>;

        return (
            <React.Fragment>
                <h1>Редактирование объекта расписания</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Form.Item
                        label={(
                            <span>
                                Название объекта
                            </span>
                        )}
                    >
                        {getFieldDecorator('header', {
                            initialValue: scheduleObject ? scheduleObject.header || "" : "",
                            rules: [{ required: true, message: 'Введите название объекта', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Дополнительное название объекта
                            </span>
                        )}
                    >
                        {getFieldDecorator('subheader', {
                            initialValue: scheduleObject ? scheduleObject.subheader || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Краткое описание объекта
                            </span>
                        )}
                    >
                        {getFieldDecorator('description', {
                            initialValue: scheduleObject ? scheduleObject.description || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Название расписания
                            </span>
                        )}
                    >
                        {getFieldDecorator('scheduleName', {
                            initialValue: scheduleObject ? scheduleObject.scheduleName || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    {this.createSchedule(getFieldDecorator)}

                    {this.showAlert()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                        <Button type="danger" onClick={this.delete}>Удалить</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const scheduleObject = scheduleSelectors.getScheduleObject(state);
    const scheduleSaveResult = scheduleSelectors.getScheduleSaveResult(state);
    const scheduleDeleteResult = scheduleSelectors.getScheduleDeleteResult(state);
    return {
        scheduleObject,
        scheduleSaveResult,
        scheduleDeleteResult
    };
}

export default Form.create({ name: 'moduleEdit' })(connect(mapStateToProps)(EditSchedule))
