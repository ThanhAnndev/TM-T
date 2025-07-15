import { Product } from "@/types/product"

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Khóa học React cơ bản",
    price: 490000,
    image: "/images/products/reactjs.png",
    shortDesc: "Học React từ con số 0",
    fullDesc: "Khóa học React giúp bạn nắm chắc căn bản, hook, component hóa, routing...",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Lộ trình lập trình Web",
    price: 1090000,
    image: "/images/products/web.jpeg",
    shortDesc: "Từ HTML đến backend",
    fullDesc: "Khóa học dài hạn giúp bạn hiểu sâu về lập trình web cả frontend lẫn backend...",
    rating: 4.6,
  },
    {
    id: 3,
    name: "Khóa học Vue cơ bản",
    price: 400000,
     image: "/images/products/vuejs.jpeg",
    shortDesc: "Học Vue từ con số 0",
    fullDesc: "Khóa học Vue giúp bạn nắm chắc căn bản, hook, component hóa, routing...",
    rating: 4.5,
  },
  {
  id: 4,
    name: "Khóa học React nâng cao",
    price: 750000,
    image: "/images/products/reactjsnangcao.jfif",
    shortDesc: "Thành thạo React chuyên sâu",
    fullDesc: "Khóa học React nâng cao giúp bạn làm chủ hook, context, Redux, tối ưu performance và thực hành dự án thực tế.",
    rating: 4.8
  },
  {
    id: 5,
    name: "Khóa học Node.js Fullstack",
    price: 950000,
    image: "/images/products/nodejs.png",
    shortDesc: "Xây dựng server bằng Node.js",
    fullDesc: "Học cách tạo REST API, kết nối MongoDB, authentication, triển khai hệ thống backend hoàn chỉnh cho ứng dụng fullstack.",
    rating: 4.7
  },
  {
    id: 6,
    name: "Khóa học Next.js 14 toàn diện",
    price: 850000,
    image: "/images/products/nextjs.png",
    shortDesc: "Next.js từ cơ bản đến chuyên sâu",
    fullDesc: "Khóa học giúp bạn nắm vững App Router, SSR/SSG, Middleware, API Route, tích hợp AI và triển khai dự án thực tế với Next.js 14.",
    rating: 4.9
  },
]
