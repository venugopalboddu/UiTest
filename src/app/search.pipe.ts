import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(it => {
      if (!args) {
        return value;
      }
      const title = it.title.toLowerCase().startsWith(args.toLowerCase());
      return title;
    });
  }
}
