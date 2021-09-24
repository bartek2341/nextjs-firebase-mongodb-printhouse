import styled from "styled-components";
import { respondTo } from "@/lib/index";

const FormWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.titleXl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: center;
    ${respondTo.sm`
      margin-bottom: ${({ theme }) => theme.spacing.lg};
      font-size: ${({ theme }) => theme.fontSizes.headerXs};
  `}
  }
  form {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    & > div {
      display: flex;
      flex-direction: column;
      margin-bottom: ${({ theme }) => theme.spacing.md};
      span {
        color: ${({ theme }) => theme.colors.red};
      }
      label {
        margin-bottom: ${({ theme }) => theme.spacing.xs};
        & > a {
          float: right;
        }
      }
    }
    button {
      width: 100%;
    }
  }
`;

export default FormWrapper;
