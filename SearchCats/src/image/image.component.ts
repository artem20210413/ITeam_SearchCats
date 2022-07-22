import { Component, Input } from '@angular/core';


import { listImages } from 'src/Module/Module';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})


export class ImageComponent {
  title = 'SearchCats';
  @Input() listimagesimage: listImages| undefined;
}
