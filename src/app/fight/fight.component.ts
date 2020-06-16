import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../poke-api/model/pokemon";
import {FightService} from "./fight.service";
import {Move} from "../poke-api/model/move";

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {

  currentMessage = 'Wähle eine Aktion!';

  selectingAfterDefeat = false;

  playerTeam: Pokemon[];

  opponentTeam: Pokemon[];

  currentPlayerPokemon: Pokemon;
  currentOpponentPokemon: Pokemon;

  currentPlayerPokemonDead = false;
  currentOpponentPokemonDead = false;

  playerTurn = true;

  menuFight = false;
  menuPokemon = false;

  constructor(private fightService: FightService) { }

  ngOnInit(): void {
    this.initPokemon();
    this.initPlayerTurn();
  }

  resetMenu() {
    this.menuFight = false;
    this.menuPokemon = false;
  }

  async fight(attack?: Move) {
    this.selectingAfterDefeat = false;
    this.menuPokemon = false;
    this.menuFight = false;
    this.currentPlayerPokemonDead = false;
    this.currentOpponentPokemonDead = false;
    this.playerTurn = false;
    await this.delay(2000);
    await this.executeAttacks(attack);


    if(this.currentOpponentPokemonDead) {
      const index = this.opponentTeam.indexOf(this.currentOpponentPokemon);
      this.opponentTeam.splice(index, 1);
      await this.delay(2000);
      const rndm = Math.floor(Math.random() * this.opponentTeam.length);
      this.currentOpponentPokemon = this.opponentTeam[rndm];
      this.currentMessage = 'Gegner setzt ' + this.currentOpponentPokemon.name + ' ein!';
    }

    if(this.currentPlayerPokemonDead) {
      const index = this.playerTeam.indexOf(this.currentPlayerPokemon);
      this.playerTeam.splice(index, 1);
      await this.delay(2000);
      await this.selectNewPokemon();
    }

    this.playerTurn = true;
  }

  switchPokemon(pkmn: Pokemon) {
    this.currentPlayerPokemon = pkmn;
    this.currentMessage = 'Du wechselst ' + pkmn.name + ' ein!';
    this.fight();
  }

  getStat(name: string, pokemon: Pokemon) {
    return pokemon.stats.find(s => s.stat.name === name);
  }

  async changePokemon(pkmn: Pokemon) {
    this.currentPlayerPokemon = pkmn;
    this.currentMessage = 'Du wechselst ' + pkmn.name + ' ein!';
    this.menuPokemon = false;
    this.selectingAfterDefeat = false;
    await this.delay(2000);
    this.currentMessage = 'Du bist dran!';
  }

  private initPokemon() {
    this.playerTeam = this.fightService.playerTeam;
    this.opponentTeam = this.fightService.opponentTeam;

    this.playerTeam.forEach(pokemon => {
      pokemon.moves.forEach(move => move.cpp = move.pp);
      const hp = this.getStat('hp', pokemon).base_stat * 4;
      this.getStat('hp', pokemon).current_stat = hp;
      this.getStat('hp', pokemon).lvl_stat = hp;
    });
    this.opponentTeam.forEach(pokemon => {
      const hp = this.getStat('hp', pokemon).base_stat * 4;
      this.getStat('hp', pokemon).current_stat = hp;
      this.getStat('hp', pokemon).lvl_stat = hp;
    });

    this.currentPlayerPokemon = this.playerTeam[0];
    this.currentOpponentPokemon= this.opponentTeam[0];
  }

  private async selectNewPokemon() {
    this.playerTurn = true;
    this.menuPokemon = true;
    this.selectingAfterDefeat = true;
  }

  private initPlayerTurn() {
    this.playerTurn = true;
  }

  private delay(ms: number): Promise<any> {
    return new Promise<any>(resolve => setTimeout(resolve, ms));
  }

  private async executeAttacks(attack?: Move) {
    const opponentAttackIndex = Math.floor(Math.random() * this.currentOpponentPokemon.moves.length);
    const opponentMove = this.currentOpponentPokemon.moves[opponentAttackIndex];

    if (!attack) {
      this.currentMessage = this.currentOpponentPokemon.name + '  (GEGNER) setzt ' + opponentMove.name + ' ein!';
      await this.delay(2000);
      await this.executeAttack(opponentMove, this.currentOpponentPokemon, this.currentPlayerPokemon);

      if(this.getStat('hp', this.currentPlayerPokemon).current_stat <= 0) {
        this.currentMessage = this.currentPlayerPokemon.name + ' wurde besiegt!';
        this.currentPlayerPokemonDead = true;
        return;
      }

    } else if (this.isPlayerPriorityHigher()) {
      this.currentMessage = this.currentPlayerPokemon.name + ' setzt ' + attack.name + ' ein!';
      await this.delay(2000);
      await this.executeAttack(attack, this.currentPlayerPokemon, this.currentOpponentPokemon);

      if(this.getStat('hp', this.currentOpponentPokemon).current_stat <= 0) {
        this.currentMessage = this.currentOpponentPokemon.name + ' (GEGNER) wurde besiegt!';
        this.currentOpponentPokemonDead = true;
        return;
      }

      this.currentMessage = this.currentOpponentPokemon.name + '  (GEGNER) setzt ' + opponentMove.name + ' ein!';
      await this.delay(2000);
      await this.executeAttack(opponentMove, this.currentOpponentPokemon, this.currentPlayerPokemon);

      if(this.getStat('hp', this.currentPlayerPokemon).current_stat <= 0) {
        this.currentMessage = this.currentPlayerPokemon.name + ' wurde besiegt!';
        this.currentPlayerPokemonDead = true;
        return;
      }
    } else {
      this.currentMessage = this.currentOpponentPokemon.name + '  (GEGNER) setzt ' + opponentMove.name + ' ein!';
      await this.delay(2000);
      await this.executeAttack(opponentMove, this.currentOpponentPokemon, this.currentPlayerPokemon);

      if(this.getStat('hp', this.currentPlayerPokemon).current_stat <= 0) {
        this.currentMessage = this.currentPlayerPokemon.name + ' wurde besiegt!';
        this.currentPlayerPokemonDead = true;
        return;
      }

      this.currentMessage = this.currentPlayerPokemon.name + ' setzt ' + attack.name + ' ein!';
      await this.delay(2000);
      await this.executeAttack(attack, this.currentPlayerPokemon, this.currentOpponentPokemon);

      if(this.getStat('hp', this.currentOpponentPokemon).current_stat <= 0) {
        this.currentMessage = this.currentOpponentPokemon.name + ' (GEGNER) wurde besiegt!';
        this.currentOpponentPokemonDead = true;
        return;
      }
    }
  }

  private async executeAttack(attack: Move, executor: Pokemon, target: Pokemon) {
    const dmg = (this.getStat('attack', executor).base_stat * attack.power) / 75;
    const dmgFactor = + await this.calcDamageMultiplicator(attack, target);

    this.getStat('hp', target).current_stat -= Math.floor(dmgFactor * dmg);

    if(this.getStat('hp', target).current_stat < 0) {
      this.getStat('hp', target).current_stat = 0;
    }

    attack.cpp--;
  }

  private async calcDamageMultiplicator(attack: Move, pokemon: Pokemon) {
    const damageFactors = [];
    pokemon.types.forEach(type => {
      if(type.damage_relations) {
        if (type.damage_relations.double_damage_from && type.damage_relations.double_damage_from.filter(type => type.name === attack.type.name).length > 0) {
          damageFactors.push(2);
        } else if (type.damage_relations.half_damage_from && type.damage_relations.half_damage_from.filter(type => type.name === attack.type.name).length > 0) {
          damageFactors.push(0.5);
        } else if (type.damage_relations.no_damage_from && type.damage_relations.no_damage_from.filter(type => type.name === attack.type.name).length > 0) {
          damageFactors.push(0);
        }
      }
    });
    let damageFactor = 1;
    damageFactors.forEach(f => damageFactor *= f);

    if(damageFactor === 0) {
      this.currentMessage = 'Keine Wirkung!';
    } else if (damageFactor > 0 && damageFactor < 1) {
      this.currentMessage = 'Das ist nicht sehr effektiv!';
    } else if (damageFactor > 1) {
      this.currentMessage = 'Das ist sehr effektiv!';
    }

    await this.delay(2000);

    return damageFactor;
  }

  private isPlayerPriorityHigher(): boolean {
    return this.getStat('speed', this.currentPlayerPokemon).base_stat > this.getStat('speed', this.currentOpponentPokemon).base_stat;
  }

}
