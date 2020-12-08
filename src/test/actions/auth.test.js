import configureStore from "redux-mock-store"
import thunk from "redux-thunk"

import "@testing-library/jest-dom"
import { startChecking, startLogin, startRegister } from "../../actions/auth"
import { types } from "../../types/types"
import Swal from "sweetalert2"
import * as fetchHelper from "../../helper/fetch"

const middlewares  = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

jest.mock("sweetalert2", ()=> ({
  fire: jest.fn()
}))
Storage.prototype.setItem = jest.fn()

describe('testing in auth actions', () => {
  beforeEach(()=> {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('should work startLogin', async () => {
    await store.dispatch(startLogin("edgarolivar16@gmail.cl", "123456"))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: "Edgar",
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith("token", expect.any(String))

    expect(localStorage.setItem).toHaveBeenCalledWith("token_init", expect.any(Number))

    // para ver cuantas veces se ha llamado
    // console.log(localStorage.setItem.mock.calls[0])
    localStorage.setItem("token", localStorage.setItem.mock.calls[0].token )

  })
  test('should work incorrect startLogin', async () => {
    await store.dispatch(startLogin("edgarolivar16@gmail.cl", "123456@"))
    const actions = store.getActions()

    expect(actions).toEqual([])
    expect(Swal.fire).toHaveBeenCalledWith("Error", "Password invalid", "error")

  })
  test('should work startRegister', async () => {
    // Esta parte la hacemos para evitar crear usuarios en la db
    fetchHelper.fetchWithOutToken = jest.fn(()=> ({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "Edgar",
          token: "ABC123"
        }
      }
    }))
    await store.dispatch(startRegister("test3@test.cl", "123456@", "Edgarinchis"))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: 123,
        name: "Edgar"
      }
    })
    expect(localStorage.setItem).toHaveBeenCalledWith("token", expect.any(String))
    expect(localStorage.setItem).toHaveBeenCalledWith("token_init", expect.any(Number))
  })

  test('should work startChecking', async () => {

    Storage.prototype.getItem = jest.fn(()=> ({token : "token2Renew"}))
    fetchHelper.fetchWithToken = jest.fn(()=>({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "Edgar",
          token: "newToken"
        }
      }
    }))
    await store.dispatch(startChecking())
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: 123,
        name: "Edgar"
      }
    })
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "newToken")
  })
})
