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

const Analytics = ({ data }: any) => {
  const newArray = data.map((item: any) => {
    const itemArray = new Array(
      +item.criteria_one.toFixed(2),
      +item.criteria_two.toFixed(2),
      +item.criteria_three.toFixed(2),
      +item.criteria_four.toFixed(2)
    );

    return itemArray;
  });

  const updatedArray = newArray.map((item: any) => {
    const array = item.reduce((a: any, b: any) => a + b) / item.length;
    return array;
  });

  const newData = data
    .map((item: any, i: any) => {
      const update = {
        ...item,
        lesson_date: new Date(item.lesson_date).toLocaleDateString("tr-TR", {
          month: "long",
          day: "numeric",
        }),
        not: updatedArray[i],
      };

      return update;
    })
    .reverse();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Performans Çizelgesi</CardTitle>
          <CardDescription>
            4 puan üzerinden yapılan değerlendirmedir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={newData}>
                <Line type="monotone" dataKey="not" stroke="#8884d8" />
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
