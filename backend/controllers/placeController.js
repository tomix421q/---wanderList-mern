import { nanoid } from 'nanoid'
import PlaceModel from '../models/PlaceModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/customErrors.js'
import day from 'dayjs'
import mongoose from 'mongoose'

// GET ALL MY PLACES
export const getAllPlaces = async (req, res) => {
  const { search, inPeriod, placeStatus, sort } = req.query

  // search
  const queryObject = {
    createdBy: req.user.userId,
  }
  if (search) {
    queryObject.$or = [{ location: { $regex: search, $options: 'i' } }, { tags: { $regex: search, $options: 'i' } }]
  }
  if (inPeriod && inPeriod !== 'all') {
    queryObject.inPeriod = inPeriod
  }
  if (placeStatus && placeStatus !== 'all') {
    queryObject.placeStatus = placeStatus
  }
  // sort
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'inPeriod',
    'z-a': '-inPeriod',
  }
  const sortKey = sortOptions[sort] || sortOptions.newest

  // pagination setup
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const places = await PlaceModel.find(queryObject).sort(sortKey).skip(skip).limit(limit)

  const totalPlaces = await PlaceModel.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalPlaces / limit)

  res.status(StatusCodes.OK).json({ totalPlaces, numOfPages, currentPage: page, places })
}

// CREATE PLACE
export const createPlace = async (req, res) => {
  req.body.createdBy = req.user.userId
  const place = await PlaceModel.create(req.body)
  res.status(StatusCodes.CREATED).json({ place })
}

// GET SINGLE PLACE
export const getPlace = async (req, res) => {
  const { id } = req.params
  const place = await PlaceModel.findById(id)
  if (!place) {
    throw new NotFoundError('no place with that id')
  }
  res.status(StatusCodes.OK).json({ place })
}

// EDIT PLACE
export const updatePlace = async (req, res) => {
  const { id } = req.params
  const updatedPlace = await PlaceModel.findByIdAndUpdate(id, req.body, { new: true })

  if (!updatedPlace) {
    throw new NotFoundError('no place with that id')
  }
  res.status(StatusCodes.OK).json({ place: updatedPlace })
}

// DELETE JOB
export const deletePlace = async (req, res) => {
  const { id } = req.params
  const removedPlace = await PlaceModel.findByIdAndDelete(id)
  if (!removedPlace) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `no place with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ msg: `id ${id} was removed` })
}

// SHOW STATS
export const showStats = async (req, res) => {
  let stats = await PlaceModel.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.userId) } },
    { $group: { _id: '$inPeriod', count: { $sum: 1 } } },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    summer: stats.summer || 0,
    spring: stats.spring || 0,
    autumn: stats.autumn || 0,
    winter: stats.winter || 0,
  }

  let monthlyApplications = await PlaceModel.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY')
      return { date, count }
    })
    .reverse()

  console.log(monthlyApplications)
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
