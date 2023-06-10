
interface Enchantment {
  prefix: string;
  attribute: string;
}

type Enchantments = Record<string, Enchantment>;

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

      const enchantedWeapon = setupEnchanter({
        enchantments: {
          'fire': {
            'prefix': 'Inferno',
            'attribute': '+5 fire damage'
          }
        }
      }).enchant(weapon);

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

      const enchanter = setupEnchanter({
        enchantments: defaultEnchantments
      });

      // when
      const enchantedWeaponAttemptOne = enchanter.enchant(weapon);
      const enchantedWeaponAttemptTwo = enchanter.enchant(weapon);

      // then
      expect(enchantedWeaponAttemptOne.enchantment).not.toStrictEqual(enchantedWeaponAttemptTwo.enchantment);
    });
  });

  describe('given an enchanted weapon', () => {
    it('it enchants the weapon with another enchantment', () => {
      // given
      const weapon = {
        name: 'Dagger of the Nooblet',
      };

      const enchanter = setupEnchanter({
        enchantments: defaultEnchantments
      });

      const weaponEnchantedOnce = enchanter.enchant(weapon);

      expectAnyEnchantment(weaponEnchantedOnce);

      // when
      const weaponEnchantedTwice = enchanter.enchant(weaponEnchantedOnce);

      // then
      expectAnyEnchantment(weaponEnchantedTwice);

      expect(weaponEnchantedTwice.enchantment).not.toStrictEqual(weaponEnchantedOnce.enchantment);
    });

    it.todo('chooses a random enchantment');
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

const enchant = (enchantments: Enchantments) => weapon => {
  const availableEnchantments = Object
    .values(enchantments)
    .filter(({ prefix }) => prefix !== weapon.enchantment?.prefix);

  return {
    ...weapon,
    enchantment: availableEnchantments[Math.floor(Math.random() * availableEnchantments.length)]
  };
};
function setupEnchanter({ enchantments }: { enchantments: Enchantments; }) {
  return {
    enchant: enchant(enchantments)
  };
}
