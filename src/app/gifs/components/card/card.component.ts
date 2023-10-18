import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',

})
export class CardComponent implements OnInit {
  ngOnInit(): void {
      //si es undefined
      if(!this.gif)
    throw new Error('Gif Property is required');
  }

  @Input()
  public gif!: Gif

}
