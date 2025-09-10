export const adContent = [
  {
    id: "pro-upgrade",
    title: "Upgrade to Pro",
    description: "Unlock advanced courses and coding challenges",
    cta: "Start Free Trial",
    image: "🚀",
    color: "from-purple-500 to-blue-500"
  },
  {
    id: "live-coding",
    title: "Live Coding Sessions",
    description: "Join live coding sessions with industry experts",
    cta: "Join Sessions",
    image: "🎥",
    color: "from-green-500 to-teal-500"
  },
  {
    id: "certification",
    title: "Get Certified",
    description: "Earn certificates to showcase your skills",
    cta: "Start Learning",
    image: "🏆",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "mentorship",
    title: "1-on-1 Mentorship",
    description: "Get personalized guidance from senior developers",
    cta: "Find Mentor",
    image: "👨‍💻",
    color: "from-indigo-500 to-purple-500"
  }
];

export const getRandomAd = () => {
  return adContent[Math.floor(Math.random() * adContent.length)];
};