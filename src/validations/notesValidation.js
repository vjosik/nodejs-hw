import { Joi, Segments } from 'celebrate';
import { tags } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...tags).optional(),
    search: Joi.string().allow("").optional(),
  })
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().trim(),
    content: Joi.string().trim().default('').optional(),
    tag: Joi.string()
      .valid(...tags)
      .default('Todo').optional(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().trim(),
    content: Joi.string().trim().default('').optional(),
    tag: Joi.string()
      .valid(...tags)
      .default('Todo').optional(),
  }).or('title', 'content', 'tag'),
};
