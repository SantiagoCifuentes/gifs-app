import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar: </h5>
    <!-- el keyup manda información una vez se apreta la tecla, el .enter se hace para cambiar este comportamiento y que solo sea cuando se apriete enter -->
    <input type="text" class="form-control" placeholder="Buscar gifs" (keyup.enter)="searchTag()" #txtTagInput>
  `,

})
export class SearchBoxComponent {

  // El ViewChild sirve para tomar una referencia local, el viewChildren es cuando , por ejem, habría más inputs ya que devuelve un array
  @ViewChild('txtTagInput')
  // El ! es llamado notnull operator y en este caso le estamos diciendo que le taginput siempre tendrá valor
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) {

  }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag) ;

    this.tagInput.nativeElement.value = '';

  }
}
