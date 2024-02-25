import styled from "styled-components";


export const ContainerAuth = styled.div`
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 100%;
  transition: .60s ease-in-out;

  a {
    margin-top: 2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    color: var(--slate-500);
  }
`

export const ContainerEnterInputs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  & > strong {
    color: var(--slate-400);
    align-self: flex-start;
    font-size: 1.1rem;
  }

  input {
    width: 100%;
    padding: 1rem .5rem;
    font-size: 1rem;
    border: none;
    color: var(--slate-300);
    background: var(--slate-800);
    outline: none;
    border-radius: 10px;

    ::placeholder {
      color: red;
    }
  }

  button {
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
    width: 100%;
    transition: .24s;

    &:hover {
      background: var(--slate-600)
    }
  }

`