import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Error404 from "./Error404";
import { Editor } from 'react-draft-wysiwyg';
import * as newsActions from '../store/news/actions';
import { Redirect } from 'react-router'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import * as newsSelectors from '../store/news/reducer';
import {
    Upload, Form, Input, Button, Alert, Icon
} from 'antd'
// import config from '../config';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/wysiwyg.css';

class EditNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsContent: undefined,
            fileList: [],
        };

        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(newsActions.getNews(this.props.match.params.newsId));
    }
    getWysiwygData(full_description){
        const html = full_description;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const newsContent = EditorState.createWithContent(contentState);
            this.setState({
                newsContent
            });
        }
    }
    delete() {
        this.props.dispatch(newsActions.deleteNews(this.props.match.params.newsId))
    }
    showAlert(){
        if (this.props.newsSaveResult) {
            let message = this.props.newsSaveResult.message;
            let status = this.props.newsSaveResult.status;
            this.props.dispatch(newsActions.cleanSaveState())
            return (
                <React.Fragment>
                    <Alert
                        message={message}
                        type={status === "ok" ? "success" : "error"}
                        closable
                    />
                    <Redirect to={"/1/2/" + this.props.match.params.moduleId}/>
                </React.Fragment>
            )
        } else if (this.props.newsDeleteResult) {
            let message = this.props.newsDeleteResult.message;
            let status = this.props.newsDeleteResult.status;
            return (
                <React.Fragment>
                    <Alert
                        message={message}
                        type={status === "ok" ? "success" : "error"}
                        closable
                    />
                    <Redirect to={"/1/2/" + this.props.match.params.moduleId }/>
                </React.Fragment>
            )
        }
    }
    componentWillUpdate(nextProps) {
        if(!this.state.newsContent && nextProps.newsObject) {
            this.getWysiwygData(nextProps.newsObject.full_description);
            let fileList = [];
            if (nextProps.newsObject.image && nextProps.newsObject.image.data) {
                fileList.push({
                    uid: '-1',
                    name: 'newsImage.png',
                    status: 'done',
                    // url: `${config.api}admin/news/pictures?newsId=${nextProps.newsObject.id}&moduleId=${nextProps.newsObject.module_id}&type=logo`,
                    // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                })
            }
            this.setState({
                fileList
            });
        }
    }
    onEditorStateChange (newsContent) {
        this.setState({
            newsContent,
        });
    }
    handleSubmit (e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err);
                return;
            }
            values.full_description = this.state.newsContent ? draftToHtml(convertToRaw(this.state.newsContent.getCurrentContent())) : "";
            values.moduleId = this.props.match.params.moduleId;
            values.newsId = this.props.match.params.newsId ;

            this.props.dispatch(newsActions.saveNews(values, this.state.fileList))
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { fileList  } = this.state;

        let newsObject = this.props.newsObject;

        if (!this.props.match.params.moduleId)
            return <Error404/>;

        const props = {
            accept: "image/*",
            multiple: false,
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <React.Fragment>
                <h1>Редактирование новости</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Form.Item
                        label={(
                            <span>
                                Заголовок новости
                            </span>
                        )}
                    >
                        {getFieldDecorator('title', {
                            initialValue: newsObject ? newsObject.title || "" : "",
                            rules: [{ required: true, message: 'Введите заголовок новости', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Краткое описание новости
                            </span>
                        )}
                    >
                        {getFieldDecorator('description', {
                            initialValue: newsObject ? newsObject.description || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label={(
                            <span>
                                Ссылка на новость с другого ресурса
                            </span>
                        )}
                    >
                        {getFieldDecorator('link', {
                            initialValue: newsObject ? newsObject.link || "" : "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label={(
                            <span>
                                Выберете картинку новости
                            </span>
                        )}
                    >
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> Нажмите чтобы выбрать
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Основное содержимое новости"
                    >
                        <Editor
                            onEditorStateChange={this.onEditorStateChange}
                            editorState={this.state.newsContent}
                            wrapperClassName="wysiwyg-wrapper"
                            editorClassName="wysiwyg-editor"
                            // editorClassName={classes.editorBlock}
                            // toolbarCustomButtons={[<CustomOption actions={this.switchType}/>]}
                        />
                    </Form.Item>

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
    const newsObject = newsSelectors.getNewsObject(state);
    const newsSaveResult = newsSelectors.getNewsSaveResult(state);
    const newsDeleteResult = newsSelectors.getNewsDeleteResult(state);
    return {
        newsObject,
        newsSaveResult,
        newsDeleteResult
    };
}

export default Form.create({ name: 'moduleEdit' })(connect(mapStateToProps)(EditNews))
