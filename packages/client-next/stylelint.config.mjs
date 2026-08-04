/** @type {import("stylelint").Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  rules: {
    "at-rule-no-unknown": null,
    "at-rule-no-deprecated": null
  }
};
