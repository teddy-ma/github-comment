// 评论系统顶部的用于显示消息的组件
import React from 'react';

export default class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={ this.props.click_function }>comment</button>
            </div>
        )
    }
};
