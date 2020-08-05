import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: false,
    code: ''
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/users?user=${repoName}`),
      api.get(`/repositorys?user=${repoName}`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data.result,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading, code } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
         { code == undefined ? window.location.href = "/" : ''}
        <Owner>
          <Link to="/home">Voltar aos repositórios</Link>
          <img src={repository.avatar_url} alt={repository.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.owner.avatar_url} alt={issue.login} />
              <div>
                <strong>
                  <a href={"http://github.com/" + issue.full_name}>{issue.name}</a>
                    <span key={String(issue.owner.id)}>{issue.owner.login}</span>
                </strong>
                <p>{issue.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
