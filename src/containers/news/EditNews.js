import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Error404 from "../Error404";
import { Editor } from 'react-draft-wysiwyg';
import * as newsActions from '../../store/news/actions';
import { Redirect } from 'react-router'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import * as newsSelectors from '../../store/news/reducer';
import {
    Upload, Form, Input, Button, Alert, Icon, Card
} from 'antd'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/wysiwyg.css';

class EditNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsContent: undefined,
            fileList: [],
            imageCount: 0
        }

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
                    <Redirect to={"/2/" + this.props.match.params.moduleId}/>
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
                    <Redirect to={"/2/" + this.props.match.params.moduleId }/>
                </React.Fragment>
            )
        }
    }
    componentWillUpdate(nextProps) {
        if(!this.state.newsContent && nextProps.newsObject) {
            this.getWysiwygData(nextProps.newsObject.full_description);
            let fileList = nextProps.newsObject.galery || [];

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
    addImage() {
        this.setState({
            imageCount: this.state.imageCount + 1
        })
    }
    removeBlock(index) {
        let fileList = []
        for(let i in this.state.fileList) {
            fileList.push(Object.assign({}, this.state.fileList[i]))
        }
        fileList.splice(index, 1)
        this.setState({fileList})
    }
    showImage() {
        const { getFieldDecorator } = this.props.form;
        let result = [];
        for(let i = 0; i < this.state.fileList.length; i++) {
            const props = {
                accept: "image/*",
                multiple: false,
                className: 'upload-list-inline',
                listType: 'picture',
                disabled: true,
                onChange: (info) => {
                    if (!this.state.fileList.find((element) => {return info.file.uid === element.uid})) {
                        this.setState({
                            fileList: [ ...this.state.fileList,  info.file],
                            imageCount: this.state.imageCount - 1
                        })
                    } else {
                    }
                },
                beforeUpload: (file, fileList) => { return false; },
                fileList: this.state.fileList[i] ? [Object.assign({}, this.state.fileList[i])] : []
            }
            result.push(
                <Card key={i} extra={<Button onClick={() => this.removeBlock(i)}>Удалить <Icon type="delete" /></Button>}>
                    <Form.Item>
                        <Upload {...props}>
                            {this.state.fileList[i] ? <div /> : <Button><Icon type="upload" /> Загрузить</Button>}
                        </Upload>
                    </Form.Item>
                    <Form.Item key={i}
                               label={(
                                   <span>Описание изображения</span>
                               )}
                    >
                        {getFieldDecorator(`desc[${i}]`, {
                            initialValue: this.state.fileList[i] ? this.state.fileList[i].description : '',
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Card>
            )
        }
        const props = {
            accept: "image/*",
            multiple: false,
            className: 'upload-list-inline',
            listType: 'picture',
            disabled: false,
            onChange: (info) => {
                this.setState({fileList: [ ...this.state.fileList,  info.file]})
            },
            beforeUpload: (file, fileList) => {return false;},
            defaultFileList: []
        }
        result.push(
            <Card >
                <Form.Item label={(<span>Выберете дополнительное изображение новости</span>)}>
                    <Upload {...props}>
                        <Button><Icon type="upload" /> Загрузить</Button>
                    </Upload>

                </Form.Item>
            </Card>
        )
        return result
    }
    render() {
        if (!this.state.newsContent && this.props.match.params.newsId !== undefined)  return <div>Загрузка...</div>;
        const { getFieldDecorator } = this.props.form;
        let newsObject = this.props.newsObject;
        if (!this.props.match.params.moduleId)
            return <Error404/>;

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

                    {this.showImage()}

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
