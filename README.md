# Parcel import url

Please take a look at [./playground](./playground), docs will be updated soon

# Introduction
- In short, this lib make you able to import dependency by url, like this `import("https://this-is-my-website.vercel.app")`

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
- Now you can run `HOST=myapp.vercel.app parcel build src/index.html`, config can set at build time.

## How to use this
- TBD
