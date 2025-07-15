#Feature

- Hiển thị danh sách sản phẩm giáo dục
- Tìm kiếm và lọc theo giá
- Modal xem chi tiết sản phẩm
- Yêu thích sản phẩm (được lưu trong localStorage)
- Gợi ý sản phẩm dựa vào hành vi (giỏ hàng, lịch sử xem)
- Chatbot hỗ trợ tư vấn sản phẩm bằng từ khóa tiếng Việt
- Giao diện hiện đại, responsive, hiệu ứng mượt
- Sử dụng Zustand để quản lý state
  #Technology
- [Next.js 13+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [MUI Icons](https://mui.com/material-ui/material-icons/)
- [Notiflix](https://github.com/notiflix/Notiflix) (toast thông báo)
- Mock API & dữ liệu mẫu
  #Set dependencies
  npm i
  #Run dev server
  npm run dev
  #Main directory structure
  ├── app/
  │ ├── page.tsx # Trang chính
  │  
  ├── components/ # Tất cả component giao diện
  ├── lib/
  │ ├── api/ # API mock lấy sản phẩm
  │ └── mockData.ts # Dữ liệu mẫu
  ├── store/ # Zustand store
  ├── public/ # Assets
  └── styles/ # Tailwind và style tùy chỉnh
