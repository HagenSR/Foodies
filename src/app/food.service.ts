
import { OnInit } from '@angular/core';
import sdf from '../../data.json';


export class FoodService implements OnInit{

    //LIST: any = sdf;
    public LIST:  any = sdf;
    

  constructor() {

   }
  ngOnInit(): void {
  }

  

   find(desc : string): any[] {
    let regexp = new RegExp('/'+desc+'/');
    let rtn : any[] = [];
    this.LIST.forEach(element => {
      var x = JSON.parse(JSON.stringify(element));
      //console.log(element)
      if((x.Shrt_Desc.includes(desc.toUpperCase()))){
        rtn.push(x);
      }
    });
    return rtn;
  }


/* 
finds a JSON food object based on its name, using REGEX
*/

//  async find({desc}) : Promise<Ifood>{
//     var db = connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function () {
//         var model = _model("abbrev", FoodSchema, "abbrev");
//         model.find({ Shrt_Desc: { $regex: input.toUpperCase(), $options: 'i' } },function(err,docs){
//             if (err) {
//                 console.log(err);
//             } else {
//                return docs;
//             }
//         }).limit(25);
//     });
// }

}
