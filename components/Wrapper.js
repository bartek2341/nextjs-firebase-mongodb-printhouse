import styled from "styled-components";
import { respondTo } from "@/lib/index";

const Wrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.md};
  ${respondTo.sm`
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) =>
    theme.spacing.lg};
  `}
  ${respondTo.lg`
    padding: ${({ theme }) => theme.spacing.xl};
  `}
`;

export default Wrapper;
