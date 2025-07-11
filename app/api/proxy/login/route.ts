import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { User } from '@/lib/entities/User';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { email, password }
        });

        if (user) {
            return NextResponse.json({ message: '登录成功', user });
        } else {
            return NextResponse.json(
                { error: '邮箱或密码错误' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: '登录失败' },
            { status: 500 }
        );
    }
}