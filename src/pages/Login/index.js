import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './style';

export default class Login extends Component {
    state = {
        client_id: '8714737794de78a1ed8',
        code:''
    }

    render() {
       const { client_id, code } = this.state;
        return (
            <Container>
                { code ? window.location.href = "/home" : '' }
                <a href={"https://github.com/login/oauth/authorize?scope=user:email&client_id=" + client_id }>
                    Logar
                </a>
            </Container>
        );

    }
}
