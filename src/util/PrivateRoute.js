import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {inject} from "mobx-react";

export default
@inject("UserStore")
class PrivateRoute extends React.Component {
    render() {
        const { UserStore, ...restProps } = this.props;

        if (UserStore.currentUser) {
            return (
                <Route exact {...restProps}/>
            );
        } else {
            alert("확인이 필요합니다");
        }

        return <Redirect to="/"/>;
    }
}
