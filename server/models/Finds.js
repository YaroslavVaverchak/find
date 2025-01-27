import mongoose from 'mongoose'

const FindsSchema = new mongoose.Schema(
{
    username: { type: String },
    title: {type: String, required: true},
    text: {type: String, required: true},
    city: {type: String, required: true},
    contacts: {type: String, required: true},
    imgUrl: { type: String, default: '' },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},

},
{ timestamps: true},
)
export default mongoose.model('Finds', FindsSchema)
