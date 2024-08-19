const mainSelector = (store) => store.store

export default mainSelector

export const flagSelector = (store) => mainSelector(store).flag
export const coinSelector = (store) => mainSelector(store).coinItem
