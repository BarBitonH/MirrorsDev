import styled from '@emotion/styled';
import { Paper, Button as MuiButton } from '@material-ui/core';

export const StyledContainer = styled(Paper)`
  padding: 20px;
  margin: 2% auto;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: rgba(211,211,211, 0.95);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled(MuiButton)`
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.primary} !important;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary} !important;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 15px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;
