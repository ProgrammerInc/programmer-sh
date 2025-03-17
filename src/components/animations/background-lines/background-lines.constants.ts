/**
 * Constants for the BackgroundLines component
 */

/**
 * Default animation settings
 */
export const DEFAULT_ANIMATION = {
  /** Duration of the animation in seconds */
  duration: 10,
  /** Easing function for the animation */
  ease: 'linear',
  /** Number of times to repeat the animation */
  repeat: Infinity,
  /** Type of repeat */
  repeatType: 'loop' as const,
  /** Maximum random delay in seconds */
  maxRandomDelay: 10,
  /** Maximum random repeat delay in seconds */
  maxRandomRepeatDelay: 12
};

/**
 * Animation variants for the path elements
 */
export const PATH_VARIANTS = {
  initial: { strokeDashoffset: 800, strokeDasharray: '50 800' },
  animate: {
    strokeDashoffset: 0,
    strokeDasharray: '20 800',
    opacity: [0, 1, 1, 0]
  }
};

/**
 * Collection of colors for the background lines
 */
export const DEFAULT_COLORS = [
  '#46A5CA',
  '#8C2F2F',
  '#4FAE4D',
  '#D6590C',
  '#811010',
  '#247AFB',
  '#A534A0',
  '#A8A438',
  '#D6590C',
  '#46A29C',
  '#670F6D',
  '#D7C200',
  '#59BBEB',
  '#504F1C',
  '#55BC54',
  '#4D3568',
  '#9F39A5',
  '#363636',
  '#860909',
  '#6A286F',
  '#604483'
];

/**
 * Collection of path data for the background lines
 */
export const DEFAULT_PATHS = [
  'M720 450C720 450 742.459 440.315 755.249 425.626C768.039 410.937 778.88 418.741 789.478 401.499C800.076 384.258 817.06 389.269 826.741 380.436C836.423 371.603 851.957 364.826 863.182 356.242C874.408 347.657 877.993 342.678 898.867 333.214C919.741 323.75 923.618 319.88 934.875 310.177C946.133 300.474 960.784 300.837 970.584 287.701C980.384 274.564 993.538 273.334 1004.85 263.087C1016.15 252.84 1026.42 250.801 1038.22 242.1C1050.02 233.399 1065.19 230.418 1074.63 215.721C1084.07 201.024 1085.49 209.128 1112.65 194.884C1139.8 180.64 1132.49 178.205 1146.43 170.636C1160.37 163.066 1168.97 158.613 1181.46 147.982C1193.95 137.35 1191.16 131.382 1217.55 125.645C1243.93 119.907 1234.19 118.899 1254.53 100.846C1274.86 82.7922 1275.12 92.8914 1290.37 76.09C1305.62 59.2886 1313.91 62.1868 1323.19 56.7536C1332.48 51.3204 1347.93 42.8082 1361.95 32.1468C1375.96 21.4855 1374.06 25.168 1397.08 10.1863C1420.09 -4.79534 1421.41 -3.16992 1431.52 -15.0078',
  'M720 450C720 450 741.044 435.759 753.062 410.636C765.079 385.514 770.541 386.148 782.73 370.489C794.918 354.83 799.378 353.188 811.338 332.597C823.298 312.005 825.578 306.419 843.707 295.493C861.837 284.568 856.194 273.248 877.376 256.48C898.558 239.713 887.536 227.843 909.648 214.958C931.759 202.073 925.133 188.092 941.063 177.621C956.994 167.151 952.171 154.663 971.197 135.041C990.222 115.418 990.785 109.375 999.488 96.1291C1008.19 82.8827 1011.4 82.2181 1032.65 61.8861C1053.9 41.5541 1045.74 48.0281 1064.01 19.5798C1082.29 -8.86844 1077.21 -3.89415 1093.7 -19.66C1110.18 -35.4258 1105.91 -46.1146 1127.68 -60.2834C1149.46 -74.4523 1144.37 -72.1024 1154.18 -97.6802C1163.99 -123.258 1165.6 -111.332 1186.21 -135.809C1206.81 -160.285 1203.29 -160.861 1220.31 -177.633C1237.33 -194.406 1236.97 -204.408 1250.42 -214.196'
];

/**
 * Default stroke width for the paths
 */
export const DEFAULT_STROKE_WIDTH = 2.3;

/**
 * CSS class names for component elements
 */
export const CSS_CLASSES = {
  /** Container class name */
  container: 'background-lines-container',
  /** SVG class name */
  svg: 'background-lines-svg',
  /** Path class name */
  path: 'background-lines-path'
};
