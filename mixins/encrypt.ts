import bcrypt from "bcryptjs";

export default {
  methods: {
    encryptPassword(password: string): string {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
    },
  },
};
