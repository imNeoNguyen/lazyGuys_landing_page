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


export const GUILD_DATA = {
  name: "LazyGuys",
  subName: "Guild Hall",
  edition: "LazyGuys Edition",
  foundedYear: "2025",

  slogan: "Play calmly, relax together, and enjoy the game.",

  philosophy: "A guild created for relaxation, friendship, and simple fun.",

  intro: {
    title: "The Lazy Way",
    verticalTitle: "ESSENCE",
    verticalSubtitle: "Peaceful Gaming",
    bgImage: bannerGuild,
    themeColor: "rgba(255, 240, 243, 0.7)",

    description1:
      "LazyGuys was founded simply because the leader had too much free time and nothing better to do.",

    description2:
      "What started as a small joke slowly became a place where people could gather, relax, and enjoy games together. No pressure, no drama — just peaceful gaming.",

    features: [
      {
        title: "Relaxed Play",
        desc: "No stress, no rush — just enjoy the game."
      },
      {
        title: "Good Vibes",
        desc: "Stay calm, play peacefully, and have fun together."
      }
    ],

    image: img06
  },

  heroImage: bannerGuild,

  characterSection: {
    title: "Guild Members",
    subtitle: "People who enjoy the game together.",
    verticalTitle: "MEMBERS",
    verticalSubtitle: "Lazy Companions",
    bgImage: img04,
    themeColor: "rgba(224, 242, 254, 0.7)"
  },

  characters: [
    {
      id: 1,
      name: "VoTinh",
      title: "The Founder",
      description:
        "The leader who created the guild simply because he was bored. Just stay calm, play games, and enjoy the moment.",
      image: votinh,
      seal: "FOUNDER"
    },
    {
      id: 2,
      name: "Ameo",
      title: "The Friendly Strategist",
      description:
        "Always ready to help others and keep the guild atmosphere positive and relaxed.",
      image: votinh,
      seal: "ALLY"
    },
    {
      id: 3,
      name: "Lee",
      title: "The Chill Player",
      description:
        "Believes that games should be played slowly and peacefully — winning is good, but having fun together is better.",
      image: votinh,
      seal: "CHILL"
    },
    {
      id: 4,
      name: "Ky Lam",
      title: "The Chill Player",
      description:
        "Believes that games should be played slowly and peacefully — winning is good, but having fun together is better.",
      image: votinh,
      seal: "CHILL"
    },
    {
      id: 5,
      name: "Tan Lan",
      title: "The Chill Player",
      description:
        "Believes that games should be played slowly and peacefully — winning is good, but having fun together is better.",
      image: votinh,
      seal: "CHILL"
    },
    {
      id: 6,
      name: "Van Hi Hoa",
      title: "The Chill Player",
      description:
        "Believes that games should be played slowly and peacefully — winning is good, but having fun together is better.",
      image: votinh,
      seal: "CHILL"
    },
  ],

  historySection: {
    verticalTitle: "STORY",
    verticalSubtitle: "Guild Journey",
    bgImage: img01,
    themeColor: "rgba(245, 245, 240, 0.8)"
  },

  history: [
    {
      id: 1,
      title: "A Guild Born from Boredom",
      description:
        "LazyGuys was created in 2025 when the leader had too much free time and decided to start a guild just for fun.",
      type: "sakura"
    },
    {
      id: 2,
      title: "A Place to Relax",
      description:
        "Over time, the guild became a small community where players could relax, chat, and enjoy games together without pressure.",
      type: "sky"
    }
  ],

  gallerySection: {
    verticalTitle: "MEMORIES",
    verticalSubtitle: "Moments Together",
    bgImage: img05,
    themeColor: "rgba(236, 254, 255, 0.7)"
  },

  gallery: [
    {
      id: 1,
      title: "Peaceful Moments",
      image: img03,
      span: "large"
    },
    {
      id: 2,
      title: "Spring Vibes",
      image: img02,
      span: "small"
    },
    {
      id: 3,
      title: "Calm Landscapes",
      image: img04,
      span: "small"
    }
  ],

  videoSection: {
    title: "Guild Moments",
    description:
      "Just a collection of peaceful and fun moments shared by our members.",
    buttonText: "Watch"
  },

  footer: {
    links: [
      { label: "Guild Chat", href: "#" },
      { label: "Guild Rules", href: "#" },
      { label: "Join Us", href: "#" }
    ],
    copyright: "© 2025-2026 LAZYGUYS GUILD. PLAY PEACEFULLY."
  }
};