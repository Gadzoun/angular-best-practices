import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataRepositoryService } from "../services/data-repository.service"
import { FilterClassesService } from './filter-classes.service';

@Component({
  styleUrls: ['./catalog.component.css'],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit, OnChanges {
  classes:any[];
  visibleClasses:any[];

  constructor(
    public dataRepository:DataRepositoryService,
    private filterClassesService: FilterClassesService
  ) {}

  ngOnInit() {
    this.dataRepository.getCatalog()
      .subscribe(classes => { this.classes = classes; this.applyFilter('')});
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  enroll(classToEnroll) {
    classToEnroll.processing = true;
    this.dataRepository.enroll(classToEnroll.classId)
      .subscribe(
        null,
        (err) => {console.error(err); classToEnroll.processing = false}, //add a toast message or something
        () => {classToEnroll.processing = false; classToEnroll.enrolled=true;},
      );
  }

  drop(classToDrop) {
    classToDrop.processing = true;
    this.dataRepository.drop(classToDrop.classId)
      .subscribe(
        null,
        (err) => { console.error(err); classToDrop.processing = false}, //add a toast message or something
        () => {classToDrop.processing = false; classToDrop.enrolled=false;}
      );
  }

  applyFilter(filter: string) {
    this.visibleClasses = this.filterClassesService.filterClasses(filter, this.classes);
  }
}
