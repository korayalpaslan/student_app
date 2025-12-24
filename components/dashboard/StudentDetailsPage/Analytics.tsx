"use client";
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
import { toFixedIfNecessary } from "@/utils/decimalFix";

const Analytics = ({ data }: any) => {
  const arraySum = (arr: any) => {
    const array =
      arr.reduce((a: any, b: any, index: any) => a + b, 0) / arr.length;
    return array;
  };

  const newData = data
    .filter((item: any) => item.isAttended === true)
    .map((item: any, i: any) => {
      const update = {
        ...item,
        lesson_date: new Date(item.lesson_date).toLocaleDateString("en-EN", {
          month: "long",
          day: "numeric",
        }),
        not: toFixedIfNecessary(arraySum(item.criterias).toFixed(2), 2),
      };

      return update;
    })
    .reverse();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Performance Chart</CardTitle>
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
      </Card>
    </>
  );
};

export default Analytics;
