import Dinero from "dinero.js";

export const DineroReal = (amount : number) : Dinero.Dinero => Dinero({amount, currency: "BRL", precision: 4});


export enum JSONTypes
{
  BigInt = "bigint",
  Number = "number",
  Object = "object",
  String = "string",
  Boolean = "boolean",
  Array = "array",
  Null = "null"
}

// /**
//  * Represents a required property along with
//  * its possible types.
//  */
// interface PropertyKeyTypePair
// {
//   key : string;
//   types : Array<JSONTypes>;
// }

// export default {
//   /**
//    * Enforces type constraints for a given object
//    * that will be used for deserialization.
//    * 
//    * ## Rationale
//    * Deserialization is a two-step process:
//    * 
//    * 1. Validation
//    * 2. Construction
//    * 
//    * So, before we can construct an object from the serialized
//    * data we must first check that it conforms to an schema,
//    * that is, that the serialized object's structure is actually
//    * valid and all the required fields are defined and have the right
//    * types.
//    * 
//    * Only then we can "recover" the actual object from the serialized one.
//    * 
//    * So, analogous to the object's constructor that enforces
//    * a class invariants via the languages type system at compile time, 
//    * this function enforces class invariants at run time as some
//    * type information is lost during serialization.
//    * 
//    * This function takes care of enforcing type constraints 
//    * during the validation phase.
//    * 
//    * Pre Conditions:
//    * None
//    * 
//    * @param requiredProperties
//    * @param object Object to be validated
//    */
//   checkPropertiesCompliance(requiredProperties : Array<PropertyKeyTypePair>, object : Record<string, unknown>) : void
//   {
//     const invalidProperties : Array<{key : string; expectedTypes : Array<string>; actualType : string}> = [];
//     for(const requiredProperty of requiredProperties)
//     {
//       const {key, types : expectedTypes} = requiredProperty;

//       //Arrays require special treament, 
//       //because typeof an array is "object"
//       const objectProperty = object[key];
//       const objectPropertyType = Array.isArray(objectProperty) ? "array" : typeof objectProperty;
//       const objectPropertyHasInvalidType = !expectedTypes.some(possibleType => possibleType === objectPropertyType);

//       if(objectPropertyHasInvalidType)
//       {
//         invalidProperties.push({
//           key,
//           expectedTypes,
//           actualType: objectPropertyType
//         });
//       }
//     }
  
//     if(invalidProperties.length !== 0)
//     {
//       throw new Error(`Invalid properties!\n${invalidProperties.map(entry => `Property: "${entry.key}" Expected Types: "${entry.expectedTypes.join(`", "`)}" Actual Type: "${entry.actualType}"`).join("\n")}`);
//     }
//   }
// };
