"use client";
import { useState, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { addDays } from "date-fns";

const steps = [
  { id: "Step 1", name: "Select Student & Month" },
  { id: "Step 2", name: "Add Your Comment" },
  { id: "Step 3", name: "Save & Download" },
];

const MultiStepForm = ({ students, reviews, teacher }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [notAttendedLesson, setNotAttendedLesson] = useState();
  const [comment, setComment] = useState("");

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  useEffect(() => {
    const tomorrow = addDays(new Date(endDate), 1);

    const selectedReportArray = reviews.data.filter((item: any) => {
      return (
        new Date(item.lesson_date) >= startDate &&
        new Date(item.lesson_date) < tomorrow
      );
    });
    setAllReviews(
      selectedReportArray.filter(
        (item: any) => item.student[0]._id === selectedStudentId
      )
    );
    setNotAttendedLesson(
      selectedReportArray
        .filter((item: any) => item.student[0]._id === selectedStudentId)
        .filter((item: any) => item.isAttended === false).length
    );
    setFilteredReviews(
      selectedReportArray
        .filter((item: any) => item.student[0]._id === selectedStudentId)
        .filter((item: any) => item.isAttended === true)
    );
    setSelectedStudent(
      students.data.filter((item: any) => item._id === selectedStudentId)
    );
  }, [selectedStudentId, endDate, startDate]);

  return (
    <div>
      <nav>
        <ul className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-primary transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-primary">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-20 flex justify-center">
        {currentStep === 0 && (
          <StepOne
            students={students}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setSelectedStudentId={setSelectedStudentId}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 1 && (
          <StepTwo
            setComment={setComment}
            commentData={comment}
            setCurrentStep={setCurrentStep}
            prev={prev}
          />
        )}
        {currentStep === 2 && (
          <StepThree
            prev={prev}
            reviews={filteredReviews}
            allReviews={allReviews}
            comment={comment}
            student={selectedStudent}
            notAttendedLesson={notAttendedLesson}
            teacher={teacher}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
