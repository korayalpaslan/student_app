"use client";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import {
  BookCheck,
  Ban,
  Percent,
  LucideScissorsLineDashed,
} from "lucide-react";
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
import participationComment from "@/lib/participationComment";
import fluencyComment from "@/lib/fluencyComment";
import pronunciationComment from "@/lib/pronunciationComment";
import vocabularyComment from "@/lib/vocabularyComment";
import listeningComment from "@/lib/listeningComment";
import { toFixedIfNecessary } from "@/utils/decimalFix";
// import contributionComment from "@/lib/contributionComment";

const ReportDetails = ({ report }: any) => {
  const average = (array: any) =>
    array.reduce((a: any, b: any) => a + b) / array.length;
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let level;

  if (report.level.startsWith("A")) {
    level = "A";
  } else {
    level = "B";
  }

  const participationCommentText: any = participationComment(
    report.performance[0],
    level
  );
  const fluencyCommentText: any = fluencyComment(report.performance[1], level);
  const pronCommentText: any = pronunciationComment(
    report.performance[2],
    level
  );
  const vocabularyCommentText: any = vocabularyComment(
    report.performance[3],
    level
  );
  const listeningCommentText: any = listeningComment(
    report.performance[4],
    level
  );
  // const contibutionText: any = contributionComment(report.performance[5]);

  const generalSuccessPerc =
    (report.performance.reduce((a: number, b: number) => a + b, 0) / 5 / 4) *
    100;

  const finalDate = moment(report.report_end_date).subtract(1, "day");

  const handleDownload = async () => {
    const html2pdf = await require("html2pdf.js");
    var element = document.getElementById("report");
    html2pdf(element, {
      margin: [20, 10, 0, 10],
      filename: "stapp_report",
      image: { type: "jpeg", quality: 1 },
      pagebreak: { mode: "avoid-all", before: "#page2el" },
      html2canvas: { scale: 2 },
    });
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
        <div className="w-2/3 ">
          <div className="font-semibold mb-2 ">
            Öğrenci Adı:{" "}
            <span className="font-medium ml-2">
              {report.student[0].fullname}
            </span>
          </div>
          <div className="font-semibold mb-2">
            Sınıfı: <span className="font-medium ml-2">{report.class}</span>
          </div>
          <div className="font-semibold mb-2">
            Düzeyi: <span className="font-medium ml-2">{report.level}</span>
          </div>
        </div>
        <div className="w-1/3">
          <div className="font-semibold mb-2">
            Rapor Başlangıç Tarihi:{" "}
            <span className="font-medium ml-2">
              {new Date(report.report_start_date).toLocaleDateString(
                "tr-TR",
                options
              )}
            </span>
          </div>
          <div className="font-semibold mb-2">
            Rapor Bitiş Tarihi:{" "}
            <span className="font-medium ml-2">
              {new Date(finalDate).toLocaleDateString("tr-TR", options)}
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
            <p>{report.numberOfLessons}</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 justify-center w-[250px] border border-gray-500/20 rounded-xl py-4">
          <h1 className="text-center font-semibold text-sm">
            Katılmadığı Ders Sayısı
          </h1>
          <div className="flex items-center space-x-4">
            <Ban className="" size={24} />
            <p>{report.numberOfLessonAbsense}</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 justify-center w-[250px] border border-gray-500/20 rounded-xl py-4">
          <h1 className="text-center font-semibold text-sm">Başarı Yüzdesi</h1>
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
                {participationCommentText}
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
              <TableCell className="font-medium">Dinleme ve Anlama </TableCell>
              <TableCell className="font-medium">
                {listeningCommentText}
              </TableCell>
            </TableRow>
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
              <TableHead className="text-center">Ortalama Ders Puanı</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {report.lessonAverage.map((lesson: any) => {
              const date = new Date(lesson.lesson_date).toLocaleDateString(
                "tr-TR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              return (
                <TableRow key={lesson._id}>
                  <TableCell className="font-medium">{date}</TableCell>
                  <TableCell className="font-medium text-center">
                    {lesson.isAttended
                      ? toFixedIfNecessary(lesson.average, 2)
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
        <p className="text-sm mt-4">{report.comment}</p>
      </div>
      <div
        data-html2canvas-ignore={true}
        className="flex space-x-4 items-center justify-center"
      >
        <Button type="button" className="w-1/5 mt-10" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default ReportDetails;
