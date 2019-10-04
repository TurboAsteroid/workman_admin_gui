import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as feedbackActions from '../../store/feedback/actions';
import * as feedbackSelectors from '../../store/feedback/reducer';
import { List, Icon} from 'antd';
import { withRouter,Link } from 'react-router-dom';


const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class feedbackList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        this.props.dispatch(feedbackActions.fetchFeedbackItems(this.props.match.params.moduleId));
    }
    render() {
        if (!this.props.feedbackArray) return <div>Список вопросов пуст</div>;

        return <React.Fragment>
            <h2>Список вопросов</h2>
            <List
                itemLayout="horizontal"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={this.props.feedbackArray}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Link to={`/feedbackEdit/${this.props.match.params.moduleId}/${item.id}`}>
                                <IconText type="edit-o" text="Редактировать" />
                            </Link>
                        ]}
                    >
                        <List.Item.Meta
                            title={unescape(item.title)}
                            description={unescape(item.body)}
                            content={item.response || ''}
                        />
                    </List.Item>
                )}
            />
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    const feedbackArray = feedbackSelectors.getFeedbackArray(state);
    return {
        feedbackArray
    };
}

export default withRouter(connect(mapStateToProps)(feedbackList))
