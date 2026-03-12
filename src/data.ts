/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import bannerGuild from './assets/images/banner_guild.jpg';
import img01 from './assets/images/img_01.jpg';
import img02 from './assets/images/img_02.jpg';
import img03 from './assets/images/img_03.jpg';
import img04 from './assets/images/img_04.jpg';
import img05 from './assets/images/img_05.jpg';
import img06 from './assets/images/img_06.png';
import votinh from './assets/images/votinh.png';
import kyren from './assets/images/kyren.jpg';
import felix from './assets/images/felix.jpg';
import kylam from './assets/images/ky_lam.jpg';
import team from './assets/images/team.jpg';
import nhanvan from './assets/images/nhanvan.jpg';
import tanlan from './assets/images/tanlan.jpg';

export const GUILD_DATA = {
  name: "LazyGuys",
  subName: "Bang hội",
  edition: "Tuỳ duyên mà đến",
  foundedYear: "2025",
  slogan: "Bình bình yên yên vui là được",
  philosophy: "LazyGuys",
  intro: {
    title: "Những người hướng nội",
    verticalTitle: "Giới Thiệu",
    verticalSubtitle: "Anh Đào Thanh Khiết",
    bgImage: img01,
    themeColor: "rgba(245, 245, 240, 0.7)", // Parchment
    description1: "LazyGuys ra đời vì đại đương gia bị rảnh.",
    description2: "Ờmmm, chưa biết ghi gì ở đây nữa, đại đại đi",
    features: [
      {
        title: "Gió",
        desc: "Chuyển động như làn gió xuân dịu dàng."
      },
      {
        title: "Tĩnh",
        desc: "Tâm hồn bình lặng như mặt hồ trong xanh."
      }
    ],
    image: img03
  },
  // To use local images:
  // 1. Place your images in src/assets/images/
  // 2. Import them at the top: import heroImg from './assets/images/hero.jpg';
  // 3. Replace the URL string with the imported variable.
  
  heroImage: bannerGuild,
  characterSection: {
    title: "Thành viên",
    subtitle: "Nơi hội tụ những người điềm tĩnh hướng nội",
    verticalTitle: "Nhân vật truyền cảm lạnh",
    verticalSubtitle: "Nhân Vật Quan Trọng",
    bgImage: img04,
    themeColor: "rgba(224, 242, 254, 0.7)" // Soft Azure Blue
  },
  characters: [
    {
      id: 1,
      name: "Vô Tịnh",
      title: "Đại Đương Gia",
      description: "Mọi thứ đều phải đánh đổi bằng hiện kim.",
      image: votinh,
      seal: "SEN"
    },
    {
      id: 2,
      name: "Kyren",
      title: "Tam Đương Gia",
      description: "...",
      image: kyren,
      seal: "GEN"
    },
    {
      id: 3,
      name: "Felix",
      title: "Tứ Đương Gia",
      description: "Em là ameo ạ.",
      image: felix,
      seal: "LIX"
    },
    {
      id: 4,
      name: "Kỳ Lâm",
      title: "Quân Sư",
      description: "Thích đấm nhau nhưng yếu vờ lờ",
      image: kylam,
      seal: "NHICA"
    },
    {
      id: 5,
      name: "Nhan Vân",
      title: "Chiết phó đường chủ",
      description: "Phẩu thuật thẩm mỹ quá đà",
      image: nhanvan,
      seal: "TRAPGIRL"
    },
    {
      id: 6,
      name: "Tần Lan",
      title: "Yến Sư",
      description: "Phản diện nửa mùa",
      image: tanlan,
      seal: "TRAPGIRL"
    }
  ],
  historySection: {
    verticalTitle: "BIÊN NIÊN SỬ",
    verticalSubtitle: "Lịch Sử Thanh Khiết",
    bgImage: img05,
    themeColor: "rgba(245, 245, 240, 0.8)" // Parchment/Paper
  },
  history: [
    {
      id: 1,
      title: "Lời Thề Dưới Gốc Anh Đào",
      description: "Những người sáng lập đã cùng uống rượu dưới gốc cây anh đào ngàn năm tuổi, thề nguyện xây dựng một bang hội thoát khỏi những tranh chấp thế gian. Những cánh hoa rơi đã chứng kiến sự ra đời của LazyGuys.",
      type: "sakura"
    },
    {
      id: 2,
      title: "Trận Chiến Bầu Trời Xanh",
      description: "Trong một lần bảo vệ lãnh thổ, các thành viên của chúng tôi đã di chuyển như những đám mây trôi—vô định và mềm mại. Đối thủ không thể tung ra một đòn trúng đích và cuối cùng đã cùng chúng tôi thưởng trà.",
      type: "sky"
    }
  ],
  gallerySection: {
    verticalTitle: "Kỷ niệm",
    verticalSubtitle: "Hành Trình Thị Giác",
    bgImage: img01,
    themeColor: "rgba(236, 254, 255, 0.7)" // Misty Teal
  },
  gallery: [
    {
      id: 1,
      title: "Đường Hoa Anh Đào Cổ Kính",
      image: img03,
      span: "large"
    },
    {
      id: 2,
      title: "Hoa Xuân Đua Nở",
      image: team,
      span: "small"
    },
    {
      id: 3,
      title: "Núi Phú Sĩ Và Hoa Anh Đào",
      image: img03,
      span: "small"
    }
  ],
  videoSection: {
    title: "Bang xà lơ",
    description: "Một bộ sưu tập xà lơ của bang...",
    buttonText: "Mở Cuộn Giấy"
  },
  footer: {
    links: [
      { label: "Diễn Đàn Bang Hội", href: "#" },
      { label: "Luật Bang Hội", href: "#" },
      { label: "Không tuyển thành viên", href: "#" }
    ],
    copyright: "© 2025-2026 LAZYGUYS GUILD"
  }
};
