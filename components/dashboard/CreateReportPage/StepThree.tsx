"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { BookCheck, Ban, Percent } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
const moment = require("moment");
import { addDays } from "date-fns";
import participationComment from "@/lib/participationComment";
import fluencyComment from "@/lib/fluencyComment";
import pronunciationComment from "@/lib/pronunciationComment";
import vocabularyComment from "@/lib/vocabularyComment";
import listeningComment from "@/lib/listeningComment";
import BackButton from "@/components/BackButton";
import { toFixedIfNecessary } from "@/utils/decimalFix";
// import contributionComment from "@/lib/contributionComment";

const StepThree = ({
  prev,
  reviews,
  student,
  comment,
  notAttendedLesson,
  teacher,
  startDate,
  endDate,
  allReviews,
}: any) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h4 className="mb-8">No review found for the selected time period</h4>
        <BackButton link="/dashboard" text="Create Report" />
      </div>
    );
  } else {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const options2: any = {
      year: "numeric",
      month: "long",
    };
    // Checking Student current level reviews, ignore previous level reviews
    const filteredReviews = reviews.filter(
      (review: any) => review.level === student[0].level
    );

    const studentallRevies = allReviews.filter(
      (review: any) => review.level === student[0].level
    );

    let level;

    if (student[0].level.startsWith("A")) {
      level = "A";
    } else {
      level = "B";
    }

    const average = (array: any) =>
      array.reduce((a: any, b: any) => a + b) / array.length;

    const array1 = filteredReviews.map((item: any) => item.criterias[0]);
    const array2 = filteredReviews.map((item: any) => item.criterias[1]);
    const array3 = filteredReviews.map((item: any) => item.criterias[2]);
    const array4 = filteredReviews.map((item: any) => item.criterias[3]);
    const array5 = filteredReviews.map((item: any) => item.criterias[4]);
    // const array6 = filteredReviews.map((item: any) => item.criterias[5]);
    const participationAvg =
      array1.reduce((a: number, b: number) => a + b, 0) / array1.length;
    const fluencyAvg =
      array2.reduce((a: number, b: number) => a + b, 0) / array2.length;
    const pronAvg =
      array3.reduce((a: number, b: number) => a + b, 0) / array3.length;
    const vocabularyAvg =
      array4.reduce((a: number, b: number) => a + b, 0) / array4.length;
    const listeningAvg =
      array5.reduce((a: number, b: number) => a + b, 0) / array5.length;
    // const contributionAvg =
    //   array6.reduce((a: number, b: number) => a + b, 0) / array6.length;

    const participationAvgCommentText: any = participationComment(
      participationAvg,
      level
    );
    const fluencyCommentText: any = fluencyComment(fluencyAvg, level);
    const pronCommentText: any = pronunciationComment(pronAvg, level);
    const vocabularyCommentText: any = vocabularyComment(vocabularyAvg, level);
    const listeningCommentText: any = listeningComment(listeningAvg, level);
    // const contibutionCommentText: any = contributionComment(contributionAvg);

    const generalSuccessPerc =
      ([
        participationAvg,
        fluencyAvg,
        pronAvg,
        vocabularyAvg,
        listeningAvg,
        // contributionAvg,
      ].reduce((a: number, b: number) => a + b, 0) /
        5 /
        4) *
      100;

    const handleSaveAndDownload = async () => {
      const today = new Date();
      const date1 = moment(endDate).format("L");
      const date2 = moment(today).format("L");

      let until;

      if (date1 === date2) {
        until = moment().add(3, "hour");
      } else {
        const d = moment(endDate).add(3, "hour");
        until = addDays(new Date(d), 1);
      }

      const newReport = {
        student: student[0]._id,
        teacher,
        level: student[0].level,
        class: student[0].class,
        performance: [
          participationAvg,
          fluencyAvg,
          pronAvg,
          vocabularyAvg,
          listeningAvg,
          // contributionAvg,
        ],
        report_date: moment(today).add(3, "hour"),
        report_start_date: moment(startDate).add(3, "hour"),
        report_end_date: until,
        comment,
        numberOfLessons: filteredReviews.length,
        numberOfLessonAbsense: notAttendedLesson,
        lessonAverage: filteredReviews.map((item: any) => {
          const obj = {
            average: average(item.criterias),
            isAttended: item.isAttended,
            lesson_date: item.lesson_date,
          };
          return obj;
        }),
      };
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.API_URL}/api/reports`, {
          method: "POST",
          body: JSON.stringify(newReport),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          toast({
            variant: "success",
            title: "Congrats 🎉",
            description: "You have created a new report",
          });
          const html2pdf = await require("html2pdf.js");
          var element = document.getElementById("report");
          html2pdf(element, {
            margin: [20, 10, 0, 10],
            filename: "stapp_report",
            image: { type: "jpeg", quality: 1 },
            pagebreak: { mode: "avoid-all", before: "#page2el" },
            html2canvas: { scale: 2 },
          });
          setTimeout(() => {
            window.location.href = "/dashboard/create_report";
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="w-full" id="report">
        <div className="flex items-end justify-between scroll-m-20 text-sm text-muted-foreground tracking-tight border-b-3 pb-4 border-b-gray-400">
          <div className="text-4xl">
            <p className="mb-1">AYLIK ÖĞRENCİ </p>
            <p>RAPORU </p>
          </div>
          <Image src={logo} width={150} alt="TCI Logo" className="mr-4" />
        </div>
        <div className="flex justify-between mt-4 text-gray-700">
          <div className="w-3/5">
            <div className="font-semibold mb-2 ">
              Öğrenci Adı:{" "}
              <span className="font-medium ml-2">{student[0].fullname}</span>
            </div>
            <div className="font-semibold mb-2">
              Sınıfı:{" "}
              <span className="font-medium ml-2">{student[0].class}</span>
            </div>
            <div className="font-semibold mb-2">
              Düzeyi:{" "}
              <span className="font-medium ml-2">{student[0].level}</span>
            </div>
          </div>
          <div className="w-2/5">
            <div className="font-semibold mb-2">
              Rapor Başlangıç Tarihi:{" "}
              <span className="font-medium ml-2">
                {new Date(startDate).toLocaleDateString("tr-TR", options)}
              </span>
            </div>
            <div className="font-semibold mb-2">
              Rapor Bitiş Tarihi:{" "}
              <span className="font-medium ml-2">
                {new Date(endDate).toLocaleDateString("tr-TR", options)}
              </span>
            </div>
            <div className="font-semibold mb-2">
              Rapor Düzenleme Tarihi:{" "}
              <span className="font-medium ml-2">
                {" "}
                {new Date().toLocaleDateString("tr-TR", options)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-16 mt-8">
          <div className="flex flex-col items-center space-y-4 justify-center w-[250px] border border-gray-500/20 rounded-xl py-4">
            <h1 className="text-center font-semibold text-sm">
              Katıldığı Ders Sayısı
            </h1>
            <div className="flex items-center space-x-4">
              <BookCheck className="" size={24} />
              <p>{filteredReviews.length}</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 justify-center w-[250px] border border-gray-500/20 rounded-xl py-4">
            <h1 className="text-center font-semibold text-sm">
              Katılmadığı Ders Sayısı
            </h1>
            <div className="flex items-center space-x-4">
              <Ban className="" size={24} />
              <p>{notAttendedLesson}</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 justify-center w-[250px] border border-gray-500/20 rounded-xl py-4">
            <h1 className="text-center font-semibold text-sm">
              Başarı Yüzdesi
            </h1>
            <div className="flex items-center space-x-4">
              <Percent className="" size={24} />
              <p>{Math.floor(generalSuccessPerc)}</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Değerlendirme Kriteri</TableHead>
                <TableHead>Öğretmen Görüşü</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Katılım ve Derse İlgi{" "}
                </TableCell>
                <TableCell className="font-medium">
                  {participationAvgCommentText}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Akıcılık </TableCell>
                <TableCell className="font-medium">
                  {fluencyCommentText}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Telaffuz ve Anlaşılırlık
                </TableCell>
                <TableCell className="font-medium">{pronCommentText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kelime Kullanımı </TableCell>
                <TableCell className="font-medium">
                  {vocabularyCommentText}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Dinleme ve Anlama{" "}
                </TableCell>
                <TableCell className="font-medium">
                  {listeningCommentText}
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell className="font-medium">Derse Katılım </TableCell>
                <TableCell className="font-medium">
                  {contibutionCommentText}
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8" id="#page2el">
          <div className="text-2xl text-muted-foreground">
            <p className="mb-1">DERS DURUM TABLOSU </p>
          </div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Ders Tarihi</TableHead>
                <TableHead className="text-center">
                  Ortalama Ders Puanı
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentallRevies.map((review: any) => {
                const date = new Date(review.lesson_date).toLocaleDateString(
                  "tr-TR",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );

                return (
                  <TableRow key={review._id}>
                    <TableCell className="font-medium">{date}</TableCell>
                    <TableCell className="font-medium text-center">
                      {review.isAttended
                        ? toFixedIfNecessary(average(review.criterias), 2)
                        : "Katılmadı"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8 px-4">
          <h4 className="scroll-m-20 text-sm text-muted-foreground tracking-tight  border-b pb-4  border-b-gray-200">
            Öğretmen Değerlendirmesi
          </h4>
          <p className="text-sm mt-4">{comment}</p>
        </div>
        <div
          data-html2canvas-ignore={true}
          className="flex space-x-4 items-center justify-center"
        >
          <Button type="button" className="w-1/5 mt-10" onClick={() => prev()}>
            Prev
          </Button>
          <Button
            type="button"
            className="w-1/5 mt-10"
            onClick={handleSaveAndDownload}
          >
            {isLoading ? <p>Please Wait</p> : <p>Save & Download</p>}
          </Button>
        </div>
      </div>
    );
  }
};

export default StepThree;
