import { Module } from "@nestjs/common";
import { EmailSendingService } from "./service/email-sending.service";


@Module({
    imports: [
  
    ],
    
    providers: [EmailSendingService],
    exports: [EmailSendingService]
  })
  export class EmailSendingModule { }