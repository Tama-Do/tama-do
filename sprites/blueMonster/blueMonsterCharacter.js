
const blueMonsterCharacter = {
  name:"blueMonster",
  size: {width: 220, height: 220},
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('./blue_monster_idle.png'),
    require('./blue_monster_walk01.png'),
    require('./blue_monster_walk02.png'),
    require('./blue_monster_walk03.png'),
    require('./blue_monster_eat01.png'),
    require('./blue_monster_eat02.png'),
    require('./blue_monster_celebrate01.png'),
    require('./blue_monster_celebrate02.png'),
    require('./blue_monster_disgust01.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'WALK':
        return [1,2,3,0];
      case 'EAT':
        return [4,5,4,0];
      case 'CELEBRATE':
        return [6,7,6,0,6,7,6,0];
      case 'DISGUST':
        return [0,8,8,8,8,0];
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8];
    }
  },
};

export default blueMonsterCharacter;
