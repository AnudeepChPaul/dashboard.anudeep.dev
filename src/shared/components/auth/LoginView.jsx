import React, {useState} from 'react'
import styled from "styled-components";
import InputField from "@/shared/components/inputs/fields/InputField";
import PropTypes from 'prop-types'
import PlainTextButton from "@/shared/components/inputs/buttons/PlainTextButton";
import Button from "@/shared/components/inputs/buttons/Button";


const DisplayFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LoginForm = styled(DisplayFlex)`
  width: 100%;
  height: 9rem;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
`;

const LoginBanner = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem 1rem 0;
`;

const FooterWrapper = styled(DisplayFlex)`
  width: 100%;
  height: 2.25rem;
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem 1rem 0;
  justify-content: space-between;

  ${Button} {
    width: 9rem;
  }
`;

const ErrorHolder = styled(DisplayFlex)`
  width: 100%;
  height: 1rem;
  padding: 0 1rem;
  align-content: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.error};
`;


const LoginView = (props) => {
  const fieldProps = {
    height: "2.25rem",
    width: "75%",
    whileHover: {width: "80%"},
    margin: "0 0 1rem",
  };

  const [values, setValues] = useState({username: "", password: ""});

  const handleChange = (evt) => {
    setValues({...values, [evt.target.name]: evt.target.value});
  };

  const postRegistrationView = () => {
    props.onRegistrationClick();
  };

  return (
    <>
      <LoginBanner>
        <span>Login To Dashbaord</span>
      </LoginBanner>
      <ErrorHolder>
        {props.errorMsg || ' '}
      </ErrorHolder>
      <LoginForm>
        <InputField
          placeholder={"Username"}
          {...fieldProps}
          name="username"
          value={values.username}
          onChange={handleChange}
          onKeyDown={(evt) => {
            if (evt.key.toLowerCase() === "enter") {
              evt.preventDefault();
              props.onLogin(values.username, values.password);
            }
          }}
          focus={true}
        />
        <InputField
          placeholder={"Password"}
          {...fieldProps}
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onKeyDown={(evt) => {
            if (evt.key.toLowerCase() === "enter") {
              evt.preventDefault();
              props.onLogin(values.username, values.password);
            }
          }}
        />
      </LoginForm>

      <FooterWrapper>
        <PlainTextButton text={"Don't have an account ? Register! "} color="contrast"
                         onClick={postRegistrationView}/>
        <Button
          backColor={"info"}
          color={"primary"}
          onClick={() => props.onLogin(values.username, values.password)}
          type="submit"
          fontSize={"1rem"}
          disabled={!values.username || !values.password}
        >
          Login
        </Button>
        <PlainTextButton text={"Forgot Password ?"} color="error"/>
      </FooterWrapper>
      </>
  )
};

LoginView.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegistrationClick: PropTypes.func.isRequired,
  errorMsg: PropTypes.string
};

export default LoginView;
