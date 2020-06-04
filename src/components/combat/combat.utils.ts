export const getDamage = (
  random: number,
  ratio: number,
  lwEp: number,
  eEp: number
): { e: number; lw: number } => {
  const K = +lwEp;
  const EK = +eEp;
  const DAMAGE = [
    [
      // -11
      { e: 6, lw: 0 },
      { e: 0, lw: K },
      { e: 0, lw: K },
      { e: 0, lw: 9 },
      { e: 0, lw: 8 },
      { e: 1, lw: 7 },
      { e: 2, lw: 6 },
      { e: 3, lw: 5 },
      { e: 4, lw: 4 },
      { e: 5, lw: 3 },
    ],
    [
      // -10/-9
      { e: 7, lw: 0 },
      { e: 0, lw: K },
      { e: 0, lw: 8 },
      { e: 0, lw: 7 },
      { e: 1, lw: 7 },
      { e: 2, lw: 6 },
      { e: 3, lw: 6 },
      { e: 4, lw: 5 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
    ],
    [
      // -8/-7
      { e: 8, lw: 0 },
      { e: 0, lw: 8 },
      { e: 0, lw: 7 },
      { e: 1, lw: 6 },
      { e: 2, lw: 6 },
      { e: 3, lw: 5 },
      { e: 4, lw: 5 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
      { e: 7, lw: 2 },
    ],
    [
      // -6/-5
      { e: 9, lw: 0 },
      { e: 0, lw: 6 },
      { e: 1, lw: 6 },
      { e: 2, lw: 5 },
      { e: 3, lw: 5 },
      { e: 4, lw: 4 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
      { e: 7, lw: 2 },
      { e: 8, lw: 0 },
    ],
    [
      // -4/-3
      { e: 10, lw: 0 },
      { e: 1, lw: 6 },
      { e: 2, lw: 5 },
      { e: 3, lw: 5 },
      { e: 4, lw: 4 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
      { e: 7, lw: 2 },
      { e: 8, lw: 1 },
      { e: 9, lw: 0 },
    ],
    [
      // -2/-1
      { e: 11, lw: 0 },
      { e: 2, lw: 5 },
      { e: 3, lw: 6 },
      { e: 4, lw: 4 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
      { e: 7, lw: 2 },
      { e: 8, lw: 2 },
      { e: 9, lw: 1 },
      { e: 10, lw: 0 },
    ],
    [
      // 0
      { e: 12, lw: 0 },
      { e: 3, lw: 5 },
      { e: 4, lw: 4 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
      { e: 7, lw: 2 },
      { e: 8, lw: 2 },
      { e: 9, lw: 1 },
      { e: 10, lw: 0 },
      { e: 11, lw: 0 },
    ],
    [
      // +1/+2
      { e: 14, lw: 0 },
      { e: 4, lw: 5 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
      { e: 7, lw: 3 },
      { e: 8, lw: 2 },
      { e: 9, lw: 2 },
      { e: 10, lw: 1 },
      { e: 11, lw: 0 },
      { e: 12, lw: 0 },
    ],
    [
      // +3/+4
      { e: 16, lw: 0 },
      { e: 5, lw: 4 },
      { e: 6, lw: 3 },
      { e: 7, lw: 3 },
      { e: 8, lw: 2 },
      { e: 9, lw: 2 },
      { e: 10, lw: 2 },
      { e: 11, lw: 1 },
      { e: 12, lw: 0 },
      { e: 14, lw: 0 },
    ],
    [
      // +5/+6
      { e: 18, lw: 0 },
      { e: 6, lw: 4 },
      { e: 7, lw: 3 },
      { e: 8, lw: 3 },
      { e: 9, lw: 2 },
      { e: 10, lw: 2 },
      { e: 11, lw: 1 },
      { e: 12, lw: 0 },
      { e: 14, lw: 0 },
      { e: 16, lw: 0 },
    ],
    [
      // +7/+8
      { e: EK, lw: 0 },
      { e: 7, lw: 4 },
      { e: 8, lw: 3 },
      { e: 9, lw: 2 },
      { e: 10, lw: 2 },
      { e: 11, lw: 2 },
      { e: 12, lw: 2 },
      { e: 14, lw: 1 },
      { e: 16, lw: 0 },
      { e: 18, lw: 0 },
    ],
    [
      // +9/+10
      { e: EK, lw: 0 },
      { e: 8, lw: 3 },
      { e: 9, lw: 3 },
      { e: 10, lw: 2 },
      { e: 11, lw: 2 },
      { e: 12, lw: 2 },
      { e: 14, lw: 1 },
      { e: 16, lw: 0 },
      { e: 18, lw: 0 },
      { e: EK, lw: 0 },
    ],
    [
      // +11
      { e: EK, lw: 0 },
      { e: 9, lw: 3 },
      { e: 10, lw: 2 },
      { e: 11, lw: 2 },
      { e: 12, lw: 2 },
      { e: 14, lw: 1 },
      { e: 16, lw: 1 },
      { e: 18, lw: 0 },
      { e: EK, lw: 0 },
      { e: EK, lw: 0 },
    ],
  ];

  if (ratio <= -11) {
    return DAMAGE[0][random];
  } else if (ratio == -10 || ratio == -9) {
    return DAMAGE[1][random];
  } else if (ratio == -8 || ratio == -7) {
    return DAMAGE[2][random];
  } else if (ratio == -6 || ratio == -5) {
    return DAMAGE[3][random];
  } else if (ratio == -4 || ratio == -3) {
    return DAMAGE[4][random];
  } else if (ratio == -2 || ratio == -1) {
    return DAMAGE[5][random];
  } else if (ratio == 0) {
    return DAMAGE[6][random];
  } else if (ratio == 1 || ratio == 2) {
    return DAMAGE[7][random];
  } else if (ratio == 3 || ratio == 4) {
    return DAMAGE[8][random];
  } else if (ratio == 5 || ratio == 6) {
    return DAMAGE[9][random];
  } else if (ratio == 7 || ratio == 8) {
    return DAMAGE[10][random];
  } else if (ratio == 9 || ratio == 10) {
    return DAMAGE[11][random];
  } else if (ratio >= 11) {
    return DAMAGE[12][random];
  }
};
