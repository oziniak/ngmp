import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import customizeErrors from "ajv-errors";
import { Prisma } from ".prisma/client";

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: "all",
  coerceTypes: true,
});
customizeErrors(addFormats(ajv));

const schema: JSONSchemaType<Prisma.UserCreateWithoutGroupsInput> = {
  type: "object",
  properties: {
    login: {
      type: "string",
      pattern: "^[A-Za-z][A-Za-z0-9]{4,19}$",
      errorMessage: "Should consist only of letters. 5 < Length < 20",
    },
    password: {
      type: "string",
      format: "password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
      minLength: 8,
      errorMessage: {
        pattern: "Should consist only of letters and numbers. Min Length: 8",
      },
    },
    age: { type: "number", minimum: 4, maximum: 130 },
    isDeleted: { type: "boolean", nullable: true },
  },
  required: [],
  additionalProperties: false,
};

const schemaRequired: JSONSchemaType<
  NonNullable<Prisma.UserCreateWithoutGroupsInput>
> = {
  ...schema,
  required: ["login", "password", "age"],
};

export const userSchemaRequired = ajv.compile(schemaRequired);
export const userSchema = ajv.compile(schema);
