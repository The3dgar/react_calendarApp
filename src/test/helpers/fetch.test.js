const { fetchWithOutToken, fetchWithToken } = require("../../helper/fetch")
jest.setTimeout(30000)
describe('Testing in fetch helper', () => {

  let token = ""
  test('should work without token', async () => {
    const resp = await fetchWithOutToken("auth", {
      email: "edgarolivar16@gmail.cl",
      password: "123456"
    }, "POST")

    expect(resp instanceof Response).toBe(true)
    const body = await resp.json()
    expect(body.ok).toBe(true)

    token = body.token
  })

  test('should work with token', async () => {
    localStorage.setItem("token", token)

    const resp = await fetchWithToken("events")
    expect(resp instanceof Response).toBe(true)
    
    const body = await resp.json()
    expect(body.ok).toBe(true)

  })
  
})
