const { Snowflake } = require('nodejs-snowflake')

const uid = new Snowflake({
   custom_epoch: Date.now(), 
   instance_id: 4000 
})

let snowflakeID = uid.idFromTimestamp(Date.now())
console.log(snowflakeID)