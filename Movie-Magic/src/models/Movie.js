import fs from 'node:fs/promises'
import{log} from 'node:console'
import {v4 as uuid} from 'uuid'

const movieJson= await fs.readFile('./src/database.json', 'utf-8')
export const movies= JSON.parse(movieJson)



export default class Movie{
    constructor(data){
        this.data = data;
    }
   
    async save(){
     
    
        movies.push(this.data);
        await fs.writeFile('./src/database.json', JSON.stringify(movies, null, 4));
        return this.data;
    }

}
