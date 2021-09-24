import styled from "styled-components";
import { Wrapper } from "@/components/index";
import { respondTo } from "@/lib/index";

const HomeWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  ${respondTo.sm`
    flex-direction: row;
    align-items: flex-start;
  `}
`;

export default HomeWrapper;
