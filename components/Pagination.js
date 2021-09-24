import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";

const Pagination = ({ prev, next, currentPage, maxPage, jump }) => {
  let { t } = useTranslation();
  const numbers = [];
  for (let i = 1; i <= maxPage; i++) {
    numbers.push(i);
  }
  let slicedArr = numbers.slice(currentPage - 1, currentPage);

  return (
    <List>
      <Arrow active={1 !== currentPage} onClick={() => prev()}>
        <button>
          <FontAwesomeIcon
            icon={faAngleLeft}
            alt={t("common:back")}
            title={t("common:back")}
          />
        </button>
      </Arrow>
      {currentPage >= 2 && (
        <>
          <Item onClick={() => jump(1)} number={1} />
          {currentPage > 2 && <Break>...</Break>}
        </>
      )}
      {slicedArr.map((number) => (
        <Item
          key={number}
          number={number}
          current={currentPage === number}
          onClick={() => jump(number)}
        />
      ))}
      {currentPage <= maxPage - 1 && (
        <>
          {currentPage < maxPage - 1 && <Break>...</Break>}
          <Item onClick={() => jump(maxPage)} number={maxPage} />
        </>
      )}
      <Arrow active={maxPage !== currentPage} onClick={() => next()}>
        <button>
          <FontAwesomeIcon
            icon={faAngleRight}
            alt={t("common:next")}
            title={t("common:next")}
          />
        </button>
      </Arrow>
    </List>
  );
};

export default Pagination;

const Item = ({ onClick, number, current }) => {
  return (
    <Li current={current}>
      <button onClick={onClick}>{number}</button>
    </Li>
  );
};

const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Break = styled.li`
  align-self: flex-end;
`;

const Li = styled.li`
  margin: 0 ${({ theme }) => theme.spacing.xs};
  button {
    border: none;
    border-radius: ${({ theme }) => theme.spacing.xs};
    background-color: ${({ theme }) => theme.colors.gray.xlight};
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    cursor: pointer;
    ${({ current, theme }) =>
      current &&
      `color: ${theme.colors.blue.normal};
      font-weight: bold;
  `};
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray.light};
    }
  }
`;

const Arrow = styled.li`
  margin: 0 ${({ theme }) => theme.spacing.xs};
  button {
    border: none;
    padding: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    opacity: ${({ active }) => (active ? "1" : "0.2")};
    ${({ active }) => active && "cursor: pointer"};
    border-radius: ${({ theme }) => theme.spacing.xs};
    background-color: transparent;
  }
`;
