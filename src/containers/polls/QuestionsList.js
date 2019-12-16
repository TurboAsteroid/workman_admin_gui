import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import "antd/dist/antd.css";
import * as pollsActions from '../../store/polls/actions';
import * as pollsSelectors from '../../store/polls/reducer';
import { withRouter, Link } from 'react-router-dom';
import { List, Icon, Button } from 'antd';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class questionsList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(pollsActions.fetchQuestionsItems(this.props.match.params.pollId));
    }
    render() {
        if (!this.props.match.params.pollId) {
            return '';
        }
        return <React.Fragment>
            <h2>Список вопросов</h2>
            <p>
                <Link to={`/questionEdit/${this.props.match.params.pollId}/`}>
                    <Button type="primary">Добавить вопрос</Button>
                </Link>
            </p>
            <List
                itemLayout="horizontal"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={this.props.questionsArray}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Link to={`/questionEdit/${this.props.match.params.pollId}/${item.id}`}>
                                <IconText type="edit-o" text="Редактировать" />
                            </Link>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                        />
                    </List.Item>
                )}
            />
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const questionsArray = pollsSelectors.getQuestionsArray(state);
    return {
        questionsArray
    };
}


export default withRouter(connect(mapStateToProps)(questionsList))
