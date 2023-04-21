import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { get } from 'lodash';

import axios from '../../services/axios';

import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture } from './styled';
import TitlePage from '../../components/TitlePage';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Student() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (id) {
        setIsLoading(true);
        await axios.put(`/students/${id}`, { firstname, lastname, email, age, weight, height });

        toast.success('Aluno editado com sucesso!');
      } else {
        setIsLoading(true);
        const { data } = await axios.post('/students/', { firstname, lastname, email, age, weight, height });

        toast.success('Aluno cadastrado com sucesso!');
        navigate(`/student/edit/${data.id}`);
      }
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login novamente.');
        navigate('/login');
        dispatch(actions.loginFailure());
      }

      setIsLoading(false);
      errors.map((error) => toast.error(error));
    }
  };

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/students/${id}`);
        const Photo = get(data, 'Photos[0].url', '');

        setPhoto(Photo);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);

        setIsLoading(false);
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);
        const status = get(err, 'response.status', 0);

        if (status === 401) {
          toast.error('Você precisa fazer login novamente.');
          navigate('/login');
          dispatch(actions.loginFailure());
        }

        setIsLoading(false);
        errors.map((error) => toast.error(error));
      }
    }

    getData();
  }, [id, dispatch, navigate]);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <TitlePage title={id ? 'Editar aluno' : 'Cadastrar aluno'} />
      {id && (
        <div>
          <ProfilePicture>
            <span>
              {photo ? <img crossOrigin="anonymous" src={photo} alt="" /> : <FaUserCircle size={105} />}
              <Link to={`/photos/${id}`}>
                <FaEdit size={18} color="#fff" />
              </Link>
            </span>
          </ProfilePicture>
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          idInput="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          placeholder="Digite seu primeiro nome"
        />
        <Input
          text="Sobrenome"
          idInput="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="Digite seu segundo nome"
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
          text="Idade"
          idInput="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="text"
          placeholder="Digite sua idade"
        />
        <Input
          text="Peso"
          idInput="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
          placeholder="Digite seu peso"
        />
        <Input
          text="Altura"
          idInput="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          type="text"
          placeholder="Digite sua altura"
        />
        <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
      </Form>
    </Container>
  );
}
