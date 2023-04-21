import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import Input from '../../components/Input';
import Loading from '../../components/Loading';
import TitlePage from '../../components/TitlePage';
import * as actions from '../../store/modules/auth/actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const prevPath = useLocation().state;

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(actions.loginRequest({ email, password, prevPath: () => navigate(prevPath || '/') }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Form onSubmit={handleSubmit}>
        <TitlePage title="Login" />
        <Input
          text="Email"
          idInput="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Digite seu email"
        />
        <Input
          text="Senha"
          idInput="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Digite sua senha"
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
