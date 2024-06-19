import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const FormError = ({
  message = "Something went wrong!",
}: {
  message: string | undefined | unknown;
}) => {
  if (typeof message !== "string") return null;
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="size-4" />
      <p>{message}</p>
    </div>
  );
};
