import * as mongoose from "mongoose";

export const ImgSchema = new mongoose.Schema({
    userUpload: { type: String, requiered: true },
    url: { type: String, requiered: true },
    date: { type: String, requiered: true }
}

)

