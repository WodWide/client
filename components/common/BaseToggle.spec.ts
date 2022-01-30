import { shallowMount } from "@vue/test-utils";
import { expect } from "@jest/globals";
import BaseToggle from "./BaseToggle.vue";

describe("BaseToggle.vue", () => {
  describe("when component is mounted", () => {
    describe("should render a button element with dynamic class dependent on value prop", () => {
      test("should have bg-gray-400 when value is false", () => {
        const wrapper = shallowMount(BaseToggle, {
          propsData: {
            value: false,
          },
        });
        const backgroundDiv = wrapper.findAll("div").at(1);
        expect(backgroundDiv.attributes("class")).toEqual(
          expect.stringContaining("bg-gray-400")
        );
      });
      test("should have bg-gray-800 when value is true", () => {
        const wrapper = shallowMount(BaseToggle, {
          propsData: {
            value: true,
          },
        });
        const backgroundDiv = wrapper.findAll("div").at(1);
        expect(backgroundDiv.attributes("class")).toEqual(
          expect.stringContaining("bg-gray-800")
        );
      });
    });

    test("should display any provided slot content", () => {
      const slots = {
        default: "test_content",
      };
      const slotWrapper = shallowMount(BaseToggle, {
        propsData: {
          value: false,
        },
        slots,
      });
      expect(slotWrapper.text()).toBe("test_content");
    });
  });
});
