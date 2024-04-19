import styled from "styled-components";

export const ContainerMainHome = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`


export const ContentMain = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .2);

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`

export const ContainerSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  border-right: 1px solid var(--slate-500);

  .container-header-side {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 60px;
    color: var(--white);
    border-bottom: 1px solid var(--slate-500);
    padding: 0px .4rem;

    .content-actions-header-side {
      display: flex;
      gap: 1rem;

      .icon-header-side-action {
        cursor: pointer;
      }

      .content-action-notifications {
        position: relative;
        display: flex;

        .content-amount-invites {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: -6px;
          right: -5px;
          height: 20px;
          width: 20px;
          font-size: .9rem;
          color: var(--white);
          background: var(--slate-500);
          padding: .7rem;
          border-radius: 50%;
        }
      }
    }

  }

  .content-side-list-user {
    position: relative;
    color: white;
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);
    transition: .23s;

    .container-notifications {
      overflow: auto;
      position: absolute;
      background-color: var(--slate-800);
      transition: .23s;
      height: 200px;
      width: 100%;
      padding: .2rem .5rem .5rem .5rem;
      transform: translateY(-200px);
      z-index: 10;

      &.active-content-notifications {
        transform: translateY(0);
      }

      .content-notifications {
        display: flex;
        flex-direction: column;

        .content-notification {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .5rem 0;

          &:not(:last-child) {
            border-bottom: 1px solid var(--slate-500);
          }

          .content-actions {
            display: flex;
            align-items: center;
            gap: 1rem;

            .icon-action-notification {
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 35px;
              width: 37px;
              border-radius: 8px;
              background-color: var(--slate-900);

              .icon-notification {
                height: 24px;
                width: 24px;
              }
            }
          }
        }
      }

      &::-webkit-scrollbar {
          display: none;
        }
    }

    .container-add-user {
      position: absolute;
      background-color: var(--slate-800);
      transition: .23s;
      height: 100px;
      width: 100%;
      padding: 1rem;
      transform: translateY(-100px);
      z-index: 5;

      &.active-content-add-user {
        transform: translateY(0);
      }

      .content-input {
        display: flex;
        flex-direction: column;

        label {
          color: var(--slate-300);
          margin-bottom: .3rem;
        }

        .content-send {
          display: flex;
          align-items: center;
          height: 40px;
          width: 100%;

          input {
            outline: none;
            background-color: transparent;
            border: 1px solid var(--slate-300);
            border-right: none !important;
            border-bottom-left-radius: 7px;
            border-top-left-radius: 7px;
            color: var(--white);
            font-size: 1rem;
            padding-left: .5rem;
            padding-right: .2rem;
            height: 100%;
            flex: 1;
          }

          button {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--slate-300);
            border-left: none !important;
            border-bottom-right-radius: 7px;
            border-top-right-radius: 7px;
            font-size: 1rem;
            width: 15%;
            height: 100%;
            color: var(--slate-800);
            background-color: var(--slate-300);
          }
        }

      }
    }

    .container-item-friend {
      cursor: pointer;
      display: flex;
      padding: .4rem .3rem;
      gap: .4rem;
      transition: .20s;

      &:hover {
        background-color: var(--slate-800);
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--slate-600);
      }

      .info-friend {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;

        .message {
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
`
