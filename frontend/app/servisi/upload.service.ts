import { Injectable } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uri = "http://localhost:4000";

  constructor() { }
}
