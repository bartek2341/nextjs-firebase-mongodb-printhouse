import styled from "styled-components";
import { respondTo } from "lib/index";

const NavItem = styled.li`
  margin: 0 ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  ${respondTo.sm`
   margin: 0 ${({ theme }) => theme.spacing.xs};
   border-bottom: none;
  `}
  }
`;

export default NavItem;
