import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  email: string
  password: string
  name: string
  date: string
  token: string | null
  error: string | null
  loading: boolean
}

const initialState: UserState = {
  email: '',
  password: '',
  name: '',
  date: '',
  token: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload
    },
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loginSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.loading = false
      state.token = action.payload.token
      state.email = action.payload.user.email
      state.error = null
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    logout(state) {
      state.token = null
      state.email = ''
      state.password = ''
      state.error = null
      state.loading = false
    },
  },
})

export const {
  setEmail,
  setPassword,
  setName,
  setDate,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = userSlice.actions

export default userSlice.reducer
