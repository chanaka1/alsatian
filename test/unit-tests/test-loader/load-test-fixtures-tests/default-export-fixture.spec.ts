import { TestLoader } from "../../../../core/test-loader";
import { FileRequirer } from "../../../../core/file-requirer";
import { Expect, Test, TestCase, SpyOn, FocusTests } from "../../../../core/alsatian-core";
import "reflect-metadata";

export class DefaultExportFixtureTests {

   @Test()
   public ignoredShouldBeFalseByDefault() {

     let fileRequirer = new FileRequirer();

     let testFixtureInstance = {};
     Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

     let testFixtureConstructor = () => testFixtureInstance;

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureConstructor);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].ignored).toBe(false);
   }

   @Test()
   public ignoredShouldBeTrueIfMetadataSet() {

     let fileRequirer = new FileRequirer();

      let testFixtureInstance = {};
      Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

      let testFixtureConstructor = () => testFixtureInstance;

     Reflect.defineMetadata("alsatian:ignore", true,  testFixtureConstructor);

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureConstructor);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].ignored).toBe(true);
   }

   @Test()
   public focussedShouldBeFalseByDefault() {

     let fileRequirer = new FileRequirer();

     let testFixtureInstance = {};
     Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

     let testFixtureConstructor = () => testFixtureInstance;

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureConstructor);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].focussed).toBe(false);
   }

   @Test()
   public focussedShouldBeTrueIfMetadataSet() {

     let fileRequirer = new FileRequirer();

      let testFixtureInstance = {};
      Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

      let testFixtureConstructor = () => testFixtureInstance;

     Reflect.defineMetadata("alsatian:focus", true,  testFixtureConstructor);

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureConstructor);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].focussed).toBe(true);
   }

   @Test()
   public noTestsReturnsEmptyArray() {

     let fileRequirer = new FileRequirer();

      let testFixtureInstance = {};

      let testFixtureConstructor = () => testFixtureInstance;

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureConstructor);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test").length).toBe(0);
   }
 }