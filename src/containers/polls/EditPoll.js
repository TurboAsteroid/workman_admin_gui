import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Error404 from "../Error404";
import * as pollsActions from '../../store/polls/actions';
import * as pollsSelectors from '../../store/polls/reducer';
import { Redirect } from 'react-router'
import {
    Form, Input, Button, DatePicker, Alert, Checkbox
} from 'antd'
import QuestionsList from './QuestionsList';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/wysiwyg.css';

const moment = require('moment');

class EditPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollContent: undefined,
            questions: [],
        };

        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(pollsActions.getPoll(this.props.match.params.pollId));
    }
    showAlert(){
        if (this.props.pollSaveResult || this.props.pollDeleteResult) {
            let resultObject = {};
            if (this.props.pollSaveResult) {
                resultObject = this.props.pollSaveResult;
            } else if (this.props.pollDeleteResult) {
                resultObject = this.props.pollDeleteResult;
            }
            let message = resultObject.message;
            let status = resultObject.status;
            let pollId = resultObject.pollId;
            this.props.dispatch(pollsActions.cleanSaveState())
            // if (!pollId) {
                return (
                    <React.Fragment>
                        <Alert
                            message={message}
                            type={status === "ok" ? "success" : "error"}
                            closable
                        />
                        <Redirect to={"/3/" + this.props.match.params.moduleId }/>
                    </React.Fragment>
                )
            // }
            // return (
            //     <React.Fragment>
            //         <Alert
            //             message={message}
            //             type={status === "ok" ? "success" : "error"}
            //             closable
            //         />
            //         <Redirect to={"/pollEdit/" + this.props.match.params.moduleId + '/' + pollId}/>
            //     </React.Fragment>
            // )
        }
    }
    delete() {
        this.props.dispatch(pollsActions.deletePoll(this.props.match.params.pollId))
    }
    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err);
                return;
            }
            values.dateEnd = values.dateEnd.format('YYYY-MM-DD HH:mm:ss');
            values.pollId = this.props.match.params.pollId;
            values.moduleId = this.props.match.params.moduleId;
            this.props.dispatch(pollsActions.savePoll(values))
        });
    }

    disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        let pollObject = this.props.pollObject;

        if (!this.props.match.params.moduleId)
            return <Error404/>;
        // if (!pollObject) return <div>Загрузка...</div>

        return (
            <React.Fragment>
                <h1>Редактирование опроса</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Form.Item
                        label={(
                            <span>
                                Название опроса
                            </span>
                        )}
                    >
                        {getFieldDecorator('title', {
                            initialValue: pollObject ? pollObject.title || "" : "",
                            rules: [{ required: true, message: 'Введите название опроса', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Краткое описание опроса
                            </span>
                        )}
                    >
                        {getFieldDecorator('description', {
                            initialValue: pollObject ? pollObject.description || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Опубликовать опрос
                            </span>
                        )}
                    >
                        {getFieldDecorator('active', {

                        })(
                            <Checkbox defaultChecked={(pollObject !== undefined && pollObject.active) ? true : false} >Поставьте данный флажок когда полностью подготовите опрос</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Завершить опрос
                            </span>
                        )}
                    >
                        {getFieldDecorator('closed', {
                        })(
                            <Checkbox defaultChecked={(pollObject !== undefined && pollObject.closed) ? true : false} >Поставьте данный флажок когда опрос завершился</Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item style={{display: 'none'}}
                        label={(
                            <span>
                                Дата и время окончания опроса
                            </span>
                        )}
                    >
                        {getFieldDecorator('dateEnd', {
                            initialValue: pollObject ? moment(pollObject.dateEnd) || moment(new Date(new Date().setHours(0,0,0,0))).add(1,'days') : moment(new Date(new Date().setHours(0,0,0,0))).add(1,'days')
                        })(
                            <DatePicker
                                format = "DD-MM-YYYY HH:mm:ss"
                                disabledDate = {this.disabledDate}
                                placeholder = 'Укажите дату и время'
                                showTime={{ defaultValue: pollObject ? moment(pollObject.dateEnd) || moment('00:00:00', 'HH:mm:ss') : moment('00:00:00', 'HH:mm:ss') }}
                            />
                        )}
                    </Form.Item>

                    <QuestionsList />

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
    const pollObject = pollsSelectors.getPollObject(state);
    const pollSaveResult = pollsSelectors.getPollSaveResult(state);
    const pollDeleteResult = pollsSelectors.getPollDeleteResult(state);
    return {
        pollObject,
        pollSaveResult,
        pollDeleteResult,
    };
}

export default Form.create({ name: 'moduleEdit' })(connect(mapStateToProps)(EditPoll))
