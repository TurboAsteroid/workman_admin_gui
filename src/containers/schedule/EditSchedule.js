import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Error404 from "../Error404";
import * as scheduleActions from '../../store/schedule/actions';
import * as scheduleSelectors from '../../store/schedule/reducer';
import { Redirect } from 'react-router'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import {
    Form, Input, Button, Alert, Upload, Icon
} from 'antd'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/wysiwyg.css';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class EditSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleObject: undefined,
            descriptionContent: undefined,
            avatar: undefined,
            fileList: []
        };

        autoBind(this);
    }
    getWysiwygData(description){
        const html = description || '';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const descriptionContent = EditorState.createWithContent(contentState);
            this.setState({
                descriptionContent
            });
        }
    }
    componentWillUpdate(nextProps) {
        if(!this.state.descriptionContent && nextProps.scheduleObject) {
            this.getWysiwygData(nextProps.scheduleObject.description);
            let fileList = nextProps.scheduleObject.avatar ? [nextProps.scheduleObject.avatar] : [];
            this.setState({
                fileList
            });
        }
    }
    onEditorStateChange (descriptionContent) {
        this.setState({
            descriptionContent,
        });
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
                    <Redirect to={"/6/" + this.props.match.params.moduleId }/>
                </React.Fragment>
            )
        } else if (this.props.scheduleDeleteResult) {
            let message = this.props.scheduleDeleteResult.message;
            let status = this.props.scheduleDeleteResult.status;
            this.props.dispatch(scheduleActions.cleanSaveState())
            return (
                <React.Fragment>
                    <Alert
                        message={message}
                        type={status === "ok" ? "success" : "error"}
                        closable
                    />
                    <Redirect to={"/6/" + this.props.match.params.moduleId }/>
                </React.Fragment>
            )
        }
    }
    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err)
                return;
            }
            values.description = this.state.descriptionContent ? draftToHtml(convertToRaw(this.state.descriptionContent.getCurrentContent())) : "";
            values.module_id = this.props.match.params.moduleId;
            values.scheduleId = this.props.match.params.scheduleId || '';

            this.props.dispatch(scheduleActions.saveSchedule(values, this.state.fileList))
        });
    }
    delete() {
        this.props.dispatch(scheduleActions.deleteSchedule(this.props.match.params.scheduleId))
    }
    createSchedule(getFieldDecorator) {
        let options = []
        // if (!this.state.scheduleObject) return "";

        let points = this.props.scheduleObject ? this.props.scheduleObject.schedule : []

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
    showImage() {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type='plus' />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const props = {
            accept: "image/*",
            multiple: false,
            className: 'avatar-uploader',
            listType: 'picture-card',
            // showUploadList: false,
            disabled: false,
            onChange: (info) => {
                let fileList = [...info.fileList];
                fileList = fileList.slice(-1);
                this.setState({
                    avatar: info.file,
                    fileList
                })
            },
            beforeUpload: (file, fileList) => {return false;},
            // defaultFileList: [this.props.scheduleObject.avatar],
            fileList: this.state.fileList
        }
        const { imageUrl } = this.state;
        return <Form.Item label={(<span>Выберете фотографию</span>)}>
            {getFieldDecorator('avatar', {
            })(
                <Upload {...props}>
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            )}
        </Form.Item>
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        let scheduleObject = this.props.scheduleObject;

        if (!scheduleObject)
            return <div>Загрузка...</div>;

        if (!this.props.match.params.moduleId)
            return <Error404/>;

        return (
            <React.Fragment>
                <h1>Редактирование объекта расписания</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Form.Item
                        label={(
                            <span>
                                Фамилия
                            </span>
                        )}
                    >
                        {getFieldDecorator('name', {
                            initialValue: scheduleObject ? scheduleObject.name || "" : "",
                            rules: [{ required: true, message: 'Введите фамилию специалиста', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Имя
                            </span>
                        )}
                    >
                        {getFieldDecorator('surname', {
                            initialValue: scheduleObject ? scheduleObject.surname || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Отчество
                            </span>
                        )}
                    >
                        {getFieldDecorator('patronymic', {
                            initialValue: scheduleObject ? scheduleObject.patronymic || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Должность
                            </span>
                        )}
                    >
                        {getFieldDecorator('position', {
                            initialValue: scheduleObject ? scheduleObject.position || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Описание специалиста"
                    >
                        <Editor
                            onEditorStateChange={this.onEditorStateChange}
                            editorState={this.state.descriptionContent}
                            wrapperClassName="wysiwyg-wrapper"
                            editorClassName="wysiwyg-editor"
                            // editorClassName={classes.editorBlock}
                            // toolbarCustomButtons={[<CustomOption actions={this.switchType}/>]}
                        />
                    </Form.Item>

                    {this.showImage()}

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
