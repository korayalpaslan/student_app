"use client";
import { useState, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const steps = [
  { id: "Step 1", name: "Select Student & Month" },
  { id: "Step 2", name: "Add Your Comment" },
  { id: "Step 3", name: "Save & Download" },
];

const MultiStepForm = ({ students, reviews, teacher }: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState();
  const [filteredReviews, setFilteredReviews] = useState([]);
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
    const selectedMonthArray = reviews.data.filter((item: any) => {
      return new Date(item.lesson_date).getMonth() === selectedMonth;
    });

    setNotAttendedLesson(
      selectedMonthArray
        .filter((item: any) => item.student[0]._id === selectedStudentId)
        .filter((item: any) => item.isAttended === false).length
    );

    setFilteredReviews(
      selectedMonthArray
        .filter((item: any) => item.student[0]._id === selectedStudentId)
        .filter((item: any) => item.isAttended === true)
    );
    setSelectedStudent(
      students.data.filter((item: any) => item._id === selectedStudentId)
    );
  }, [selectedStudentId, selectedMonth]);

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
            setSelectedMonth={setSelectedMonth}
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
            comment={comment}
            student={selectedStudent}
            notAttendedLesson={notAttendedLesson}
            teacher={teacher}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
