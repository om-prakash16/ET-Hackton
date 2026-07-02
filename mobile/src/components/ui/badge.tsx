import React from "react";
import { View, Text, ViewProps } from "react-native";

export interface BadgeProps extends ViewProps {
  variant?: "default" | "secondary" | "destructive" | "success" | "warning";
  children: React.ReactNode;
}

export function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "destructive":
        return { bg: "bg-danger/10", border: "border-danger/20", text: "text-danger" };
      case "success":
        return { bg: "bg-success/10", border: "border-success/20", text: "text-success" };
      case "warning":
        return { bg: "bg-warning/10", border: "border-warning/20", text: "text-warning" };
      case "secondary":
        return { bg: "bg-secondary", border: "border-border", text: "text-secondary-foreground" };
      default:
        return { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" };
    }
  };

  const styles = getVariantStyles();

  return (
    <View 
      className={`px-2 py-0.5 rounded border flex items-center justify-center ${styles.bg} ${styles.border} ${className}`} 
      {...props}
    >
      <Text className={`text-[10px] font-semibold uppercase tracking-wider ${styles.text}`}>
        {children}
      </Text>
    </View>
  );
}
