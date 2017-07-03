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


// return single image of the monster
import monsterPic from '../../sprites/monster/monster_idle.png';
import greenMonsterPic from '../../sprites/greenMonster/green_monster_idle.png';
import redMonsterPic from '../../sprites/redMonster/red_monster_idle.png';

export const monsterPicturePicker = (monster) => {
    switch (monster.type) {
        case 'grayMonster':
            return monsterPic;
        case 'redMonster':
            return redMonsterPic;
        case 'greenMonster':
            return greenMonsterPic;
        default:
            return monsterPic;
    }
}
