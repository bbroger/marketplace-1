import React from "react";
import Logo from "../../../assets/logo.svg";
import {HeaderArea, Toggle} from "./styles";
import {Link} from "react-router-dom";
import {isLogged, doLogout} from "../../../helpers/AuthHandler";

const Header = () => {
    const logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    };

    const showMenu = () => {
        document.querySelector('nav ul').classList.toggle('show');
        document.querySelector('.container').classList.toggle('column');
    };

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Marktplace"/>
                    </Link>
                </div>

                <nav>
                    <button onClick={showMenu}><Toggle/></button>
                    <ul>
                        {logged &&
                        <>
                            <li>
                                <Link to="/my-acount">Minha Conta</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Sair</button>
                            </li>
                            <li>
                                <Link to="/post-an-ad" className="button">
                                    Publique um Anúncio
                                </Link>
                            </li>
                        </>
                        }
                        {!logged &&
                        <>
                            <li>
                                <Link to="/signin">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Cadastrar</Link>
                            </li>
                            <li>
                                <Link to="/signin" className="button">
                                    Publique um Anúncio
                                </Link>
                            </li>
                        </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
};

export default Header;
