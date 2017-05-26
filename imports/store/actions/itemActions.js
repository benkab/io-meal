export function setItem(item) {
  return {
  	type: 'SETITEM',
  	payload: {
  	  item: item
  	}
  }
}

export function resetItem(item) {
  return {
    type: 'RESETITEM',
    payload: {
      item: null
    }
  }
}

export function enableItemEdition(isEditingItem) {
  return {
    type: 'ENABLEITEMEDITION',
    payload: {
      isEditingItem: true
    }
  }
}

export function disableItemEdition(isEditingItem) {
  return {
    type: 'DISABLEITEMEDITION',
    payload: {
      isEditingItem: false
    }
  }
}

