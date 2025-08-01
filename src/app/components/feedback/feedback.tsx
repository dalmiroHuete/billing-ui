import React from "react";
import { Alert, AlertIcon, Text } from "@chakra-ui/react";

interface FeedbackProps {
  message: string;
  type: "error" | "success";
  mb?: number;
}

const Feedback: React.FC<FeedbackProps> = ({ message, type, mb = 4 }) => {
  if (!message) return null;

  return (
    <Alert status={type} mb={mb}>
      <AlertIcon />
      <Text whiteSpace="pre-line">{message}</Text>
    </Alert>
  );
};

export default Feedback; 