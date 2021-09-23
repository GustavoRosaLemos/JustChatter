import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Button, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { FormLogin } from '../../shared/@types/login';
import { useRequestRegister, useRequestLogin } from '../../store/hooks/loginHooks';
import { sendError, sendSucess } from '../../utils/notify';
import { clearSessionParams, saveSessionParam } from '../../utils';
import * as Yup from 'yup';
import { useHideLoading, useIsLoading, useShowLoading } from '../../store/hooks/loadingHooks';
import ClipLoader from 'react-spinners/ClipLoader';
import history from '../../shared/history';

const LoginPage = (): JSX.Element => {
  const [resgisterMode, setRegisterMode] = useState(false);
  const requestRegister = useRequestRegister();
  const requestLogin = useRequestLogin();
  const isLoading = useIsLoading();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const formInitialValues: FormLogin = {
    login: '',
    name: '',
    email: '',
    username: '',
    password: '',
  };

  const validation = Yup.object().shape({
    login: Yup.string().min(3, 'Login muito curto!'),
    name: Yup.string()
      .matches(/^[A-z\u00c0-\u00FF ]+$/, 'Nome inválido!')
      .min(2, 'Nome muito curto!'),
    email: Yup.string().email('Email inválido!'),
    password: Yup.string().required('Campo obrigatório!').min(4, 'senha muito curta!'),
    passwordRepeat: Yup.string().min(4, 'Senha muito curta!'),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validation,
  });

  const { values, resetForm, handleChange, touched, errors } = formik;

  useEffect(() => {
    clearSessionParams();
  }, []);

  const handleSubmit = async (values: FormLogin) => {
    showLoading();
    if (resgisterMode) {
      if ('name' in values && 'username' in values && 'email' in values && 'password' in values) {
        try {
          if (values.password === values.passwordRepeat) {
            const response = await requestRegister({
              name: values.name ?? '',
              username: values.username ?? '',
              email: values.email ?? '',
              password: values.password ?? '',
            });
            clearSessionParams();
            saveSessionParam('token', response.token);
            resetForm();
            hideLoading();
            history.push('/');
            sendSucess('Registro realizado com sucesso!');
          } else {
            hideLoading();
            sendError('As senhas inseridas não são iguais!');
          }
        } catch (error) {
          hideLoading();
          sendError('Falha ao realizar registro!');
        }
      } else {
        hideLoading();
        sendError('Dados inválidos, não foi possível realizar o registro.');
      }
    } else {
      if ('login' in values && 'password' in values) {
        try {
          let response = undefined;
          if (values.login?.includes('@')) {
            response = await requestLogin({
              email: values.login ?? '',
              password: values.password,
            });
          } else {
            response = await requestLogin({
              username: values.login ?? '',
              password: values.password,
            });
          }
          clearSessionParams();
          saveSessionParam('token', response.token);
          resetForm();
          hideLoading();
          history.push('/');
          sendSucess('Login realizado com sucesso!');
        } catch (error) {
          hideLoading();
          resetForm();
          sendError('Falha ao realizar login!');
        }
      } else {
        hideLoading();
        sendError('Dados inválidos, não foi possível realizar o login.');
      }
    }
  };

  const handleToggleRegisterMode = () => {
    setRegisterMode((c) => !c);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '30vh' }}>
        <ClipLoader color="#0d6efd" loading={isLoading} size={100} speedMultiplier={0.5} />
      </div>
    );
  }

  return (
    <Container>
      <Col className="mx-auto mt-5 p-3" style={{ maxWidth: '400px', backgroundColor: '#F4F4F4', borderRadius: '12px' }}>
        {resgisterMode ? (
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-2" style={{ fontSize: '25px' }}>
              <b>Registrar</b>
            </div>
            <Form.Group className="mb-3" controlId="userForm">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuário"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && touched.username && <Form.Text style={{ color: 'red' }}>{errors.username}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="nameForm">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome Completo"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && <Form.Text style={{ color: 'red' }}>{errors.name}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="emailForm">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && <Form.Text style={{ color: 'red' }}>{errors.email}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordForm">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password && <Form.Text style={{ color: 'red' }}>{errors.password}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPaswordForm">
              <Form.Label>Repetir Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repetir Senha"
                name="passwordRepeat"
                value={values.passwordRepeat}
                onChange={handleChange}
              />
              {errors.passwordRepeat && touched.passwordRepeat && (
                <Form.Text style={{ color: 'red' }}>{errors.passwordRepeat}</Form.Text>
              )}
            </Form.Group>
            <Row className="justify-content-center">
              <Button
                className="ml-2 mr-2"
                variant="success"
                type="submit"
                style={{ maxWidth: '40%', marginLeft: '10px', marginRight: '10px' }}
              >
                Cadastrar
              </Button>
              <Button
                className="ml-2 mr-2"
                variant="primary"
                style={{ maxWidth: '40%', marginLeft: '10px', marginRight: '10px' }}
                onClick={handleToggleRegisterMode}
              >
                Voltar
              </Button>
            </Row>
          </Form>
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <div className="title mb-2" style={{ fontSize: '25px' }}>
              <b>Entrar</b>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Usuário/Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuário/Senha"
                name="login"
                value={values.login ?? ''}
                onChange={handleChange}
              />
              {errors.login && touched.login && <Form.Text style={{ color: 'red' }}>{errors.login}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password && <Form.Text style={{ color: 'red' }}>{errors.password}</Form.Text>}
            </Form.Group>
            <Row className="justify-content-center">
              <Button
                className="ml-2 mr-2"
                variant="success"
                type="submit"
                style={{ maxWidth: '40%', marginLeft: '10px', marginRight: '10px' }}
              >
                Entrar
              </Button>
              <Button
                className="ml-2 mr-2"
                variant="primary"
                style={{ maxWidth: '40%', marginLeft: '10px', marginRight: '10px' }}
                onClick={handleToggleRegisterMode}
              >
                Cadastrar
              </Button>
            </Row>
          </Form>
        )}
      </Col>
    </Container>
  );
};

export default LoginPage;
