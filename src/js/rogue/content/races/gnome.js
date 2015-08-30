
import Race from '../../definitions/race';
import * as Thresholds from '../../constants/skill-thresholds';
import * as Traits from '../traits/_all';

const opts = { stats: { str: -2, con: -2, dex: -1, int: 3, wis: 3, cha: -1, sight: 1,
  skillBonus: { bash: Thresholds.Basic },
  traits: [Traits.Infravision(2)]
} };
export default class Gnome extends Race {
  constructor() {
    super(opts);
  }
}