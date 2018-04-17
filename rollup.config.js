import babel from 'rollup-plugin-babel';

export default {
  external: [
    `postcss`,
    `change-case`,
  ],
  plugins: [
    babel(),
  ],
};
