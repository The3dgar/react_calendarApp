import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
  checking: true,
};

describe('testing in authReducer', () => {
  test('should return initState', () => {
    const state = authReducer(initState, {})

    expect(state).toEqual(initState)
  })

  test('should work login', () => {
    const state = authReducer(initState, {
      type: types.authLogin,
      payload: {
        uid: "123", 
        name: "Edgar"
      }
    })
    expect(state).toEqual({
      checking: false,
      uid: "123", 
      name: "Edgar"
    })

  })
  
})
