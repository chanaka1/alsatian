import "reflect-metadata";
import { TESTS } from "./_metadata-keys";
import { Unused } from "../unused";

export function AsyncTest(description?: string) {

   return (target: object,
           propertyKey: string,
           descriptor?: TypedPropertyDescriptor<(...args: Array<any>) => Promise<any>>) => {
      Unused(descriptor);

      // check if this has been registered as a test already
      let tests: Array<any> = Reflect.getMetadata(TESTS, target);

      // if there are no tests registered yet then register it
      if (!tests) {
         tests = [ {
            key: propertyKey
         } ];
      }
      // otherwise add it to the register if it's not already there
      else if (tests.filter(test => test.key === propertyKey).length === 0) {
         tests.push( {
            key: propertyKey
         } );
      }

      // mark it as async and add the description
      const testDefinition = tests.filter(test => test.key === propertyKey)[0];
      testDefinition.isAsync = true;
      testDefinition.description = description;

      // update the register
      Reflect.defineMetadata(TESTS, tests, target);
   };
}
