"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  size?: "default" | "sm";
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  className?: string;
}

export const GenerateButton = ({
  size,
  disabled,
  isSubmitting,
  onSubmit,
  className,
}: Props) => {
  return (
    <Button
      onClick={onSubmit}
      size={size}
      disabled={disabled || isSubmitting}
      className={className}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-3" />
          Generating
        </>
      ) : (
        "Generate speech"
      )}
    </Button>
  );
};
