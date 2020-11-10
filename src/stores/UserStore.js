import {action, observable} from 'mobx';
import agent from '../agent';

class UserStore {
    @observable currentUser;
    @observable loadingUser;
    @observable updatingUser;
    @observable updatingUserErrors;

    @action pullUser() {
        this.loadingUser = true;
        return agent.User.current()
            .then(action(({user}) => {
                this.currentUser = user;
            }))
            .catch((e) => {
                console.log(e);
            })
            .finally(action(() => {
                this.loadingUser = false;
            }))
    }

    @action updateUser(newUser) {
        this.updatingUser = true;
        return agent.User.save(newUser)
            .then(action(() => this.pullUser()))
            .finally(action(() => {
                this.updatingUser = false;
            }))
    }

    @action setNickName(nickName) {
        this.currentUser.nickName = nickName;
    }

    @action forgetUser() {
        this.currentUser = undefined;
    }

    nickCheck(nickName) {
        return agent.User.nickCheck(nickName);
    }
}

export default new UserStore();
