// return sprite file
import monsterSprite from '../../sprites/monster/monsterSprite';
import greenMonsterSprite from '../../sprites/greenMonster/greenMonsterCharacter';
import redMonsterSprite from '../../sprites/redMonster/redMonsterCharacter';

export const monsterPicker = (monster) => {
    switch (monster.type) {
        case 'grayMonster':
            return monsterSprite;
        case 'redMonster':
            return redMonsterSprite;
        case 'greenMonster':
            return greenMonsterSprite;
        default:
            return monsterSprite;
    }
}

// dictionary to look up the image for the monster
export const monsterImg = {
  grayMonster: {
    notClicked: require('../../sprites/monster/monster_celebrate01.png'),
    clicked: require('../../sprites/monster/monster_celebrate_selected01.png'),
    idle: require('../../sprites/monster/monster_idle.png')
  },
  redMonster: {
    notClicked: require('../../sprites/redMonster/red_monster_celebrate01.png'),
    clicked: require('../../sprites/monster/monster_celebrate_selected01.png'),
    idle: require('../../sprites/redMonster/red_monster_idle.png')
  },
  greenMonster: {
    notClicked: require('../../sprites/greenMonster/green_monster_celebrate01.png'),
    clicked: require('../../sprites/monster/monster_celebrate_selected01.png'),
    idle: require('../../sprites/greenMonster/green_monster_idle.png')
  }
};
