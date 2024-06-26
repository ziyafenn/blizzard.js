import { Resource } from './types'

export type CardClass =
  | 'demonhunter'
  | 'druid'
  | 'hunter'
  | 'mage'
  | 'paladin'
  | 'priest'
  | 'rogue'
  | 'shaman'
  | 'warlock'
  | 'warrior'
  | 'neutral'
  | 'deathknight'

export type CardGameMode = 'constructed' | 'battlegrounds' | 'arena' | 'mercenaries'

export type CardMinionType =
  | 'bloodelf'
  | 'draenei'
  | 'dwarf'
  | 'gnome'
  | 'human'
  | 'nightelf'
  | 'orc'
  | 'tauren'
  | 'troll'
  | 'undead'
  | 'murloc'
  | 'demon'
  | 'mech'
  | 'elemental'
  | 'beast'
  | 'totem'
  | 'pirate'
  | 'dragon'
  | 'all'
  | 'quilboar'
  | 'halforc'
  | 'naga'
  | 'oldgod'
  | 'pandaren'
  | 'gronn'

export type CardSortOrder = 'asc' | 'desc'

export type CardRarity = 'free' | 'common' | 'rare' | 'epic' | 'legendary'

export type CardSortOption = 'manaCost' | 'attack' | 'health' | 'name' | 'dataAdded' | 'groupByClass'

export type CardTier = 1 | 2 | 3 | 4 | 5 | 6 | 'hero' | Array<1 | 2 | 3 | 4 | 5 | 6 | 'hero'>

export type CardType = 'hero' | 'minion' | 'spell' | 'weapon' | 'hero power' | 'location' | 'baconquestreward'

export type CardBackCategory =
  | 'base'
  | 'fireside'
  | 'achieve'
  | 'heroes'
  | 'season'
  | 'legend'
  | 'esports'
  | 'game_license'
  | 'promotion'
  | 'pre_purchase'
  | 'blizzard'
  | 'golden'
  | 'events'

export type CardMetaDataType = 'sets' | 'setGroups' | 'types' | 'rarities' | 'classes' | 'minionTypes' | 'keywords'

export type CardSpellSchools = 'arcane' | 'fire' | 'frost' | 'nature' | 'holy' | 'shadow' | 'fel'

export type CardSearchOptions = {
  attack?: number | number[]
  class?: CardClass | CardClass[]
  collectible?: 0 | 1
  gameMode?: CardGameMode
  health?: number | number[]
  keyword?: string
  manaCost?: number | number[]
  minionType?: CardMinionType
  multiClass?: CardClass
  /**
   * @deprecated use sort option instead
   */
  order?: CardSortOrder
  page?: number
  pageSize?: number
  rarity?: CardRarity
  set?: string
  sort?: CardSortOption | `${CardSortOption}:${CardSortOrder}` | Array<`${CardSortOption}:${CardSortOrder}`>
  spellSchool?: CardSpellSchools
  textFilter?: string
  tier?: CardTier
  type?: CardType
}

export const cardSearch = (
  args: CardSearchOptions,
): Resource<{
  attack?: number | string
  class?: string
  collectible?: 0 | 1 | '0,1'
  gameMode?: CardGameMode
  health?: number | string
  keyword?: string
  manaCost?: number | string
  minionType?: CardMinionType
  multiClass?: CardClass
  page?: number
  pageSize?: number
  rarity?: CardRarity
  set?: string
  sort?: string
  spellSchool?: CardSpellSchools
  textFilter?: string
  tier?: number | 'hero' | string
  type?: CardType
}> => {
  return {
    path: 'hearthstone/cards',
    params: {
      attack: Array.isArray(args.attack) ? args.attack.join(',') : args.attack,
      class: Array.isArray(args.class) ? args.class.join(',') : args.class,
      collectible: args.collectible === undefined ? '0,1' : args.collectible,
      gameMode: args.tier === undefined ? args.gameMode : 'battlegrounds',
      health: Array.isArray(args.health) ? args.health.join(',') : args.health,
      keyword: args.keyword,
      manaCost: Array.isArray(args.manaCost) ? args.manaCost.join(',') : args.manaCost,
      minionType: args.minionType,
      multiClass: args.multiClass,
      page: args.page,
      pageSize: args.pageSize,
      rarity: args.rarity,
      set: args.set,
      sort: Array.isArray(args.sort) ? args.sort.join(',') : args.sort,
      spellSchool: args.spellSchool,
      textFilter: args.textFilter,
      tier: Array.isArray(args.tier) ? args.tier.join(',') : args.tier,
      type: args.type,
    },
  }
}

export type CardOptions = { id: number | string; gameMode?: CardGameMode }

export const card = (
  args: CardOptions,
): Resource<{
  gameMode?: CardGameMode
}> => {
  return {
    path: `hearthstone/cards/${encodeURIComponent(args.id)}`,
    params: {
      gameMode: args.gameMode,
    },
  }
}

export type CardBacksOptions = {
  id?: number | string
  category?: CardBackCategory
  order?: CardSortOrder
  sort?: string
  textFilter?: string
}

export const cardBacks = (
  args: CardBacksOptions,
): Resource<{
  cardBackCategory?: CardBackCategory
  order?: CardSortOrder
  sort?: string
  textFilter?: string
}> => {
  if (args.id !== undefined) {
    return {
      path: `hearthstone/cardbacks/${encodeURIComponent(args.id)}`,
    }
  }

  return {
    path: 'hearthstone/cardbacks',
    params: {
      cardBackCategory: args.category,
      order: args.order,
      sort: args.sort,
      textFilter: args.textFilter,
    },
  }
}

export type DeckOptions = {
  code?: string
  ids?: number | number[]
  hero?: number
  /**
   * This parameter is used to add sideboard cards for Zilliax Deluxe 3000 and E.T.C., Band Manager.
   * The accepted format is `sideboardCardId:primaryCardId`.
   * Repeat this format for each sideboard card to be added.
   */
  sideboardCards?: string | string[]
}

export const deck = (
  args: DeckOptions,
): Resource<{ code?: string; ids?: number | string; hero?: number; sideboardCards?: string }> => {
  return {
    path: 'hearthstone/deck',
    params: {
      code: args.code,
      ids: Array.isArray(args.ids) ? args.ids.join(',') : args.ids,
      hero: args.hero,
      sideboardCards: Array.isArray(args.sideboardCards) ? args.sideboardCards.join(',') : args.sideboardCards,
    },
  }
}

export type MetaDataOptions = {
  type: CardMetaDataType
}

export const metadata = (args?: null | MetaDataOptions): Resource => {
  return {
    path: args?.type === undefined ? 'hearthstone/metadata' : `hearthstone/metadata/${encodeURIComponent(args.type)}`,
  }
}
