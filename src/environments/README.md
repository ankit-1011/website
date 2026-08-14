# Environment Configuration

This directory contains environment-specific configuration files for the application.

## Files

- **environment.ts** - Development environment configuration
- **environment.prod.ts** - Production environment configuration
- **environment.example.ts** - Example template (safe to commit)

## Setup Instructions

### Development

The `environment.ts` file is already configured for development. No changes needed unless you want to use different EmailJS credentials for development.

### Production

1. Copy `environment.example.ts` to `environment.prod.ts` (if not already exists)
2. Update `environment.prod.ts` with your production EmailJS credentials:
   - `publicKey`: Your EmailJS public key
   - `serviceID`: Your EmailJS service ID
   - `templateID`: Your EmailJS template ID

### Security Best Practices

⚠️ **IMPORTANT**: 
- Never commit actual production API keys to version control
- Use environment variables or a secrets management system for production deployments
- Consider using CI/CD environment variables for production builds
- The `environment.prod.ts` file is excluded from git (see `.gitignore`)

### Using Environment Variables (Recommended for Production)

For production deployments, consider using build-time environment variables:

```bash
# Example: Set environment variables before build
export EMAILJS_PUBLIC_KEY="your-production-key"
export EMAILJS_SERVICE_ID="your-service-id"
export EMAILJS_TEMPLATE_ID="your-template-id"

# Then build
ng build --configuration production
```

You can then update `environment.prod.ts` to read from these variables or use a build script to inject them.

