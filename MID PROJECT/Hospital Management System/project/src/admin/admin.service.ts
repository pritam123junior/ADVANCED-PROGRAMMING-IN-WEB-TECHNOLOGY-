import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserStatusDto } from "./admin.dto";

@Injectable()
export class AdminService {

    gettests(): object {
        return { message: "test -good" }
    }
    gettestsById(id: string): object {
        return { message: "You test id is " + id };
    }
    gettestsByNameAndId(name: string, id: string): object {
        return {
            message: "test name is " + name +
                " and test id is " + id
        };

    }
    add(name: string): object {
        return { message: "test is " + name };
    }
    create(name: string): object {
        return { message: "test is create" + name };
    }
    update(name: string): object {
        return { message: "test is update " + name };

    }
    delete(name: string): object {
        return { message: "test delete " + name };

    }

    constructor(@InjectRepository(AdminEntity) private userRepository: Repository<AdminEntity>) { }
    async createUser(createUserDto: CreateUserDto): Promise<AdminEntity> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async updateUserStatus(updateUserStatusDto: UpdateUserStatusDto): Promise<AdminEntity> {
        const { userId, newStatus } = updateUserStatusDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        user.status = newStatus;
        return this.userRepository.save(user);
    }


    async getInactiveUsers(): Promise<AdminEntity[]> {
        return this.userRepository.find({ where: { status: 'inactive' } });
    }

    async getUsersOlderThan40(): Promise<AdminEntity[]> {
        return this.userRepository.createQueryBuilder('user')
            .where('user.age > :age', { age: 40 })
            .getMany();
    }

    async getAllUsers(): Promise<AdminEntity[]> {
        return this.userRepository.find();
    }

}
