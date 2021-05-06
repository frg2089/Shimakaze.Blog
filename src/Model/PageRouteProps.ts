import { BoxProps, IconButtonProps } from '@material-ui/core'

export default interface PageRouteProps {
  boxProps?: BoxProps,
  asideButtonProps?: IconButtonProps,
  asudeButtonContext?:JSX.Element
}