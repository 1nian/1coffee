import { SetMetadata } from '@nestjs/common';

// 跳过JWT验证
export const SkipJwt = () => SetMetadata('JWT', true);
