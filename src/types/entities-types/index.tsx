import { colors } from "../../config/colors"

export type Theme = {
  dark: boolean
  colors: typeof colors
}

export type UserInfo = {
  first_name?: string,
  last_name?: string,
  email?: string,
  phone?: string,
  birthday?: '2023-01-31',
  city?: string,
  state?: string,
  country?: string,
  zip_code?: string,
  bio?: string,
  confirm_password?: string,
  password?: string,
}
