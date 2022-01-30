import { shallowMount } from "@vue/test-utils";
import { expect } from "@jest/globals";
import BaseButton from "./BaseButton.vue";

describe("BaseButton.vue", () => {
  describe("when component is mounted", () => {
    test("should display any provided slot content", () => {
      const slots = {
        default: "test_content",
      };
      const wrapper = shallowMount(BaseButton, { slots });
      expect(wrapper.text()).toEqual("test_content");
    });
  });
});
