

import { Module } from "@nestjs/common";
import { fileuploadingService } from "./service/file-uploading.service";


@Module({
    imports: [
  
    ],
    
    providers: [fileuploadingService],
    exports: [fileuploadingService]
  })
  export class FileUploadingModule { }