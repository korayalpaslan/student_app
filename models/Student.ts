const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please add a name & surname"],
  },
  class: {
    type: String,
    required: [true, "Please add a class"],
  },
  level: {
    type: String,
    required: [true, "Please add a level"],
  },
  birth_date: {
    type: Date,
    required: true,
  },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;
