import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateUserDto, UpdateUserStatusDto } from "./admin.dto";




@Controller('/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }
    
    /*  @Get()
      gettests(): object {
          return this.nurseService.gettests();
      }
      @Get('Tests/:id')
      gettestsById(@Param('id') id: string): object {
          return this.nurseService.gettestsById(id);
      }
  
      @Get('Tests/')
      gettestsByNameAndId(@Query('name') name: string,
          @Query('id') id: string): object {
          return this.nurseService.gettestsByNameAndId(name, id);
      }
      @Post('addtest')
  
      add(@Body('name') name: string): object {
          return this.nurseService.add(name);
      }
      @Put('createtest')
  
      create(@Body('name') name: string): object {
          return this.nurseService.create(name);
      }
      @Patch('updatetest')
  
      update(@Body('name') name: string): object {
          return this.nurseService.update(name);
      }
      @Delete('deletetest')
  
      delete(@Body('name') name: string): object {
          return this.nurseService.delete(name);
  
      }
      @Post('adduser')
      @UsePipes(new ValidationPipe)
      async addUser(@Body() myobj: NurseDTO): Promise<NurseDTO> {
          console.log(myobj.name);
          return this.nurseService.addUser(myobj);
      }
      @Post('upload')
      @UseInterceptors(FileInterceptor('file',
          {
              fileFilter: (req, file, cb) => {
                  if (file.originalname.match(/^.*\.(jpg)$/))
                      cb(null, true);
                  else {
                      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                  }
              },
              limits: { fileSize: 30000000},
              storage: diskStorage({
                  destination: './uploads',
                  filename: function (req, file, cb) {
                      cb(null, Date.now() + file.originalname)
                  },
              })
          }))
      uploadFile(@UploadedFile() file: Express.Multer.File,@Res() res) {
          console.log(file);
          if(file){
              return res.status(200).send('file with extension has been uploaded');
          }else{
              return res.status(400).send('Invalid file')
          }
             @Post('/add')
      async createUser(@Body() createUserDto: CreateUserDto) {
        return this.nurseService.createUser(createUserDto);
      }
      }*/
    
                 @Post('/add')
      async createUser(@Body() createUserDto: CreateUserDto) {
        return this.adminService.createUser(createUserDto);
      }
   
    
      @Patch('/:id')
      async updateUserStatus(@Body() updateUserStatusDto: UpdateUserStatusDto) {
        return this.updateUserStatus(updateUserStatusDto);
      }
    
      @Get('/inactive')
      async getInactiveUsers() {
        return this.adminService.getInactiveUsers();
      }
    
      @Get('/older_than_40')
      async getUsersOlderThan40() {
        return this.adminService.getUsersOlderThan40();
      }
    
      @Get('/list')
      async getAllUsers() {
        return this.adminService.getAllUsers();
      }

}
