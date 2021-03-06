import React, {useState} from "react";
import {PageArea, Password, User} from "./styles";
import {PageContainer, PageTitle, ErrorMessage} from "../../Styles";
import useApi from "../../helpers/MarketplaceAPI";
import {doLogin} from "../../helpers/AuthHandler";

const SignIn = () => {
    const api = useApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = '/';
        }

        setDisabled(false);
    };

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>

                {error &&
                <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title"><User/> E-mail</div>
                        <div className="area-input">
                            <input type="email"
                                   disabled={disabled}
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"><Password/> Senha</div>
                        <div className="area-input">
                            <input type="password"
                                   disabled={disabled}
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   required
                            />
                        </div>
                    </label>
                    <div className="area">
                        <label className="area-input remember">
                            <input type="checkbox"
                                   disabled={disabled}
                                   checked={rememberPassword}
                                   onChange={() => setRememberPassword(!rememberPassword)}
                            />
                            Lembrar Senha
                        </label>
                    </div>
                    <div className="area">
                        <div className="area-input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </div>
                </form>
            </PageArea>
        </PageContainer>
    );
};

export default SignIn;
