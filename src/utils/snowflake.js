import { Snowflake } from "@theinternetfolks/snowflake";
 
function generateID(){
        const id = Snowflake.generate();
        return id;
}
export {generateID}