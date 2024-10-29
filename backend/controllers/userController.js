import { StatusCodes } from 'http-status-codes'
import UserModel from '../models/UserModel.js'
import PlaceModel from '../models/PlaceModel.js'
import { UnauthorizedError } from '../errors/customErrors.js'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'

export const getCurrentUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}
export const getApplicationStats = async (req, res) => {
  const users = await UserModel.countDocuments()
  const places = await PlaceModel.countDocuments()
  res.status(StatusCodes.OK).json({ users, places })
}
export const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  delete newUser.password

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path)
    await fs.unlink(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }

  const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, newUser)
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }
  res.status(StatusCodes.OK).json({ msg: 'update user' })
}

//
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next()
  }
}
