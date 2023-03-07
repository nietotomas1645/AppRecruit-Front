import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const job of value){
      if(job.position.toLowerCase().indexOf(arg.toLowerCase()) > -1){
         resultPosts.push(job);
      };
    };
    return resultPosts;
  }

}
