import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Error404 from "../Error404";
import * as pollsActions from '../../store/polls/actions';
import * as pollsSelectors from '../../store/polls/reducer';
import {
    Form, Input, Button, Radio, Alert
} from 'antd'
import { Redirect } from 'react-router'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/wysiwyg.css';

class EditQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            radioValue: undefined,
        };
        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(pollsActions.getQuestion(this.props.match.params.questionId));
    }

    addOption() {
        let tmpOptions = this.state.options;
        tmpOptions.push("");

        this.setState({
            options: tmpOptions
        });
    }
    delete() {
        this.props.dispatch(pollsActions.deleteQuestion(this.props.match.params.questionId))
    }
    createOptions(getFieldDecorator) {
        let options = []
        let optionsArray = this.state.options;
        if (this.props.questionObject && this.props.questionObject.options) {
            optionsArray = [...optionsArray, ...this.props.questionObject.options]
        }
        for (let i in optionsArray) {
            let option = optionsArray;
            options.push(<Form.Item key={i}>
                {getFieldDecorator(`options[${i}]`, {
                    initialValue: option[i] ? option[i].title || option[i] || "" : ""
                })(
                    <Input placeholder="Введите вопрос" />
                )}
            </Form.Item>)
        }
        return options;
    }
    radioChange(e) {
        this.setState({
            radioValue: e.target.value
        });
    }
    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err);
                return;
            }
            values.id = this.props.match.params.questionId;
            values.pollId = this.props.match.params.pollId;
            this.props.dispatch(pollsActions.saveQuestion(values))
        });
    }
    showAlert(){
        if (this.props.questionDeleteResult) {
            let resultObject = {};
            resultObject = this.props.questionDeleteResult;
            console.log(resultObject);
            let message = resultObject.message;
            let status = resultObject.status;
            this.props.dispatch(pollsActions.cleanSaveState());

            return (
                <React.Fragment>
                    <Alert
                        message={message}
                        type={status === "ok" ? "success" : "error"}
                        closable
                    />
                    <Redirect to={`/pollEdit/${resultObject.module_id}/${resultObject.poll_id}` }/>
                </React.Fragment>
            )
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let questionObject = this.props.questionObject;
        if (!this.props.match.params.pollId)
            return <Error404/>;

        return (
            <React.Fragment>
                <h1>Редактирование вопроса</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Form.Item
                        label={(
                            <span>
                                Текст вопроса
                            </span>
                        )}
                    >
                        {getFieldDecorator('title', {
                            initialValue: questionObject ? questionObject.title || "" : "",
                            rules: [{ required: true, message: 'Введите текст вопроса', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Тип вопроса
                            </span>
                        )}
                    >
                        <div>
                            {getFieldDecorator('type', {
                                initialValue: questionObject ? questionObject.type.toString() || "0" : "0",
                                setFieldsValue: this.state.radioValue
                            })(
                                <Radio.Group onChange={this.radioChange} name="type">
                                    <Radio value="0">
                                        Выбор единственного варианта ответа
                                    </Radio>
                                    <br />
                                    <Radio value="1">
                                        Множественный выбор
                                    </Radio>
                                </Radio.Group>
                            )}
                        </div>
                    </Form.Item>


                    <h2>Список вопросов</h2>
                    <p>
                        <Button type="primary" onClick={this.addOption}>Добавить вариант ответа</Button>
                    </p>
                    {this.createOptions(getFieldDecorator)}

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
    const questionObject = pollsSelectors.getQuestionObject(state);
    const questionDeleteResult = pollsSelectors.getQuestionDeleteResult(state);

    return {
        questionObject,
        questionDeleteResult
    };
}

export default Form.create({ name: 'moduleEdit' })(connect(mapStateToProps)(EditQuestion))
