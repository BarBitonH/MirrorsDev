import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@material-ui/core';
import { StyledContainer, Form, Button, Title, InputGroup, ErrorText } from './ProfileUpdateStyles';

const ProfileUpdate = () => {
    const [experiences, setExperiences] = useState([{}]);
    const [skills, setSkills] = useState(['']);
    const [educations, setEducations] = useState([{}]);

    const formik = useFormik({
        initialValues: {
            profileImage: '',
            companyName: '',
            roleTitle: '',
            fromDate: '',
            toDate: '',
            responsibilities: '',
            skill: '',
            educationType: '',
            gallery: [],
            bookOrPodcast: '',
            bookOrPodcastName: '',
            bookOrPodcastLink: '',
            recommendation: ''
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required('Required'),
            roleTitle: Yup.string().required('Required'),
            fromDate: Yup.date().required('Required'),
            toDate: Yup.date().required('Required'),
            responsibilities: Yup.string().required('Required'),
            skill: Yup.string().required('Required'),
            educationType: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <StyledContainer>
            <Title>Update Profile</Title>
            <Form onSubmit={formik.handleSubmit}>
                <InputGroup>
                    <TextField
                        fullWidth
                        label="Company Name"
                        {...formik.getFieldProps('companyName')}
                    />
                </InputGroup>
                {/* ... add other fields similarly */}
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </Form>
        </StyledContainer>
    );
}

export default ProfileUpdate;
