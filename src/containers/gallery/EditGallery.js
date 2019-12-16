import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Error404 from "../Error404";
import * as galleryActions from '../../store/gallery/actions';
import { Redirect } from 'react-router'
import * as gallerySelectors from '../../store/gallery/reducer';
import {
    Upload, Form, Input, Button, Alert, Icon, Card
} from 'antd'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/wysiwyg.css';

import { withRouter } from 'react-router-dom';

class EditGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }

        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(galleryActions.getGallery(this.props.match.params.moduleId));
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
    componentWillUpdate(nextProps) {
        if(this.state.galleryObject === undefined && nextProps.galleryObject) {
            let fileList = nextProps.galleryObject.gallery || [];
            this.setState({
                fileList,
                galleryObject: nextProps.galleryObject
            });
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

            this.props.dispatch(galleryActions.saveGallery(values, this.state.fileList))
        });
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
                <Card key={i} style={{ width: '30%', marginBottom: 20, marginRight: '1%', float: 'left',  }}>
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
                        {this.props.form.getFieldDecorator(`desc[${i}]`, {
                            initialValue: this.state.fileList[i] ? this.state.fileList[i].description : '',
                            rules: [{ whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Button onClick={() => this.removeBlock(i)}>Удалить <Icon type="delete" /></Button>
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
            <Card key={this.state.fileList.length + 1} style={{ clear: 'both' }}>
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
        if (this.state.galleryObject === undefined)  return <div>Загрузка...</div>;
        if (!this.props.match.params.moduleId)
            return <Error404/>;

        return (
            <React.Fragment>
                <h1>Редактирование галлереи</h1>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    {this.showImage()}

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
    const galleryObject = gallerySelectors.getGalleryObject(state);
    const gallerySaveResult = gallerySelectors.getGallerySaveResult(state);
    return {
        galleryObject,
        gallerySaveResult
    };
}
export default Form.create({ name: 'moduleEdit' })(withRouter(connect(mapStateToProps)(EditGallery)))