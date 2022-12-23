import { RsAlert, TAlert } from "../Components/RsAlert";
import { borderRadiusCss, spacingCss } from "../Components/globalCss";

import { Column } from "../Components/StyledComponents";
import RsLargeInput from "../Components/RsInput/RsLargeInput";
import { ThePrimaryButton } from "../Components/TheButton";
import { Typography } from "@mui/material";
import { UserApi } from "../API/UserApi";
import styled from "styled-components";
import { useState } from "react";

type Props = {
    onLogin: () => void;
    msg?: string;
};

const Login = ({ onLogin, msg }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<TAlert>(msg ? { msg } : null);
    const [api] = useState(new UserApi());

    const onLoginHandler = async () => {
        if (email === "") {
            return setAlert({
                msg: _("Please fill up your email."),
                severity: "warning",
            });
        }

        if (password === "") {
            return setAlert({
                msg: _("Please fill up your password."),
                severity: "warning",
            });
        }

        try {
            await api.loginUser(email, password);
        } catch (e) {
            console.log(e);
            return setAlert({ msg: _("Your email or password is wrong") });
        }

        onLogin();
    };

    return (
        <StyledCont>
            <StyledColumn>
                <Typography variant="h3">{_("Login")}</Typography>
                <RsAlert alert={alert} onClose={() => setAlert(null)} />
                <RsLargeInput title={_("Email")} value={email} setValue={setEmail} />
                <RsLargeInput
                    title={_("Password")}
                    value={password}
                    setValue={setPassword}
                    type="password"
                />
                <ThePrimaryButton onClick={onLoginHandler}>{_("Login")}</ThePrimaryButton>
            </StyledColumn>
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;

    background: linear-gradient(
        193deg,
        rgba(68, 87, 255, 0.3) 1%,
        rgba(229, 229, 229, 1) 50%,
        rgba(204, 68, 255, 0.2) 94%
    );
`;

const StyledColumn = styled(Column)`
    height: 100%;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    background-color: white;
    border-radius: ${borderRadiusCss(6)};
    align-items: center;
    justify-content: center;
    row-gap: ${spacingCss(4)};
    padding: ${spacingCss(6)};
`;

export default Login;
