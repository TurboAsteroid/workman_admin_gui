import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import "antd/dist/antd.css";
import * as scheduleActions from '../../store/schedule/actions';
import * as scheduleSelectors from '../../store/schedule/reducer';
import { withRouter, Link } from 'react-router-dom';
import { List, Icon, Button } from 'antd';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class schedule extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    componentDidMount() {
        this.props.dispatch(scheduleActions.fetchScheduleItems(this.props.match.params.moduleId));
    }
    render() {
        return <React.Fragment>
            <h2>Список элементов</h2>

            <p>
                <Link to={`/scheduleEdit/${this.props.match.params.moduleId}/`}>
                    <Button type="primary">Добавить элемент</Button>
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
                dataSource={this.props.scheduleArray}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Link to={`/scheduleEdit/${this.props.match.params.moduleId}/${item.id}`}>
                                <IconText type="edit-o" text="Редактировать" />
                            </Link>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.name ? `${item.name} ${item.surname} ${item.patronymic}` : item.header}
                        />
                    </List.Item>
                )}
            />
        </React.Fragment>
    }
}

function mapStateToProps(state) {

    const scheduleArray = scheduleSelectors.getScheduleArray(state);
    return {
        scheduleArray
    };
}


export default withRouter(connect(mapStateToProps)(schedule))
