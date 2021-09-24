import { useMemo, memo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { respondTo } from "@/lib/index";

export const Button = ({ variant, children, onClick, ...props }) => {
  const { href } = props;

  const Component = useMemo(() => {
    switch (variant) {
      case "link":
        return (
          <Link href={href} passHref>
            <LinkButton {...props} onClick={onClick}>
              {children}
            </LinkButton>
          </Link>
        );
      case "secondary":
        return (
          <SecondaryButton {...props} onClick={onClick}>
            {children}
          </SecondaryButton>
        );
      case "secondaryLink":
        return (
          <Link href={href} passHref>
            <SecondaryLink {...props} onClick={onClick}>
              {children}
            </SecondaryLink>
          </Link>
        );
      case "tertiary":
        return (
          <TertiaryButton {...props} onClick={onClick}>
            {children}
          </TertiaryButton>
        );
      case "delete":
        return (
          <DeleteButton {...props} onClick={onClick}>
            {children}
          </DeleteButton>
        );
      default:
        return (
          <RootButton {...props} onClick={onClick}>
            {children}
          </RootButton>
        );
    }
  }, [variant, children, props, onClick, href]);
  return Component;
};

export default memo(Button);

const RootButton = styled.button`
  display: inline-block;
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: ${({ theme: { colors }, green, red }) => {
    if (green) return colors.green;
    else if (red) return colors.red;
    else return colors.blue.normal;
  }};
  border-radius: 3px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ sm }) => (sm ? "4px 5px" : "6px")};
  ${({ responsive }) =>
    responsive &&
    respondTo.sm`
  padding: 4px 5px;
  `}
  transition: box-shadow 0.15s, background-color 0.15s;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray.normal};
  }
  &:hover:not([disabled]) {
    box-shadow: ${({ theme }) => theme.shadows.light};
  }
`;

const LinkButton = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: ${({ theme: { colors }, green, red }) => {
    if (green) return colors.green;
    else if (red) return colors.red;
    else return colors.blue.normal;
  }};
  text-align: center;
  text-decoration: none;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ sm }) => (sm ? "4px 5px" : "6px")};
  ${({ responsive }) =>
    responsive &&
    respondTo.sm`
  padding: 4px 5px;
  `}
  transition: box-shadow 0.15s;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.light};
  }
`;

const SecondaryButton = styled.button`
  display: inline-block;
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme: { colors }, green, red }) => {
    if (green) return colors.green;
    else if (red) return colors.red;
    else return colors.blue.normal;
  }};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.8;
  }
`;

const SecondaryLink = styled.a`
  color: ${({ theme: { colors }, green, red, gray }) => {
    if (green) return colors.green;
    else if (red) return colors.red;
    else if (gray) return colors.black;
    else return colors.blue.normal;
  }};
  text-decoration: none;
  transition: opacity 0.15s;
  &:hover {
    opacity: 0.8;
  }
`;

const TertiaryButton = styled.button`
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing.xs};
  padding: ${({ sm }) => (sm ? "4px 5px" : "6px")};
  ${({ responsive }) =>
    responsive &&
    respondTo.sm`
  padding: 4px 5px;
  `}
  border: 1px solid ${({ theme }) => theme.colors.gray.light};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.light};
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border-radius: ${({ theme }) => theme.spacing.xs};
  border: none;
  cursor: pointer;
  padding: 0;
  svg {
    font-size: ${({ theme }) => theme.fontSizes.titleMd};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  button,
  a {
    margin-top: ${({ theme }) => theme.spacing.xs};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  ${({ right }) =>
    right &&
    respondTo.sm`
     button,
      a {
        margin-right: 0;
        margin-left: ${({ theme }) => theme.spacing.xs};
      }
     justify-content: flex-end;
    `};
`;
