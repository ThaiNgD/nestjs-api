import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { path } = request;

    // Exclude auth-related routes
    const excludedRoutes = ['/auth/login', '/auth/register'];
    if (excludedRoutes.includes(path)) {
      return true; // Skip authentication for these routes
    }

    // Apply authentication for other routes
    const user = request.user; // Assuming Passport is being used
    return !!user; // Allow access if user is authenticated
  }
}
