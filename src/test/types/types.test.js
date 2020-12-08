const { types } = require("../../types/types")


describe('Testing in types', () => {
  test("Should be equal", () => {
    expect(types).toEqual({

      uiOpenModal: "[ui] Open Modal",
      uiCloseModal: "[ui] Close Modal",
    
      eventStartAddNew: "[event] Star add new",
      eventAddNew: "[event] Add new",
      eventSetActive: "[event] Set active",
      eventClearActiveEvent: "[event] Clear active event",
      eventUpdated: "[event] Updated",
      eventDeleted: "[event] Deleted",
      eventLoaded: "[event] Loaded",
      eventLogout: "[event] Logout",
    
      authCheckingFinish: "[auth] Finish login state",
      authStartLogin: "[auth] Start login", //iniciar posteo
      authLogin: "[auth] Login", //establecer el usuario en el sistema
      authStartRegister: "[auth] Start register",
      authStartTokenRenew: "[auth] Start token renew",
      authLogout: "[auth] Logout"
    
    })
  })
})
