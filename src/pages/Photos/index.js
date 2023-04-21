import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import TitlePage from '../../components/TitlePage';

export default function Photos() {
  const [isLoading, setIsLoading] = useState();
  const [photo, setPhoto] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const photoFile = event.target.files[0];
    const photoURL = URL.createObjectURL(photoFile);

    setPhoto(photoURL);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('photo', photoFile);

    try {
      setIsLoading(true);

      await axios.post(`/photos/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');
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
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);

        const Photo = get(data, 'Photos[0].url', '');
        setPhoto(Photo);

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
    };

    getData();
  }, []);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <TitlePage title="Fotos" />
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Foto de perfil" /> : 'Selecionar foto'}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
