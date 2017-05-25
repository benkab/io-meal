export function toggleDropdownState(dropdownIsOpen) {
  return {
  	type: 'TOGGLEDROPDOWNSTATE',
  	payload: {
  	  dropdownIsOpen: !dropdownIsOpen.dropdownIsOpen
  	}
  }
}

export function closeDropdownState(dropdownIsOpen) {
  return {
  	type: 'CLOSEDROPDOWNSTATE',
  	payload: {
  	  dropdownIsOpen: false
  	}
  }
}