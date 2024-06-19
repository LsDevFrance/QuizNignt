import { z, ZodSchema } from "zod";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

export const action = <T>(
  zodSchema: ZodSchema<T>,
  fnAction: (values: T) => Promise<any>
) => {
  return async (data: any) => {
    try {
      const parsedData = zodSchema.parse(data);

      return await fnAction(parsedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: "Invalid fields!.",
        };
      }

      if (error instanceof ActionError) {
        return {
          success: false,
          message: error.message,
        };
      }
      console.error(error);
      return {
        success: false,
        message: "An unknown error occurred.",
      };
    }
  };
};
