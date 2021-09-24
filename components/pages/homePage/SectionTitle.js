import styled from "styled-components";
import { respondTo } from "@/lib/index";

const SectionTitle = styled.h3`
  display: inline-block;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background-color: ${({ theme }) => theme.colors.gray.xlight};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-bottom-right-radius: ${({ theme }) => theme.spacing.md};
  border-top-right-radius: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  ${respondTo.sm`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) =>
    theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  `}
`;

export default SectionTitle;
