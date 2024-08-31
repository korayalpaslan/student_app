const mongoose = require("mongoose");
import User from "@/models/User";
import Student from "@/models/Student";

const ReportSchema = new mongoose.Schema({
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: Student }],
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  level: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  performance: {
    type: Array,
    required: [true, "Please add student performance"],
  },
  report_date: {
    type: Date,
    default: Date.now,
  },
  report_period: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  numberOfLessons: {
    type: Number,
    required: true,
  },
  numberOfLessonAbsense: {
    type: Number,
    required: true,
  },
});

ReportSchema.pre(/^find/, function (this: any, next: any) {
  this.populate({
    path: "student",
    select: "-__v",
  });
  next();
});
ReportSchema.pre(/^find/, function (this: any, next: any) {
  this.populate({
    path: "teacher",
    select: "-__v",
  });
  next();
});

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export default Report;
