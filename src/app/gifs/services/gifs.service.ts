import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'fQuQjEJlBHhAxWqMTyi3AtBW3sNJ92me';
const SERVICE_URL = 'https://api.giphy.com/v1/gifs'


@Injectable({
  providedIn: 'root'
})




export class GifsService {
  // Se coloca privado y se crea el método tagsHistory para permitir modificar el tagsHistory
  // en algún componente

  private _tagsHistory :string[] = [];

  //contiene la lista de los gifs
  public gifList: Gif[] = []

  get tagsHistory(){

    //Crea una copia de los tagsHistory
    return [...this._tagsHistory]
  }

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service ready')
  }


  private organizeHistory(tag : string){
      tag = tag.toLowerCase();

      // si se incluye el nuevo tag, entonces se va a eliminar
      // el filter regresa un nuevo arreglo pero solo de los elementos que devuelvan verdadero, o sea de los que sean diferente al viejotag
      if(this.tagsHistory.includes(tag)){
        this._tagsHistory = this._tagsHistory.filter(oldTag=>oldTag !==tag)
      }

      //se inserta
      this._tagsHistory.unshift(tag);
      //manteniendo el arreglo con solo 10 elementos
      this._tagsHistory = this.tagsHistory.splice(0,10)
      this.saveLogalStorage();
  }

  //guardar en el local storage
  private saveLogalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  //leer en el LS
  private loadLocalStorage() : void {
    if(!localStorage.getItem('history'))return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagsHistory.length === 0)return;
    //si hay más de un elemento
    this.searchTag(this._tagsHistory[0])

  }

  public searchTag(tag:string):void{

    if (tag.length===0) return;

    this.organizeHistory(tag);


    const params = new HttpParams()
    .set('api_key', GIPHY_API_KEY)
    .set('limit', '10')
    .set('q', tag)

    //esto es un observable, puede estar emitiendo diferentes valores alo largo del tiempo
    // this.http.get(`${SERVICE_URL}/search?api_key=fQuQjEJlBHhAxWqMTyi3AtBW3sNJ92me&q=radiohead&limit=10'`)
    this.http.get<SearchResponse>(`${SERVICE_URL}/search`, {params})
    .subscribe((respons) => {

      this.gifList = respons.data
      console.log({gifs: this.gifList})
    })


  }




}
