import { RequestParamHandler } from "express";
import { prepareDecorator } from "./util";
import { performance } from "perf_hooks";
import { appLogger } from "../logger";

function logTimeFn(propertyName: string, descriptor: PropertyDescriptor) {
  const { value } = descriptor;

  descriptor.value = async function withLogger(
    ...args: Parameters<RequestParamHandler>
  ) {
    const start = performance.now();
    const res = await value.apply(descriptor, args);
    const end = performance.now();

    appLogger.info(`[Execution time]: ${propertyName} took ${end - start}ms`);

    return res;
  };

  return descriptor;
}

export const logTime = prepareDecorator(logTimeFn);
