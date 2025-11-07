import { Controller, UseGuards } from '@nestjs/common';
import { authGuard } from 'src/guards/auth.guard';
@UseGuards(authGuard)
@Controller('reservation')
export class ReservationController {
    
}
