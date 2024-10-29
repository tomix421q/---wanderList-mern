import { validationResult, body, param } from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js'
import { INPERIOD, PLACE_STATUS } from '../utils/constants.js'
import PlaceModel from '../models/PlaceModel.js'
import UserModel from '../models/UserModel.js'
import mongoose from 'mongoose'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no place')) {
          throw new NotFoundError(errorMessages)
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route')
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validatePlaceInput = withValidationErrors([
  body('location')
    .notEmpty()
    .withMessage('location is required')
    .isLength({ min: 4 })
    .withMessage('Location must be at least 20 characters long'),
  body('description')
    .notEmpty()
    .withMessage('description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 20 characters long'),
  body('placeStatus').isIn(Object.values(PLACE_STATUS)),
  body('inPeriod').isIn(Object.values(INPERIOD)),
  body('startVisitDate').optional().isISO8601().withMessage('Invalid start date format').toDate(),
  body('endVisitDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format')
    .toDate()
    .custom((value, { req }) => {
      if (value && req.body.startVisitDate && new Date(value) < new Date(req.body.startVisitDate)) {
        throw new Error('End date must be after start date')
      }
      return true
    }),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('tags').notEmpty().withMessage('tags are required'),
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id')
    const place = await PlaceModel.findById(value)
    if (!place) throw new NotFoundError(`no place with id ${value}`)
    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.userId === JsonWebTokenError.createdBy.toString()
    if (!isAdmin && !isOwner) throw UnauthorizedError('not authorized to access this route')
  }),
])

export const validateRegisterInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('name must be betwen 3-20 characters'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await UserModel.findOne({ email })
      if (user) {
        throw new BadRequestError('email already exists')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
])

export const validateLoginInput = withValidationErrors([
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password required'),
])

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({ email })
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists')
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
])
