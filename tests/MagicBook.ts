
export interface Enchantment {
  prefix: string;
  attribute: string;
}

export type Enchantments = Record<string, Enchantment>;

export class MagicBook {
  private enchantments: Enchantments;
  private enchantmentLossProbability: number;

  constructor(props: {
    enchantments: Enchantments;
    enchantmentLossProbability?: number;
  }) {
    this.enchantments = props.enchantments;
    this.enchantmentLossProbability = props.enchantmentLossProbability ?? 0.1;
  }

  private get shouldLoseEnchantment() {
    return Math.random() < this.enchantmentLossProbability;
  }


  enchant(weapon) {
    if (this.shouldLoseEnchantment) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { enchantment, ...weaponWithoutEnchantment } = weapon;

      return weaponWithoutEnchantment;
    }

    const availableEnchantments = Object
      .values(this.enchantments)
      .filter(({ prefix }) => prefix !== weapon.enchantment?.prefix);

    const randomEnchantmentIndex = Math.floor(Math.random() * availableEnchantments.length);

    return {
      ...weapon,
      enchantment: availableEnchantments[randomEnchantmentIndex]
    };
  }
}
