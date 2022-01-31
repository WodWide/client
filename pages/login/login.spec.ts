import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { expect } from "@jest/globals";
import LoginPage from "./index.vue";

describe("index.vue", () => {
  let stubs: any;
  let mocks: any;
  beforeEach(() => {
    stubs = {
      BaseButton: {
        name: "BaseButton",
        template: `<div class="base-button-template"><slot/></div>`,
      },
      BaseToggle: {
        name: "BaseToggle",
        template: `<div class="base-toggle-template"><slot/></div>`,
        props: ["value"],
      },
      Logo: {
        name: "Logo",
        template: `<div class="logo-template"><slot/></div>`,
      },
      "font-awesome-icon": {
        name: "font-awesome-icon",
        template: `<div class="logo-template"><slot/></div>`,
        props: ["icon"],
      },
      NuxtLink: RouterLinkStub,
    };
    mocks = {
      $breakpoints: {},
      $store: {
        state: {
          user: {
            authStatus: false,
          },
        },
      },
    };
  });
  describe("when component is mounted", () => {
    test("should render Logo component", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      const logoComponent = wrapper.findComponent(stubs.Logo);
      expect(logoComponent).toBeTruthy();
    });
    test("should render the login card", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      expect(wrapper.find(".login-page__wrapper")).toBeTruthy();
    });
    test("should render the correct login card text", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      expect(wrapper.find("#login-page-description").text()).toBe(
        "Login to start your journey as a cross-training athlete/coach"
      );
    });
    test("should render all the nuxt links", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      const nuxtLinkList = wrapper.findAllComponents(RouterLinkStub);
      expect(nuxtLinkList.length).toBe(2);
    });
    test("should render all BaseButton component", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      const baseButtonList = wrapper.findComponent(stubs.BaseButton);
      expect(baseButtonList).toBeTruthy();
    });
    test("should render font-awesome-icon components", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      const fontAwesome = wrapper.findAll("#font-awesome-icon");
      expect(fontAwesome.length).toBe(2);
    });
    test("should render font-awesome-icon components with correct props", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      const fontAwesome = wrapper.findAll("#font-awesome-icon");
      expect(fontAwesome.at(0).props("icon")).toEqual(["fas", "user"]);
      expect(fontAwesome.at(1).props("icon")).toEqual(["fas", "lock"]);
    });
    test("should render BaseToggle component", () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      const baseToggle = wrapper.findComponent(stubs.BaseToggle);
      expect(baseToggle).toBeTruthy();
    });
    test("should change prop value when BaseToggle is toggled", async () => {
      const wrapper = shallowMount(LoginPage, { stubs, mocks });
      const baseToggle = wrapper.findComponent(stubs.BaseToggle);
      await wrapper.setData({ isCoach: true });
      expect(baseToggle.props("value")).toBeTruthy();
    });
  });
});
