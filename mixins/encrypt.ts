import crypto from "crypto";

export default {
  methods: {
    hashPassword(password: string): string {
      return crypto.createHash("sha1").update(password).digest("hex");
    },
  },
};
