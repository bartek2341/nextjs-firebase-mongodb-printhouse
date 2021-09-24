import styled from "styled-components";

const LoadingIndicator = ({ center }) => {
  return (
    <Wrapper center={center}>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </Wrapper>
  );
};

export default LoadingIndicator;

export const Wrapper = styled.div`
  ${({ center }) =>
    !center
      ? `
  display: flex;
  justify-content: center;
  align-items: center;
  `
      : `.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }
  `};

  .spinner {
    width: 80px;
  }

  .spinner > div {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-color: ${({ theme }) => theme.colors.blue.normal};
    border-radius: 100%;
    animation: bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    animation-delay: -0.16s;
  }

  @keyframes bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;
