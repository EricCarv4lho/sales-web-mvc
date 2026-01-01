import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Department {
  name: string;
}

export default function DepartmentsCards({ name }: Department) {
  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow w-2xs  ">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
