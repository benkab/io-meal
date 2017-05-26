export function setObject(theObject) {
  return {
  	type: 'SETOBJECT',
  	payload: {
  	  theObject: theObject
  	}
  }
}

export function setObjectType(objectType) {
  return {
    type: 'SETOBJECTTYPE',
    payload: {
      objectType: objectType
    }
  }
}

export function resetObject(theObject) {
  return {
    type: 'RESETOBJECT',
    payload: {
      theObject: null
    }
  }
}

export function enableDeletion(isDeleting) {
  return {
    type: 'ENABLEDELETION',
    payload: {
      isDeleting: true
    }
  }
}

export function disableDeletion(isDeleting) {
  return {
    type: 'DISABLEDELETION',
    payload: {
      isDeleting: false
    }
  }
}

