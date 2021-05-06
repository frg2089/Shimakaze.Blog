import { Container, createStyles, makeStyles, Theme } from '@material-ui/core'
import * as React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  }),
)

export default function Index (props: {}) {
  const classes = useStyles()

  return (
    <Container fixed>
      欢迎来到正在施工中的岛风的博客
    </Container>
  )
}
