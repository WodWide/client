import { shallowMount } from "@vue/test-utils";
import { expect } from "@jest/globals";
import ProfileCards from "./ProfileCard.vue";

describe("ProfileCards.vue", () => {
  describe("when component is mounted", () => {
    test("should display header slot content", () => {
      const slots = {
        header: "test_header",
      };
      const wrapper = shallowMount(ProfileCards, {
        slots,
      });
      expect(wrapper.find(".profile-card__header").text()).toBe("test_header");
    });
    test("should display body slot content", () => {
      const slots = {
        body: "test_body",
      };
      const wrapper = shallowMount(ProfileCards, {
        slots,
      });
      expect(wrapper.find(".profile-card__body").text()).toBe("test_body");
    });
  });
});
