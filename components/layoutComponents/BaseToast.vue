<script lang="ts">
import Vue from "vue";

const TOASTR_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
};
export default Vue.extend({
  name: "BaseToast",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  watch: {
    options: "handleOptionsChange",
  },
  methods: {
    handleOptionsChange(newValue) {
      if (newValue?.type && newValue?.message) {
        switch (newValue.type) {
          case TOASTR_TYPES.INFO:
            this.$toast.info(newValue.message).goAway(1500);
            break;
          case TOASTR_TYPES.SUCCESS:
            this.$toast.success(newValue.message).goAway(1500);
            break;
          case TOASTR_TYPES.ERROR:
            this.$toast.error(newValue.message).goAway(1500);
            break;
          default:
            this.$toast.info(newValue.message).goAway(1500);
        }
      }
    },
  },
  render() {
    return this.$slots.default! as any;
  },
});
</script>
