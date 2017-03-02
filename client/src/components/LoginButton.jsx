// 评论系统顶部的用于显示消息的组件
import React from 'react';

export default class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <a href={this.props.url} target="_blank">login with GitHub</a>
            </div>
        )
    }
};
