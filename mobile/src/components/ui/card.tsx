import React from "react";
import { View, Text, ViewProps, TextProps } from "react-native";

export function Card({ className = "", ...props }: ViewProps) {
  return (
    <View 
      className={`bg-card rounded-xl border border-border overflow-hidden ${className}`} 
      {...props} 
    />
  );
}

export function CardHeader({ className = "", ...props }: ViewProps) {
  return (
    <View 
      className={`flex flex-row items-center justify-between p-4 pb-2 ${className}`} 
      {...props} 
    />
  );
}

export function CardTitle({ className = "", ...props }: TextProps) {
  return (
    <Text 
      className={`text-sm font-semibold text-foreground ${className}`} 
      {...props} 
    />
  );
}

export function CardContent({ className = "", ...props }: ViewProps) {
  return (
    <View 
      className={`p-4 ${className}`} 
      {...props} 
    />
  );
}
