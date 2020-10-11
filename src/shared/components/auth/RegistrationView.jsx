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

const RegistrationForm = styled(DisplayFlex)`
  width: 100%;
  height: 9rem;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
`;

const RegistrationBanner = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem 1rem 0;
`;

const RegistrationFormWrap = styled(DisplayFlex)`
  height: 22rem;
  width: 31rem;
  background-color: ${(props) => props.theme.colors.primaryShade};
  margin: auto;
  border-radius: 2px;
  padding: 1rem;
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


const RegistrationView = (props) => {
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

  const postLoginView = () => {
    props.onLoginClick();
  };

  return (
    <>
      <RegistrationBanner>
        <span>Quickly Create an Account</span>
      </RegistrationBanner>
      <ErrorHolder>
        {props.errorMsg || ' '}
      </ErrorHolder>
      <RegistrationForm>
        <InputField
          placeholder={"Email is your Username"}
          {...fieldProps}
          name="username"
          value={values.username}
          onChange={handleChange}
          onKeyDown={(evt) => {
            if (evt.key.toLowerCase() === "enter") {
              evt.preventDefault();
              props.onRegistration(values.username, values.password);
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
              props.onRegistration(values.username, values.password);
            }
          }}
        />
      </RegistrationForm>

      <FooterWrapper>
        <PlainTextButton text={"Already Registered ? Login! "} color="contrast"
                         onClick={postLoginView}/>
        <Button
          backColor={"info"}
          color={"primary"}
          onClick={() => props.onRegistration(values.username, values.password)}
          type="submit"
          fontSize={"1rem"}
          disabled={!values.username || !values.password}
        >
          Register Yourself!
        </Button>
      </FooterWrapper>
    </>
  )
};

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  errorMsg: PropTypes.string
};

export default RegistrationView;
