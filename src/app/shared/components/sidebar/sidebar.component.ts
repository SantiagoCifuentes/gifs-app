import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {

  }

  get tags(): string []{
    return this.gifsService.tagsHistory;
  }


  //devuelve la petición que consulta los gifs a través del tag que se selección al darle click al botón del tag
  searchTag(tag: string){
    this.gifsService.searchTag(tag)
  }


}
