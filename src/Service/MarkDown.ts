export default class MarkDown {
  constructor(md: string) {
    this.meta = ""
    this.body = md
    const lines = md.split("\n")
    let p = 0
    let raw_meta = new Array<string>()
    let raw_body = new Array<string>()
    if (lines.length <= 0
      || !lines[p++].startsWith("---"))
      return


    while (!lines[p].startsWith("---")) {
      if (p > lines.length)
        return
      raw_meta.push(lines[p++])
    }
    
    p++

    while (p < lines.length) {
      raw_body.push(lines[p++])
    }

    this.meta = raw_meta.join("\n")
    this.body = raw_body.join("\n")
  }
  meta: string
  body: string
}