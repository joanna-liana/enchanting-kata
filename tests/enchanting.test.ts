import { Enchantments, MagicBook } from './MagicBook';

describe('Weapon enchanting', () => {
  const defaultEnchantments: Enchantments = {
    'ice': {
      'prefix': 'Icy',
      'attribute': '+5 ice damage'
    },
    'fire': {
      'prefix': 'Inferno',
      'attribute': '+5 fire damage'
    },
    'lifesteal': {
      'prefix': 'Vampire',
      'attribute': '+5 lifesteal'
    },
    'agility': {
      'prefix': 'Quick',
      'attribute': '+5 agility'
    },
    'strength': {
      'prefix': 'Angry',
      'attribute': '+5 strength'
    }
  };

  function expectAnyEnchantment(weaponEnchantedOnce: any) {
    expect(weaponEnchantedOnce.enchantment)
      .toStrictEqual({ prefix: expect.any(String), attribute: expect.any(String) });
  }

  describe('given a non-enchanted weapon', () => {
    it('it enchants the weapon with one of the available enchantments', () => {
      const weapon = {
        name: 'Dagger of the Nooblet',
      };

      const enchantedWeapon = new MagicBook({
        enchantments: {
          'fire': {
            'prefix': 'Inferno',
            'attribute': '+5 fire damage'
          }
        }
      })
        .enchant(weapon);

      expect(enchantedWeapon).toStrictEqual({
        ...weapon,
        enchantment: {
          'prefix': 'Inferno',
          'attribute': '+5 fire damage'
        }
      });
    });

    it('chooses a random enchantment', () => {
      // given
      const weapon = {
        name: 'Dagger of the Nooblet',
      };

      const magicBook = new MagicBook({ enchantments: defaultEnchantments });

      // when
      const enchantedWeaponAttemptOne = magicBook.enchant(weapon);
      const enchantedWeaponAttemptTwo = magicBook.enchant(weapon);

      // then
      expect(enchantedWeaponAttemptOne.enchantment).not.toStrictEqual(enchantedWeaponAttemptTwo.enchantment);
    });
  });

  describe('given an enchanted weapon', () => {
    const weapon = {
      name: 'Dagger of the Nooblet',
    };

    let weaponEnchantedOnce;
    let magicBook: MagicBook;

    beforeEach(() => {
      magicBook = new MagicBook({ enchantments: defaultEnchantments });

      weaponEnchantedOnce = magicBook.enchant(weapon);
      expectAnyEnchantment(weaponEnchantedOnce);
    });

    it('enchants the weapon with another enchantment', () => {
      // when
      const weaponEnchantedTwice = magicBook.enchant(weaponEnchantedOnce);

      // then
      expectAnyEnchantment(weaponEnchantedTwice);

      expect(weaponEnchantedTwice.enchantment).not.toStrictEqual(weaponEnchantedOnce.enchantment);
    });

    it('chooses a random enchantment', () => {
      // when
      const enchantedWeaponAttemptOne = magicBook.enchant(weaponEnchantedOnce);
      const enchantedWeaponAttemptTwo = magicBook.enchant(weaponEnchantedOnce);

      // then
      expect(enchantedWeaponAttemptOne.enchantment).not.toStrictEqual(enchantedWeaponAttemptTwo.enchantment);
    });

    it.each([
      { enchantmentLossProbability: 1, hasPreservedEnchantment: false },
      { enchantmentLossProbability: 0, hasPreservedEnchantment: true },
    ])(
      'may remove the existing enchantment - probability $enchantmentLossProbability',
      ({ enchantmentLossProbability, hasPreservedEnchantment }) => {
        magicBook = new MagicBook({
          enchantments: defaultEnchantments,
          enchantmentLossProbability
        });

        const reEnchantedWeapon = magicBook.enchant(weaponEnchantedOnce);

        expect(!!reEnchantedWeapon.enchantment).toBe(hasPreservedEnchantment);
      }
    );
  });

  it.skip('adds the name of the enchantment to the item\'s name', () => {
    // const weapon = {
    //   name: 'Dagger of the Nooblet',
    // };

    // const enchantment = {
    //   'prefix': 'Inferno',
    //   'attribute': '+5 fire damage'
    // };

    // const enchantedWeapon = enchant(weapon);

    // expect(enchantedWeapon.name).toBe('Inferno Dagger of the Nooblet');
  });
});
