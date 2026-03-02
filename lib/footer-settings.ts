export interface FooterSettings {
  orgName: string;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  zaloUrl: string;
  policyLinks: { label: string; url: string }[];
  version: string;
}

const storageKey = "footerSettings";

const defaultSettings: FooterSettings = {
  orgName: "TRUNG TÂM HUẤN LUYỆN VÀ THI ĐẤU THỂ THAO TỈNH VĨNH LONG",
  address: "79 Nguyễn Huệ, Phường Long Châu, Tỉnh Vĩnh Long",
  phone: "(02703).862.071",
  email: "tttdtt.svhttdl@vinhlong.gov.vn",
  facebookUrl:
    "https://www.facebook.com/p/Trung-t%C3%A2m-Hu%C3%A5n-luy%E1%BB%87n-v%C3%A0-Thi-%C4%91%E1%BA%A5u-TDTT-t%E1%BB%89nh-V%C4%A9nh-Long-100085916468800/",
  zaloUrl: "https://zalo.me",
  policyLinks: [
    { label: "Chính Sách", url: "#" },
    { label: "Điều Khoản", url: "#" },
    { label: "Liên Hệ", url: "#" },
  ],
  version: "1.0.0",
};

export function getFooterSettings(): FooterSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse footer settings", e);
  }
  return defaultSettings;
}

export function saveFooterSettings(settings: FooterSettings) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save footer settings", e);
  }
}
