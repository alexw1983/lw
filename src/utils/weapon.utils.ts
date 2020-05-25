export const getWeaponName = (weaponNumber: number) => {
  switch (weaponNumber) {
    case 0:
      return "Dagger";
    case 1:
      return "Spear";
    case 2:
      return "Mace";
    case 3:
      return "Short Sword";
    case 4:
      return "Warhammer";
    case 5:
      return "Sword";
    case 6:
      return "Axe";
    case 7:
      return "Sword";
    case 8:
      return "QuarterStaff";
    case 9:
      return "Broad Sword";
    default:
      return "";
  }
};
