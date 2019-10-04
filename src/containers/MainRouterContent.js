import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import LoginPage from './LoginPage'
import Error404 from './Error404'
import EditNews from './news/EditNews'
import EditPoll from './polls/EditPoll'
import EditQuestion from './polls/EditQuestion'
import EditSection from './EditSection';
import EditSchedule from './schedule/EditSchedule';
import StructureModuleEditor from './StructureModuleEditor'

class MainRouterContent extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }
    render() {
        return (
                <Switch>
                    <Route exact path="/login" component={LoginPage} />

                    <Route exact path="/" component={StructureModuleEditor} />
                    <Route exact path="/:typeModule(\d+)/:moduleId(\d+)" component={EditSection} />
                    <Route path="/newsEdit/:moduleId(\d+)/:newsId(\d+)?" component={EditNews} />
                    <Route path="/pollEdit/:moduleId(\d+)/:pollId(\d+)?" component={EditPoll} />
                    <Route path="/questionEdit/:pollId(\d+)/:questionId(\d+)?" component={EditQuestion} />
                    <Route path="/scheduleEdit/:moduleId(\d+)/:scheduleId(\d+)?" component={EditSchedule} />
                    <Route component={Error404} />
                </Switch>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

// export default connect(mapStateToProps)(MainRouterContent);
export default withRouter(connect(mapStateToProps)(MainRouterContent))



