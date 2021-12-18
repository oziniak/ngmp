import { NextFunction } from "express";

export type Handler = (e: Error, next: NextFunction) => void;

function skipProperties(property: string) {
  return property.startsWith("handle");
}

export function prepareDecorator(decoratorFn: Function, handler?: Handler) {
  return function prepareDecoratorInner<T extends { new (...args: any[]): {} }>(
    target: T
  ) {
    Object.getOwnPropertyNames(target.prototype)
      .filter(skipProperties)
      .forEach((propertyName) => {
        const descriptor = Object.getOwnPropertyDescriptor(
          target.prototype,
          propertyName
        )!;
        if (descriptor.value instanceof Function) {
          Object.defineProperty(
            target.prototype,
            propertyName,
            decoratorFn(propertyName, descriptor, handler)
          );
        }
      });
  };
}
