import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  }), tailwindcss(), flowbiteReact()],
})



// import basicSsl from '@vitejs/plugin-basic-ssl' // 플러그인 임포트
// import lightningcss from 'vite-plugin-lightningcss'

// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }), // 플러그인 추가
//     // basicSsl(),
//     // lightningcss({
//     //     browserslist : '>= 2.0% and not dead',
//     //     minify : true,  // css 파일 압축 활성화
//     //   }),
//   ],
// })