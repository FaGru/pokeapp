export interface Trigger {
  name: string;
  url: string;
}

export interface EvolutionDetail {
  gender?: any;
  held_item?: any;
  item?: any;
  known_move?: any;
  known_move_type?: any;
  location?: any;
  min_affection?: any;
  min_beauty?: any;
  min_happiness?: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: any;
  party_type?: any;
  relative_physical_stats?: any;
  time_of_day: string;
  trade_species?: any;
  trigger: Trigger;
  turn_upside_down: boolean;
}

export interface Trigger2 {
  name: string;
  url: string;
}

export interface EvolutionDetail2 {
  gender?: any;
  held_item?: any;
  item?: any;
  known_move?: any;
  known_move_type?: any;
  location?: any;
  min_affection?: any;
  min_beauty?: any;
  min_happiness?: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: any;
  party_type?: any;
  relative_physical_stats?: any;
  time_of_day: string;
  trade_species?: any;
  trigger: Trigger2;
  turn_upside_down: boolean;
}

export interface Species {
  name: string;
  url: string;
}

export interface EvolvesTo2 {
  evolution_details: EvolutionDetail2[];
  evolves_to: any[];
  is_baby: boolean;
  species: Species;
}

export interface Species2 {
  name: string;
  url: string;
}

export interface EvolvesTo {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolvesTo2[];
  is_baby: boolean;
  species: Species2;
}

export interface Species3 {
  name: string;
  url: string;
}

export interface Chain {
  evolution_details: any[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Species3;
}

export interface EvolutionRootObject {
  baby_trigger_item?: any;
  chain: Chain;
  id: number;
}
