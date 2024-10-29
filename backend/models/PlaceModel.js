import mongoose from 'mongoose'
import { INPERIOD, PLACE_STATUS } from '../utils/constants.js'

const PlaceSchema = new mongoose.Schema(
  {
    location: String,
    description: String,
    placeStatus: {
      type: String,
      enum: Object.values(PLACE_STATUS),
      default: PLACE_STATUS.SOON,
    },
    inPeriod: {
      type: String,
      enum: Object.values(INPERIOD),
      default: INPERIOD.SUMMER,
    },
    startVisitDate: {
      type: Date,
      required: false,
    },
    endVisitDate: {
      type: Date,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    tags: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'UserModel',
    },
  },

  { timestamps: true }
)

export default mongoose.model('PlaceModel', PlaceSchema)
