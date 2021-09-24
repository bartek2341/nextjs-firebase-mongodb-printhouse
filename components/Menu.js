import styled from "styled-components";
import { respondTo } from "@/lib/index";

const Menu = styled.div`
  background-image: ${({ theme }) => theme.gradients.blue};
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.gray.light};
  ${respondTo.sm`
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) =>
    theme.spacing.xl};
  `}
  h4 {
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    ${respondTo.sm`
      margin-bottom: ${({ theme }) => theme.spacing.lg};
    `}
  }
  ul {
    margin-left: ${({ theme }) => theme.spacing.sm};
    ${respondTo.sm`
      margin-left: ${({ theme }) => theme.spacing.md};
    `}
    li:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      ${respondTo.sm`
        margin-bottom: ${({ theme }) => theme.spacing.md};
      `}
    }
    li {
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        white-space: nowrap;
        color: ${({ theme }) => theme.colors.lighten};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        &.active {
          color: ${({ theme }) => theme.colors.white};
        }
        svg {
          opacity: 0;
          transition: 0.3s;
        }
        &:hover:not(.active) {
          svg {
            opacity: 1;
            transform: translateX(${({ theme }) => theme.spacing.sm});
          }
        }
      }
    }
  }
`;

export default Menu;
