import React from 'react';
import styled from 'styled-components';

import { Link } from '../../sub-components/Text';

import useBookingLink from '../../hooks/use-booking-link';
import { fontBodyMedium, fontBodySemiBold } from '../../styles/fonts';

const MenuLink = styled(Link)`
  ${fontBodySemiBold}

  font-size: 30px;
  color: ${(props) => props.theme.colorMenuLinksLight};
  opacity: 60%;
  margin: 0;
  width: fit-content;

  @media screen and (min-width: ${'340'}px) {
    font-size: 49px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    ${fontBodyMedium}

    font-size: 0.875rem;
    line-height: 14px;
    border: 1px solid;
    border-color: ${(props) => props.theme.colorButtonBorderMenu};
    opacity: 100%;
    background-color: ${(props) => props.theme.colorButtonBackgroundMenu};
    color: ${(props) => props.theme.colorButtonTextMenu};
    padding: 6px 16px;
    border-radius: 30px;

    :hover {
      background-color: ${(props) => props.theme.colorButtonBackgroundMenuHover};
      color: ${(props) => props.theme.colorButtonTextMenuHover};
      border-color: ${(props) => props.theme.colorButtonBorderMenuHover};
    }
  }
`;

interface BookButtonProps {
  children?: React.ReactNode;
  link?: string;
  onClick?: () => void;
}

function BookButton(props: BookButtonProps) {
  const bookingLink = useBookingLink();

  return (
    <MenuLink href={props.link ?? bookingLink} onClick={props.onClick}>
      {props.children}
    </MenuLink>
  );
}

export default BookButton;
