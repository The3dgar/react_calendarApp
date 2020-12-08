import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
import "@testing-library/jest-dom"
import { AppRouter } from '../../router/AppRouter';
import { startChecking } from '../../actions/auth';
import { act } from 'react-dom/test-utils';

jest.mock( "../../actions/auth", () => ({
  startChecking: jest.fn()
}))

const middlewares  = [thunk]
const mockStore = configureStore(middlewares)


describe('testing in <AppRouter/>', () => {
  test('should show <h1>Wait....</h1>', () => {
    const initState = {
      auth: {
        checking: true
      }
    }
    const store = mockStore(initState)
    store.dispatch = jest.fn()
    
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    ) 

    expect(wrapper).toMatchSnapshot()
    
  })  

  test('should show public route', () => {
    const initState = {
      auth: {
        checking: false,
        uid: null
      }
    }
    const store = mockStore(initState)
    store.dispatch = jest.fn()

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    ) 

    // expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(".login-container").exists()).toBe(true)
    
  })

  test('should show private route', () => {
    const initState = {
      auth: {
        checking: false,
        uid: "123",
        name: "Edgar"
      },
      calendar: {
        events: []
      },
      ui: {
        modalOpen: false
      }
    }
    const store = mockStore(initState)
    store.dispatch = jest.fn()

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    ) 

    // expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(".calendar-screen").exists()).toBe(true)
    
  })

  test('should dispatch startChecking', () => {


    const initState = {
      auth: {
        checking: true
      }
    }
    const store = mockStore(initState)
    store.dispatch = jest.fn()
    act(()=> {
      
      const wrapper = mount(
        <Provider store={store}>
          <AppRouter/>
        </Provider>
      ) 

    })
    

    expect(startChecking).toHaveBeenCalled()
  })

})
