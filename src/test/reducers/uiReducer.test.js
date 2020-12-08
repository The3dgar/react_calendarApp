const { uiOpenModal, uiCloseModal } = require("../../actions/ui")
const { uiReducer } = require("../../reducers/uiReducer")

const initState = {
  modalOpen: false,
}
describe('testing in uiReducer', () => {
  test('should return init state', () => {
    const state = uiReducer(initState, {})

    expect(state).toEqual(initState)

  })

  test('should open/close modal', () => {
    const modalOpen = uiOpenModal()

    const state = uiReducer(initState, modalOpen)

    expect(state).toEqual({
      modalOpen: true
    })

    const modalClose = uiCloseModal()
    const newState = uiReducer(state, modalClose)

    expect(newState).toEqual({
      modalOpen: false 
    })

  })
  
  
})
