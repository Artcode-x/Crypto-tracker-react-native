const mainSelector = (store) => store.store

export default mainSelector

export const flagSelector = (store) => mainSelector(store).flag
export const coinSelector = (store) => mainSelector(store).coinItem
export const daysSelector = (store) => mainSelector(store).chartDays
export const viewMarketFlagSelector = (store) => mainSelector(store).flagForView
export const duplicateSelector = (store) => mainSelector(store).duplicate
