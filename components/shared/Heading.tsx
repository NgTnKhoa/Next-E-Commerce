import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  className?: string;
  title: string;
  description: string;
}

const Heading = ({ className, title, description }: HeadingProps) => {
  return (
    <div className={cn("my-4", className)}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
