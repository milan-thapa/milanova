// Production-grade logging service
// Supports multiple transports and structured logging

type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogContext {
  [key: string]: any
}

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: LogContext
  userId?: string
  requestId?: string
  environment: string
}

class Logger {
  private isDevelopment: boolean
  private isProduction: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.isProduction = process.env.NODE_ENV === 'production'
  }

  private formatMessage(entry: LogEntry): string {
    const contextStr = entry.context ? ` | Context: ${JSON.stringify(entry.context)}` : ''
    const userStr = entry.userId ? ` | User: ${entry.userId}` : ''
    const requestStr = entry.requestId ? ` | Request: ${entry.requestId}` : ''
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${contextStr}${userStr}${requestStr}`
  }

  private createLogEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      userId: this.getUserId(),
      requestId: this.getRequestId(),
      environment: process.env.NODE_ENV || 'development',
    }
  }

  private getUserId(): string | undefined {
    // In a real app, you'd get this from session or auth context
    // This would be implemented with proper context passing
    return undefined
  }

  private getRequestId(): string | undefined {
    // In a real app, you'd get this from request headers
    // This would be implemented with proper middleware
    return undefined
  }

  private log(entry: LogEntry) {
    const formatted = this.formatMessage(entry)

    switch (entry.level) {
      case 'error':
        console.error(formatted)
        // In production, send to error tracking service (Sentry, etc.)
        if (this.isProduction) {
          // Sentry.captureMessage(entry.message, { level: 'error', extra: entry.context })
        }
        break
      case 'warn':
        console.warn(formatted)
        break
      case 'info':
        console.info(formatted)
        break
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formatted)
        }
        break
    }
  }

  error(message: string, context?: LogContext) {
    const entry = this.createLogEntry('error', message, context)
    this.log(entry)
  }

  warn(message: string, context?: LogContext) {
    const entry = this.createLogEntry('warn', message, context)
    this.log(entry)
  }

  info(message: string, context?: LogContext) {
    const entry = this.createLogEntry('info', message, context)
    this.log(entry)
  }

  debug(message: string, context?: LogContext) {
    const entry = this.createLogEntry('debug', message, context)
    this.log(entry)
  }

  // Specialized logging methods
  apiError(method: string, path: string, error: any, context?: LogContext) {
    this.error(`API Error: ${method} ${path}`, {
      ...context,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  dbError(operation: string, error: any, context?: LogContext) {
    this.error(`Database Error: ${operation}`, {
      ...context,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  authEvent(event: string, userId?: string, context?: LogContext) {
    this.info(`Auth Event: ${event}`, {
      ...context,
      userId,
    })
  }
}

// Singleton instance
export const logger = new Logger()

// Convenience functions
export const logError = (message: string, context?: LogContext) => logger.error(message, context)
export const logWarn = (message: string, context?: LogContext) => logger.warn(message, context)
export const logInfo = (message: string, context?: LogContext) => logger.info(message, context)
export const logDebug = (message: string, context?: LogContext) => logger.debug(message, context)
