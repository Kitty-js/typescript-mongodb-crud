import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true},
    image: String,
    createdAt: { type: Date, default: Date.now },
    updateAdt: Date
});

export default model("Post", PostSchema);
