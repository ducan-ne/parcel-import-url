const { convert } = require('tsconfig-to-swcconfig')
const { writeFileSync } = require("fs");
const path = require('path')

const swcConfig = convert()

writeFileSync(path.join(__dirname, '../.swcrc'), JSON.stringify(swcConfig, null, 2))
