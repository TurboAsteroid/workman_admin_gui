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

class pollsList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(pollsActions.fetchPollsItems(this.props.match.params.moduleId));
    }
    render() {
        return <React.Fragment>
            <h2>Список голосований</h2>

            <p>
                <Link to={`/pollEdit/${this.props.match.params.moduleId}/`}>
                    <Button type="primary">Добавить опрос</Button>
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
                dataSource={this.props.pollsArray}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Link to={`/pollEdit/${this.props.match.params.moduleId}/${item.id}`}>
                                <IconText type="edit-o" text="Редактировать" />
                            </Link>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </React.Fragment>
    }
}

function mapStateToProps(state) {

    const pollsArray = pollsSelectors.getPollsArray(state);
    return {
        pollsArray
    };
}


export default withRouter(connect(mapStateToProps)(pollsList))
