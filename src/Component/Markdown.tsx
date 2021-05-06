
import {
  Card,
  Link, Paper, Table,
  TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery
} from '@material-ui/core'
import React from 'react'
import ReactMarkdown from "react-markdown"
import { Components } from 'react-markdown/src/ast-to-react'
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import hltheme from "../vsc-dark-plus"
import rehypeRaw from 'rehype-raw'
import gfm from "remark-gfm"
import toc from "remark-toc"
import MarkdownProps from "../Model/MarkdownProps"
import MarkDown from "../Service/MarkDown"
import PostMeta from './PostMeta'


const components: Components = {
  code(props) {
    console.log(props)

    const match = /language-(\w+)/.exec(props.className as string || '')

    if (useMediaQuery("(prefers-color-scheme: dark)"))
      hltheme['pre[class*="language-"]'].background += '7f'

    return !props.inline && match ? (
      <SyntaxHighlighter
        style={ hltheme }
        language={ match[1] }
        PreTag={ Card }
        children={ String(props.children).replace(/\n$/, '') }
        showLineNumbers />
    ) : (
      <code className={ props.className as string } children={ props.children } />
    )
  },
  a(props) {
    return <Link { ...props } />
  },
  table(props) {
    return (
      <TableContainer>
        <Table { ...props } />
      </TableContainer>
    )
  },
  thead(props) {
    return <TableHead  { ...props } />
  },
  tbody(props) {
    return <TableBody  { ...props } />
  },
  tr(props) {
    return <TableRow  { ...props } />
  },
  th(props) {
    return <TableCell { ...props } />
  },
  td(props) {
    return <TableCell { ...props } />
  },
}

export default function Markdown(props: MarkdownProps) {
  const { data } = props


  if (!data) {
    return (
      <>
        Loading...
      </>
    )
  }

  const md = new MarkDown(data)

  return (
    <>
      <PostMeta meta={ md.meta } />
      <ReactMarkdown
        components={ components }
        children={ md.body }
        remarkPlugins={ [
          gfm,
          toc,
        ] }
        rehypePlugins={ [
          rehypeRaw
        ] } />
    </>
  )
}