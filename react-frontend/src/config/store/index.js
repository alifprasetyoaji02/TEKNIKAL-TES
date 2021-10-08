import { extendObservable } from "mobx";

class MyStorage {
    count = 0;
     constructor(){
         extendObservable(this, {
             myData: 'Hi Alif ..',
             count:0,
             login:[]
         });
     }

     decrementCount(){

        if(this.count > 0){
            this.count -=1
        }
     }
}

var MyStore = new MyStorage();

export default MyStore;