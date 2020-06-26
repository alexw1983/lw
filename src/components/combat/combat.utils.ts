import {
  IActionChart,
  IEnemy,
  ICombatConfig,
  IEquipment,
} from "../../redux/types";

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
  } else if (ratio === -10 || ratio === -9) {
    return DAMAGE[1][random];
  } else if (ratio === -8 || ratio === -7) {
    return DAMAGE[2][random];
  } else if (ratio === -6 || ratio === -5) {
    return DAMAGE[3][random];
  } else if (ratio === -4 || ratio === -3) {
    return DAMAGE[4][random];
  } else if (ratio === -2 || ratio === -1) {
    return DAMAGE[5][random];
  } else if (ratio === 0) {
    return DAMAGE[6][random];
  } else if (ratio === 1 || ratio === 2) {
    return DAMAGE[7][random];
  } else if (ratio === 3 || ratio === 4) {
    return DAMAGE[8][random];
  } else if (ratio === 5 || ratio === 6) {
    return DAMAGE[9][random];
  } else if (ratio === 7 || ratio === 8) {
    return DAMAGE[10][random];
  } else if (ratio === 9 || ratio === 10) {
    return DAMAGE[11][random];
  } else if (ratio >= 11) {
    return DAMAGE[12][random];
  }
};

export const calculateLoneWolfCombatSkill = (
  actionChart: IActionChart,
  enemy: IEnemy,
  config: ICombatConfig
) => {
  let log = [] as string[];

  const disciplinesBonus = getDisciplinesBonus(actionChart, enemy, config, log);
  const equipmentBonus = getEquipmentBonus(actionChart, enemy, config, log);

  let enemyBonus = 0;

  if (enemy.combatSkillBuffer !== 0) {
    enemyBonus = enemyBonus + enemy.combatSkillBuffer;
    log.push(`Enemy buffer ${enemy.combatSkillBuffer}`);
  }

  if (enemy.hasMindBlast && !hasDiscipline("mind-shield", actionChart)) {
    enemyBonus = enemyBonus - 2;
    log.push(`Enemy has mindblast (-2)`);
  }

  return {
    calcualtion: log,
    combatSKill:
      actionChart.combatSkill +
      equipmentBonus +
      disciplinesBonus +
      enemyBonus,
  };
};

export const getDisciplinesBonus = (
  actionChart: IActionChart,
  enemy: IEnemy,
  config: ICombatConfig,
  log: string[]
) => {
  let bonus = 0;
  const hasGrandWeaponMastery = hasDiscipline(
    "grand-weapon-mastery",
    actionChart
  );
  const hasWeaponMastery = hasDiscipline("weapon-mastery", actionChart);
  const hasWeaponSkill = hasDiscipline("weapon-skill", actionChart);
  const hasMindBlast = hasDiscipline("mind-blast", actionChart);
  const hasPsiSurge = hasDiscipline("psi-surge", actionChart);
  const hasKaiSurge = hasDiscipline("kai-surge", actionChart);

  const circleOfFire =
    hasWeaponMastery && hasDiscipline("huntmastery", actionChart);

  const circleOfLight =
    hasDiscipline("animal-control", actionChart) &&
    hasDiscipline("curing", actionChart);

  const circleOfSolaris =
    hasDiscipline("invisibility", actionChart) &&
    hasDiscipline("huntmastery", actionChart) &&
    hasDiscipline("pathsmanship", actionChart);

  const circleOfSpirit =
    hasDiscipline("psi-surge", actionChart) &&
    hasDiscipline("psi-shield", actionChart) &&
    hasDiscipline("nexus", actionChart) &&
    hasDiscipline("divination", actionChart);

  if (circleOfFire) {
    bonus = bonus + 1;
    log.push("Circle of Fire (+1)");
  }

  if (circleOfLight) {
    bonus = bonus + 0;
    log.push("Circle of Light (+0)");
  }

  if (circleOfSolaris) {
    bonus = bonus + 1;
    log.push("Circle of Solaris (+1)");
  }

  if (circleOfSpirit) {
    bonus = bonus + 3;
    log.push("Circle of Spirit (+3)");
  }

  const hasGrandWeaponMasteryWeapon = hasWeaponSkil(
    actionChart.grandWeaponMastery,
    actionChart.equipment
  );
  const hasWeaponMasteryWeapon = hasWeaponSkil(
    actionChart.weaponMastery,
    actionChart.equipment
  );
  const hasWeaponSkillWeapon = hasWeaponSkil(
    actionChart.weaponSkill,
    actionChart.equipment
  );

  const grandMasterRank = actionChart.disciplines.filter(
    (x) => x.type === "GRAND_MASTER"
  ).length;
  const magnakaiRank = actionChart.disciplines.filter(
    (x) => x.type === "MAGNAKAI"
  ).length;

  if (hasGrandWeaponMastery && hasGrandWeaponMasteryWeapon) {
    bonus = bonus + 5;
    log.push("Grand Weapon Matery (+5)");
  } else if (hasWeaponMastery && hasWeaponMasteryWeapon) {
    bonus = magnakaiRank >= 8 ? bonus + 4 : bonus + 3;
    log.push("Weapon Matery (+3)");
  } else if (hasWeaponSkill && hasWeaponSkillWeapon) {
    bonus = bonus + 2;
    log.push("Weapon Skill (+2)");
  }

  if (hasKaiSurge && config.useKaiSurge) {
    bonus = bonus + 8;
    log.push("Kai Surge (+8)");
  } else if (hasKaiSurge && config.useMindBlast && !enemy.immuneToMindblast) {
    bonus = bonus + 4;
    log.push("Mindblast (+4)");
  } else if (hasPsiSurge && config.usePsiSurge) {
    bonus = magnakaiRank >= 9 ? bonus + 6 : bonus + 4;
    log.push("Psi Surge (+4)");
  } else if (hasPsiSurge && config.useMindBlast && !enemy.immuneToMindblast) {
    bonus = magnakaiRank >= 9 ? bonus + 3 : bonus + 2;
    log.push("Mindblast (+2)");
  } else if (hasMindBlast && config.useMindBlast && !enemy.immuneToMindblast) {
    bonus = bonus + 2;
    log.push("Mindblast (+2)");
  }

  return bonus;
};

export const hasDiscipline = (id: string, actionChart: IActionChart) => {
  return !!actionChart.disciplines.find((x) => x.id === id);
};

export const hasWeaponSkil = (
  weaponSkill: string | undefined,
  equipment: IEquipment[]
) => {
  return (
    weaponSkill &&
    !!equipment.find(
      (x) =>
        (x.type === "WEAPON" &&
          x.name.toLowerCase() === weaponSkill.toLowerCase()) ||
        (x.name === "Summerswerd" && weaponSkill.toLowerCase() === "sword")
    )
  );
};

export const getEquipmentBonus = (
  actionChart: IActionChart,
  enemy: IEnemy,
  config: ICombatConfig,
  log: string[]
) => {
  return actionChart.equipment.reduce((acc, curr) => {
    let bonus = acc;

    if (curr.combatSkillBonus) {
      bonus = bonus + curr.combatSkillBonus;
      log.push(`${curr.name} (+${curr.combatSkillBonus})`);
    }

    if (curr.combatSkillBonusVsUndead && enemy.undead) {
      bonus = bonus + curr.combatSkillBonusVsUndead;
      log.push(`${curr.name} vs undead (+${curr.combatSkillBonusVsUndead})`);
    }

    return bonus;
  }, 0);
};
