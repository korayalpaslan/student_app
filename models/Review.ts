const mongoose = require("mongoose");
import User from "@/models/User";
import Student from "@/models/Student";

const ReviewSchema: any = new mongoose.Schema({
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: Student }],
  criterias: {
    type: Array,
    required: [true, "Please rate the criteria"],
  },
  level: {
    type: String,
    required: true,
  },
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  lesson_date: {
    type: Date,
    required: true,
  },
  isAttended: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
  },
});

ReviewSchema.pre(/^find/, function (this: any, next: any) {
  this.populate({
    path: "student",
    select: "-__v",
  });
  next();
});
ReviewSchema.pre(/^find/, function (this: any, next: any) {
  this.populate({
    path: "teacher",
    select: "-__v",
  });
  next();
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
