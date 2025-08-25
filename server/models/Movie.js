import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        _id: {type: String, required: true},
        title: {type: String, required: true},
        genre: {type: String, required: true},
        original_language: {type: String},
        tagline: {type: String},
        genre: {type: Array, required: true},
        casts: {type: Array, require: true},
        vote_average: {type: Number, required: true},
        runtime: {type: Number, required: true}
    }, {timestamps: true}
)
const Movie = mongoose.model("Movie", movieSchema)
export default Movie;