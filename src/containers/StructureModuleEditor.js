import React, { Component } from 'react';
import * as structureActions from '../store/structure/actions';
import * as structureSelectors from '../store/structure/reducer';
import autoBind from 'react-autobind';
import EditSection from './EditSection';
import { connect } from 'react-redux';
import { Tree, Layout  } from 'antd';
import { withRouter } from 'react-router-dom';
import "antd/dist/antd.css";

const { TreeNode } = Tree;

const ROOT_KEY = 1;

class StructureModuleEditor extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    onSelect = (selectedKeys, e) => {
        this.props.history.push('/'+ this.props.match.params.mainMenuId + '/' + e.node.props.typeId + '/' +selectedKeys)
    };

    createTreeNode(root) {
        let parentsList = this.props.structureObject[0];
        let structureById = this.props.structureObject[1];

        let children = [];
        for(let i in parentsList[root]) {
            if(parentsList[root][i] !== root)
                children.push(this.createTreeNode(parentsList[root][i]));
        }

        return(
            <TreeNode title={structureById[root].name} key={root} isLeaf={!children.length} selectable={root!==ROOT_KEY} typeId={structureById[root].type}>
                {children}
            </TreeNode>
        )
    }

    componentDidMount() {
        this.props.dispatch(structureActions.fetchStructureItems());
    }
    render() {
        if (!this.props.structureObject) return this.renderLoading();
        return (
            <React.Fragment>
                <h2>Структура</h2>

                <Layout style={{width: "auto", float: "left",padding: "20px", minWidth: "300px"}}>
                    <Tree
                        defaultExpandAll
                        onSelect={this.onSelect}
                        onExpand={this.onExpand}
                    >
                        {this.createTreeNode(ROOT_KEY)}
                    </Tree>
                </Layout>
                <div style={{ overflow: "hidden", padding: "0 20px"}}>
                    <Layout style={{ padding: "20px"}}>
                        {this.props.match.params.moduleId ? <EditSection /> : <div>Выберите раздел</div>}
                    </Layout>
                </div>


            </React.Fragment>
        );
    }

    renderLoading() {
        return (
            <p>Loading...</p>
        );
    }
}

function mapStateToProps(state) {
    const [structureObject] = structureSelectors.getStructure(state);
    return {
        structureObject
    };
}

export default withRouter(connect(mapStateToProps)(StructureModuleEditor))
