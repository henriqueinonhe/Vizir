import Utils, { JSONTypes } from "../../src/Utils/Utils";

describe("[Unit] checkPropertiesCompliance", () =>
{
  describe("Post Conditions", () =>
  {
    test("Undefined properties are considered invalid", () =>
    {
      const requiredProperties = [
        {key: "name", types: [JSONTypes.String]}
      ];

      expect(() => Utils.checkPropertiesCompliance(requiredProperties, {})).toThrow(`Invalid properties!\nProperty: "name" Expected Types: "string" Actual Type: "undefined"`);
    });

    test("Arrays are validated correctly", () =>
    {
      const requiredProperties = [
        {key: "numbers", types: [JSONTypes.Array]}
      ];

      //Fail
      expect(() => Utils.checkPropertiesCompliance(requiredProperties, {numbers: {}})).toThrow(`Invalid properties!\nProperty: "numbers" Expected Types: "array" Actual Type: "object"`);

      //Pass
      expect(() => Utils.checkPropertiesCompliance(requiredProperties, {numbers: [1, 2, 3]})).not.toThrow();
    });

    test("Null is validated correctly", () =>
    {
      const requiredProperties = [
        {key: "numbers", types: [JSONTypes.Null]}
      ];

      //Fail
      expect(() => Utils.checkPropertiesCompliance(requiredProperties, {numbers: {}})).toThrow(`Invalid properties!\nProperty: "numbers" Expected Types: "null" Actual Type: "object"`);

      //Pass
      expect(() => Utils.checkPropertiesCompliance(requiredProperties, {numbers: null})).not.toThrow();
    });
  });
});