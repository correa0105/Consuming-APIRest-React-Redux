import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import TitlePage from '../../components/TitlePage';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const fullnameStored = useSelector((state) => state.auth.user.fullname);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(actions.registerRequest({ id, fullname, email, password, loginPage: () => navigate('/login') }));
  };

  useEffect(() => {
    if (!id) return;
    setFullname(fullnameStored);
    setEmail(emailStored);
  }, [id, fullnameStored, emailStored]);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <TitlePage title={id ? 'Editar dados' : 'Crie sua conta!'} />
      <Form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          idInput="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          type="text"
          placeholder="Digite seu nome"
        />
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
        <button type="submit">{id ? 'Salvar dados' : 'Criar minha conta'}</button>
      </Form>
    </Container>
  );
}
