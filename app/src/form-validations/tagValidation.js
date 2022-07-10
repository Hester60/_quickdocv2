import * as Yup from 'yup';
import {TAGS_COLORS} from "../constants/TagsColors";

export const validateTagName = Yup.string().max(20, "Tag name name cannot exceed 20 characters").required('Tag name is required');
export const validateTagColor = Yup.string().oneOf(TAGS_COLORS).required('Tag color is required');
