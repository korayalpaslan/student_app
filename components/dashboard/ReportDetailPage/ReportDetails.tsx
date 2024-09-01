"use client";
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

const ReportDetails = ({ report }: any) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const options2: any = {
    year: "numeric",
    month: "long",
  };

  let level;

  if (report.level.startsWith("A")) {
    level = "A";
  } else {
    level = "B";
  }

  const grammarCommentText: any = grammarComment(report.performance[0], level);
  const vocabularyCommentText: any = vocabularyComment(
    report.performance[1],
    level
  );
  const commCommentText: any = commComment(report.performance[2], level);
  const pronunciationCommentText: any = pronunciationComment(
    report.performance[3],
    level
  );
  const fluencyCommentText: any = fluencyComment(report.performance[4], level);

  const generalSuccessPerc =
    (report.performance.reduce((a: number, b: number) => a + b, 0) / 5 / 4) *
    100;

  const handleDownload = async () => {
    const html2pdf = await require("html2pdf.js");
    var element = document.getElementById("report");
    html2pdf(element, {
      margin: 10,
    });
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
            <span className="font-medium ml-2">{report.fullname}</span>
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
            Rapor Dönemi:{" "}
            <span className="font-medium ml-2">
              {new Date(report.report_period).toLocaleDateString(
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
              <TableCell className="font-medium">İnteraktif iletişim</TableCell>
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
