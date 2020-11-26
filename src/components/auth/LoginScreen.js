import React from "react";
import "./login.css";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin, startRegister } from "../../actions/auth";
import Swal from "sweetalert2";
export const LoginScreen = () => {
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "edgarolivar16@gmail.cl",
    lPassword: "123456",
  });
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "Moises",
    rEmail: "moisesolivar16@gmail.cl",
    rPassword: "123456",
    rPassword2: "123456",
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = e => {
    e.preventDefault();

    if(rPassword !== rPassword2) return Swal.fire("Warning", "Passwords dont match", "warning")
    dispatch(startRegister(rEmail, rPassword, rName))

  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
