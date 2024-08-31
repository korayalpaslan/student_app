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
import grammarComment from "@/lib/grammarComment";
import vocabularyComment from "@/lib/vocabularyComment";
import commComment from "@/lib/communicationComment";
import pronunciationComment from "@/lib/pronunciationComment";
import fluencyComment from "@/lib/fluencyComment";

const StepThree = ({
  prev,
  reviews,
  student,
  comment,
  notAttendedLesson,
  teacher,
}: any) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div>Talep etmiş olduğunuz aya ait bir değerlendirme bulunmamaktadır</div>
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

    let level;

    if (student[0].level.startsWith("A")) {
      level = "A";
    } else {
      level = "B";
    }

    // const reportTerm = new Date(reviews[0].lesson_date).getMonth();

    const array1 = filteredReviews.map((item: any) => item.criterias[0]);
    const array2 = filteredReviews.map((item: any) => item.criterias[1]);
    const array3 = filteredReviews.map((item: any) => item.criterias[2]);
    const array4 = filteredReviews.map((item: any) => item.criterias[3]);
    const array5 = filteredReviews.map((item: any) => item.criterias[4]);
    const grammarAvg =
      array1.reduce((a: number, b: number) => a + b, 0) / array1.length;
    const vocabularyAvg =
      array2.reduce((a: number, b: number) => a + b, 0) / array2.length;
    const commAvg =
      array3.reduce((a: number, b: number) => a + b, 0) / array3.length;
    const pronunciationAvg =
      array4.reduce((a: number, b: number) => a + b, 0) / array4.length;
    const fluencyAvg =
      array5.reduce((a: number, b: number) => a + b, 0) / array5.length;

    const grammarCommentText: any = grammarComment(grammarAvg, level);
    const vocabularyCommentText: any = vocabularyComment(vocabularyAvg, level);
    const commCommentText: any = commComment(commAvg, level);
    const pronunciationCommentText: any = pronunciationComment(
      pronunciationAvg,
      level
    );
    const fluencyCommentText: any = fluencyComment(fluencyAvg, level);

    const generalSuccessPerc =
      ([
        grammarAvg,
        vocabularyAvg,
        commAvg,
        pronunciationAvg,
        fluencyAvg,
      ].reduce((a: number, b: number) => a + b, 0) /
        5 /
        4) *
      100;

    const handleSaveAndDownload = async () => {
      const newReport = {
        student: student[0]._id,
        teacher,
        level: student[0].level,
        class: student[0].class,
        performance: [
          grammarAvg,
          vocabularyAvg,
          commAvg,
          pronunciationAvg,
          fluencyAvg,
        ],
        report_date: new Date(),
        report_period: new Date(reviews[0].lesson_date),
        comment,
        numberOfLessons: filteredReviews.length,
        numberOfLessonAbsense: notAttendedLesson,
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
            margin: 10,
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
          <h1 className="text-4xl">
            AYLIK ÖĞRENCİ <br></br>
            <span>RAPORU</span>
          </h1>
          <Image src={logo} width={150} alt="TCI Logo" className="mr-4" />
        </div>
        <div className="flex justify-between mt-4 text-gray-700">
          <div className="w-2/3 ">
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
          <div className="w-1/3">
            <div className="font-semibold mb-2">
              Rapor Dönemi:{" "}
              <span className="font-medium ml-2">
                {new Date(reviews[0].lesson_date).toLocaleDateString(
                  "tr-TR",
                  options2
                )}
              </span>
            </div>
            <div className="font-semibold mb-2">
              Rapor Tarihi:{" "}
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
        <div className="mt-16">
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
                <TableCell className="font-medium">Dilbilgisi </TableCell>
                <TableCell className="font-medium">
                  {grammarCommentText}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kelime </TableCell>
                <TableCell className="font-medium">
                  {vocabularyCommentText}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  İnteraktif iletişim
                </TableCell>
                <TableCell className="font-medium">{commCommentText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Telaffuz </TableCell>
                <TableCell className="font-medium">
                  {pronunciationCommentText}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Akıcılık </TableCell>
                <TableCell className="font-medium">
                  {fluencyCommentText}
                </TableCell>
              </TableRow>
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
