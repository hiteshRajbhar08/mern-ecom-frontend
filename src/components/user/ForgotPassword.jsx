import React, { useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  forgotPassword,
  resetSuccess,
} from '../../redux/features/user/userSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success === true) {
      alert.success('Reset password link has sent to your mail Successfully');
      dispatch(resetSuccess());
    }
  }, [dispatch, error, success, alert]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      <MetaData title={'Forgot Password'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3 text-center">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
