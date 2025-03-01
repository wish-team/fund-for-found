import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle } from "react-icons/fi";

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="border-danger">
      <CardBody className="text-center py-4">
        <div className="flex flex-col items-center gap-2">
          <FiAlertTriangle className="text-danger h-8 w-8" />
          <p className="text-danger text-sm">{error}</p>
          {onRetry && (
            <Button
              color="primary"
              variant="flat"
              size="sm"
              onPress={onRetry}
              className="mt-2"
            >
              {t("translation:common.retry")}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
