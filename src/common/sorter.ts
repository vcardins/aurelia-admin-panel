//Based on https://github.com/thelgevold/angular-2-samples/blob/master/components/grid/sorter.ts

export interface ISorter {
  property:string;
  direction:number;
}

export class Sorter implements ISorter{
    
    property:string;
    direction:number;
    constructor(){
        this.property = null;
        this.direction = 1;
    }

    sort(collection:any, prop:string) {
        this.property = prop;
        this.direction = (this.property === prop) ? this.direction * -1 : 1;

        collection.sort((a,b) => {
            if(a[prop] === b[prop]){
                return 0;
            }
            else if (a[prop] > b[prop]){
                return this.direction * -1;
            }
            else {
                return this.direction * 1;
            }
        });
    }

}