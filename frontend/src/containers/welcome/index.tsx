import { ContainerHome, ContentRight } from "./styles"
import { Link, Outlet, useMatch } from "react-router-dom"

export const Welcome = () => {

  const matchLogin = useMatch("/login")
  const matchRegister = useMatch("/register")

  return (
    <ContainerHome>
      <ContentRight>
        {!(Boolean(matchLogin) || Boolean(matchRegister)) && (
          <>
            <div className="content-btn-login">
              <label>já tem conta?</label>
              <Link to='/login'>Entrar</Link>
            </div>

            <div className="content-btn-register">
              <label>Ainda não tem conta?</label>
              <Link to='/register'>Cadastrar</Link>
            </div>
          </>
        )}

        <Outlet />
      </ContentRight>
    </ContainerHome>
  )
}