import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lessons: [{
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    }],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
export const Lesson = mongoose.model("Lesson", lessonSchema);
