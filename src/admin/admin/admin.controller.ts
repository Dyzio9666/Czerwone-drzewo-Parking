import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { authGuard } from 'src/guards/auth.guard';

@UseGuards(authGuard)

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService : AdminService
    ){

    }
    @Get('reservations')
    getReservations(){
        return this.adminService.getAllReservations()
    }

    @Delete('delete-reservation')
    deleteAllReservations(@Body() payload : any){
        // logic to delete all reservations would go here
        return  this.adminService.deleteReservation(payload.id)
    }
}
