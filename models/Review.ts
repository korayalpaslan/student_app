const mongoose = require("mongoose");
import Teacher from "@/models/Teacher";
import Student from "@/models/Student";

const ReviewSchema: any = new mongoose.Schema({
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: Student }],
  criteria_one: {
    type: Number,
    required: [true, "Please rate the criteria"],
  },
  criteria_two: {
    type: Number,
    required: [true, "Please rate the criteria"],
  },
  criteria_three: {
    type: Number,
    required: [true, "Please rate the criteria"],
  },
  criteria_four: {
    type: Number,
    required: [true, "Please rate the criteria"],
  },
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: Teacher }],
  lesson_date: {
    type: Date,
    required: true,
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
