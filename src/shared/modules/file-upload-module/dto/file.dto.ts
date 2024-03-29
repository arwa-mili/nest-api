import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';


export class FormDataTestDto {

  @IsFile()
  //@MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png','image/jpg','application/pdf'])
  file: FileSystemStoredFile;

}