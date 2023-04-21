import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation, FaUserPlus } from 'react-icons/fa';

import axios from '../../services/axios';

import { Container } from '../../styles/GlobalStyles';
import { StudentContainer, ProfilePicture, RegisterStudent } from './styled';

import Loading from '../../components/Loading';
import TitlePage from '../../components/TitlePage';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAsk = (event) => {
    event.preventDefault();

    if (axios.defaults.headers.Authorization) {
      const exclamationIcon = event.currentTarget.parentElement.nextSibling.firstChild;
      const deleteIcon = event.currentTarget.parentElement;

      exclamationIcon.setAttribute('display', 'block');
      deleteIcon.remove();
    } else {
      toast.error('Você precisa estar logado!');
    }
  };

  const handleDelete = async (event, studentId) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      event.currentTarget.parentElement.parentElement.remove();

      await axios.delete(`/students/${studentId}`);
      setIsLoading(false);
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/students');
      setStudents(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <TitlePage
        title="Alunos ativos"
        component={
          <RegisterStudent to="/student">
            <FaUserPlus color="#3FB8AF" size={30} />
          </RegisterStudent>
        }
      />
      <RegisterStudent />
      <StudentContainer>
        <table>
          <tbody>
            {students.map((student) => (
              <tr key={String(student.id)}>
                <td>
                  <ProfilePicture>
                    <span>
                      {get(student, 'Photos[0].url', false) ? (
                        <img crossOrigin="anonymous" src={student.Photos[0].url} alt="" />
                      ) : (
                        <FaUserCircle size={55} />
                      )}
                    </span>
                    {student.firstname}
                  </ProfilePicture>
                </td>
                <td>{student.email}</td>
                <td>
                  <Link to={`/student/edit/${student.id}`}>
                    <FaEdit color="#3fb8af" size={25} />
                  </Link>
                </td>
                <td>
                  <Link onClick={handleDeleteAsk} to={`/student/delete/${student.id}`}>
                    <FaWindowClose color="#3fb8af" size={24} />
                  </Link>
                </td>
                <td>
                  <FaExclamation
                    color="#3fb8af"
                    size={22}
                    display="none"
                    cursor="pointer"
                    onClick={(event) => handleDelete(event, student.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StudentContainer>
    </Container>
  );
}
