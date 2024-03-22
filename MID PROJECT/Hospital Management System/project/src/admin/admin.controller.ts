import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, CreateUserDto, UpdateUserDto } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { User } from "src/nurse/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { extname } from "path";
import { SessionGuard } from "./session.guard";




@Controller('/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }
    
    @Post('/register')
    @UseInterceptors(
      FileInterceptor('avatar', {
        fileFilter: (req, file, cb) => {
          if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true);
          } else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
          }
        },
        limits: { fileSize: 2097152 },
        storage: diskStorage({
          destination: './uploads/admin',
          filename: function (req, file, cb) {
            const ext = extname(file.originalname);
            const fileName: string =
              file.originalname
                .replace(ext, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
              '-' +
              Date.now();
            req.body.imageUrl = fileName + ext;
            cb(null, fileName + ext);
          },
        }),
      }),
    )
    @UsePipes(new ValidationPipe())
    async adminRegistration(
      @UploadedFile() avatar: Express.Multer.File,
      @Body() data: AdminDTO,
    ): Promise<AdminEntity> {
      console.log(avatar);
      data.imageUrl = avatar.filename;
      return this.adminService.adminRegistration(data);
    }
  
    @Post('/signin')
    async signIn(
      @Body() data: { email: string; password: string },
      @Session() session: { email: string; destroy: () => void },
    ) {
      const result = await this.adminService.signIn(data);
      if (!result.isUserExist && !result.isValidPass) {
        throw new HttpException(result, 400);
      } else if (result.isValidPass) {
        session.email = data.email;
        return result;
      } else {
        throw new HttpException(result, 401);
      }
      // return this.adminService.signIn(data);
    }
  
    @Get('/signout')
    signout(@Session() session: { email: string; destroy: () => void }) {
      session.destroy();
  
      return { message: 'Signout successfully' };
    }
  
    @Get('/getadmin')
    @UseGuards(SessionGuard)
    getAdmin(@Session() session: { email: string }) {
      return this.adminService.getAdmin(session.email);
    }
  
    @Get('/getResetPassOtp/:email')
    async getResetPassOtp(@Param() data: { email: string }) {
      const result = await this.adminService.sendOTPResetPassword(data.email);
      if (result.isUserExist) {
        if (result.error) {
          throw new HttpException(result, 500);
        } else {
          return result;
        }
      } else {
        throw new HttpException(result, 400);
      }
    }
  
    @Post('/verifyOtp')
    async verifyOtp(@Body() data: { email: string; otp: string }) {
      const result = await this.adminService.verifyOTPResetPassword(data);
      if (!result.isOTPMatched) {
        throw new HttpException(result, 400);
      } else {
        return result;
      }
    }
  
    @Post('/resetPassword')
    async resetPassword(
      @Body() data: { email: string; password: string; otp: string },
    ) {
      const result = await this.adminService.resetPassword(data);
      if (!result.isOTPMatched) {
        throw new HttpException(result, 400);
      } else {
        if (result.isPasswordUpdated) {
          return result;
        } else {
          throw new HttpException(result, 500);
        }
      }
    }
  
    @Patch('/updateProfile')
    @UseGuards(SessionGuard)
    async updateProfile(
      @Body() data: AdminDTO,
      @Session() session: { email: string },
    ) {
      const result = await this.adminService.updateProfile(data, session.email);
      if (result.isProfileUpdated) {
        return result;
      } else {
        throw new HttpException(result, 500);
      }
    }

    
                 @Post('/add_Doctor')
      async createUser(@Body() createUserDto: CreateUserDto) {
        return this.adminService.createUser(createUserDto);
      }
 
      @Patch('/:id')
      async updateUser(@Body() Data: UpdateUserDto) {
        return this.adminService.updateUser (Data);
      }
   
    
      @Get('/older_than_40')
      async getUsersOlderThan40() {
        return this.adminService.getUsersOlderThan40();
      }
    
      @Get('/list')
      async getAllUsers() {
        return this.adminService.getAllUsers();
      }
      
      
      @Delete(':id')
      async deleteUser(@Param('id') id: number) {
          await this.adminService.deleteUser(id);
          return { message: 'User deleted successfully.' };
      }
      @Get('/search/:name')
      searchByname(@Param('name') name: string) {
          return this.adminService.searchByname(name);
      }

  }


