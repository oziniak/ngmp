import { RequestParamHandler } from "express";
import { appLogger } from "../logger";
import { Handler, prepareDecorator } from "./util";

function withErrorHandled(
  propertyName: string,
  descriptor: PropertyDescriptor,
  handler?: Handler
) {
  const { value } = descriptor;
  descriptor.value = async function withErrorHandledInner(
    ...args: Parameters<RequestParamHandler>
  ) {
    try {
      return await value.apply(descriptor, args);
    } catch (e) {
      const [, , next] = args;
      appLogger.error(`===>!!!Error in handler]: ${propertyName}
args passed: ${args}
error message: ${(<Error>e).message || e}
<===!!!`);
      handler ? handler(e as Error, next) : next(e);
    }
  };

  return descriptor;
}

export const catchErrors = prepareDecorator(withErrorHandled);
