"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Analytics = ({ data }: any) => {
  const thisMonth = new Date().getMonth();
  const [currentMonth, setCurrentMonth] = useState("previous");

  const month = currentMonth === "this" ? thisMonth : thisMonth - 1;

  const arraySum = (arr: any) => {
    const array =
      arr.reduce((a: any, b: any, index: any) => a + b, 0) / arr.length;
    return array;
  };

  const newData = data
    .filter((item: any) => item.isAttended === true)
    .filter((item: any) => {
      return new Date(item.lesson_date).getMonth() === month;
    })
    .map((item: any, i: any) => {
      const update = {
        ...item,
        lesson_date: new Date(item.lesson_date).toLocaleDateString("en-EN", {
          month: "long",
          day: "numeric",
        }),
        not: arraySum(item.criterias),
      };

      return update;
    })
    .reverse();

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Lesson Performance</CardTitle>
          <CardDescription>
            Based on a four-point scoring system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={newData}>
                <Line
                  type="monotone"
                  dataKey="not"
                  stroke="#8884d8"
                  strokeWidth={4}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis
                  dataKey="lesson_date"
                  padding={{ left: 30, right: 30 }}
                  tick={{ fontSize: 15 }}
                />
                <YAxis
                  padding={{ top: 30 }}
                  domain={[0, 4]}
                  tick={{ fontSize: 15 }}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <RadioGroup
          defaultValue={currentMonth}
          onValueChange={(): any =>
            setCurrentMonth((prevState) =>
              prevState === "this" ? "previous" : "this"
            )
          }
        >
          <div className="flex items-center px-6 py-4 space-x-4">
            <div className="flex items-center  space-x-2">
              <RadioGroupItem id="r1" value="previous" />
              <Label htmlFor="r1">Previous Month</Label>
            </div>
            <div className="flex items-center  space-x-2">
              <RadioGroupItem id="r1" value="this" />
              <Label htmlFor="r1">This Month</Label>
            </div>
          </div>
        </RadioGroup>
      </Card>
    </div>
  );
};

export default Analytics;
