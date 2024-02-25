import styled from "styled-components";

export const ContainerConversationMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const HeaderConversation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0px .5rem;
  gap: .5rem;
  border-bottom: 1px solid var(--slate-600);

  .info-friend {
    display: flex;
    flex-direction: column;
    color: var(--white);

    .message {
      font-size: .8rem;
    }
  }
`

export const ContainerMessageAndSendMessage = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);

  .container-send-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 70px;
    width: 100%;
    padding: 0px .5rem;

    input {
      flex: 1;
      padding: .7rem .5rem;
      border: none;
      border-radius: 8px;
      background-color: var(--slate-800);
      font-size: 1.1rem;
      color: var(--white);
      outline: none;
    }

    .send-message {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: var(--slate-800);
      color: var(--white);
      transition: all .23s;

      &:hover {
        background-color: var(--slate-600);
      }
    }

    .disabled-enter {
      pointer-events: none;
      opacity: .3;
    }
  }
`

export const ContainerMessage = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  height: calc(100% - 70px);
  padding: .8rem 1rem;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--slate-500);
  }

  &::-webkit-scrollbar-track {
    background: var(--slate-800);
  }


  .content-message {
    display: flex;
    position: relative;
    background-color: var(--slate-800);
    color: var(--white);
    padding: .7rem;
    border-radius: 7px;
    width: 90%;

    &.content-message-left {
      align-self: flex-start;
    }

    &.content-message-right {
      align-self: flex-end;
    }

    .message {
      width: 93%;
    }

    .time-sended-message {
      position: absolute;
      bottom: 3px;
      right: 10px;
    }
  }
`