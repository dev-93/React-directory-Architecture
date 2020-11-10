import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {inject} from "mobx-react";

export default
@inject("UserStore")
class PublicRoute extends React.Component {
    render() {
        const { UserStore, ...restProps } = this.props;

        if (!UserStore.currentUser) {
            return <Route exact {...restProps} />;
        }

        return <Redirect to="/" />;
    }
}
