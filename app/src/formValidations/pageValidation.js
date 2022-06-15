import * as Yup from 'yup';

export const validatePageTitle = Yup.string().max(150, 'Must be 150 characters or less').required('Page title is required');
export const validatePageParent = Yup.object({
    _id: Yup.string()
});
