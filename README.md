# Parcel import url

Please take a look at [./playground](./playground), below docs isn't fully, will be updated soon

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
declare module 'https://myapp.vercel.app/index.js' {
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

### Make your remote module callback-able to caller by a trick, without you config name, version, etc. 
- But your remote module must be built by this plugin 

## How to use this
- TBD
