# Parcel import url

Please take a look at [./playground](./playground), docs will be updated soon

# Introduction
- In short, this lib make you able to import dependency by url, like this `import("https://this-is-my-website.vercel.app")`

# Installation
- Install package `pnpm add parcel-resolver-import-url -D`
- Add package to `.parcelrc`
```json
{
  ...
  "resolvers": ["parcel-resolver-import-url"]
}

```

- Enable typing by adding 2 line to your `.d.ts` file
```typescript
declare module 'http://*' {
  getMe() // your defination
}
declare module 'https://*' {
  exampleMethod() // your defination
}
```

# Features
Currently, only async import supported, but I'm thinking about support normal import
```typescript
import myPackage from 'https://$HOST/index.js'
```

### Url configurable on process.env
```typescript
import('https://$HOST/index.js').then(() => {
  
})
```
- Now you can run `HOST=myapp.vercel.app parcel build src/index.html`, your config configurable at build time.

## How to use this
- TBD
