var CONFIG_BRANDS = [
  {
    brand: "telecable",
    appName: "Telecable",
    drm: "https://cv01.panaccess.com/",
    token: "gQposTlrMIOYQVdYBNYC",
    logoPositionHome: "right",
    showTime: false,
    epgLineColorTime: "#3333FF",
  },
  {
    brand: "bromteck",
    appName: "Bromteck",
    drm: "https://cv01.panaccess.com/",
    token: "gQposTlrMIOYQVdYBNYC",
    logoPositionHome: "top",
    showTime: true,
    epgLineColorTime: "#2CE308",
    developedBy: "Network Broadcast",
  },
  {
    brand: "intv",
    appName: "inTV Play",
    drm: "https://pmdw-1.in.tv.br/",
    token: "CQSepFFsoFNgyLNDYOpz",
    logoPositionHome: "right",
    showTime: false,
    epgLineColorTime: "#3333FF",
    developedBy: "inTV&#174,",
  },
  {
    brand: "vmax",
    appName: "VMAX Play",
    drm: "https://pmdw-1.in.tv.br/",
    token: "CQSepFFsoFNgyLNDYOpz",
    logoPositionHome: "right",
    showTime: false,
    epgLineColorTime: "#ff5a00",
    developedBy: "inTV&#174,",
  },
  {
    brand: "meganet",
    appName: "MegaNet Play",
    drm: "https://pmdw-1.in.tv.br/",
    token: "CQSepFFsoFNgyLNDYOpz",
    logoPositionHome: "right",
    showTime: false,
    epgLineColorTime: "#3333FF",
    developedBy: "inTV&#174,",
  },
  {
    brand: "rsogo",
    appName: "RSO GO",
    drm: "https://cv10.panaccess.com/",
    token: "ekMIItbwRqfRWfdSTkwL",
    logoPositionHome: "right",
    showTime: false,
    epgLineColorTime: "#3333FF",
    developedBy: "Network Broadcast",
  },
  {
    brand: "twspeed",
    appName: "twspeedtelecom",
    drm: "https://cv24.panaccess.com/",
    token: "mOEWTFSpDiBiojGMNAXk",
    logoPositionHome: "top",
    showTime: true,
    epgLineColorTime: "#2CE308",
    developedBy: "Network Broadcast",
  },
  {
    brand: "cablenet",
    appName: "Cablenet",
    drm: "https://cv10.panaccess.com/",
    token: "ekMIItbwRqfRWfdSTkwL",
    logoPositionHome: "top",
    showTime: true,
    epgLineColorTime: "#2CE308",
    developedBy: "Network Broadcast",
  },
  {
    brand: "multiplustv",
    appName: "Multiplus Tv",
    drm: "https://cv10.panaccess.com/",
    token: "CUZwaXeVxOvrCiMmVHov",
    logoPositionHome: "top",
    showTime: true,
    epgLineColorTime: "#2CE308",
    developedBy: "Network Broadcast",
  },
];

function _getBrand(brand) {
  var _filtered = CONFIG_BRANDS.filter(function (item) {
    return item.brand == brand;
  });

  if (_filtered != null && _filtered.length == 1) {
    return _filtered[0];
  }

  return null;
}
