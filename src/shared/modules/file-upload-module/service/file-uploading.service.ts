
import { Injectable, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { paths } from 'src/common/constants/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataTestDto } from '../dto/file.dto';




export const storage = {
  storage: diskStorage({
    destination: paths.img_path,
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`)
    }
  })

}
@Injectable()
export class fileuploadingService {


    constructor(


    ) { }
    async uploadfile( file:FormDataTestDto ): Promise<string> {
        if (!file){
            throw new UnauthorizedException('File is missing or invalid');


        }
        console.log(file)
        return await file.file.originalName;

    }


}