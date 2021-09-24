import styled from "styled-components";

const PageTitle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
`;

export default PageTitle;
