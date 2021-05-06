import React from 'react'
import PostMetaProps from '../Model/PostMetaProps'
import YAML from "yaml"


export default function PostMeta(props: PostMetaProps) {
  const meta = YAML.parse(props.meta)

  return (
    <>
      {JSON.stringify(meta)}
    </>
  )
}