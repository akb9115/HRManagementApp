import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, Inject } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit, OnChanges {

  @Input() cardData: Array<object>;
  dataLength = 20;
  cardsInView: Array<object>;
  @Output() viewProfileEmitter = new EventEmitter<number>();
  @Output() deleteProfileEmitter = new EventEmitter<number>();
  @Output() editProfileEmitter=new EventEmitter<number>();
  @Output() restoreProfileEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.cardsInView = this.cardData.slice(0, this.dataLength)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cardData.currentValue) {
      this.cardsInView = this.cardData.slice(0, this.dataLength)
    }
  }

  onScroll() {
    this.dataLength = this.dataLength + 15
    this.cardsInView = this.cardData.slice(0, this.dataLength)
  }

  viewProfile(id) {
    this.viewProfileEmitter.emit(id)
  }

  editProfile(id){
    this.editProfileEmitter.emit(id)
  }

  deleteProfile(id) {
    this.deleteProfileEmitter.emit(id)
  }

  restoreProfile(id){
    this.restoreProfileEmitter.emit(id)
  }

}






