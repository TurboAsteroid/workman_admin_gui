import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as newsActions from '../../store/news/actions';
import * as newsSelectors from '../../store/news/reducer';
import { List, Icon, Button } from 'antd';
import { withRouter,Link } from 'react-router-dom';


const IconText = ({ type, text }) => (
    <span>
            <Icon type={type} style={{ marginRight: 8 }} />
        {text}
        </span>
);

class newsList extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidMount() {
        this.props.dispatch(newsActions.fetchNewsItems(this.props.match.params.moduleId));
    }
    render() {
        if (!this.props.newsArray) return <div>Список новостей пуст</div>;

        return <React.Fragment>
            <h2>Список новостей</h2>

            <p>
                <Link to={`/newsEdit/${this.props.match.params.moduleId}/`}>
                    <Button type="primary">Добавить новость</Button>
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
                dataSource={this.props.newsArray}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Link to={`/newsEdit/${this.props.match.params.moduleId}/${item.id}`}>
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

    const newsArray = newsSelectors.getNewsArray(state);
    return {
        newsArray
    };
}

export default withRouter(connect(mapStateToProps)(newsList))
