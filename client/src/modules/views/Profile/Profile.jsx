import React, {Component} from 'react';
import User from "../../components/User/User";
import AuthTokenService from "../../../services/auth/AuthTokenService";
import PrefabLoader from "../../components/Loader/PrefabLoader";
import {Container} from "semantic-ui-react";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            user: null,
        }
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        const username = this.props.username;
        AuthTokenService.fetch(`/api/users/name/${username}`)
            .then((user) => {
                this.setState({user: user, ready: true});
                return Promise.resolve(user);
            });
    }

    //RENDERING
    render() {
        const {ready, user} = this.state;
        return <Container>
            {ready ? <User data={user} /> : <PrefabLoader/>}
        </Container>;
    }
}

export default Profile;