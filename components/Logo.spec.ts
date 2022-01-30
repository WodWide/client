import { shallowMount } from "@vue/test-utils";
import { expect } from "@jest/globals";
import Logo from "./Logo.vue";

describe("Logo.vue", () => {
  describe("when component is mounted", () => {
    test("should display the proper text", () => {
      const wrapper = shallowMount(Logo);
      const wodDiv = wrapper.findAll("div").at(1);
      const wideDiv = wrapper.findAll("div").at(2);
      expect(wodDiv.text()).toBe("Wod");
      expect(wideDiv.text()).toBe("Wide");
    });
  });
});
