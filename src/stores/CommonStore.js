import {action, observable, reaction} from "mobx";
import agent from '../agent';

class CommonStore {
    @observable appName = 'temp';
    @observable token = window.localStorage.getItem('temp');

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('temp', token);
                } else {
                    window.localStorage.removeItem('temp');
                }
            }
        );
    }

    @action setToken(token) {
        this.token = token;
    }

    getCodeInfo(code) {
        return agent.Common.codeInfo(code);
    }

    getCodeNameInfo(code, name) {
        return agent.Common.codeNameInfo(code, name);
    }
}

export default new CommonStore();
