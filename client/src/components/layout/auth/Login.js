import React, { Fragment, useState, useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import Spinner from '../Spinner';
import Footer from '../../pages/Footer';

import M from 'materialize-css/dist/js/materialize.min';

const Login = props => {
  const authContext = useContext(AuthContext);

  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    loadUser,
    loading
  } = authContext;
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
    if (error === 'Invalid Credentials') {
      M.toast({ html: error });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      M.toast({ html: 'Please fill in all fields' });
    } else {
      login({
        email,
        password
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="valign-wrapper row login-box">
        <div className="col card s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form onSubmit={onSubmit}>
            <div className="card-content">
              <span className="card-title center">Login</span>
              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="validate"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="password">Password </label>
                  <input
                    type="password"
                    className="validate"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="card-action right-align center text-white">
                <button
                  className="btn blue waves-effect waves-light"
                  type="submit"
                >
                  Login <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </Fragment>
  );
};

export default Login;
