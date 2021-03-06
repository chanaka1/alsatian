import { Expect, Test, TestCase } from "../../../core/alsatian-core";
import { EqualMatchError } from "../../../core/errors/equal-match-error";

export class ToEqualTests {

   @TestCase(undefined)
   @TestCase(null)
   @TestCase(0)
   @TestCase(42)
   @TestCase(4.2)
   @TestCase(-4.2)
   @TestCase("")
   @TestCase("something")
   public identicalSimpleTypesDontThrow(value: any) {
      const expect = Expect(value);

      Expect(() => expect.toEqual(value)).not.toThrow();
   }

   @TestCase(undefined, undefined)
   @TestCase(null, null)
   @TestCase(0, 0)
   @TestCase(42, 42)
   @TestCase(4.2, 4.2)
   @TestCase(-4.2, -4.2)
   @TestCase("", "")
   @TestCase("something", "something")
   public matchingSimpleTypesDontThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).not.toThrow();
   }

   @Test()
   public differentValuesThrowsExactMatchError() {
      const expect = Expect(1);

      Expect(() => expect.toEqual(2)).toThrowError(EqualMatchError, "Expected 1 to be equal to 2.");
   }

   @TestCase("something", "something else")
   @TestCase("", "something")
   @TestCase(0, 42)
   @TestCase(42, 0)
   public differentSimpleValuesToThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).toThrow();
   }

   @TestCase("something", "something else")
   @TestCase("", "something")
   @TestCase(0, 42)
   @TestCase(42, 0)
   public differentSimpleValuesThrowsExactMatchErrorWithCorrectMessage(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected))
        .toThrowError(
           EqualMatchError,
           "Expected " + JSON.stringify(actual) + " to be equal to " + JSON.stringify(expected) + ".");
   }

   @TestCase(undefined, null)
   @TestCase(null, undefined)
   public nullAndUndefinedNotToThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).not.toThrow();
   }

   @TestCase(42, "something")
   @TestCase("something", 42)
   public differentSimpleTypesToThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).toThrow();
   }

   @TestCase({})
   @TestCase({ with: "something" })
   @TestCase({ with: { something: "more" }, complex: "!", foSho: true, answer: 42})
   @TestCase([])
   @TestCase([ 1, 2, 3 ])
   @TestCase([ { with: "something" }, { and: "something", else: "!"} ])
   public identicalComplexTypesDontThrow(value: any) {
      const expect = Expect(value);

      Expect(() => expect.toEqual(value)).not.toThrow();
   }

   @TestCase({}, {})
   @TestCase({ with: "something" }, { with: "something" })
   @TestCase({ with: { something: "more" }, complex: "!", foSho: true, answer: 42},
             { with: { something: "more" }, complex: "!", foSho: true, answer: 42})
   @TestCase([], [])
   @TestCase([ 1, 2, 3 ], [ 1, 2, 3 ])
   @TestCase([ { with: "something" }, { and: "something", else: "!"} ],
             [ { with: "something" }, { and: "something", else: "!"} ])
   public matchingComplexTypesNotThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).not.toThrow();
   }

   @TestCase({}, { with: "something" })
   @TestCase({ with: "something" }, { })
   @TestCase([], [ 1, 2, 3 ])
   @TestCase([ 1, 2, 3 ], [])
   public differentComplexValuesThrowsExactMatchErrorWithCorrectMessage(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected))
        .toThrowError(
            EqualMatchError,
            `Expected ${JSON.stringify(actual).replace(/,/g, ", ")} ` +
            `to be equal to ${JSON.stringify(expected).replace(/,/g, ", ")}.`);
   }

   @TestCase({}, [])
   @TestCase([], {})
   @TestCase({ with: "something" }, [ 1, 2, 3 ])
   @TestCase([ 1, 2, 3 ], { with: "something" })
   @TestCase([ ], { with: "something" })
   @TestCase([ 1, 2, 3 ], { })
   public differentComplexTypesToThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).toThrow();
   }

   @TestCase({ with: { something: "deep" } }, [ 1, 2, 3 ])
   @TestCase([ {this: "that" } ], { with: "something" })
   public differentDeepComplexTypesToThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).toThrow();
   }

   @TestCase({ with: { something: "deep" } }, { with: { something: "different" } })
   @TestCase([ {this: "that" } ], [ {this: "and that" }])
   public differentDeepComplexToThrow(expected: any, actual: any) {
      const expect = Expect(actual);

      Expect(() => expect.toEqual(expected)).toThrow();
   }

}
