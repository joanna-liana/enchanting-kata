describe('Weapon enchanting', () => {
  const enchantments = {
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

  it('given a non-enchanted weapon, it enchants the weapon with one of the available enchantments', () => {
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

const enchant = enchantments => weapon => {
  return {
    ...weapon,
    enchantment: Object.values(enchantments)[0]
  };
};
function setupEnchanter({ enchantments }: { enchantments: any; }) {
  return {
    enchant: enchant(enchantments)
  };
}
