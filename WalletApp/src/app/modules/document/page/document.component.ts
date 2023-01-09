import {Component, OnInit} from '@angular/core';
import {DocumentService} from "@shared/service/crud/document.service";
import {Document} from "@shared/model/dto/document.interface";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit{

  documents!: Document[];
  isEditing!: boolean;
  isAdding!: boolean;
  currentDocument!: Document;
  newDocument!: Document;
  columnsToDisplay: any;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit() {
    this.documentService.list().subscribe(data => {
      console.log("Data in obs");
      console.log(data);
      this.documents = data;
    })

     this.isAdding = false;
  }

}
