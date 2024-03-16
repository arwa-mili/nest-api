import { BadRequestException, Body, Controller, Get, Post, UseGuards, Req, Param, Put, UseFilters, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { AuthResponse } from '../dto/auth-response.dto';
import { EmailVerificationService } from '../services/email-verification.service';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';

import { Request } from 'express';
import { HttpExceptionFilter } from 'src/shared/exception-filters/http.exception-filter';
import { VerifyCodeDto } from '../dto/verify-code.dto';
import { ResendVerifDto } from '../dto/resend-verif.dto';

@Controller('auth')
export class AuthController {


  constructor(private authService: AuthService,
    private emailVerifService: EmailVerificationService) { }




  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @UseFilters(new HttpExceptionFilter())
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }





  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseFilters(new HttpExceptionFilter())
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {

   
  if (typeof loginDto.login === 'string') {

      return this.authService.loginWithEmail(loginDto.login, loginDto.password);
    } else {

      return this.authService.loginWithPhoneNumber(loginDto.login, loginDto.password);
    }
  }




  @UseGuards(RefreshTokenGuard)
  @Get('/refresh/:id')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Param(":id") id:number ) {
    const userId=id;
    return this.authService.refreshTokens(userId);
  }


  @Post('/resendEmail')
  @HttpCode(HttpStatus.OK)
  async resendVerifEmail(
    @Body() resendVerifDto: ResendVerifDto,
  ): Promise<void> {
    return this.emailVerifService.resendVerifEmail(resendVerifDto.email)
  }






  @Post('/code')
  @HttpCode(HttpStatus.CREATED)
  async verifyCode(
    @Body() verifycodeDto : VerifyCodeDto
   
  ): Promise<AuthResponse> {
    return this.emailVerifService.verifyCode(verifycodeDto.email, verifycodeDto.code)
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body('email') email: string): Promise<void> {

    return await this.authService.sendResetPasswordEmail(email);
    





  }




  @Put('/resetpassword/:email')
  async resetPassword(@Param('email') email: string, @Body('resetPassword') resetPassword: string) {


    return await this.authService.resetPassword(email, resetPassword);
  }
}
