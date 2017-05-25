export function setCategory(category) {
  return {
  	type: 'SETCATEGORY',
  	payload: {
  	  category: category
  	}
  }
}

export function resetCategory(category) {
  return {
    type: 'RESETCATEGORY',
    payload: {
      category: null
    }
  }
}

export function enableCategoryDeletion(isEditingCategory) {
  return {
    type: 'ENABLECATEGORYEDITION',
    payload: {
      isEditingCategory: true
    }
  }
}

export function disableCategoryDeletion(isEditingCategory) {
  return {
    type: 'DISABLECATEGORYEDITION',
    payload: {
      isEditingCategory: false
    }
  }
}

