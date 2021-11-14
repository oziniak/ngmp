import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import customizeErrors from "ajv-errors";
import { User } from "../types";

const ajv = new Ajv({ allErrors: true });
customizeErrors(addFormats(ajv));

const schema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    id: { type: "string" },
    login: {
      type: "string",
      pattern: "^[A-Za-z]{5,20}$",
      errorMessage: "Should consist only of letters. 5 < Length < 20",
    },
    password: {
      type: "string",
      format: "password",
      // pattern: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
      pattern: "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
      minLength: 8,
      errorMessage: {
        pattern: "Should consist only of letters and numbers. Min Length: 8",
      },
    },
    age: { type: "number", minimum: 4, maximum: 130 },
    isDeleted: { type: "boolean" },
  },
  required: [],
  additionalProperties: false,
};

const schemaRequired: JSONSchemaType<User> = {
  ...schema,
  required: ["login", "password", "age"],
};

export const userSchemaRequired = ajv.compile(schemaRequired);
export const userSchema = ajv.compile(schema);
