import styled from '@emotion/styled';
import {Paper, Button as MuiButton, createTheme} from '@material-ui/core';
import ProfileUpdate from './ProfileUpdate';
import { ThemeProvider } from '@material-ui/core/styles';
const customTheme = createTheme({
    palette: {
        mode: 'dark', // Using dark mode
        primary: {
            main: '#FFC107', // Yellow
            dark: '#C79100', // Darker shade
        },
        background: {
            paper: '#424242', // Dark background color
            default: '#303030', // Slightly lighter background
        },
        text: {
            primary: '#FFFFFF', // White text
            secondary: '#B0B0B0', // Light gray text
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Default font
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.875rem',
        },
    },
    spacing: factor => `${0.25 * factor}rem`, // Custom spacing units
});
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
