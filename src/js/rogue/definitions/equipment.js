
import { Item } from './item';
import * as Fakes from '../constants/faketypes';
import MessageQueue from '../display/message-handler';
import { Items as Glyphs } from '../constants/glyphs';
import Materials from '../constants/materials';

class Equipment extends Item {
  get name() {
    const name = !this.isIdentified() && this.fakeName ? this.fakeName : this.realName;
    const enchant = this.enchantment ? `+${this.enchantment} ${name}` : name;
    const buc = this.bucName !== 'uncursed' ? `${this.bucName} ${enchant}` : enchant;
    return buc;
  }
}

export class Special extends Item {}

export class Comestible extends Item {
  get material() { return Materials.Food; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Comestible;
    super(opts);
  }
}

export class Armor extends Equipment {}

export class Weapon extends Equipment {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = this.getType();
  }
}

export class Body extends Armor {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Body;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}

export class Ring extends Armor {
  static get rarity() { return 3; }
  constructor(opts = {}) {
    opts.bucProb = { cursed: 7, blessed: 2, uncursed: 91 };
    opts.symbol = Glyphs.Ring;
    super(opts);
    this.realName = `ring of ${this.getCanonName()}`;
    this.fakeName = `${this.pickFakeName(Fakes.Ring)} ring`;
  }
}

export class Hands extends Weapon {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Hands;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}

export class Wrist extends Armor {
  static get rarity() { return 5; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Wrist;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} gloves`;
  }
}

export class Feet extends Armor {
  static get rarity() { return 5; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Feet;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} boots`;
    this.slotsTaken = 2;
  }
}

export class Head extends Armor {
  static get rarity() { return 5; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Head;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()} helm`;
  }
}

export class Cloak extends Armor {
  static get rarity() { return 3; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Cloak;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}

export class Neck extends Armor {
  static get rarity() { return 1; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Neck;
    super(opts);
    this.realName = this.fakeName = `amulet of ${this.getCanonName()}`;
  }
}

export class Gem extends Item {
  get material() { return Materials.Glass; }
  static get rarity() { return 0; } // actually a value of 8 but they're not implemented yet
  constructor(opts = {}) {
    opts.symbol = Glyphs.Gem;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}

export class Scroll extends Item {
  get material() { return Materials.Cloth; }
  static get rarity() { return 0; } // actually a value of 15 but not yet implemented
  constructor(opts = {}) {
    opts.symbol = Glyphs.Scroll;
    super(opts);
    this.realName = this.fakeName = `${this.getCanonName()}`;
  }
}

export class Wand extends Item {
  get material() { return Materials.Wood; }
  static get rarity() { return 2; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Wand;
    super(opts);
    this.realName = this.fakeName = `wand of ${this.getCanonName()}`;
  }
}

export class Spellbook extends Weapon {
  get material() { return Materials.Cloth; }
  static get rarity() { return 1; }
  constructor(opts = {}) {
    opts.manaCost = opts.manaCost || 3;
    opts.symbol = Glyphs.Spellbook;
    super(opts);
  }
}

export class Potion extends Equipment {
  get material() { return Materials.Cloth; }
  static get rarity() { return 20; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Potion;
    super(opts);
    const fake = this.pickFakeName(Fakes.Potion);
    this.color = fake;
    this.realName = `potion of ${this.getCanonName()}`;
    this.fakeName = `${fake} potion`;
  }
  use(entity, extra) {
    super.use(entity, extra);
    MessageQueue.add({ message: `${entity.name} drank ${this.color} liquid and ${extra.messageFinish}!` });
  }
}

export class Tool extends Item {
  static get rarity() { return 0; }
  constructor(opts = {}) {
    opts.symbol = Glyphs.Tool;
    super(opts);
  }
}