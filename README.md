# Time Clock project
Built using React.js, TailwindCSS, Typescript

## commands used
npx create-react-app timeclock --template typescript

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

## tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

## add tailwind directives
@tailwind base;
@tailwind components;
@tailwind utilities;
