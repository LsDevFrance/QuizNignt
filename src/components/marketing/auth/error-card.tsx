import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";

export const ErrorCard = () => {
  return (
    <Card className=" w-full max-w-[400px]">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <h1 className={cn("text-3xl font-semibold")}>🔐 Auth</h1>
          <p className="text-sm text-muted-foreground">
            Oops! Something Went Wrong!
          </p>
        </div>
      </CardHeader>
      <CardFooter>
        <BackButton href="/auth/login" label="Back to login" />
      </CardFooter>
    </Card>
  );
};
