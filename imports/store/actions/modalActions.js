export function toggleModalState(modalIsDiplayed) {
  return {
  	type: 'TOGGLEMODALSTATE',
  	payload: {
  	  modalIsDiplayed: true
  	}
  }
}

export function closeModalState(modalIsDiplayed) {
  return {
  	type: 'CLOSEMODALSTATE',
  	payload: {
  	  modalIsDiplayed: false
  	}
  }
}
