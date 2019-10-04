import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Error404 from "./Error404";
import { Editor } from 'react-draft-wysiwyg';
import * as structureSelectors from '../store/structure/reducer';
import * as sectionSelectors from '../store/section/reducer';
import NewsList from './news/NewsList';
import Gallery from './gallery/EditGallery';
import FeedbackList from './feedback/FeedbackList';
import PollsList from './polls/PollsList';
import ScheduleItemList from './schedule/ScheduleList';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import * as sectionActions from '../store/section/actions';
import AddUserModule from './AddUserModule'
import {
    Form, Input, Button, Alert
} from 'antd'
import * as structureActions from '../store/structure/actions';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/wysiwyg.css';

class EditSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: undefined
        };

        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(structureActions.fetchStructureItems());
    }
    showAlert(){
        if (this.props.sectonData)
            return (
                <Alert
                    message={this.props.sectonData.message}
                    type={this.props.sectonData.status === "ok" ? "success" : "error"}
                    closable
                />
            )
    }
    getWysiwygData(html){
        // const html = this.props.structureObject[1][this.props.match.params.moduleId].content;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState
            });
        }
    }
    componentWillUpdate(nextProps) {
        if (!this.state.editorState && nextProps.structureObject)
            this.getWysiwygData(nextProps.structureObject[1][nextProps.match.params.moduleId].content);
    }
    onEditorStateChange (editorState) {
        this.setState({
            editorState,
        });
    }

    getContentEditor() {
        switch (this.props.match.params.typeModule) {
            case "1":
                return(<Form.Item
                    label="Основное содержимое"
                >
                    <Editor
                        onEditorStateChange={this.onEditorStateChange}
                        editorState={this.state.editorState}
                        wrapperClassName="wysiwyg-wrapper"
                        editorClassName="wysiwyg-editor"
                        // editorClassName={classes.editorBlock}
                        // toolbarCustomButtons={[<CustomOption actions={this.switchType}/>]}
                    />
                </Form.Item>);
            default:
                return;
        }
    }
    getAdditionalOptions() {
        switch (this.props.match.params.typeModule) {
            case "2":
            case "4":
                return(<NewsList />);
            case "3":
                return(<PollsList />);
            case "6":
                return(<ScheduleItemList />);
            case "12":
                return(<FeedbackList />);
            case "25":
                return(<AddUserModule />);
            case "26":
                return(<Gallery />);
            default:
                return;
        }
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log('err of form: ', err);
                return;
            }
            values.content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

            values.moduleId = this.props.match.params.moduleId;

            this.props.dispatch(sectionActions.postSectionData(values));
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        if (!this.props.match.params.typeModule || !this.props.match.params.moduleId)
            return <Error404/>;

        if(!this.props.structureObject) {
            return(
                <p>Loading...</p>
            )
        }
        let textModuleData = this.props.structureObject[1][this.props.match.params.moduleId];
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <Form.Item
                        label={(
                            <span>
                                Название раздела
                            </span>
                        )}
                    >
                        {getFieldDecorator('name', {
                            initialValue: textModuleData.name || "",
                            rules: [{ required: true, message: 'Введите название раздела', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(
                            <span>
                                Краткое описание раздела
                            </span>
                        )}
                    >
                        {getFieldDecorator('description', {
                            initialValue: textModuleData.description || "",
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    {this.getContentEditor()}

                    {this.showAlert()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>

                {this.getAdditionalOptions()}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const [structureObject] = structureSelectors.getStructure(state);
    const sectonData = sectionSelectors.getSectonData(state);
    return {
        structureObject,
        sectonData
    };
}

export default Form.create({ name: 'moduleEdit' })(withRouter(connect(mapStateToProps)(EditSection)))
