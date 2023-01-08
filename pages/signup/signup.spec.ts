import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import Signup from "./index.vue";

describe("Signup", () => {
  let wrapper;
  let stubs;

  beforeEach(() => {
    stubs = {
      Stepper: {
        name: "Stepper",
        template: `<div class="stepper"><slot/></div>`,
      },
      NuxtLink: RouterLinkStub,
    };
    wrapper = shallowMount(Signup, { stubs });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should render a logo image", () => {
    expect(wrapper.find("img").attributes("src")).toBe("/logo.png");
  });

  it("should render the Stepper component", () => {
    expect(wrapper.find(stubs.Stepper).exists()).toBe(true);
  });

  it("should display an error message when the `error` data property is set", async () => {
    await wrapper.setData({ error: "Invalid email address" });
    expect(wrapper.find("#signup-page-error").text()).toBe(
      "Invalid email address"
    );
  });

  it("should call the `signup` method when the Stepper component emits a `signup` event", () => {
    const mockMethod = jest.fn();
    wrapper.setMethods({ signup: mockMethod });
    wrapper.find(stubs.Stepper).vm.$emit("signup");
    expect(mockMethod).toHaveBeenCalled();
  });
});
