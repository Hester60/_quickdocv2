import * as Yup from 'yup';

export const validateProjectName = Yup.string().max(30, 'Must be 30 characters or less').required('Project title is required');