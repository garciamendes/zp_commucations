import styled, { css } from "styled-components";


const defaultStyle = css`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: .6rem;

  @media screen and (max-width: 430px) {
    width: 90%;
  }

  label {
    font-size: 1.2rem;
    color: var(--slate-500);
  }

  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 1rem 0px;
    color: var(--slate-300);
    border: none;
    background: var(--slate-800);
    font-size: 1.2rem;
    border-radius: 10px;
    transition: .24s;

    &:hover {
      background: var(--slate-600)
    }
  }
`

export const ContainerHome = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  /* @media screen and (max-width: 906px) {
    flex-direction: column;
  } */
`

// export const ContentLeft = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 60%;
//   height: 100%;

//   @media screen and (max-width: 1495px) {
//     width: 50%;
//   }

//   @media screen and (max-width: 906px) {
//     flex-direction: column;
//   }
// `

// export const Image = styled.img`
//   height: 100%;
// `

export const ContentRight = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  gap: 2rem;


  @media screen and (max-width: 1025px) {
    width: 60%;
  }

  @media screen and (max-width: 770px) {
    width: 65%;
  }

  @media screen and (max-width: 430px) {
    width: 90%;
  }

  .content-btn-login {
    ${defaultStyle}
  }

  .content-btn-register {
    ${defaultStyle}
  }
`